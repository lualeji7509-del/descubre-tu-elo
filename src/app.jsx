/* Descubre tu ELO con los Maestros — lógica y secciones de la aplicación.
  Los puzzles NO están aquí: están en puzzles.js (o arriba del todo del index.html). */

const { useState, useMemo, useRef, useEffect, useCallback } = React;
const { Chess } = ChessLib;

/* Perfiles / profiles */
const IG_WFM = 'wfm_manuchess';
const IG_GM = 'gmcardosolab';
const FIDE_WFM = 'https://ratings.fide.com/profile/4483103';
const ANIO = new Date().getFullYear();

/* ══════════════════════════════ TEXTOS / STRINGS ══════════════════════════ */

const T = {
  es: {
    eyebrow: 'Reto de ajedrez',
    title1: 'Descubre tu ELO',
    title2: 'con los Maestros',
    tagline: 'Nueve posiciones. Un tablero de verdad. Y una cifra al final que te dirá dónde estás.',
    heroCta: 'Empezar el reto',
    heroMeta: 'Gratis · 3 minutos · sin registrarte',

    mastersTitle: 'Los maestros',
    mastersLead: 'Dos formas de medirte. Elige contra quién.',
    wfmRole: 'Maestra FIDE Femenina',
    gmRole: 'Gran Maestro Internacional',
    wfmBio:
      'Entrenadora de ajedrez online en español e inglés, y estudiante de Marketing. Compite en torneos por toda Europa.',
    gmBio:
      'Número 1 de Colombia. Estudiante de Marketing en UTRGV, Estados Unidos. Ajedrez y viajes a partes iguales.',
    seeProfile: 'Ver en Instagram',
    fideProfile: 'Ficha FIDE',

    quizTitle: 'El reto',
    pickLevel: 'Elige tu nivel',
    wfmName: 'Nivel WFM',
    wfmWho: 'Manuela Hernández · 2020',
    wfmDesc: 'Táctica accesible y entrenamiento de club.',
    gmName: 'Nivel GM',
    gmWho: 'José Gabriel Cardoso · 2518',
    gmDesc: 'Combinaciones forzadas y cálculo de alto rendimiento.',
    puzzles: 'ejercicios',
    ratingRange: 'Dificultad',
    problem: 'Problema',
    of: 'de',
    whiteToPlay: 'Juegan las blancas',
    blackToPlay: 'Juegan las negras',
    yourTurn: 'Tu turno: encuentra la mejor jugada.',
    keepGoing: '¡Bien! Sigue, la combinación no ha terminado.',
    wrong: 'Esa no es. Prueba otra vez.',
    illegal: 'Esa jugada no es legal.',
    solved: '¡Resuelto!',
    solvedClean: '¡Resuelto a la primera!',
    showSolution: 'Ver la solución',
    shown: 'Ésta era la solución',
    next: 'Siguiente problema',
    seeResult: 'Ver mi ELO',
    tapHint: 'Toca una pieza y luego su destino. También puedes arrastrarla.',

    yourElo: 'Tu ELO estimado',
    hits: 'Resueltos',
    firstTry: 'a la primera',
    share: 'Compartir mi resultado en Instagram',
    shareHint: 'Copiamos el texto etiquetando a los dos: pégalo en tu historia.',
    copied: '¡Texto copiado! Pégalo en tu historia de Instagram',
    retry: 'Volver a intentarlo',
    changeLevel: 'Cambiar de nivel',

    navHistory: 'Historia',
    showMove: 'Ver el patrón',
    hideMove: 'Ocultar',
    spoiler: 'Ojo: enseña la solución.',
    noEsLaPartida:
      'Posición de ejemplo, construida para que el patrón se vea claro. No es la partida histórica.',
    navClasses: 'Clases',
    navLive: 'En directo',
    ctaBook: 'Agenda tu clase',

    classesTitle: 'Clases y academia',
    classesLead:
      'Manuela imparte clases de ajedrez online en español e inglés. El formato, el horario y el precio se acuerdan directamente con ella.',
    classesNote:
      'No hay carrito ni pasarela de pago: se habla por mensaje privado y se acuerda directamente. Así de simple.',
    askGm: '¿Prefieres preguntarle a José Gabriel?',
    askGmCta: 'Escríbele',
    classFormats: [
      {
        n: 'Clase individual',
        d: 'Uno a uno, con un plan hecho a tu medida a partir de tus propias partidas. El formato que más rápido sube el nivel.',
      },
      {
        n: 'Clase en grupo',
        d: 'Grupos reducidos que comparten nivel. Sale más económico y se aprende viendo cómo piensan los demás.',
      },
      {
        n: 'Seminarios y charlas',
        d: 'Sesiones temáticas para clubes, colegios o empresas. Un patrón, una apertura o un final, a fondo.',
      },
    ],
    classCta: 'Consultar disponibilidad',

    liveTitle: 'En directo',
    liveLead:
      'Torneos, partidas comentadas y anuncios de clases: todo lo publican en sus perfiles. Síguelos para no perdértelo.',
    liveFollow: 'Seguir',
    liveSoon: '¿Tienen canal de Twitch o YouTube? Cuando lo compartan, aparecerá aquí.',

    footerRights: 'Todos los derechos reservados.',
    photoCaption: 'Manuela y José Gabriel, partida improvisada bajo la Torre Eiffel.',
    photoCredit: 'De sus perfiles de Instagram',
    photoQuote: '¿Me aceptas una partida en la Torre Eiffel?',
    photoQuoteBy: 'José Gabriel, en el pie de la foto',
    historyTitle: 'Mates con siglos de historia',
    historyLead: 'Los patrones de este test no se inventaron ayer. Cada uno tiene nombre, fecha y autor.',
    tipsTitle: 'Cinco consejos para subir de nivel',
    tipsLead: 'Lo que de verdad mueve la aguja cuando quieres mejorar.',

    piecesCredit: 'Piezas de ajedrez de Cburnett y Rfc1394 (Wikimedia Commons).',
    footerNote:
      'Resultado orientativo y con fines divulgativos: no es un ELO oficial FIDE. Los ejercicios son patrones clásicos elegidos para este proyecto.',

    levels: [
      {
        max: 1199,
        t: 'Nivel Principiante',
        s: '¡A aprender con Manuela!',
        p: 'p',
        d: 'Tienes la chispa. Con entrenamiento táctico constante subes rapidísimo.',
      },
      {
        max: 1800,
        t: 'Nivel Club',
        s: '¡Cerca del título de WFM!',
        p: 'n',
        d: 'Ves los patrones y calculas bien. Te falta pulir el remate y ya estás en torneo.',
      },
      {
        max: 9999,
        t: 'Nivel Magistral',
        s: '¡Mente de GM como José Gabriel!',
        p: 'q',
        d: 'Cálculo profundo y visión de sacrificio. Esto no es suerte, es talento.',
      },
    ],
    history: [
      {
        era: 'Siglo IX',
        name: 'Mate árabe',
        text: 'El más antiguo de todos. Viene del shatranj, el ajedrez persa anterior al que jugamos hoy, y aparece en manuscritos árabes medievales. Entonces la torre y el caballo eran las piezas fuertes: la dama todavía no existía tal y como la conocemos.',
      },
      {
        era: 'Siglo XVIII',
        name: 'Legado de Philidor',
        text: 'François-André Danican Philidor (1726–1795) fue el mejor jugador de su tiempo y además compositor de ópera. Este mate ahogado lleva su nombre desde entonces y sigue apareciendo en partidas de hoy.',
      },
      {
        era: '1803',
        name: 'Mate de Anastasia',
        text: 'Toma el nombre del libro «Anastasia y el juego de ajedrez», de Wilhelm Heinse: una novela escrita como una serie de cartas en las que se intercalaban posiciones. Un mate bautizado por una obra literaria.',
      },
      {
        era: '1853',
        name: 'Mate de Boden',
        text: 'Lleva el nombre de Samuel Boden, que lo ejecutó en Londres en 1853. Ya se había visto antes, en Hamburgo en 1844, pero fue su partida la que lo hizo famoso: dos alfiles cruzándose sobre el rey.',
      },
    ],
    tips: [
      {
        n: 'Táctica antes que aperturas',
        d: 'Por debajo de 1800, casi todas las partidas se deciden por una jugada táctica que alguien no vio. Memorizar quince movimientos de apertura no te salva de un tenedor en la jugada diez.',
      },
      {
        n: 'Aprende patrones, no jugadas',
        d: 'Los mates de esta página tienen nombre por algo: se repiten. Cuando reconoces la forma dejas de calcular y empiezas a verla. Ese es el salto de verdad.',
      },
      {
        n: 'Revisa tus derrotas',
        d: 'Duele, pero es donde está la información. Una partida perdida y bien analizada enseña más que diez ganadas sin mirar.',
      },
      {
        n: 'Juega lento de vez en cuando',
        d: 'El ajedrez rápido entretiene, pero no enseña a calcular. Una partida larga a la semana vale más que cien de un minuto.',
      },
      {
        n: 'Termina lo que empiezas',
        d: 'Muchos saben atacar y muy pocos rematar. Estudiar finales es lo más aburrido y lo que más puntos da.',
      },
    ],
    shareText: (elo, lvl, ok, total) =>
      `♟️ Descubre tu ELO con los Maestros ♟️\n\nMi resultado: ${lvl.t} — ${elo} ELO\n${lvl.s}\n` +
      `Resolví ${ok} de ${total} problemas de ajedrez.\n\n¿Te atreves a superarme?\n\n` +
      `WFM Manuela Hernández @${IG_WFM}\nGM José Gabriel Cardoso @${IG_GM}\n\n#Ajedrez #Chess #ELO #DescubreTuELO`,
  },

  en: {
    eyebrow: 'Chess challenge',
    title1: 'Find your ELO',
    title2: 'with the Masters',
    tagline: 'Nine positions. A real board. And a number at the end that tells you where you stand.',
    heroCta: 'Start the challenge',
    heroMeta: 'Free · 3 minutes · no sign-up',

    mastersTitle: 'The masters',
    mastersLead: 'Two ways to measure up. Pick your opponent.',
    wfmRole: 'Woman FIDE Master',
    gmRole: 'International Grandmaster',
    wfmBio:
      'Online chess coach in Spanish and English, and a Marketing student. Competes in tournaments across Europe.',
    gmBio:
      "Colombia's number one. Marketing student at UTRGV in the United States. Chess and travel in equal measure.",
    seeProfile: 'View on Instagram',
    fideProfile: 'FIDE profile',

    quizTitle: 'The challenge',
    pickLevel: 'Choose your level',
    wfmName: 'WFM Level',
    wfmWho: 'Manuela Hernández · 2020',
    wfmDesc: 'Approachable tactics and club-level training.',
    gmName: 'GM Level',
    gmWho: 'José Gabriel Cardoso · 2518',
    gmDesc: 'Forced combinations and high-performance calculation.',
    puzzles: 'puzzles',
    ratingRange: 'Difficulty',
    problem: 'Puzzle',
    of: 'of',
    whiteToPlay: 'White to play',
    blackToPlay: 'Black to play',
    yourTurn: 'Your turn: find the best move.',
    keepGoing: 'Good! Keep going, the combination is not over.',
    wrong: 'Not that one. Try again.',
    illegal: 'That move is not legal.',
    solved: 'Solved!',
    solvedClean: 'Solved first try!',
    showSolution: 'Show the solution',
    shown: 'This was the solution',
    next: 'Next puzzle',
    seeResult: 'See my ELO',
    tapHint: 'Tap a piece, then its destination. You can also drag it.',

    yourElo: 'Your estimated ELO',
    hits: 'Solved',
    firstTry: 'first try',
    share: 'Share my result on Instagram',
    shareHint: 'We copy the text tagging them both: paste it into your story.',
    copied: 'Text copied! Paste it into your Instagram story',
    retry: 'Try again',
    changeLevel: 'Change level',

    navHistory: 'History',
    showMove: 'See the pattern',
    hideMove: 'Hide',
    spoiler: 'Heads up: this shows the solution.',
    noEsLaPartida: 'Example position, built so the pattern reads clearly. It is not the historical game.',
    navClasses: 'Lessons',
    navLive: 'Live',
    ctaBook: 'Book a lesson',

    classesTitle: 'Lessons and academy',
    classesLead:
      'Manuela teaches chess online in Spanish and English. Format, schedule and price are agreed directly with her.',
    classesNote: 'No cart, no checkout: you send a message and settle it with the coach. That simple.',
    classFormats: [
      {
        n: 'One-to-one',
        d: 'Private coaching with a plan built around your own games. The format that raises your level fastest.',
      },
      {
        n: 'Group lessons',
        d: 'Small groups at a similar level. Cheaper per head, and you learn from how the others think.',
      },
      {
        n: 'Seminars and talks',
        d: 'Themed sessions for clubs, schools or companies. One pattern, one opening or one endgame, in depth.',
      },
    ],
    classCta: 'Ask about availability',

    liveTitle: 'Live',
    liveLead:
      'Tournaments, annotated games and lesson announcements all go up on their profiles. Follow them so you do not miss it.',
    liveFollow: 'Follow',
    liveSoon: 'Do they have a Twitch or YouTube channel? Once they share it, it will show up here.',

    footerRights: 'All rights reserved.',
    photoCaption: 'Manuela and José Gabriel, an impromptu game under the Eiffel Tower.',
    photoCredit: 'From their Instagram profiles',
    photoQuote: 'Care for a game at the Eiffel Tower?',
    photoQuoteBy: 'José Gabriel, in the photo caption',
    historyTitle: 'Checkmates with centuries behind them',
    historyLead:
      'The patterns in this test were not invented yesterday. Each one has a name, a date and an author.',
    tipsTitle: 'Five ways to actually improve',
    tipsLead: 'What really moves the needle when you want to get better.',

    piecesCredit: 'Chess pieces by Cburnett and Rfc1394 (Wikimedia Commons).',
    footerNote:
      'Indicative result for entertainment: this is not an official FIDE rating. The exercises are classic patterns chosen for this project.',

    levels: [
      {
        max: 1199,
        t: 'Beginner Level',
        s: 'Time to learn with Manuela!',
        p: 'p',
        d: 'The spark is there. With steady tactical training you will climb fast.',
      },
      {
        max: 1800,
        t: 'Club Level',
        s: 'Closing in on the WFM title!',
        p: 'n',
        d: 'You see the patterns and calculate well. Sharpen the finish and you are tournament ready.',
      },
      {
        max: 9999,
        t: 'Master Level',
        s: 'A GM mind, like José Gabriel!',
        p: 'q',
        d: 'Deep calculation and an eye for sacrifice. That is not luck, that is talent.',
      },
    ],
    history: [
      {
        era: '9th century',
        name: 'Arabian mate',
        text: 'The oldest of them all. It comes from shatranj, the Persian chess played long before the modern game, and appears in medieval Arabic manuscripts. Back then rook and knight were the strong pieces: the queen as we know her did not exist yet.',
      },
      {
        era: '18th century',
        name: "Philidor's legacy",
        text: 'François-André Danican Philidor (1726–1795) was the best player of his time and an opera composer besides. This smothered mate has carried his name ever since, and it still turns up in games today.',
      },
      {
        era: '1803',
        name: "Anastasia's mate",
        text: 'Named after the book "Anastasia and the Game of Chess" by Wilhelm Heinse: a novel written as a series of letters with chess positions woven through it. A checkmate christened by a work of literature.',
      },
      {
        era: '1853',
        name: "Boden's mate",
        text: 'Named for Samuel Boden, who played it in London in 1853. It had been seen before, in Hamburg in 1844, but his game is the one that made it famous: two bishops criss-crossing over the king.',
      },
    ],
    tips: [
      {
        n: 'Tactics before openings',
        d: 'Below 1800, almost every game is decided by one tactical move somebody missed. Memorising fifteen moves of an opening will not save you from a fork on move ten.',
      },
      {
        n: 'Learn patterns, not moves',
        d: 'The mates on this page have names for a reason: they repeat. Once you recognise the shape you stop calculating and start seeing it. That is the real jump.',
      },
      {
        n: 'Review your losses',
        d: 'It stings, but that is where the information is. One lost game properly analysed teaches more than ten wins you never looked at.',
      },
      {
        n: 'Play slow sometimes',
        d: 'Fast chess is fun but it does not teach you to calculate. One long game a week beats a hundred bullet games.',
      },
      {
        n: 'Finish what you start',
        d: 'Plenty of players can attack; very few can convert. Endgames are the dullest thing to study and the biggest source of points.',
      },
    ],
    shareText: (elo, lvl, ok, total) =>
      `♟️ Find your ELO with the Masters ♟️\n\nMy result: ${lvl.t} — ${elo} ELO\n${lvl.s}\n` +
      `I solved ${ok} of ${total} chess puzzles.\n\nThink you can beat me?\n\n` +
      `WFM Manuela Hernández @${IG_WFM}\nGM José Gabriel Cardoso @${IG_GM}\n\n#Chess #Ajedrez #ELO #FindYourELO`,
  },
};

/* ═══════════════════════════ AJEDREZ / CHESS HELPERS ══════════════════════ */

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

/* Notación inglesa (Nf3) → española (Cf3). Una sola pasada, para que la K del
 rey no acabe convertida en la T de torre. */
const SAN_ES = { K: 'R', Q: 'D', R: 'T', B: 'A', N: 'C' };
const sanFor = (san, lang) =>
  lang === 'es'
    ? san
        .split('')
        .map((c) => SAN_ES[c] || c)
        .join('')
    : san;

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ════════════════════════════════ PIEZA ═══════════════════════════════════ */

/* Las piezas son el juego Cburnett, el mismo que usan Lichess y los maestros
   en sus publicaciones. El sprite va incrustado una vez en el HTML y aquí
   sólo se referencia. Autores y licencia: ver el pie de la página. */
function Piece({ type, color, className = 'w-[92%] h-[92%]' }) {
  const id = color + type; // wk, bq, wn...
  return (
    <svg viewBox="0 0 40 40" className={'pointer-events-none ' + className} aria-hidden="true">
      <use href={'#' + id} xlinkHref={'#' + id} />
    </svg>
  );
}

/* ════════════════════════════════ TABLERO ═════════════════════════════════ */

function Board({
  game,
  orientation,
  selected,
  targets,
  lastMove,
  flash,
  onSquare,
  disabled,
  decorative = false,
}) {
  const ranks = orientation === 'w' ? [8, 7, 6, 5, 4, 3, 2, 1] : [1, 2, 3, 4, 5, 6, 7, 8];
  const files = orientation === 'w' ? FILES : FILES.slice().reverse();
  const board = game.board();
  const pieceAt = (sq) => board[8 - Number(sq[1])][FILES.indexOf(sq[0])];

  return (
    <div
      aria-hidden={decorative || undefined}
      className={
        'grid grid-cols-8 w-full max-w-[520px] mx-auto overflow-hidden ring-1 shadow-[0_30px_80px_-20px_rgba(0,0,0,.9)] transition-all duration-200 ' +
        (flash === 'ok'
          ? 'ring-4 ring-emerald-400'
          : flash === 'bad'
            ? 'ring-4 ring-ember animate-shake'
            : 'ring-line')
      }
    >
      {ranks.map((rank) =>
        files.map((file) => {
          const sq = file + rank;
          const dark = (FILES.indexOf(file) + rank) % 2 === 0;
          const piece = pieceAt(sq);
          const isTarget = targets.includes(sq);
          const Cell = decorative ? 'div' : 'button';
          const cellProps = decorative
            ? {}
            : { type: 'button', 'data-square': sq, disabled, onClick: () => onSquare(sq), 'aria-label': sq };
          return (
            <Cell
              key={sq}
              {...cellProps}
              className={
                'relative flex items-center justify-center aspect-square touch-none ' +
                (dark ? 'bg-board-dark' : 'bg-board-light')
              }
            >
              {lastMove && (lastMove[0] === sq || lastMove[1] === sq) && (
                <span className="absolute inset-0 bg-gold/35"></span>
              )}
              {selected === sq && (
                <span className="absolute inset-0 bg-gold/60 ring-2 ring-inset ring-gold"></span>
              )}
              {piece && <Piece type={piece.type} color={piece.color} />}
              {isTarget && (
                <span
                  className={
                    'absolute pointer-events-none ' +
                    (piece
                      ? 'inset-0 ring-[5px] ring-inset ring-emerald-400/90 '
                      : 'w-1/3 h-1/3 rounded-full bg-emerald-400/80')
                  }
                ></span>
              )}
              {file === files[0] && (
                <span
                  className={
                    'absolute left-0.5 top-0 text-[9px] font-bold ' +
                    (dark ? 'text-board-light/70' : 'text-board-dark/70')
                  }
                >
                  {rank}
                </span>
              )}
              {rank === ranks[7] && (
                <span
                  className={
                    'absolute right-0.5 bottom-0 text-[9px] font-bold ' +
                    (dark ? 'text-board-light/70' : 'text-board-dark/70')
                  }
                >
                  {file}
                </span>
              )}
            </Cell>
          );
        }),
      )}
    </div>
  );
}

/* ══════════════════ TABLERO QUE JUEGA SOLO (la portada) ═══════════════════ */

function AutoBoard({ fen, moves }) {
  const [, tick] = useState(0);
  const gRef = useRef(new Chess(fen));
  const lastRef = useRef(null);

  useEffect(() => {
    let i = 0;
    let timer;
    const run = () => {
      if (i >= moves.length) {
        gRef.current = new Chess(fen);
        lastRef.current = null;
        i = 0;
        tick((n) => n + 1);
        timer = setTimeout(run, 1500);
        return;
      }
      const m = gRef.current.move(moves[i]);
      lastRef.current = [m.from, m.to];
      i += 1;
      tick((n) => n + 1);
      timer = setTimeout(run, i >= moves.length ? 2600 : 1000);
    };
    timer = setTimeout(run, 1100);
    return () => clearTimeout(timer);
  }, [fen]);

  return (
    <Board
      game={gRef.current}
      orientation="w"
      selected={null}
      targets={[]}
      lastMove={lastRef.current}
      flash={null}
      onSquare={() => {}}
      disabled
      decorative
    />
  );
}

/* Aparición progresiva al bajar por la página. */
function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('on');
            io.unobserve(e.target);
          }
        }),
      { rootMargin: '0px 0px -8% 0px' },
    );
    document.querySelectorAll('.reveal:not(.on)').forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

/* ═════════════════════════ ADORNOS Y ESTRUCTURA ══════════════════════════ */

function Frieze() {
  return (
    <div className="flex justify-center gap-1.5 opacity-80" aria-hidden="true">
      {['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'].map((t, i) => (
        <Piece
          key={i}
          type={t}
          color="w"
          className={'w-7 h-7 sm:w-9 sm:h-9 ' + (i % 2 ? 'opacity-40' : 'opacity-80')}
        />
      ))}
    </div>
  );
}

function Section({ id, eyebrow, title, lead, innerRef, children }) {
  return (
    <section id={id} ref={innerRef} className="mt-20 sm:mt-32 scroll-mt-20">
      <div className="reveal">
        <div className="flex items-center gap-4">
          {eyebrow && <span className="t-label text-gold tabular-nums shrink-0">{eyebrow}</span>}
          <span className="rule-checker flex-1"></span>
        </div>
        <h2 className="display t-sec font-black mt-4 balance">{title}</h2>
        {lead && <p className="mt-3 text-ivory/55 max-w-xl leading-relaxed">{lead}</p>}
      </div>
      <div className="mt-8">{children}</div>
    </section>
  );
}

/* ═══════════════════════════════════ APP ═════════════════════════════════ */

function App() {
  const [lang, setLang] = useState(
    typeof navigator !== 'undefined' && /^en/i.test(navigator.language || '') ? 'en' : 'es',
  );
  const [level, setLevel] = useState(null);
  const [stage, setStage] = useState('pick');
  const [queue, setQueue] = useState([]);
  const [idx, setIdx] = useState(0);
  const [results, setResults] = useState([]);
  const [toast, setToast] = useState('');

  const t = T[lang];
  const all = window.PUZZLES || [];
  const quizRef = useRef(null);

  const gameRef = useRef(new Chess());
  const [, forceRender] = useState(0);
  const bump = () => forceRender((n) => n + 1);

  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const [flash, setFlash] = useState(null);
  const [lastMove, setLastMove] = useState(null);
  const [phase, setPhase] = useState('play');
  const [msg, setMsg] = useState(null);

  const puzzle = queue[idx];
  const orientation = useMemo(() => (puzzle ? new Chess(puzzle.fen).turn() : 'w'), [puzzle]);

  const loadPuzzle = useCallback((p) => {
    gameRef.current = new Chess(p.fen);
    setStep(0);
    setSelected(null);
    setMistakes(0);
    setFlash(null);
    setLastMove(null);
    setPhase('play');
    setMsg(null);
    bump();
  }, []);

  const toQuiz = () => quizRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

  function start(lv) {
    const list = shuffle(all.filter((p) => p.level === lv));
    setLevel(lv);
    setQueue(list);
    setIdx(0);
    setResults([]);
    setStage('play');
    loadPuzzle(list[0]);
    setTimeout(toQuiz, 60);
  }

  function attempt(from, to) {
    const g = gameRef.current;
    const expected = puzzle.solution[step];
    const test = new Chess(g.fen());
    let mv = null;
    try {
      mv = test.move({
        from,
        to,
        promotion: expected.includes('=') ? expected.split('=')[1][0].toLowerCase() : 'q',
      });
    } catch (e) {
      mv = null;
    }

    if (!mv) {
      setMsg({ kind: 'bad', text: t.illegal });
      setFlash('bad');
      setTimeout(() => setFlash(null), 400);
      return;
    }
    if (mv.san !== expected) {
      setMistakes((m) => m + 1);
      setMsg({ kind: 'bad', text: t.wrong });
      setFlash('bad');
      setSelected(null);
      setTimeout(() => setFlash(null), 400);
      return;
    }

    g.move(expected);
    setLastMove([mv.from, mv.to]);
    setSelected(null);
    setFlash('ok');
    setTimeout(() => setFlash(null), 450);
    bump();

    const next = step + 1;
    if (next >= puzzle.solution.length) return finish(true);

    setPhase('busy');
    setMsg({ kind: 'ok', text: t.keepGoing });
    setStep(next);
    setTimeout(() => {
      const r = g.move(puzzle.solution[next]);
      setLastMove([r.from, r.to]);
      bump();
      const after = next + 1;
      if (after >= puzzle.solution.length) return finish(true);
      setStep(after);
      setPhase('play');
      setMsg(null);
    }, 650);
  }

  function finish(solved) {
    setPhase(solved ? 'solved' : 'shown');
    setMsg({ kind: 'ok', text: solved ? (mistakes === 0 ? t.solvedClean : t.solved) : t.shown });
    setResults((r) => [...r, { rating: puzzle.rating, solved, mistakes }]);
  }

  function reveal() {
    const g = new Chess(puzzle.fen);
    puzzle.solution.forEach((san) => g.move(san));
    gameRef.current = g;
    const hist = g.history({ verbose: true });
    const last = hist[hist.length - 1];
    setLastMove([last.from, last.to]);
    setSelected(null);
    bump();
    finish(false);
  }

  function onSquare(sq) {
    if (phase !== 'play') return;
    const g = gameRef.current;
    const piece = g.get(sq);
    if (selected && selected !== sq) {
      const legal = g.moves({ square: selected, verbose: true }).some((m) => m.to === sq);
      if (legal) return attempt(selected, sq);
    }
    if (piece && piece.color === g.turn()) {
      setSelected(sq === selected ? null : sq);
      setMsg(null);
      return;
    }
    setSelected(null);
  }

  function next() {
    const n = idx + 1;
    if (n >= queue.length) {
      setStage('result');
      setTimeout(toQuiz, 60);
      return;
    }
    setIdx(n);
    loadPuzzle(queue[n]);
  }

  /* arrastre / drag */
  const boardWrap = useRef(null);
  useEffect(() => {
    const el = boardWrap.current;
    if (!el) return;
    let from = null;
    const squareAt = (x, y) => {
      const hit = document.elementFromPoint(x, y);
      const btn = hit && hit.closest('[data-square]');
      return btn ? btn.dataset.square : null;
    };
    const down = (e) => {
      if (phase !== 'play') return;
      const sq = squareAt(e.clientX, e.clientY);
      const p = sq && gameRef.current.get(sq);
      from = p && p.color === gameRef.current.turn() ? sq : null;
    };
    const up = (e) => {
      if (!from || phase !== 'play') return;
      const sq = squareAt(e.clientX, e.clientY);
      if (
        sq &&
        sq !== from &&
        gameRef.current.moves({ square: from, verbose: true }).some((m) => m.to === sq)
      ) {
        attempt(from, sq);
      }
      from = null;
    };
    el.addEventListener('pointerdown', down);
    window.addEventListener('pointerup', up);
    return () => {
      el.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
    };
  });

  const elo = useMemo(() => {
    if (!results.length) return 0;
    const pts = results.map((r) =>
      !r.solved
        ? r.rating - 350
        : r.mistakes === 0
          ? r.rating + 100
          : Math.max(r.rating - 200, r.rating - 60 * r.mistakes),
    );
    return Math.max(600, Math.min(2800, Math.round(pts.reduce((a, b) => a + b, 0) / pts.length / 10) * 10));
  }, [results]);

  const nivel = useMemo(() => t.levels.find((l) => elo <= l.max) || t.levels[2], [elo, lang]);
  const solvedCount = results.filter((r) => r.solved).length;
  const cleanCount = results.filter((r) => r.solved && r.mistakes === 0).length;

  const showToast = (m) => {
    setToast(m);
    setTimeout(() => setToast(''), 2800);
  };

  async function share() {
    const txt = t.shareText(elo, nivel, solvedCount, results.length);
    try {
      await navigator.clipboard.writeText(txt);
    } catch (e) {
      const ta = document.createElement('textarea');
      ta.value = txt;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
    }
    showToast(t.copied);
  }

  const pool = (lv) => all.filter((p) => p.level === lv);
  const range = (lv) => {
    const rs = pool(lv).map((p) => p.rating);
    return rs.length ? `${Math.min(...rs)}–${Math.max(...rs)}` : '—';
  };

  useReveal();

  /* La portada juega la combinación más larga que haya: la más espectacular. */
  const heroPuzzle = useMemo(
    () => all.slice().sort((a, b) => b.solution.length - a.solution.length || b.rating - a.rating)[0],
    [all],
  );
  const norm = (s) => s.toLowerCase().replace(/['’]/g, '').replace(/\s+/g, ' ').trim();

  /* Qué patrón de la sección de historia se está mostrando en tablero. */
  const [verPatron, setVerPatron] = useState(null);
  const puzzleDeHistoria = (nombre) => all.find((p) => norm(p.theme[lang]) === norm(nombre));
  const heroEra = useMemo(() => {
    if (!heroPuzzle) return '';
    const h = t.history.find((x) => norm(x.name) === norm(heroPuzzle.theme[lang]));
    return h ? h.era : '';
  }, [heroPuzzle, lang]);

  const masters = [
    {
      key: 'wfm',
      title: 'WFM',
      name: 'Manuela Hernández',
      role: t.wfmRole,
      elo: 2020,
      bio: t.wfmBio,
      ig: IG_WFM,
      fide: FIDE_WFM,
      piece: 'n',
      accent: 'text-gold',
      foto: (window.FOTOS || {}).manuela,
    },
    {
      key: 'gm',
      title: 'GM',
      name: 'José Gabriel Cardoso',
      role: t.gmRole,
      elo: 2518,
      bio: t.gmBio,
      ig: IG_GM,
      fide: null,
      piece: 'q',
      accent: 'text-gold',
      foto: (window.FOTOS || {}).cardoso,
    },
  ];

  /* ══════════════════════════════ RENDER ══════════════════════════════ */

  return (
    <div className="min-h-screen checker-bg">
      <div className="sticky top-0 z-30 backdrop-blur-md bg-ink/85 border-b border-line">
        <div className="max-w-5xl mx-auto px-5 py-3 flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5">
            <Piece type="n" color="w" className="w-6 h-6" />
            <span className="display font-black text-sm tracking-tight">Descubre tu ELO</span>
          </a>
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex gap-5 t-label text-ivory/45">
              <a href="#maestros" className="hover:text-gold transition">
                {t.mastersTitle}
              </a>
              <a href="#reto" className="hover:text-gold transition">
                {t.quizTitle}
              </a>
              <a href="#clases" className="hover:text-gold transition">
                {t.navClasses}
              </a>
              <a href="#directos" className="hover:text-gold transition">
                {t.navLive}
              </a>
            </nav>
            <a
              href="#clases"
              className="hidden sm:inline-block bg-gold text-ink t-label px-4 py-2 hover:bg-ivory transition"
            >
              {t.ctaBook}
            </a>
            <div className="inline-flex overflow-hidden ring-1 ring-line text-[11px] font-bold">
              {['es', 'en'].map((l) => (
                <button
                  key={l}
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={
                    'px-2.5 py-1 transition ' + (lang === l ? 'bg-gold text-ink' : 'bg-white/5 text-ivory/60')
                  }
                >
                  {l.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <main id="top" className="max-w-5xl mx-auto px-5 pb-24">
        {/* ─── PORTADA ─── */}
        <header className="pt-14 sm:pt-24 grid lg:grid-cols-[1.05fr_.95fr] gap-12 lg:gap-14 items-center">
          <div>
            <div className="flex items-center gap-3">
              <span className="w-9 h-px bg-gold"></span>
              <span className="t-label text-gold">{t.eyebrow}</span>
            </div>
            <h1 className="display t-hero font-black mt-5 balance">
              {t.title1}
              <span className="block text-gold">{t.title2}</span>
            </h1>
            <p className="mt-6 text-lg text-ivory/60 max-w-md leading-relaxed">{t.tagline}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={toQuiz}
                className="group bg-gold text-ink font-black text-base px-8 py-4  hover:bg-ivory transition active:scale-[.98]"
              >
                {t.heroCta} <span className="inline-block transition group-hover:translate-x-1">→</span>
              </button>
              <p className="t-label text-ivory/35">{t.heroMeta}</p>
            </div>
          </div>

          {/* El tablero se juega solo: es la portada. */}
          <div className="relative">
            <AutoBoard fen={heroPuzzle.fen} moves={heroPuzzle.solution} />
            <div className="mt-4 flex items-center gap-3 justify-center lg:justify-start">
              <span className="w-2 h-2 rounded-full bg-gold pulse-gold"></span>
              <p className="t-label text-ivory/45">
                {heroPuzzle.theme[lang]} · {heroEra}
              </p>
            </div>
          </div>
        </header>

        {/* ─── LOS MAESTROS ─── */}
        <Section id="maestros" eyebrow="01" title={t.mastersTitle} lead={t.mastersLead}>
          <div className="grid gap-4 sm:grid-cols-2">
            {masters.map((m) => (
              <article
                key={m.key}
                className="reveal group relative bg-panel ring-1 ring-line p-6 flex flex-col overflow-hidden hover:ring-gold/40 transition"
              >
                {/* la pieza, enorme y apagada, como marca de agua */}
                <Piece
                  type={m.piece}
                  color="w"
                  className="absolute -right-6 -bottom-6 w-40 h-40 opacity-[.05] group-hover:opacity-[.09] transition"
                />

                <div className="flex items-center gap-4 relative">
                  {m.foto ? (
                    <img
                      src={m.foto}
                      alt={m.name}
                      width="80"
                      height="80"
                      loading="lazy"
                      className="shrink-0 w-20 h-20 rounded-full object-cover ring-2 ring-gold/50"
                    />
                  ) : (
                    <span className="shrink-0 w-20 h-20 rounded-full bg-black/40 ring-1 ring-line flex items-center justify-center">
                      <Piece type={m.piece} color="w" className="w-12 h-12" />
                    </span>
                  )}
                  <div>
                    <p className={'t-label ' + m.accent}>{m.title}</p>
                    <p className="text-xs text-ivory/45 mt-1.5">{m.role}</p>
                  </div>
                </div>
                <h3 className="display text-2xl font-black leading-tight mt-2">{m.name}</h3>

                <div className="mt-5 flex items-baseline gap-3">
                  <span className="display text-5xl sm:text-6xl font-black tabular-nums text-gold leading-none">
                    {m.elo}
                  </span>
                  <span className="t-label text-ivory/35">ELO</span>
                </div>
                <span className="rule-checker mt-4"></span>

                <p className="mt-4 text-sm text-ivory/60 leading-relaxed flex-1 relative">{m.bio}</p>

                <div className="mt-5 flex flex-wrap gap-2 relative">
                  <a
                    href={`https://instagram.com/${m.ig}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 text-center bg-gold/10 ring-1 ring-gold/40 text-gold text-sm font-bold py-2.5 hover:bg-gold hover:text-ink transition active:scale-[.98]"
                  >
                    {t.seeProfile} ↗
                  </a>
                  {m.fide && (
                    <a
                      href={m.fide}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-center ring-1 ring-line text-ivory/60 text-sm font-bold px-4 py-2.5 hover:text-ivory hover:ring-ivory/30 transition active:scale-[.98]"
                    >
                      {t.fideProfile} ↗
                    </a>
                  )}
                </div>
                <p className="mt-3 t-label text-ivory/30 relative">@{m.ig}</p>
              </article>
            ))}
          </div>
        </Section>

        {/* ─── LOS DOS, JUGANDO ─── */}
        {(window.FOTOS || {}).eiffel && (
          <figure className="reveal mt-16 sm:mt-24 grid sm:grid-cols-[1fr_1fr] gap-6 sm:gap-10 items-center">
            {/* la foto va entera, sin recortar */}
            <img
              src={window.FOTOS.eiffel}
              alt={t.photoCaption}
              loading="lazy"
              className="w-full h-auto ring-1 ring-line"
            />
            <figcaption className="sm:pr-4">
              <span className="rule-checker w-24 block"></span>
              <blockquote className="display text-2xl sm:text-3xl font-black leading-tight mt-5 balance">
                «{t.photoQuote}»
              </blockquote>
              <p className="t-label text-gold mt-3">{t.photoQuoteBy}</p>
              <p className="mt-6 text-sm text-ivory/55 leading-relaxed">{t.photoCaption}</p>
              <p className="mt-3 t-label text-ivory/30">{t.photoCredit}</p>
            </figcaption>
          </figure>
        )}

        {/* ─── EL RETO ─── */}
        <Section
          id="reto"
          innerRef={quizRef}
          eyebrow="02"
          title={t.quizTitle}
          lead={stage === 'pick' ? t.tapHint : null}
        >
          {stage === 'pick' && (
            <div className="grid gap-3">
              <p className="text-center text-[11px] uppercase tracking-[0.25em] text-ivory/50">
                {t.pickLevel}
              </p>
              {[
                { key: 'wfm', name: t.wfmName, who: t.wfmWho, desc: t.wfmDesc, piece: 'n' },
                { key: 'gm', name: t.gmName, who: t.gmWho, desc: t.gmDesc, piece: 'q' },
              ].map((lv) => (
                <button
                  key={lv.key}
                  onClick={() => start(lv.key)}
                  className="reveal text-left bg-panel ring-1 ring-line hover:ring-gold/60 p-5 transition active:scale-[.99]"
                >
                  <div className="flex items-start gap-4">
                    <Piece type={lv.piece} color="w" className="w-11 h-11 shrink-0" />
                    <div className="flex-1">
                      <p className="font-black text-lg leading-tight">{lv.name}</p>
                      <p className="text-gold text-sm font-bold">{lv.who}</p>
                      <p className="mt-1 text-sm text-ivory/70">{lv.desc}</p>
                      <p className="mt-2 text-xs text-ivory/50 tabular-nums">
                        {pool(lv.key).length} {t.puzzles} · {t.ratingRange} {range(lv.key)}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}

          {stage === 'play' && puzzle && (
            <div className="bg-panel p-5 sm:p-7 ring-1 ring-line">
              <div className="flex items-center justify-between text-xs text-ivory/50 mb-2 tabular-nums">
                <span>
                  {t.problem} {idx + 1} {t.of} {queue.length}
                </span>
                <span className="text-gold font-bold">
                  {level === 'wfm' ? t.wfmName : t.gmName} · {puzzle.rating}
                </span>
              </div>
              <div className="h-1.5 bg-black/40 rounded-full overflow-hidden mb-4">
                <div
                  className="h-full bg-gradient-to-r from-gold to-amber-200 transition-all duration-500"
                  style={{ width: `${(idx / queue.length) * 100}%` }}
                />
              </div>

              {/* El tema se revela al terminar: enseñarlo antes sería dar la pista. */}
              <div className="flex items-center gap-2 flex-wrap mb-3">
                <span className="text-[11px] uppercase tracking-wider bg-white/10 text-ivory/70 px-2 py-1 rounded">
                  {orientation === 'w' ? t.whiteToPlay : t.blackToPlay}
                </span>
                {(phase === 'solved' || phase === 'shown') && (
                  <span className="text-[11px] uppercase tracking-wider bg-gold/15 text-gold px-2 py-1 rounded">
                    {puzzle.theme[lang]}
                  </span>
                )}
              </div>

              <div ref={boardWrap}>
                <Board
                  game={gameRef.current}
                  orientation={orientation}
                  selected={selected}
                  targets={
                    selected
                      ? gameRef.current.moves({ square: selected, verbose: true }).map((m) => m.to)
                      : []
                  }
                  lastMove={lastMove}
                  flash={flash}
                  onSquare={onSquare}
                  disabled={phase !== 'play'}
                />
              </div>

              <div className="mt-4 min-h-[3.5rem]">
                {!msg && phase === 'play' && <p className="text-sm text-ivory/70">{t.yourTurn}</p>}
                {msg && (
                  <p className={'font-bold ' + (msg.kind === 'ok' ? 'text-emerald-300' : 'text-rose-300')}>
                    {msg.text}
                  </p>
                )}
                {(phase === 'solved' || phase === 'shown') && (
                  <>
                    <p className="mt-1 text-sm text-ivory/70 leading-relaxed">{puzzle.explain[lang]}</p>
                    <p className="mt-2 text-sm text-gold font-bold tabular-nums">
                      {puzzle.solution.map((s) => sanFor(s, lang)).join('  ')}
                    </p>
                  </>
                )}
              </div>

              {phase === 'play' && mistakes >= 2 && (
                <button
                  onClick={reveal}
                  className="mt-2 w-full bg-white/5 ring-1 ring-line text-ivory/70 text-sm font-bold py-2.5  active:scale-[.99] transition"
                >
                  {t.showSolution}
                </button>
              )}
              {(phase === 'solved' || phase === 'shown') && (
                <button
                  onClick={next}
                  className="mt-3 w-full bg-gradient-to-r from-gold to-amber-300 text-ink font-black py-3.5  active:scale-[.98] transition"
                >
                  {idx === queue.length - 1 ? t.seeResult : t.next}
                </button>
              )}
            </div>
          )}

          {stage === 'result' && (
            <div className="bg-panel p-7 ring-1 ring-line text-center">
              <div className="flex justify-center mb-1">
                <Piece type={nivel.p} color="w" className="w-16 h-16" />
              </div>
              <p className="text-xs uppercase tracking-[0.3em] text-ivory/50">{t.yourElo}</p>
              <p data-elo className="display t-huge font-black text-gold tabular-nums mt-1">
                {elo}
              </p>
              <h3 className="display mt-3 text-2xl font-black">{nivel.t}</h3>
              <p className="text-gold font-bold">{nivel.s}</p>
              <p className="mt-3 text-sm text-ivory/70">{nivel.d}</p>
              <p className="mt-4 text-sm text-ivory/50 tabular-nums">
                {t.hits}:{' '}
                <strong className="text-white">
                  {solvedCount} / {results.length}
                </strong>
                {cleanCount > 0 && (
                  <>
                    {' '}
                    · {cleanCount} {t.firstTry}
                  </>
                )}
              </p>
              <button
                onClick={share}
                className="mt-6 w-full bg-gold text-ink font-black py-4 hover:bg-ivory transition active:scale-[.98]"
              >
                📸 {t.share}
              </button>
              <p className="mt-2 text-[11px] text-ivory/35">{t.shareHint}</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <button
                  onClick={() => start(level)}
                  className="bg-black/30 ring-1 ring-line text-ivory/85 font-bold py-3 active:scale-[.98] transition"
                >
                  {t.retry}
                </button>
                <button
                  onClick={() => setStage('pick')}
                  className="bg-black/30 ring-1 ring-line text-ivory/85 font-bold py-3  active:scale-[.98] transition"
                >
                  {t.changeLevel}
                </button>
              </div>
            </div>
          )}
        </Section>

        {/* ─── HISTORIA ─── */}
        <Section id="historia" eyebrow="03" title={t.historyTitle} lead={t.historyLead}>
          <ol className="grid gap-px bg-line ring-1 ring-line">
            {t.history.map((h, i) => (
              <li
                key={i}
                className="reveal bg-ink p-5 sm:p-7 grid sm:grid-cols-[8rem_1fr] gap-2 sm:gap-7 hover:bg-panel transition"
              >
                <p className="display text-gold text-2xl sm:text-3xl font-black tabular-nums leading-none">
                  {h.era}
                </p>
                <div>
                  <h3 className="display text-xl font-black">{h.name}</h3>
                  <p className="mt-2 text-sm text-ivory/60 leading-relaxed max-w-prose">{h.text}</p>

                  {/* Cada mate de esta lista es uno de los puzzles del test,
                      así que se puede enseñar la combinación jugándose sola. */}
                  {(() => {
                    const pz = puzzleDeHistoria(h.name);
                    if (!pz) return null;
                    const abierto = verPatron === i;
                    return (
                      <>
                        <button
                          onClick={() => setVerPatron(abierto ? null : i)}
                          aria-expanded={abierto}
                          className="mt-4 inline-flex items-center gap-2 ring-1 ring-gold/40 bg-gold/10 text-gold t-label px-3 py-2 hover:bg-gold hover:text-ink transition"
                        >
                          {abierto ? t.hideMove : t.showMove}
                          <span aria-hidden="true">{abierto ? '×' : '▸'}</span>
                        </button>
                        {!abierto && <p className="mt-2 text-[11px] text-ivory/25">{t.spoiler}</p>}
                        {abierto && (
                          <div className="mt-4 max-w-[330px]">
                            <AutoBoard fen={pz.fen} moves={pz.solution} />
                            <p className="mt-3 text-sm text-gold font-bold tabular-nums">
                              {pz.solution.map((m) => sanFor(m, lang)).join('  ')}
                            </p>
                            <p className="mt-1 text-xs text-ivory/45 leading-relaxed">{pz.explain[lang]}</p>
                            <p className="mt-3 text-[11px] text-ivory/30 leading-relaxed border-l-2 border-line pl-3">
                              {t.noEsLaPartida}
                            </p>
                          </div>
                        )}
                      </>
                    );
                  })()}
                </div>
              </li>
            ))}
          </ol>
        </Section>

        {/* ─── CONSEJOS ─── */}
        <Section id="consejos" eyebrow="04" title={t.tipsTitle} lead={t.tipsLead}>
          <div className="grid gap-3 sm:grid-cols-2">
            {t.tips.map((tip, i) => (
              <div key={i} className="bg-panel ring-1 ring-line  p-4">
                <div className="flex items-baseline gap-2">
                  <span className="display text-gold font-black tabular-nums">{i + 1}</span>
                  <h3 className="font-black leading-tight">{tip.n}</h3>
                </div>
                <p className="mt-1.5 text-sm text-ivory/70 leading-relaxed">{tip.d}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* ─── CLASES ─── */}
        <Section id="clases" eyebrow="05" title={t.classesTitle} lead={t.classesLead}>
          <div className="grid gap-3 sm:grid-cols-3">
            {t.classFormats.map((f, i) => (
              <div
                key={i}
                className="reveal bg-panel ring-1 ring-line p-5 flex flex-col hover:ring-gold/40 transition"
              >
                <h3 className="display text-lg font-black leading-tight">{f.n}</h3>
                <p className="mt-2 text-sm text-ivory/60 leading-relaxed flex-1">{f.d}</p>
                <a
                  href={`https://ig.me/m/${IG_WFM}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 text-center bg-gold/10 ring-1 ring-gold/40 text-gold text-sm font-bold py-2.5 hover:bg-gold hover:text-ink transition"
                >
                  {t.classCta} ↗<span className="block t-label opacity-60 mt-1">Manuela</span>
                </a>
              </div>
            ))}
          </div>
          <div className="reveal mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 bg-panel ring-1 ring-line p-4">
            <p className="text-sm text-ivory/60">{t.askGm}</p>
            <a
              href={`https://ig.me/m/${IG_GM}`}
              target="_blank"
              rel="noopener noreferrer"
              className="t-label text-gold hover:text-ivory transition"
            >
              {t.askGmCta} @{IG_GM} ↗
            </a>
          </div>
          <p className="reveal mt-4 text-xs text-ivory/35 max-w-xl">{t.classesNote}</p>
        </Section>

        {/* ─── DIRECTOS ─── */}
        <Section id="directos" eyebrow="06" title={t.liveTitle} lead={t.liveLead}>
          <div className="grid gap-3 sm:grid-cols-2">
            {masters.map((m) => (
              <a
                key={m.key}
                href={`https://instagram.com/${m.ig}`}
                target="_blank"
                rel="noopener noreferrer"
                className="reveal group bg-panel ring-1 ring-line p-5 flex items-center gap-4 hover:ring-gold/40 transition"
              >
                {m.foto && (
                  <img
                    src={m.foto}
                    alt=""
                    width="56"
                    height="56"
                    loading="lazy"
                    className="shrink-0 w-14 h-14 rounded-full object-cover ring-1 ring-gold/40"
                  />
                )}
                <span className="flex-1 min-w-0">
                  <span className="block font-black leading-tight">{m.name}</span>
                  <span className="block t-label text-ivory/35 mt-1">@{m.ig}</span>
                </span>
                <span className="t-label text-gold shrink-0 group-hover:translate-x-1 transition">
                  {t.liveFollow} ↗
                </span>
              </a>
            ))}
          </div>
          <p className="reveal mt-4 text-xs text-ivory/35 max-w-xl">{t.liveSoon}</p>
        </Section>

        <footer className="mt-16 pt-8 border-t border-line text-center">
          <Frieze />
          <div className="mt-5 flex justify-center gap-4 flex-wrap">
            {masters.map((m) => (
              <a
                key={m.key}
                href={`https://instagram.com/${m.ig}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold text-ivory/70 hover:text-gold transition"
              >
                @{m.ig}
              </a>
            ))}
          </div>
          <p className="mt-6 t-label text-ivory/45">
            © {ANIO} Descubre tu ELO · {t.footerRights}
          </p>
          <p className="mt-5 text-[11px] text-ivory/35 max-w-md mx-auto leading-relaxed">{t.footerNote}</p>
          <p className="mt-3 text-[11px] text-ivory/25 max-w-md mx-auto leading-relaxed">
            {t.piecesCredit}{' '}
            <a
              href="https://creativecommons.org/licenses/by-sa/3.0/"
              target="_blank"
              rel="noopener noreferrer license"
              className="underline hover:text-gold transition"
            >
              CC BY-SA 3.0
            </a>
          </p>
        </footer>
      </main>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 bg-ivory text-ink font-bold text-sm px-5 py-3 shadow-2xl max-w-[90vw] text-center">
          {toast}
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
