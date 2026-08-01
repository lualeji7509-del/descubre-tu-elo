/* Descubre tu ELO con los Maestros — lógica de la aplicación.
   Los puzzles NO están aquí: están en puzzles.js (o arriba del todo del index.html).
   The puzzles are NOT here: they live in puzzles.js (or at the very top of index.html). */

const { useState, useMemo, useRef, useEffect, useCallback } = React;
const { Chess } = ChessLib;

/* ══════════════════════════════ TEXTOS / STRINGS ══════════════════════════ */

const T = {
  es: {
    eyebrow: 'Reto de ajedrez',
    title1: 'Descubre tu ELO',
    title2: 'con los Maestros',
    withThe: 'con la',
    andThe: 'y el',
    intro: 'Mueve las piezas en el tablero de verdad. Elige con qué maestro quieres medirte.',
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
    shareHint: 'Copiamos el texto con {a} y {b} etiquetados: pégalo en tu historia.',
    copied: '¡Texto copiado! Pégalo en tu historia de Instagram',
    retry: 'Volver a intentarlo',
    changeLevel: 'Cambiar de nivel',
    disclaimer: 'Resultado orientativo y con fines divulgativos: no es un ELO oficial FIDE.',
    levels: [
      { max: 1199, t: 'Nivel Principiante', s: '¡A aprender con Manuela!', e: '♟️',
        d: 'Tienes la chispa. Con entrenamiento táctico constante subes rapidísimo.' },
      { max: 1800, t: 'Nivel Club', s: '¡Cerca del título de WFM!', e: '♞',
        d: 'Ves los patrones y calculas bien. Te falta pulir el remate y ya estás en torneo.' },
      { max: 9999, t: 'Nivel Magistral', s: '¡Mente de GM como José Gabriel!', e: '♛',
        d: 'Cálculo profundo y visión de sacrificio. Esto no es suerte, es talento.' },
    ],
    shareText: (elo, lvl, ok, total) =>
      `♟️ Descubre tu ELO con los Maestros ♟️\n\nMi resultado: ${lvl.t} — ${elo} ELO\n${lvl.s}\n` +
      `Resolví ${ok} de ${total} problemas de ajedrez.\n\n¿Te atreves a superarme?\n\n` +
      `WFM Manuela Hernández ${IG_WFM}\nGM José Gabriel Cardoso ${IG_GM}\n\n#Ajedrez #Chess #ELO #DescubreTuELO`,
  },
  en: {
    eyebrow: 'Chess challenge',
    title1: 'Find your ELO',
    title2: 'with the Masters',
    withThe: 'with',
    andThe: 'and',
    intro: 'Move the pieces on a real board. Pick the master you want to measure up against.',
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
    shareHint: 'We copy the text tagging {a} and {b}: paste it into your story.',
    copied: 'Text copied! Paste it into your Instagram story',
    retry: 'Try again',
    changeLevel: 'Change level',
    disclaimer: 'Indicative result for entertainment: this is not an official FIDE rating.',
    levels: [
      { max: 1199, t: 'Beginner Level', s: 'Time to learn with Manuela!', e: '♟️',
        d: 'The spark is there. With steady tactical training you will climb fast.' },
      { max: 1800, t: 'Club Level', s: 'Closing in on the WFM title!', e: '♞',
        d: 'You see the patterns and calculate well. Sharpen the finish and you are tournament ready.' },
      { max: 9999, t: 'Master Level', s: 'A GM mind, like José Gabriel!', e: '♛',
        d: 'Deep calculation and an eye for sacrifice. That is not luck, that is talent.' },
    ],
    shareText: (elo, lvl, ok, total) =>
      `♟️ Find your ELO with the Masters ♟️\n\nMy result: ${lvl.t} — ${elo} ELO\n${lvl.s}\n` +
      `I solved ${ok} of ${total} chess puzzles.\n\nThink you can beat me?\n\n` +
      `WFM Manuela Hernández ${IG_WFM}\nGM José Gabriel Cardoso ${IG_GM}\n\n#Chess #Ajedrez #ELO #FindYourELO`,
  },
};

/* Perfiles de Instagram / Instagram handles */
const IG_WFM = '@wfm_manuchess';
const IG_GM = '@gmcardosolab';

/* ═══════════════════════════ AJEDREZ / CHESS HELPERS ══════════════════════ */

const GLYPHS = { k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟' };
const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];

/* Traduce la notación inglesa (Nf3) a la española (Cf3). Una sola pasada,
   para que la K del rey no se convierta después en T de torre. */
const SAN_ES = { K: 'R', Q: 'D', R: 'T', B: 'A', N: 'C' };
function sanFor(san, lang) {
  if (lang !== 'es') return san;
  return san.split('').map((ch) => SAN_ES[ch] || ch).join('');
}

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/* ═════════════════════════════════ TABLERO ════════════════════════════════ */

function Board({ game, orientation, selected, targets, lastMove, flash, onSquare, disabled }) {
  const ranks = orientation === 'w' ? [8, 7, 6, 5, 4, 3, 2, 1] : [1, 2, 3, 4, 5, 6, 7, 8];
  const files = orientation === 'w' ? FILES : FILES.slice().reverse();
  const board = game.board();

  const pieceAt = (sq) => {
    const f = FILES.indexOf(sq[0]);
    const r = 8 - Number(sq[1]);
    return board[r][f];
  };

  return (
    <div
      className={
        'grid grid-cols-8 w-full max-w-[380px] mx-auto rounded-lg overflow-hidden ring-4 shadow-2xl transition-all duration-200 ' +
        (flash === 'ok' ? 'ring-emerald-400' : flash === 'bad' ? 'ring-rose-500 animate-shake' : 'ring-black/40')
      }
    >
      {ranks.map((rank) =>
        files.map((file) => {
          const sq = file + rank;
          const dark = (FILES.indexOf(file) + rank) % 2 === 0;
          const piece = pieceAt(sq);
          const isSel = selected === sq;
          const isTarget = targets.includes(sq);
          const isLast = lastMove && (lastMove[0] === sq || lastMove[1] === sq);
          return (
            <button
              key={sq}
              type="button"
              data-square={sq}
              disabled={disabled}
              onClick={() => onSquare(sq)}
              aria-label={sq}
              className={
                'relative flex items-center justify-center aspect-square touch-none ' +
                (dark ? 'bg-board-dark' : 'bg-board-light')
              }
            >
              {isLast && <span className="absolute inset-0 bg-gold/30"></span>}
              {isSel && <span className="absolute inset-0 bg-gold/55 ring-2 ring-inset ring-gold"></span>}
              {piece && (
                <span
                  className={
                    'piece relative text-[7.4vw] sm:text-[2.6rem] ' +
                    (piece.color === 'w' ? 'piece-w' : 'piece-b')
                  }
                >
                  {GLYPHS[piece.type]}
                </span>
              )}
              {isTarget && (
                <span
                  className={
                    'absolute pointer-events-none ' +
                    (piece
                      ? 'inset-0 ring-[5px] ring-inset ring-emerald-400/80 rounded-sm'
                      : 'w-1/3 h-1/3 rounded-full bg-emerald-400/70')
                  }
                ></span>
              )}
              {file === files[0] && (
                <span className={'absolute left-0.5 top-0 text-[9px] font-bold ' + (dark ? 'text-board-light/70' : 'text-board-dark/70')}>
                  {rank}
                </span>
              )}
              {rank === ranks[7] && (
                <span className={'absolute right-0.5 bottom-0 text-[9px] font-bold ' + (dark ? 'text-board-light/70' : 'text-board-dark/70')}>
                  {file}
                </span>
              )}
            </button>
          );
        })
      )}
    </div>
  );
}

/* ═══════════════════════════════════ APP ═════════════════════════════════ */

function App() {
  const [lang, setLang] = useState(
    typeof navigator !== 'undefined' && /^en/i.test(navigator.language || '') ? 'en' : 'es'
  );
  const [screen, setScreen] = useState('home');
  const [level, setLevel] = useState(null);
  const [queue, setQueue] = useState([]);
  const [idx, setIdx] = useState(0);
  const [results, setResults] = useState([]);
  const [toast, setToast] = useState('');

  const t = T[lang];
  const all = window.PUZZLES || [];

  /* ── estado del puzzle en curso ── */
  const gameRef = useRef(new Chess());
  const [, forceRender] = useState(0);
  const bump = () => forceRender((n) => n + 1);

  const [step, setStep] = useState(0);          // jugada de la solución que toca
  const [selected, setSelected] = useState(null);
  const [mistakes, setMistakes] = useState(0);
  const [flash, setFlash] = useState(null);     // 'ok' | 'bad'
  const [lastMove, setLastMove] = useState(null);
  const [phase, setPhase] = useState('play');   // 'play' | 'busy' | 'solved' | 'shown'
  const [msg, setMsg] = useState(null);         // {kind, text}

  const puzzle = queue[idx];
  const orientation = useMemo(
    () => (puzzle ? new Chess(puzzle.fen).turn() : 'w'),
    [puzzle]
  );

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

  function start(lv) {
    const pool = shuffle(all.filter((p) => p.level === lv));
    setLevel(lv);
    setQueue(pool);
    setIdx(0);
    setResults([]);
    setScreen('play');
    loadPuzzle(pool[0]);
  }

  /* ── mover ── */
  function attempt(from, to) {
    const g = gameRef.current;
    const expected = puzzle.solution[step];
    const test = new Chess(g.fen());
    let mv = null;
    try {
      mv = test.move({ from, to, promotion: expected.includes('=') ? expected.split('=')[1][0].toLowerCase() : 'q' });
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

    /* acierto */
    g.move(expected);
    setLastMove([mv.from, mv.to]);
    setSelected(null);
    setFlash('ok');
    setTimeout(() => setFlash(null), 450);
    bump();

    const next = step + 1;
    if (next >= puzzle.solution.length) return finish(true);

    /* responde el rival */
    setPhase('busy');
    setMsg({ kind: 'ok', text: t.keepGoing });
    setStep(next);
    setTimeout(() => {
      const reply = puzzle.solution[next];
      const r = g.move(reply);
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
    const lastSan = puzzle.solution[puzzle.solution.length - 1];
    const hist = g.history({ verbose: true });
    const lastVerbose = hist[hist.length - 1];
    setLastMove([lastVerbose.from, lastVerbose.to]);
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
    if (n >= queue.length) return setScreen('result');
    setIdx(n);
    loadPuzzle(queue[n]);
  }

  /* ── arrastre con el dedo o el ratón ── */
  const boardWrap = useRef(null);
  useEffect(() => {
    const el = boardWrap.current;
    if (!el) return;
    let from = null;
    const squareAt = (x, y) => {
      const target = document.elementFromPoint(x, y);
      const btn = target && target.closest('[data-square]');
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
      if (sq && sq !== from) {
        const legal = gameRef.current.moves({ square: from, verbose: true }).some((m) => m.to === sq);
        if (legal) attempt(from, sq);
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

  /* ── ELO estimado ── */
  const elo = useMemo(() => {
    if (!results.length) return 0;
    const pts = results.map((r) => {
      if (!r.solved) return r.rating - 350;
      if (r.mistakes === 0) return r.rating + 100;
      return Math.max(r.rating - 200, r.rating - 60 * r.mistakes);
    });
    const avg = pts.reduce((a, b) => a + b, 0) / pts.length;
    return Math.max(600, Math.min(2800, Math.round(avg / 10) * 10));
  }, [results]);

  const nivel = useMemo(() => t.levels.find((l) => elo <= l.max) || t.levels[2], [elo, lang]);
  const solvedCount = results.filter((r) => r.solved).length;
  const cleanCount = results.filter((r) => r.solved && r.mistakes === 0).length;

  const showToast = (m) => { setToast(m); setTimeout(() => setToast(''), 2800); };

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

  const counts = (lv) => all.filter((p) => p.level === lv);
  const range = (lv) => {
    const rs = counts(lv).map((p) => p.rating);
    return rs.length ? `${Math.min(...rs)}–${Math.max(...rs)}` : '—';
  };

  /* ══════════════════════════════ RENDER ══════════════════════════════ */

  return (
    <div className="min-h-screen px-4 py-7 flex flex-col items-center">
      <div className="w-full max-w-xl">

        {/* selector de idioma */}
        <div className="flex justify-end mb-3">
          <div className="inline-flex rounded-lg overflow-hidden ring-1 ring-white/15 text-xs font-bold">
            {['es', 'en'].map((l) => (
              <button
                key={l}
                onClick={() => setLang(l)}
                aria-pressed={lang === l}
                className={'px-3 py-1.5 transition ' + (lang === l ? 'bg-gold text-ink' : 'bg-white/5 text-slate-300')}
              >
                {l.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <header className="text-center mb-6">
          <p className="text-gold tracking-[0.35em] text-[11px] font-semibold uppercase">♔ {t.eyebrow} ♚</p>
          <h1 className="display mt-2 text-3xl sm:text-4xl font-black leading-tight bg-gradient-to-r from-gold via-amber-200 to-gold bg-clip-text text-transparent">
            {t.title1}<br />{t.title2}
          </h1>
          <p className="mt-3 text-sm text-slate-300">
            {t.withThe} <strong className="text-white">WFM Manuela Hernández</strong> {t.andThe}{' '}
            <strong className="text-white">GM José Gabriel Cardoso</strong>
          </p>
        </header>

        {/* ───────────── PORTADA ───────────── */}
        {screen === 'home' && (
          <div className="bg-panel/80 backdrop-blur rounded-2xl p-6 ring-1 ring-white/10 shadow-xl">
            <p className="text-center text-slate-200 leading-relaxed">{t.intro}</p>
            <p className="mt-6 text-center text-[11px] uppercase tracking-[0.25em] text-slate-400">{t.pickLevel}</p>

            <div className="mt-4 grid gap-3">
              {[
                { key: 'wfm', name: t.wfmName, who: t.wfmWho, desc: t.wfmDesc, glyph: '♞', accent: 'from-emerald-400 to-lime-300' },
                { key: 'gm', name: t.gmName, who: t.gmWho, desc: t.gmDesc, glyph: '♛', accent: 'from-amber-300 to-yellow-200' },
              ].map((lv) => (
                <button
                  key={lv.key}
                  onClick={() => start(lv.key)}
                  className="group text-left bg-black/30 hover:bg-black/45 ring-1 ring-white/10 hover:ring-gold/60 rounded-xl p-4 transition active:scale-[.99]"
                >
                  <div className="flex items-start gap-4">
                    <span className={'text-4xl bg-gradient-to-br ' + lv.accent + ' bg-clip-text text-transparent'}>{lv.glyph}</span>
                    <div className="flex-1">
                      <p className="font-black text-lg leading-tight">{lv.name}</p>
                      <p className="text-gold text-sm font-bold">{lv.who}</p>
                      <p className="mt-1 text-sm text-slate-300">{lv.desc}</p>
                      <p className="mt-2 text-xs text-slate-400 tabular-nums">
                        {counts(lv.key).length} {t.puzzles} · {t.ratingRange} {range(lv.key)}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
            <p className="mt-5 text-center text-xs text-slate-400">{t.tapHint}</p>
          </div>
        )}

        {/* ───────────── JUEGO ───────────── */}
        {screen === 'play' && puzzle && (
          <div className="bg-panel/80 backdrop-blur rounded-2xl p-5 ring-1 ring-white/10 shadow-xl">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-2 tabular-nums">
              <span>{t.problem} {idx + 1} {t.of} {queue.length}</span>
              <span className="text-gold font-bold">{level === 'wfm' ? t.wfmName : t.gmName} · {puzzle.rating}</span>
            </div>
            <div className="h-1.5 bg-black/40 rounded-full overflow-hidden mb-4">
              <div className="h-full bg-gradient-to-r from-gold to-amber-200 transition-all duration-500"
                   style={{ width: `${(idx / queue.length) * 100}%` }} />
            </div>

            {/* El tema se revela al terminar: enseñarlo antes sería darle la pista. */}
            <div className="flex items-center gap-2 flex-wrap mb-3">
              <span className="text-[11px] uppercase tracking-wider bg-white/10 text-slate-300 px-2 py-1 rounded">
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
                targets={selected ? gameRef.current.moves({ square: selected, verbose: true }).map((m) => m.to) : []}
                lastMove={lastMove}
                flash={flash}
                onSquare={onSquare}
                disabled={phase !== 'play'}
              />
            </div>

            <div className="mt-4 min-h-[3.5rem]">
              {!msg && phase === 'play' && <p className="text-sm text-slate-300">{t.yourTurn}</p>}
              {msg && (
                <p className={'font-bold ' + (msg.kind === 'ok' ? 'text-emerald-300' : 'text-rose-300')}>{msg.text}</p>
              )}
              {(phase === 'solved' || phase === 'shown') && (
                <>
                  <p className="mt-1 text-sm text-slate-300 leading-relaxed">{puzzle.explain[lang]}</p>
                  <p className="mt-2 text-sm text-gold font-bold tabular-nums">
                    {puzzle.solution.map((s) => sanFor(s, lang)).join('  ')}
                  </p>
                </>
              )}
            </div>

            {phase === 'play' && mistakes >= 2 && (
              <button onClick={reveal}
                      className="mt-2 w-full bg-white/5 ring-1 ring-white/10 text-slate-300 text-sm font-bold py-2.5 rounded-lg active:scale-[.99] transition">
                {t.showSolution}
              </button>
            )}

            {(phase === 'solved' || phase === 'shown') && (
              <button onClick={next}
                      className="mt-3 w-full bg-gradient-to-r from-gold to-amber-300 text-ink font-black py-3.5 rounded-xl active:scale-[.98] transition">
                {idx === queue.length - 1 ? t.seeResult : t.next}
              </button>
            )}
          </div>
        )}

        {/* ───────────── RESULTADO ───────────── */}
        {screen === 'result' && (
          <div className="bg-panel/80 backdrop-blur rounded-2xl p-6 ring-1 ring-white/10 shadow-xl text-center">
            <div className="text-6xl mb-2">{nivel.e}</div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{t.yourElo}</p>
            <p className="display text-6xl font-black text-gold tabular-nums">{elo}</p>
            <h2 className="display mt-3 text-2xl font-black">{nivel.t}</h2>
            <p className="text-gold font-bold">{nivel.s}</p>
            <p className="mt-3 text-sm text-slate-300">{nivel.d}</p>
            <p className="mt-4 text-sm text-slate-400 tabular-nums">
              {t.hits}: <strong className="text-white">{solvedCount} / {results.length}</strong>
              {cleanCount > 0 && <> · {cleanCount} {t.firstTry}</>}
            </p>

            <button onClick={share}
                    className="mt-6 w-full bg-gradient-to-r from-fuchsia-600 via-rose-500 to-amber-400 text-white font-black py-4 rounded-xl active:scale-[.98] transition">
              📸 {t.share}
            </button>
            <p className="mt-2 text-[11px] text-slate-500">
              {t.shareHint.replace('{a}', IG_WFM).replace('{b}', IG_GM)}
            </p>

            <div className="mt-3 grid grid-cols-2 gap-2">
              <button onClick={() => start(level)}
                      className="bg-black/30 ring-1 ring-white/10 text-slate-200 font-bold py-3 rounded-xl active:scale-[.98] transition">
                {t.retry}
              </button>
              <button onClick={() => setScreen('home')}
                      className="bg-black/30 ring-1 ring-white/10 text-slate-200 font-bold py-3 rounded-xl active:scale-[.98] transition">
                {t.changeLevel}
              </button>
            </div>
          </div>
        )}

        <footer className="mt-6 text-center text-[11px] text-slate-500">{t.disclaimer}</footer>
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white text-ink font-bold text-sm px-4 py-3 rounded-xl shadow-2xl max-w-[90vw] text-center">
          {toast}
        </div>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
