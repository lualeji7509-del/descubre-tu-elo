/* Comprueba que todos los puzzles son correctos.  ·  Checks every puzzle is sound.
   Uso / Usage:   node elo-maestros/verify.mjs                                     */

import { Chess } from 'chess.js';
import { createRequire } from 'node:module';

const PUZZLES = createRequire(import.meta.url)('./puzzles.js');

let fallos = 0;
const aviso = (i, msg) => { fallos++; console.log(`  ✗ #${i + 1}  ${msg}`); };

PUZZLES.forEach((p, i) => {
  const etiqueta = `[${p.level.toUpperCase()} ${p.rating}] ${p.theme.es}`;
  let c;
  try {
    c = new Chess(p.fen);
  } catch (e) {
    return aviso(i, `FEN inválido: ${e.message}`);
  }

  // El bando que arranca debe ser el que resuelve.
  const turnoInicial = c.turn();

  // 1. Todas las jugadas de la solución deben ser legales, en orden.
  for (const [n, san] of p.solution.entries()) {
    let m;
    try {
      m = c.move(san);
    } catch (e) {
      m = null;
    }
    if (!m) {
      const legales = new Chess(c.fen()).moves().join(' ');
      return aviso(i, `${etiqueta} — jugada ${n + 1} "${san}" es ILEGAL.\n       legales: ${legales}`);
    }
  }

  // 2. Si la última jugada dice mate (#), debe ser mate de verdad.
  const ultima = p.solution[p.solution.length - 1];
  if (ultima.includes('#') && !c.isCheckmate()) {
    aviso(i, `${etiqueta} — "${ultima}" lleva # pero NO es mate.`);
  }
  if (!ultima.includes('#') && c.isCheckmate()) {
    aviso(i, `${etiqueta} — es mate pero "${ultima}" no lleva #.`);
  }

  // 3. Las respuestas del rival (posiciones pares) deberían ser forzadas o casi.
  //    Avisamos si el rival tenía muchas alternativas: el puzzle sería ambiguo.
  const c2 = new Chess(p.fen);
  p.solution.forEach((san, n) => {
    if (n % 2 === 1) {
      const alternativas = c2.moves().length;
      if (alternativas > 3) {
        console.log(`  ! #${i + 1}  ${etiqueta} — la respuesta ${n + 1} del rival tiene ${alternativas} alternativas (poco forzada).`);
      }
    }
    c2.move(san);
  });

  // 4. Si la solución es un mate forzado, ninguna OTRA primera jugada
  //    debería dar mate igual de rápido: si no, hay varias soluciones.
  if (ultima.includes('#')) {
    const jugadasUsuario = Math.ceil(p.solution.length / 2);
    const base = new Chess(p.fen);
    const rivales = base.moves().filter((m) => m !== p.solution[0]);
    const otras = rivales.filter((m) => {
      const t = new Chess(p.fen);
      t.move(m);
      return jugadasUsuario === 1 ? t.isCheckmate() : mateEn(t, jugadasUsuario - 1, turnoInicial);
    });
    if (otras.length) {
      aviso(i, `${etiqueta} — la solución NO es única, también mata: ${otras.join(' ')}`);
    }
  }

  console.log(`  ✓ #${i + 1}  ${etiqueta} — ${p.solution.join(' ')}`);
});

/* ¿El bando 'lado' da mate en n jugadas suyas desde esta posición? (búsqueda exacta) */
function mateEn(pos, n, lado) {
  if (pos.isCheckmate()) return pos.turn() !== lado;
  if (n <= 0) return false;
  if (pos.turn() === lado) {
    return pos.moves().some((m) => {
      const t = new Chess(pos.fen());
      t.move(m);
      return mateEn(t, n, lado);
    });
  }
  const respuestas = pos.moves();
  if (!respuestas.length) return false; // ahogado, no es mate
  return respuestas.every((m) => {
    const t = new Chess(pos.fen());
    t.move(m);
    return mateEn(t, n - 1, lado);
  });
}

console.log(fallos ? `\n${fallos} problema(s) encontrados.` : `\nTodo correcto: ${PUZZLES.length} puzzles verificados.`);
process.exit(fallos ? 1 : 0);
