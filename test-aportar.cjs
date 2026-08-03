/* Pruebas de navegador de aportar.html (el formulario sin código).
   Uso / Usage:   node test-aportar.cjs      (necesita Playwright)          */

const { chromium } = require('playwright');
const FILE = 'file:///workspace/descubre-tu-elo/aportar.html';
const CHROME = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';

let fails = 0;
function ok(msg, cond) { console.log((cond ? '✓ ' : '✗ FALLO ') + msg); if (!cond) fails++; }

(async () => {
  const b = await chromium.launch({ executablePath: CHROME });
  const ctx = await b.newContext({
    viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, locale: 'es-ES',
    permissions: ['clipboard-read', 'clipboard-write'],
  });
  const p = await ctx.newPage();
  const errores = [];
  p.on('pageerror', (e) => errores.push(e.message));
  const externas = [];
  p.on('request', (r) => { if (!r.url().startsWith('file://')) externas.push(r.url()); });

  await p.goto(FILE);
  await p.waitForTimeout(300);

  // 1. Enviar vacío: debe fallar con un mensaje, no romperse.
  await p.click('#armar');
  await p.waitForTimeout(200);
  ok('formulario vacío muestra error en vez de romperse', await p.locator('#error.on').isVisible());
  await p.screenshot({ path: 'v2-aportar-error.png' });

  // 2. Rellenar bien, "no es partida real".
  await p.click('label:has-text("WFM") span.opt');
  await p.fill('#fen', '6k1/1b3ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1');
  await p.fill('#solucion', 'Rd8#');
  await p.fill('#tema', 'Mate del pasillo');
  await p.fill('#explicacion', 'La torre entra en la última fila y el rey está encerrado por sus propios peones.');
  await p.click('#armar');
  await p.waitForTimeout(300);
  ok('con los datos completos, aparece el resultado', await p.locator('#resultado.on').isVisible());

  const previa = await p.locator('#previa').inputValue();
  ok('la vista previa incluye la posición', previa.includes('3R2K1'));
  ok('la vista previa incluye la jugada', previa.includes('Rd8#'));
  ok('la vista previa dice "No, es un ejemplo" al no marcar partida real', previa.includes('No, es un ejemplo'));
  ok('por defecto dice "Da jaque mate"', previa.includes('Consigue: Da jaque mate'));
  console.log('\n--- MENSAJE ARMADO ---\n' + previa + '\n');

  const href = await p.locator('#btnWhatsapp').getAttribute('href');
  ok('el enlace de WhatsApp lleva el texto codificado', href.includes('wa.me/?text=') && href.includes(encodeURIComponent('Rd8#')));
  ok('el enlace de WhatsApp NO lleva ningún número fijo', /wa\.me\/\d/.test(href) === false);

  await p.screenshot({ path: 'v2-aportar-resultado.png' });

  // 3. Copiar y comprobar el portapapeles de verdad.
  await p.click('#btnCopiar');
  await p.waitForTimeout(300);
  const clip = await p.evaluate(() => navigator.clipboard.readText());
  ok('el botón Copiar deja el mismo texto en el portapapeles', clip === previa);

  // 4. Probar la rama "sí es partida real": el campo de origen debe hacerse obligatorio.
  await p.reload();
  await p.waitForTimeout(300);
  await p.click('label:has-text("GM") span.opt');
  await p.fill('#fen', '6k1/1b3ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1');
  await p.fill('#solucion', 'Rd8#');
  await p.fill('#tema', 'Mate del pasillo');
  await p.fill('#explicacion', 'Explicación de prueba.');
  await p.click('label:has-text("Sí, la jugué yo") span.opt');
  await p.waitForTimeout(150);
  ok('al marcar "partida real" aparece el campo de origen', await p.locator('#datosPartida.on').isVisible());
  await p.click('#armar');
  await p.waitForTimeout(200);
  ok('sin el dato de la partida, avisa en vez de dejar pasar un hueco vacío', await p.locator('#error.on').isVisible());

  await p.fill('#origen', 'vs Prueba Ejemplo, Torneo Test, 2026');
  await p.click('#armar');
  await p.waitForTimeout(300);
  const previa2 = await p.locator('#previa').inputValue();
  ok('con el origen relleno, sí arma el mensaje y cita la partida', previa2.includes('Sí — vs Prueba Ejemplo'));
  ok('esta vez es "De: José Gabriel (GM)"', previa2.includes('José Gabriel (GM)'));

  // 5. FEN mal escrito: debe avisar sin romper nada.
  await p.reload();
  await p.waitForTimeout(300);
  await p.click('label:has-text("WFM") span.opt');
  await p.fill('#fen', 'esto-no-es-un-fen');
  await p.fill('#solucion', 'Rd8#');
  await p.fill('#tema', 'x');
  await p.fill('#explicacion', 'x');
  await p.click('#armar');
  await p.waitForTimeout(200);
  ok('un FEN mal escrito se detecta antes de armar el mensaje', await p.locator('#error.on').isVisible());

  // 6. El caso de tablas: se elige del desplegable y sale en el mensaje.
  await p.reload();
  await p.waitForTimeout(300);
  await p.click('label:has-text("GM") span.opt');
  await p.fill('#fen', 'R7/6k1/P7/8/8/5K2/8/r7 b - - 0 2');
  await p.fill('#solucion', 'Ra5');
  await p.selectOption('#objetivo', 'draw');
  await p.fill('#tema', 'Defensa de torre y peón');
  await p.fill('#explicacion', 'La torre se queda en la columna del peón.');
  await p.click('#armar');
  await p.waitForTimeout(300);
  const previa3 = await p.locator('#previa').inputValue();
  ok('el desplegable de tablas sale en el mensaje', previa3.includes('Consigue: Salva tablas (defensa)'));

  ok('cero peticiones externas', externas.length === 0);
  ok('cero errores de JavaScript', errores.length === 0);
  if (externas.length) console.log('externas:', externas);
  if (errores.length) console.log('errores JS:', errores);

  await b.close();
  console.log('\n' + (fails === 0 ? 'TODO BIEN' : fails + ' FALLO(S)'));
  process.exit(fails === 0 ? 0 : 1);
})();
