# Descubre tu ELO con los Maestros ♟️

### 👉 [Jugar / Play](https://lualeji7509-del.github.io/descubre-tu-elo/)

Quiz de ajedrez con **tablero jugable de verdad**: mueves las piezas tocando o
arrastrando, y la app valida la jugada al instante. Al final estima tu ELO y
prepara el texto para compartir en Instagram.

Con la **WFM Manuela Hernández** ([@wfm_manuchess](https://instagram.com/wfm_manuchess), 2020)
y el **GM José Gabriel Cardoso** ([@gmcardosolab](https://instagram.com/gmcardosolab), 2518).

Español e inglés, con selector. Funciona en el móvil y **sin conexión**: todo va
dentro de un solo archivo.

---

## 📌 Añadir o cambiar puzzles

> **¿Eres Manuela o José Gabriel?** Lee [**GUIA.md**](GUIA.md): explica cómo
> subir tus retos desde el navegador, sin instalar nada.


Todo vive en **[`puzzles.js`](puzzles.js)**. Es el único archivo que hay que tocar.

```js
{
  level: 'wfm',                                    // 'wfm' o 'gm'
  rating: 1300,                                    // dificultad en ELO
  fen: '1r1q3k/p5pp/8/4N3/8/8/5PPP/6K1 w - - 0 1', // la posición
  solution: ['Nf7+', 'Kg8', 'Nxd8'],               // jugadas: tú, rival, tú...
  theme:   { es: 'Tenedor de caballo', en: 'Knight fork' },
  explain: { es: 'El caballo ataca…',  en: 'The knight attacks…' },
}
```

**Cómo sacar el FEN en 30 segundos:** entra en <https://lichess.org/editor>,
coloca las piezas arrastrando, elige de quién es el turno y copia el texto FEN
de abajo.

**Ojo con la notación:** las jugadas de `solution` se escriben **siempre con las
letras inglesas** (K Q R B N), porque es lo que entiende el motor. La app las
traduce sola a español (R D T A C) al mostrarlas.

### Después de editar

**Si editas desde la web de GitHub, no hay que hacer nada más:** un automatismo
revisa los puzzles y publica solo. Ver [GUIA.md](GUIA.md).

Si trabajas en local:

```bash
npm install      # solo la primera vez
npm run verify   # comprueba que los puzzles son correctos
npm run build    # regenera index.html
```

`npm run verify` revisa, con un motor de ajedrez real, que cada jugada sea
legal, que los mates sean mate de verdad y que **no haya otra solución igual de
buena**. Si algo falla, lo dice y no hay que adivinar nada.

---

## Cómo se calcula el ELO

Se parte de la dificultad real de cada puzzle:

| Resultado | Puntos que aporta |
|---|---|
| Resuelto a la primera | dificultad **+100** |
| Resuelto tras fallar | dificultad **−60** por fallo (máx. −200) |
| Solución revelada | dificultad **−350** |

La media, redondeada y limitada entre 600 y 2800, se traduce a:

| ELO | Nivel |
|---|---|
| menos de 1200 | Nivel Principiante — ¡A aprender con Manuela! |
| 1200 – 1800 | Nivel Club — ¡Cerca del título de WFM! |
| más de 1800 | Nivel Magistral — ¡Mente de GM como José Gabriel! |

Es orientativo y con fines divulgativos: **no es un ELO oficial FIDE**.

---

## Los archivos

| Archivo | Qué es |
|---|---|
| [`puzzles.js`](puzzles.js) | **Los ejercicios.** Lo único que hay que tocar normalmente. |
| [`src/app.jsx`](src/app.jsx) | Tablero, validación, idiomas y cálculo de ELO. |
| [`verify.mjs`](verify.mjs) | Comprueba que los puzzles son correctos. |
| [`build.mjs`](build.mjs) | Genera el archivo final. |
| [`.github/workflows/publicar.yml`](.github/workflows/publicar.yml) | Revisa y publica sola la web en cada cambio. |
| `index.html` | **Generado.** No se edita a mano. |

Los puzzles no fueron propuestos por Manuela ni por José Gabriel: son
combinaciones clásicas elegidas para el proyecto. Ellos aparecen como
protagonistas y como referencia de nivel.

**Sobre la sección de historia.** Los datos históricos —autores, fechas,
orígenes— están documentados. Con las posiciones hay dos casos, y la web
distingue uno de otro al desplegar cada tablero:

| Patrón | Posición |
|---|---|
| Mate de Boden | **Partida real:** Schulder – Boden, Londres 1853 |
| Mate de Anastasia | **Partida real:** Lemon – Plum, St. Paul 1982 |
| Legado de Philidor | Posición de ejemplo. El patrón nace del libro de Lucena (1497), no de una partida. Sí ocurrió en Grischuk – Ponomariov, Torshavn 2000. |
| Mate árabe | Posición de ejemplo. Viene de manuscritos del siglo IX, no de una partida. |

Cuando un puzzle sale de una partida real, se pone en su campo `source` y la
web la cita. Si no lo lleva, la web avisa de que es una posición de ejemplo.
**No inventar partidas para rellenar ese campo.**

Dentro de `index.html` van incrustados [React](https://react.dev),
[Tailwind CSS](https://tailwindcss.com), el motor
[chess.js](https://github.com/jhlywa/chess.js) y el juego de piezas, así que la
página no hace ninguna petición a internet.

## Créditos

Las piezas son el juego **Cburnett**, el mismo que usa Lichess. Obra de
[Cburnett](https://en.wikipedia.org/wiki/User:Cburnett) y
[Rfc1394](https://en.wikipedia.org/wiki/User:Rfc1394) en
[Wikimedia Commons](https://commons.wikimedia.org/wiki/Category:SVG_chess_pieces/Standard),
bajo licencia [CC BY-SA 3.0](https://creativecommons.org/licenses/by-sa/3.0/).
El sprite viene empaquetado por
[cm-chessboard](https://github.com/shaack/cm-chessboard) (MIT) y está en
`img/piezas-cburnett.svg` con su cabecera de licencia intacta.

La licencia es gratuita y permite uso comercial. Sólo exige dos cosas: citar a
los autores (hecho aquí y en el pie de la web) y que si alguien modifica las
piezas, las publique bajo la misma licencia.
