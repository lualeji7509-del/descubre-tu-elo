/* Regenera index.html: un solo archivo, sin internet.
   Rebuilds index.html: one file, no internet needed.

   Uso / Usage:   npm install   (una sola vez / once)
                  npm run build                                              */

import { build } from 'esbuild';
import { readFileSync, writeFileSync, mkdtempSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { tmpdir } from 'node:os';

const ROOT = dirname(fileURLToPath(import.meta.url));
const at = (...p) => join(ROOT, ...p);

/* 1 · chess.js empaquetado como variable global ChessLib */
const chessOut = await build({
  stdin: { contents: `export { Chess } from 'chess.js';`, resolveDir: ROOT, loader: 'js' },
  bundle: true, format: 'iife', globalName: 'ChessLib', minify: true, write: false, target: 'es2019',
});

/* 2 · la app (el JSX se convierte; React llega por variable global) */
const appOut = await build({
  entryPoints: [at('src/app.jsx')],
  bundle: true, format: 'iife', minify: true, write: false, target: 'es2019',
  loader: { '.jsx': 'jsx' },
});

/* 3 · Tailwind, generado a partir de las clases que se usan de verdad */
const tmp = mkdtempSync(join(tmpdir(), 'tw-'));
writeFileSync(join(tmp, 'in.css'), '@tailwind base;@tailwind components;@tailwind utilities;');
writeFileSync(join(tmp, 'cfg.js'), `module.exports = {
  content: ['${at('src/app.jsx')}'],
  theme: { extend: {
    colors: {
      board: { light: '#e9dcc0', dark: '#8a6a4a' },
      ink: '#08090c',          /* fondo, casi negro */
      panel: '#12141a',        /* superficies */
      line: '#23262f',         /* separadores */
      ivory: '#efe9dc',        /* texto principal */
      gold: '#d9a441',         /* latón, el acento */
      ember: '#e4572e',        /* rojo torneo, muy puntual */
    },
    fontFamily: {
      display: ["'Iowan Old Style'", "'Palatino Linotype'", 'Palatino', 'Georgia', 'serif'],
    },
  } },
};`);
execFileSync(at('node_modules/.bin/tailwindcss'),
  ['-c', join(tmp, 'cfg.js'), '-i', join(tmp, 'in.css'), '-o', join(tmp, 'out.css'), '--minify'],
  { stdio: 'pipe' });

/* 4 · estilos propios */
const css = `
html { -webkit-tap-highlight-color: transparent; scroll-behavior: smooth; }
body {
  background: #08090c;
  color: #efe9dc;
  -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}

/* Retícula 8x8 de fondo: el tablero como motivo, no como adorno. */
.checker-bg::before {
  content: ''; position: fixed; inset: 0; z-index: -1; pointer-events: none;
  background-image:
    linear-gradient(45deg, rgba(217,164,65,.030) 25%, transparent 25%, transparent 75%, rgba(217,164,65,.030) 75%),
    linear-gradient(45deg, rgba(217,164,65,.030) 25%, transparent 25%, transparent 75%, rgba(217,164,65,.030) 75%);
  background-size: 128px 128px;
  background-position: 0 0, 64px 64px;
  mask-image: radial-gradient(120% 80% at 50% 0%, #000 0%, transparent 70%);
  -webkit-mask-image: radial-gradient(120% 80% at 50% 0%, #000 0%, transparent 70%);
}

/* Tipografía: escala fluida y contraste grande entre titular y texto. */
.display { font-family: 'Iowan Old Style','Palatino Linotype',Palatino,Georgia,serif; }
.t-hero   { font-size: clamp(2.9rem, 13vw, 6.5rem); line-height: .92; letter-spacing: -.03em; }
.t-huge   { font-size: clamp(3.6rem, 18vw, 7rem);  line-height: .88; letter-spacing: -.04em; }
.t-sec    { font-size: clamp(1.7rem, 6vw, 2.6rem); line-height: 1.05; letter-spacing: -.02em; }
.t-label  { font-size: .66rem; letter-spacing: .32em; text-transform: uppercase; font-weight: 700; }
.balance  { text-wrap: balance; }

/* Filete decorativo con las casillas del tablero. */
.rule-checker {
  height: 6px;
  background-image: linear-gradient(90deg, #d9a441 50%, transparent 50%);
  background-size: 12px 6px;
  opacity: .5;
}

/* Aparición al hacer scroll. */
.reveal { opacity: 0; transform: translateY(22px); transition: opacity .7s ease, transform .7s cubic-bezier(.2,.7,.3,1); }
.reveal.on { opacity: 1; transform: none; }

.piece { line-height: 1; user-select: none; pointer-events: none; }
button:focus-visible, a:focus-visible { outline: 3px solid #d9a441; outline-offset: 3px; }

@keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-5px)} 75%{transform:translateX(5px)} }
.animate-shake { animation: shake .25s ease-in-out; }
@keyframes pulseGold { 0%,100%{opacity:.35} 50%{opacity:.9} }
.pulse-gold { animation: pulseGold 2.4s ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  *, *::before, *::after { animation: none !important; transition: none !important; }
  .reveal { opacity: 1; transform: none; }
}
`;

/* 4b · piezas de ajedrez (juego Cburnett, el de Lichess).
       Se incrusta el sprite entero una vez y cada casilla lo referencia
       con <use href="#wk">. La cabecera del archivo lleva la licencia. */
const PIEZAS = readFileSync(at('img/piezas-cburnett.svg'), 'utf8')
  .replace(/<\?xml[^>]*\?>/, '')
  .replace('<svg ', '<svg aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden" ');

/* 4c · fotos incrustadas: la página sigue sin pedir nada a la red */
const foto = (f) => 'data:image/jpeg;base64,' + readFileSync(at('img/' + f)).toString('base64');
const FOTOS = `window.FOTOS = {
  manuela: ${JSON.stringify(foto('manuela.jpg'))},
  cardoso: ${JSON.stringify(foto('cardoso.jpg'))},
  eiffel:  ${JSON.stringify(foto('eiffel.jpg'))}
};`;

/* 4d · vista previa al compartir el enlace.
       Cuando alguien pega la dirección en WhatsApp, Instagram o Telegram, esa
       aplicación lee estas etiquetas para dibujar la tarjeta con foto y titular.
       Sin ellas el enlace sale desnudo y casi nadie lo abre.

       La imagen va con dirección COMPLETA (https://…) a propósito: quien la
       descarga es el servidor de WhatsApp, no el móvil de quien recibe el enlace.
       Por eso no rompe la regla de «cero peticiones a internet»: el navegador del
       visitante sigue sin pedir nada.

       El `?v=` del final permite forzar el refresco. WhatsApp guarda la tarjeta
       durante días; si algún día se cambia og.png, se sube ese número. */
const WEB = 'https://lualeji7509-del.github.io/descubre-tu-elo/';
const OG_IMG = WEB + 'og.png?v=1';
const TITULO = 'Descubre tu ELO con los Maestros';
const DESC_ES =
  'Test de ajedrez con tablero jugable: mueve las piezas, resuelve 9 combinaciones ' +
  'y descubre tu ELO estimado. Con la WFM Manuela Hernández y el GM José Gabriel Cardoso.';
const DESC_EN =
  'Playable chess quiz: move the pieces, solve 9 combinations and find out your ' +
  'estimated ELO. With WFM Manuela Hernández and GM José Gabriel Cardoso.';

const META = `
<meta name="description" content="${DESC_ES} · ${DESC_EN}">
<link rel="canonical" href="${WEB}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${TITULO}">
<meta property="og:url" content="${WEB}">
<meta property="og:title" content="${TITULO}">
<meta property="og:description" content="${DESC_ES}">
<meta property="og:image" content="${OG_IMG}">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Descubre tu ELO con los Maestros — con la WFM Manuela Hernández y el GM José Gabriel Cardoso">
<meta property="og:locale" content="es_ES">
<meta property="og:locale:alternate" content="en_US">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${TITULO}">
<meta name="twitter:description" content="${DESC_ES}">
<meta name="twitter:image" content="${OG_IMG}">
<meta name="theme-color" content="#08090c">`;

/* 5 · montaje final. puzzles.js va tal cual, arriba y editable. */
writeFileSync(at('index.html'), `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>♞</text></svg>">
<title>Descubre tu ELO con los Maestros · Find your ELO with the Masters</title>${META}
<style>${readFileSync(join(tmp, 'out.css'), 'utf8')}</style>
<style>${css}</style>
</head>
<body>
${PIEZAS}
<div id="root"></div>
<script>
${readFileSync(at('puzzles.js'), 'utf8')}
</script>
<script>${FOTOS}</script>
<script>${readFileSync(at('node_modules/react/umd/react.production.min.js'), 'utf8')}</script>
<script>${readFileSync(at('node_modules/react-dom/umd/react-dom.production.min.js'), 'utf8')}</script>
<script>${chessOut.outputFiles[0].text}</script>
<script>${appOut.outputFiles[0].text}</script>
</body>
</html>`);

console.log('index.html listo:', Math.round(readFileSync(at('index.html'), 'utf8').length / 1024) + ' KB');
