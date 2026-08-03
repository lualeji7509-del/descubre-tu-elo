const { chromium } = require('playwright');
const { Chess } = require('chess.js');
const PUZZLES = require('/workspace/descubre-tu-elo/puzzles.js');
const FILE = 'file:///workspace/descubre-tu-elo/index.html';
const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

const userMoves = (p) => {          // [{from,to}] de las jugadas que hace el usuario
  const g = new Chess(p.fen), out = [];
  p.solution.forEach((san, i) => {
    const m = g.move(san);
    if (i % 2 === 0) out.push({ from: m.from, to: m.to });
  });
  return out;
};

(async () => {
  const b = await chromium.launch({ executablePath: CHROME });
  const ctx = await b.newContext({ viewport:{width:400,height:850}, deviceScaleFactor:2, locale:'es-ES',
    permissions:['clipboard-read','clipboard-write'], hasTouch:true, isMobile:true });
  const p = await ctx.newPage();
  const ext = [], errs = [];
  p.on('request', r => { if (!/^(file|data|blob):/.test(r.url())) ext.push(r.url()); });
  p.on('pageerror', e => errs.push(e.message));
  const ok = (n, c) => { console.log(`${c ? '\u2713' : '\u2717'} ${n}`); if (!c) process.exitCode = 1; };

  await p.goto(FILE); await p.waitForTimeout(700);

  // ── idioma
  ok('portada muestra los dos niveles', await p.getByText(/Manuela Hernández · 2020/).isVisible()
      && await p.getByText(/José Gabriel Cardoso · 2518/).isVisible());
  await p.getByRole('button', { name: 'EN', exact: true }).click(); await p.waitForTimeout(200);
  ok('cambia a inglés', await p.getByText('Choose your level').isVisible());
  await p.getByRole('button', { name: 'ES', exact: true }).click(); await p.waitForTimeout(200);
  ok('vuelve a español', await p.getByText('Elige tu nivel').isVisible());

  // ── nivel WFM
  await p.getByRole('button', { name: /Nivel WFM/ }).click(); await p.waitForTimeout(400);
  const total = PUZZLES.filter(x => x.level === 'wfm').length;
  ok(`arranca el nivel WFM (${total} ejercicios)`, await p.getByText(`Problema 1 de ${total}`).isVisible());

  // ── jugada ilegal y jugada equivocada en el 1er puzzle
  const rating1 = Number((await p.locator('#reto span.text-gold.font-bold').first().innerText()).match(/(\d+)$/)[1]);
  const pz1 = PUZZLES.find(x => x.level === 'wfm' && x.rating === rating1);
  const g1 = new Chess(pz1.fen);
  const mine = userMoves(pz1)[0];
  const badLegal = g1.moves({ verbose: true }).find(m => !(m.from === mine.from && m.to === mine.to));
  await p.click(`[data-square="${badLegal.from}"]`); await p.click(`[data-square="${badLegal.to}"]`);
  await p.waitForTimeout(250);
  ok('avisa cuando la jugada es legal pero no es la buena', await p.getByText('Esa no es. Prueba otra vez.').isVisible());

  // ── resolver todos los puzzles del nivel
  for (let i = 0; i < total; i++) {
    const rt = Number((await p.locator('#reto span.text-gold.font-bold').first().innerText()).match(/(\d+)$/)[1]);
    const pz = PUZZLES.find(x => x.level === 'wfm' && x.rating === rt);
    for (const mv of userMoves(pz)) {
      await p.click(`[data-square="${mv.from}"]`);
      await p.click(`[data-square="${mv.to}"]`);
      await p.waitForTimeout(800);           // deja responder al rival
    }
    const solved = await p.getByText(/¡Resuelto/).isVisible();
    ok(`  puzzle ${i + 1} (${pz.theme.es}, ${rt}) resuelto en el tablero`, solved);
    await p.getByRole('button', { name: /Siguiente problema|Ver mi ELO/ }).click();
    await p.waitForTimeout(400);
  }

  // ── resultado
  // Se busca por `data-elo`, no por clases de estilo: las clases cambian cada vez
  // que se retoca el diseño y dejan el test roto sin que nadie se entere.
  const elo = Number(await p.locator('p[data-elo]').innerText());
  ok(`resultado con ELO calculado (${elo})`, elo > 0);
  ok('resolvió todos', /5 \/ 5|4 \/ 4/.test(await p.getByText(/Resueltos:/).innerText()));
  await p.screenshot({ path: 'v2-resultado.png' });

  // Hay varios botones de compartir en la página (uno por mate famoso, más el del
  // pie): hay que nombrar el del resultado, no un «Compartir» a secas.
  await p.getByRole('button', { name: /Compartir mi resultado/ }).click();
  await p.waitForTimeout(400);
  const clip = await p.evaluate(() => navigator.clipboard.readText());
  ok('el botón copia el texto de Instagram', clip.includes('@wfm_manuchess') && clip.includes('@gmcardosolab'));
  console.log('\n--- PORTAPAPELES ---\n' + clip + '\n');

  // ── nivel GM + arrastre
  await p.getByRole('button', { name: /Cambiar de nivel/ }).click(); await p.waitForTimeout(300);
  await p.getByRole('button', { name: /Nivel GM/ }).click(); await p.waitForTimeout(400);
  const rtg = Number((await p.locator('#reto span.text-gold.font-bold').first().innerText()).match(/(\d+)$/)[1]);
  const pzg = PUZZLES.find(x => x.level === 'gm' && x.rating === rtg);
  const m0 = userMoves(pzg)[0];
  const bx = await p.locator(`[data-square="${m0.from}"]`).boundingBox();
  const tx = await p.locator(`[data-square="${m0.to}"]`).boundingBox();
  await p.mouse.move(bx.x + bx.width/2, bx.y + bx.height/2);
  await p.mouse.down();
  await p.mouse.move(tx.x + tx.width/2, tx.y + tx.height/2, { steps: 12 });
  await p.mouse.up();
  await p.waitForTimeout(800);
  ok(`arrastrando la pieza también funciona (GM ${rtg})`, !(await p.getByText('Esa no es. Prueba otra vez.').isVisible()));
  await p.screenshot({ path: 'v2-gm.png' });

  console.log('\nPETICIONES EXTERNAS:', ext.length ? ext : 'ninguna (100% autónomo)');
  console.log('ERRORES JS:', errs.length ? errs : 'ninguno');
  await b.close();
})();
