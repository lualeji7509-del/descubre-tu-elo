/* ==========================================================================
   PUZZLES — ESTA ES LA ÚNICA PARTE QUE HAY QUE TOCAR PARA AÑADIR EJERCICIOS
   PUZZLES — THIS IS THE ONLY PART YOU NEED TO EDIT TO ADD EXERCISES
   ==========================================================================

   Para añadir un puzzle, copia un bloque entero y cambia los valores.
   To add a puzzle, copy a whole block and change the values.

   ── CAMPOS / FIELDS ──────────────────────────────────────────────────────

   level    'wfm' = Nivel WFM (Manuela, 2020)  ·  'gm' = Nivel GM (José Gabriel, 2518)

   rating   Dificultad en ELO. Se usa para calcular el ELO del jugador.
            Difficulty in ELO. Used to compute the player's estimated ELO.

   fen      La posición, en notación FEN.
            The position, in FEN notation.
            ¿Cómo sacarla? / How to get it?
              1. Ve a lichess.org/editor  ·  Go to lichess.org/editor
              2. Coloca las piezas arrastrándolas  ·  Drag the pieces into place
              3. Elige de quién es el turno  ·  Choose whose turn it is
              4. Copia el texto FEN de abajo  ·  Copy the FEN text below

   solution Las jugadas, en notación algebraica (la de toda la vida: Cf3, Dxh7+, Txe8#).
            The moves, in algebraic notation — ENGLISH letters (Nf3, Qxh7+, Rxe8#).
            OJO: aquí se escriben SIEMPRE en inglés (K Q R B N), porque es lo
            que entiende el motor. La app las traduce sola al mostrarlas.
            NOTE: always written in English here; the app translates them for display.

            Se alternan: la 1ª la juega el usuario, la 2ª la responde el rival,
            la 3ª el usuario, y así. Puede tener una sola jugada.
            They alternate: 1st = user, 2nd = opponent's reply, 3rd = user, etc.
            A single move is fine.

   source   OPCIONAL. Si la posición viene de una partida real, ponla aquí:
            { es: 'Blancas – Negras · Ciudad, año', en: '...' }
            Si no la pones, la web avisa de que es una posición de ejemplo.
            OPTIONAL. If the position comes from a real game, name it here.

   outcome  Qué consigue la solución. / What the solution achieves.
              'mate'  → termina en jaque mate. El motor lo comprueba de verdad:
                        si la última jugada no lleva '#' y sí es mate (o al
                        revés), verify.mjs lo rechaza. Comprobación 100% segura.
                        Ends in checkmate. The engine checks this for real: if
                        the last move is missing '#' but is mate (or the other
                        way round), verify.mjs rejects it. 100% reliable check.
              'win'   → gana material o la partida, sin llegar a mate.
                        Wins material or the game, without reaching mate.
              'draw'  → salva tablas (defensa). OJO: esto NO se puede comprobar
                        con el motor —hacerlo de verdad necesitaría una tabla
                        de finales, y no hay acceso a una—, así que se confía
                        en quien manda el puzzle. Se avisa igual al pasar
                        verify.mjs, para que quede claro que es la única parte
                        sin comprobación automática.
                        Saves a draw (defensive). NOTE: this CANNOT be checked
                        by the engine —that needs a real endgame tablebase,
                        which isn't reachable here— so it relies on whoever
                        submitted the puzzle. verify.mjs prints a notice about
                        it either way, so it's clear this is the one part with
                        no automatic check.

   theme    Nombre corto del tema. / Short theme name.
   explain  La explicación que se muestra al acertar. / Explanation shown on success.

            theme y explain llevan las dos versiones: { es: '...', en: '...' }
            theme and explain both carry two versions: { es: '...', en: '...' }

   ── AL GUARDAR NO HAY QUE HACER NADA MÁS / NOTHING ELSE TO DO ───────────
   Al guardar los cambios, un motor de ajedrez revisa TODOS los puzzles y,
   sólo si están bien, la web se publica sola en un par de minutos. Si algo
   está mal, la web se queda como estaba y te llega un aviso. No se puede
   romper nada. Guía completa: GUIA.md
   On save, a chess engine checks EVERY puzzle and only then publishes the
   site, in a couple of minutes. If something is wrong the site is left
   untouched and you get a notice. Nothing can break. See GUIA.md
   ========================================================================== */

const PUZZLES = [

  /* ─────────────────────────  NIVEL WFM · 2020  ─────────────────────────
     Táctica accesible y entrenamiento de club.
     Accessible tactics and club-level training.                          */

  {
    level: 'wfm',
    rating: 1000,
    fen: '6k1/1b3ppp/8/8/8/8/5PPP/3R2K1 w - - 0 1',
    solution: ['Rd8#'],
    outcome: 'mate',
    theme: { es: 'Mate del pasillo', en: 'Back-rank mate' },
    explain: {
      es: 'La torre entra en la última fila y el rey está encerrado por sus propios peones f7, g7 y h7. El alfil de b7 no llega a defender d8.',
      en: 'The rook lands on the back rank and the king is trapped behind its own pawns on f7, g7 and h7. The b7 bishop cannot cover d8.',
    },
  },

  {
    level: 'wfm',
    rating: 1150,
    fen: 'r6k/6p1/5N2/8/8/8/6K1/3R4 w - - 0 1',
    solution: ['Rh1#'],
    outcome: 'mate',
    theme: { es: 'Mate árabe', en: 'Arabian mate' },
    explain: {
      es: 'Torre y caballo se coordinan: la torre da jaque por la columna h y el caballo de f6 tapa g8 y h7. El peón de g7 hace el resto.',
      en: 'Rook and knight work together: the rook checks down the h-file while the f6 knight covers g8 and h7. The g7 pawn does the rest.',
    },
  },

  {
    level: 'wfm',
    rating: 1300,
    fen: '1r1q3k/p5pp/8/4N3/8/8/5PPP/6K1 w - - 0 1',
    solution: ['Nf7+', 'Kg8', 'Nxd8'],
    outcome: 'win',
    theme: { es: 'Tenedor de caballo', en: 'Knight fork' },
    explain: {
      es: 'El caballo ataca al rey y a la dama a la vez. Nadie defiende f7, así que el rey tiene que moverse y la dama cae.',
      en: 'The knight attacks king and queen at once. Nothing defends f7, so the king must move and the queen drops.',
    },
  },

  {
    level: 'wfm',
    rating: 1450,
    fen: 'r5k1/6pp/8/8/8/8/5PPP/3Q2K1 w - - 0 1',
    solution: ['Qd5+', 'Kh8', 'Qxa8#'],
    outcome: 'mate',
    theme: { es: 'Doble ataque de dama', en: 'Queen double attack' },
    explain: {
      es: 'Con jaque, la dama se coloca en la diagonal larga y ataca la torre de a8 al mismo tiempo. El rey se esconde en h8 y la dama come la torre… que además resulta ser mate, porque sus propios peones le tapan la salida.',
      en: 'With check, the queen takes the long diagonal and hits the a8 rook at the same time. The king hides on h8 and the queen grabs the rook — which turns out to be mate, since Black’s own pawns seal the escape.',
    },
  },

  {
    level: 'wfm',
    rating: 1600,
    fen: '7k/3q1p1p/8/4N3/8/8/1B4PP/6K1 w - - 0 1',
    solution: ['Nxd7+'],
    outcome: 'win',
    theme: { es: 'Jaque a la descubierta', en: 'Discovered check' },
    explain: {
      es: 'Al mover el caballo se destapa el alfil de b2 sobre el rey. Como es jaque, las negras no tienen tiempo de recuperar la dama.',
      en: 'Moving the knight unveils the b2 bishop against the king. Because it comes with check, Black has no time to win the queen back.',
    },
  },

  /* ─────────────────────────  NIVEL GM · 2518  ──────────────────────────
     Combinaciones forzadas y cálculo de alto rendimiento.
     Forced combinations and high-performance calculation.                */

  {
    level: 'gm',
    rating: 2050,
    fen: 'r3q1k1/5ppp/8/8/Q7/8/5PPP/4R1K1 w - - 0 1',
    solution: ['Qxe8+', 'Rxe8', 'Rxe8#'],
    outcome: 'mate',
    theme: { es: 'Desviación', en: 'Deflection' },
    explain: {
      es: 'La dama de e8 es lo único que sujeta la última fila. Se entrega la dama para arrastrar a la torre hasta e8 y el mate llega solo.',
      en: 'The e8 queen is the only thing holding the back rank. Give up the queen to drag the rook onto e8, and the mate plays itself.',
    },
  },

  {
    level: 'gm',
    rating: 2200,
    fen: '5r1k/pp4pp/7N/8/8/1Q6/5PPP/6K1 w - - 0 1',
    solution: ['Qg8+', 'Rxg8', 'Nf7#'],
    outcome: 'mate',
    theme: { es: 'Legado de Philidor', en: "Philidor's legacy" },
    explain: {
      es: 'Mate ahogado. El rey no puede comer en g8 porque el caballo de h6 defiende esa casilla, así que la torre está obligada a taparse ella misma la salida.',
      en: 'Smothered mate. The king cannot take on g8 because the h6 knight guards it, so the rook is forced to block its own escape square.',
    },
  },

  {
    level: 'gm',
    rating: 2300,
    /* Partida real: R. Lemon – M. Plum, Open de EEUU, St. Paul 1982,
       tras 21.Cxc4. Juegan NEGRAS. */
    fen: '1k1r3r/1pp2p2/p2p2p1/3P2p1/2N2n2/2P5/PP3PPP/3R1RK1 b - - 0 21',
    solution: ['Ne2+', 'Kh1', 'Rxh2+', 'Kxh2', 'Rh8#'],
    outcome: 'mate',
    source: { es: 'Lemon – Plum · St. Paul, 1982', en: 'Lemon – Plum · St. Paul, 1982' },
    theme: { es: 'Mate de Anastasia', en: 'Anastasia’s mate' },
    explain: {
      es: 'El caballo salta a e2 y le quita al rey las casillas g1 y g3. Entonces se entrega la torre en h2 para abrir la columna, y la otra torre remata desde h8. Ocurrió en una partida de verdad, en 1982.',
      en: 'The knight jumps to e2 and takes g1 and g3 from the king. Then a rook is given up on h2 to open the file, and the other rook finishes from h8. It happened in a real game, in 1982.',
    },
  },

  {
    level: 'gm',
    rating: 2400,
    /* Partida real: R. Schulder – S. Boden, Londres 1853, tras 14.Axd5.
       Juegan NEGRAS. Es la partida que dio nombre al mate. */
    fen: '2k1rb1r/ppp3pp/2n2q2/3B1b2/5P2/2P1BQ2/PP1N1P1P/2KR3R b - - 0 14',
    solution: ['Qxc3+', 'bxc3', 'Ba3#'],
    outcome: 'mate',
    source: { es: 'Schulder – Boden · Londres, 1853', en: 'Schulder – Boden · London, 1853' },
    theme: { es: 'Mate de Boden', en: 'Boden’s mate' },
    explain: {
      es: 'Se sacrifica la dama justo para obligar al peón de b2 a moverse. Con la diagonal abierta, los dos alfiles se cruzan sobre el rey blanco y no hay escapatoria. Boden remató así de verdad, en Londres en 1853.',
      en: 'The queen is sacrificed precisely to force the b2 pawn to move. With the diagonal open, the two bishops criss-cross the white king and there is no way out. Boden really finished this way, in London in 1853.',
    },
  },

  {
    level: 'gm',
    rating: 2300,
    fen: 'R7/6k1/P7/8/8/5K2/8/r7 b - - 0 2',
    solution: ['Ra5'],
    outcome: 'draw',
    theme: { es: 'Defensa de torre y peón', en: 'Rook-and-pawn defense' },
    explain: {
      es: 'El peón de a6 está muy avanzado, pero el rey blanco sigue lejos. Manteniendo la torre en la propia columna del peón, las negras se guardan un jaque para cuando intente coronar y no dejan que el rey blanco se acerque tranquilo. Aportado por José Gabriel Cardoso como ejercicio de defensa: a diferencia de los mates de esta página, una posición de tablas no se puede comprobar con un motor normal —haría falta una tabla de finales, y no hay una a mano—, así que aquí se confía en el criterio del GM.',
      en: 'The a6 pawn is far advanced, but the white king is still a long way off. By keeping the rook on the pawn’s own file, Black keeps a check in reserve for when it tries to queen, and stops the white king from strolling in unopposed. Submitted by José Gabriel Cardoso as a defensive exercise: unlike the mates on this page, a drawn position can’t be checked by an ordinary engine —it would take an endgame tablebase, and none is reachable here— so this one relies on the GM’s own judgement.',
    },
  },

];

/* No tocar: hace que los puzzles estén disponibles para la app.
   Do not edit: makes the puzzles available to the app. */
if (typeof window !== 'undefined') window.PUZZLES = PUZZLES;
if (typeof module !== 'undefined') module.exports = PUZZLES;
