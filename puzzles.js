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
    theme: { es: 'Legado de Philidor', en: "Philidor's legacy" },
    explain: {
      es: 'Mate ahogado. El rey no puede comer en g8 porque el caballo de h6 defiende esa casilla, así que la torre está obligada a taparse ella misma la salida.',
      en: 'Smothered mate. The king cannot take on g8 because the h6 knight guards it, so the rook is forced to block its own escape square.',
    },
  },

  {
    level: 'gm',
    rating: 2300,
    fen: 'r4rk1/pp3ppp/8/3N4/8/R2Q4/PP4PP/6K1 w - - 0 1',
    solution: ['Ne7+', 'Kh8', 'Qxh7+', 'Kxh7', 'Rh3#'],
    theme: { es: 'Mate de Anastasia', en: 'Anastasia’s mate' },
    explain: {
      es: 'El caballo se instala en e7 y quita g8 y g6 al rey. Entonces la dama se entrega en h7 para abrir la columna y la torre remata desde h3.',
      en: 'The knight settles on e7 and takes g8 and g6 from the king. Then the queen is sacrificed on h7 to open the file, and the rook finishes from h3.',
    },
  },

  {
    level: 'gm',
    rating: 2400,
    fen: '2kr3r/pp3ppp/2n5/8/Q4B2/3B4/PPP2PPP/2KR3R w - - 0 1',
    solution: ['Qxc6+', 'bxc6', 'Ba6#'],
    theme: { es: 'Mate de Boden', en: 'Boden’s mate' },
    explain: {
      es: 'Se sacrifica la dama justo para obligar al peón de b7 a moverse. Con esa casilla libre, los dos alfiles se cruzan sobre el rey y no hay escapatoria.',
      en: 'The queen is sacrificed precisely to force the b7 pawn to move. With that square vacated, the two bishops criss-cross the king and there is no way out.',
    },
  },

];

/* No tocar: hace que los puzzles estén disponibles para la app.
   Do not edit: makes the puzzles available to the app. */
if (typeof window !== 'undefined') window.PUZZLES = PUZZLES;
if (typeof module !== 'undefined') module.exports = PUZZLES;
