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
  theme: { extend: { colors: {
    board: { light: '#e9d7b7', dark: '#8a6a4a' },
    ink: '#0b1220', panel: '#16233a', gold: '#e2b23c',
  } } },
};`);
execFileSync(at('node_modules/.bin/tailwindcss'),
  ['-c', join(tmp, 'cfg.js'), '-i', join(tmp, 'in.css'), '-o', join(tmp, 'out.css'), '--minify'],
  { stdio: 'pipe' });

/* 4 · estilos propios */
const css = `
html { -webkit-tap-highlight-color: transparent; }
body {
  background: radial-gradient(1200px 800px at 50% -10%, #1d3157 0%, #0b1220 60%);
  color: #f1f5f9; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale;
  overflow-x: hidden;
}
.display { font-family: 'Iowan Old Style','Palatino Linotype',Palatino,Georgia,serif; letter-spacing: -.015em; }
.piece { line-height: 1; user-select: none; pointer-events: none; }
.piece-w { color: #fdfdfd; text-shadow: 0 0 1px #000, 0 1px 2px rgba(0,0,0,.55), 0 0 3px rgba(0,0,0,.9); }
.piece-b { color: #17202e; text-shadow: 0 0 1px rgba(255,255,255,.35), 0 1px 2px rgba(0,0,0,.35); }
button:focus-visible { outline: 3px solid #e2b23c; outline-offset: 2px; }
@keyframes shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-5px)} 75%{transform:translateX(5px)} }
.animate-shake { animation: shake .25s ease-in-out; }
@media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation: none !important; transition: none !important; } }
`;

/* 5 · montaje final. puzzles.js va tal cual, arriba y editable. */
writeFileSync(at('index.html'), `<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>♞</text></svg>">
<title>Descubre tu ELO con los Maestros · Find your ELO with the Masters</title>
<style>${readFileSync(join(tmp, 'out.css'), 'utf8')}</style>
<style>${css}</style>
</head>
<body>
<div id="root"></div>
<script>
${readFileSync(at('puzzles.js'), 'utf8')}
</script>
<script>${readFileSync(at('node_modules/react/umd/react.production.min.js'), 'utf8')}</script>
<script>${readFileSync(at('node_modules/react-dom/umd/react-dom.production.min.js'), 'utf8')}</script>
<script>${chessOut.outputFiles[0].text}</script>
<script>${appOut.outputFiles[0].text}</script>
</body>
</html>`);

console.log('index.html listo:', Math.round(readFileSync(at('index.html'), 'utf8').length / 1024) + ' KB');
