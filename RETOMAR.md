# RETOMAR — dónde nos quedamos

> Última sesión: **4 de agosto de 2026**.
> Léelo antes de tocar nada. Resume el estado real del proyecto.

---

## Qué es esto

Web pública de ajedrez con la **WFM Manuela Hernández** (2020) y el
**GM José Gabriel Cardoso** (2518). Test de ELO con tablero jugable, historia
de los mates, consejos, clases y enlaces a sus redes.

**Enlace en vivo:** <https://lualeji7509-del.github.io/descubre-tu-elo/>
Se publica solo: cada `git push` a `main` actualiza la web en 1–2 minutos.

---

## ESTADO ACTUAL

**Hecho y publicado:**

- Tablero jugable de verdad (tocar o arrastrar), con validación por motor.
- **Colores del tablero corregidos.** Estaban al revés: la fórmula pintaba
  a1 clara y h1 oscura. La norma real de cualquier tablero (la que siguen
  lichess y todo tablero físico) es «casilla clara a la DERECHA de cada
  jugador»: a1 oscura, h1 clara — y por tanto también h8 oscura / a8 clara
  cuando juegan las negras. Comprobado con el color de fondo real en
  navegador, en los dos casos (blancas y negras).
- **Se puede volver a elegir maestro en pleno reto.** Antes, una vez dentro
  de un problema no había forma de volver a «Elige tu nivel» sin recargar
  la página; el botón «Cambiar de nivel» sólo aparecía al terminar los 5/6.
  Ahora está también arriba del tablero, en todo momento.
- **Menú «ir directo a un problema»**: antes había que resolverlos en orden
  para llegar al siguiente; ahora hay una fila de números que salta a
  cualquiera directamente (los resueltos se marcan con ✓, sin enseñar el
  tema — no da pistas). Surgió porque Manuela no encontraba su propio
  puzzle nuevo entre los demás. «Siguiente problema» sigue existiendo y
  ahora lleva siempre a uno sin resolver, venga de donde venga el salto.
- 11 puzzles verificados: 5 de nivel WFM (1000–1600) y 6 de nivel GM
  (2050–2400). El décimo lo mandó José Gabriel de verdad, con el formulario,
  y el undécimo lo mandó Manuela: una combinación real suya de jaques
  forzados (2300) contra Susana de Prada, Open Internacional de Benasque
  2026 — gana material/partida, no es mate.
- Cada puzzle dice qué consigue (`outcome`): mate, gana material, o tablas.
  Los mates se comprueban con el motor al 100%; las tablas no —haría falta
  una tabla de finales, no disponible aquí— así que esas se publican
  confiando en el criterio de quien las manda.
- ELO estimado calculado a partir de la dificultad real de cada puzzle.
- Bilingüe español / inglés con selector; arranca en el idioma del móvil.
- Piezas Cburnett, las mismas que usan ellos en Instagram.
- Fotos de los dos y la foto conjunta de la Torre Eiffel.
- Secciones: portada, Los maestros, El reto, Historia, Consejos, Clases,
  En directo (ya menciona TikTok) y pie con derechos reservados.
- **Vista previa al compartir el enlace** (`og.png`): al pegarlo en WhatsApp
  sale con foto y titular, no como una línea de texto sola. Cómo rehacerla:
  [`og/LEEME.md`](og/LEEME.md).
- **`aportar.html`**: formulario para que Manuela y José Gabriel manden sus
  propios retos sin tocar código ni GitHub. No está enlazado desde la
  portada a propósito — es una herramienta para ellos dos, no pública.
  Enlace: <https://lualeji7509-del.github.io/descubre-tu-elo/aportar.html>
- Los botones de «Consultar disponibilidad» en Clases ya no escriben siempre
  a Manuela: bajan a elegir con quién.
- **Los dos maestros enlazan ya su ficha FIDE** en «Los maestros». La de José
  Gabriel faltaba (`fide: null`) y se añadió el 4 de agosto.
- **«En directo» enlaza ya el TikTok de los dos**, además de Instagram —
  confirmados con captura antes de añadirlos, no adivinados por parecerse al
  usuario de Instagram.
- Un solo archivo `index.html` sin ninguna petición a internet (la web en
  sí; `aportar.html` y `og.png` son archivos aparte, ver «Los archivos»).

**En curso:** nada abierto. Esperando que José Gabriel confirme que ve su
puzzle bien en la web — si dice que no, revisar primero si de verdad se
publicó (el aviso de despliegue de GitHub tardó en confirmarse la última
vez, ver DECISIONES). Manuela ya mandó su primer reto (4 ago, ver arriba);
falta que confirme que lo ve bien en la web, igual que a José Gabriel.

**Aviso para quien retome (4 ago, noche) — tanda de puzzles A MEDIAS, sin
tocar `puzzles.js` todavía:** Luis quiere quitar puzzles genéricos del
nivel GM y montar 4 nuevos que le mandaron José Gabriel y Manuela. Se
verificaron los 4 con el motor (`chess.js`, fuera de `puzzles.js`, sin
publicar nada) y quedaron **3 preguntas sin responder** — no se avanza sin
ellas, no se adivina:

1. **José Gabriel dijo «borrar del 2 en adelante»** en el nivel GM. Sin
   confirmar si es: (a) sólo los 3 mates genéricos (Legado de Philidor
   2200, Mate de Anastasia 2300, Mate de Boden 2400) — dejando el 2050 y
   los DOS reales que ya había (su defensa de torre y el de jaques
   forzados de Manuela de hoy) — o (b) todo desde la posición 2, borrando
   también esos dos reales.
2. **Puzzle de José Gabriel, 1600, «Eliminación»:** `FEN
   r1br2k1/p3pp1p/1q4p1/8/3N4/7P/PP3PP1/R2QR1K1 w - - 0 1`, jugada `Ae6`.
   **Esa jugada no existe** — no hay ningún alfil blanco en el tablero. Se
   comprobó que `Ce6` (el caballo de d4) sí es legal y sí gana material
   (ataca dos veces la torre de d8: con el caballo y, al destaparla, con
   la dama). Falta que José Gabriel confirme que quiso decir `Ce6`.
3. **Puzzle de Manuela, 2000, «Amenaza de mate / jugada intermedia»:**
   `FEN 1k6/4R1pp/r1P5/8/2Np3P/p1nP2P1/5PK1/8 b - - 0 0`. El FEN tiene DOS
   fallos de escritura: dice que mueven negras (`b`) pero su jugada 1 es
   un jaque de TORRE BLANCA (`1.Tb7+`), y el contador de jugada está en
   `0` (imposible, empieza en 1). Corrigiendo a `w - - 0 1`, toda su
   secuencia (`Tb7+ Ra8 Cb6+ Txb6 Txb6 Ra7 Tb7+`) es legal y termina
   exactamente como ella explica (peón c avanzado, posición ganadora).
   Falta que confirme esa lectura.

**Los otros dos SÍ están verificados y listos para meter en cuanto se
resuelva el punto 1** (dónde va cada uno en el array):

- **José Gabriel, 2300, «Desviación»:** `FEN
  8/2B3p1/7b/7p/7k/2q4P/Q5P1/7K w - - 0 1`, jugadas `Qf7 Be3 Qe7 g5 Kh2
  Bg1 Kxg1 Qc1 Qe1 Qxe1 Kh2 Qf2 Bd6 Qf4 g3 Qxg3 Bxg3`. ⚠️ **Ojo:** José
  Gabriel puso «gana material o la partida», pero el motor confirma que
  **es mate de verdad** (`Bxg3#`). Va con `outcome: 'mate'` y la última
  jugada con `#`, no como `'win'`.
- **José Gabriel, 2000, «Jaques forzados» / peón pasado:** `FEN
  8/6kp/3PQ1p1/8/1P6/1K6/3r2PP/2r5 w - - 0 1`, jugadas `Qe7 Kg8 Qd8 Kg7
  Qc7`. La última jugada da jaque Y ataca la torre de c1 a la vez (doble
  amenaza). `outcome: 'win'`, no mate.
- Ninguno de los 4 lleva `source` (partida real) — los cuatro son
  ejemplos construidos por ellos, confirmado explícitamente por cada uno
  al mandarlo.

**Antes de meterlos:** correr `npm run verify` de todas formas (por si al
transcribir a mano se cuela un error nuevo) y `npm run build`, y jugarlo
en un navegador real antes de dar por publicado — es el mismo proceso de
siempre, no hay atajos por venir de ellos directamente.

**Pendiente, y depende de ELLOS (no de programar):**

1. **Precios y forma de reserva de las clases.** Ahora la web dice que se
   acuerda por mensaje privado y deja elegir a quién escribir (Manuela o José
   Gabriel). No hay precios inventados y no debe haberlos hasta que los den.
2. ~~El usuario de TikTok de José Gabriel~~ → **hecho el 4 ago**: los dos
   TikTok (`wfm_manuchess` y `gmcardosolab`) confirmados por Luis con
   capturas del perfil real (bio y foto coinciden) y enlazados en «En
   directo», junto al de Instagram.
3. **La partida de Manuela en el Open de Aix-en-Provence.** Publicó la
   posición en Instagram (Jonathan Pierre-Mauzole 1696 vs WFM Manuela
   Hernández 1921, 0-1, «encuentra la táctica de 1 jugada»). Si pasa la
   posición y su análisis, se convierte en puzzle con su nombre en el
   marcador. Sería lo que convierte la web en *suya* y no sólo de Luis.
4. **Que sepan que se usaron sus fotos.** Se recortaron de sus perfiles
   públicos, no las cedieron ellos. Avisarles antes de repartir el enlace.

**Pendiente, decisión de Luis:**

5. **Cerrar el PR #1 de `lualeji7509-del/quiz-juanda-sv`.** Contiene una copia
   antigua del proyecto en la carpeta `elo-maestros/`, de cuando vivía dentro
   del repo del quiz sueco. Ahora el proyecto vive aquí. Mantener el mismo
   código en dos sitios acaba dando problemas: lo suyo es cerrarlo.

---

## DECISIONES TOMADAS

- **Piezas en SVG, nunca los símbolos ♔♕♖.** En iPhone, Safari convierte esos
  caracteres en emoji e ignora el color CSS: blancas y negras se veían
  IGUALES y la app era injugable. Lo reportaron ellos. No volver atrás.
- **Juego de piezas Cburnett**, el de Lichess y el de sus publicaciones.
  Licencia CC BY-SA 3.0: gratis y de uso comercial, pero **exige atribución**.
  El crédito está en el pie de la web y en el README. **No borrarlo nunca.**
- **Nada de Chessboard.js.** Lo pedía un prompt, pero necesita jQuery y baja
  las piezas de internet: rompería el archivo único y reintroduciría el fallo
  de iPhone. `chess.js` sí se usa: es el motor de reglas.
- **Paleta: negro casi puro (#08090c) + marfil + un único acento de latón.**
  Se probó la alternativa del prompt (azul pizarra #020617 con dorado y azul)
  y Luis la descartó: en negro puro el tablero destaca más.
- **Un solo acento.** Se quitó el degradado arcoíris de Instagram porque
  competía con el dorado.
- **Las etiquetas WFM y GM van del mismo color.** Son títulos FIDE del mismo
  tipo; colores distintos sugerían una diferencia inexistente.
- **El tema del puzzle no se muestra hasta resolverlo.** Enseñar «Mate de
  Anastasia» antes delata el patrón, que es justo lo que se está midiendo.
- **No se atribuyen los puzzles a Manuela ni a José Gabriel.** Son patrones
  clásicos elegidos para el proyecto. Ellos figuran como protagonistas y como
  referencia de nivel, que es lo cierto.
- **Nunca inventar precios, horarios ni canales.** Son personas reales y sería
  publicar una oferta comercial falsa con su nombre.
- **Verificar el ajedrez antes que la interfaz.** `verify.mjs` se escribió
  ANTES que la app y encontró dos errores reales en los puzzles. Si se manda
  ajedrez malo a un GM de 2518, se acabó la conversación.
- **Cada puzzle dice si termina en mate, gana o tablas (`outcome`).** Surgió
  el 3 de agosto porque el primer puzzle real que mandó José Gabriel salvaba
  tablas, no ganaba ni daba mate, y la web no tenía manera de decirlo.
  Volvió a pasar lo mismo que con `verify.mjs`: al marcar los 9 puzzles
  viejos como `'mate'` sin mirarlos uno a uno, **el propio verificador
  encontró que dos estaban mal etiquetados** (ganan una pieza, no dan mate).
  Las tablas son la única parte que el motor no puede comprobar solo.
- **La ficha FIDE de Manuela** (`ratings.fide.com/profile/4483103`, enlazada
  en la web) la confirmó Luis directamente el 3 de agosto. No se inventó ni
  se dio por buena sin que él la mirara.
- **La ficha FIDE de José Gabriel** (`ratings.fide.com/profile/4430492`) la
  confirmó Luis el 4 de agosto con una captura de la web de FIDE (Cardoso
  Cardoso, Jose Gabriel · 2518 · Grandmaster). Igual que con Manuela: no se
  buscó sola, `ratings.fide.com` está bloqueado desde este entorno.

---

## Cómo trabajar aquí

```bash
npm install        # sólo la primera vez
npm run verify     # comprueba que los puzzles son correctos
npm run build      # regenera index.html
git push           # publica en la web
```

**Para añadir puzzles:** sólo se toca [`puzzles.js`](puzzles.js). Está
comentado en español e inglés. La posición se saca de
<https://lichess.org/editor> arrastrando piezas y copiando el FEN.

**Siempre** `npm run verify` antes de `npm run build`. Comprueba con motor que
cada jugada es legal, que los mates son mate y que **no hay otra solución igual
de buena**.

**Pruebas de navegador:** `node test-e2e.cjs` (necesita Playwright). Son 14
comprobaciones: los dos idiomas, resolver los 5 puzzles moviendo piezas,
el arrastre, el aviso de jugada incorrecta, el resultado y el botón de
compartir. También verifica que la página no hace ninguna petición de red.

**Pruebas del formulario:** `node test-aportar.cjs` (mismo Playwright). Son
15 comprobaciones sobre `aportar.html`: valida que avise sin romperse con
datos vacíos o un FEN mal escrito, que arme el mensaje bien en los tres
casos (mate/gana/tablas) y en las dos ramas de partida real, que el botón
de copiar deje el texto exacto en el portapapeles y que el enlace de
WhatsApp no lleve ningún número fijo.

---

## Los archivos

| Archivo | Qué es |
|---|---|
| `puzzles.js` | **Los ejercicios.** Lo único que se toca normalmente. |
| `src/app.jsx` | Toda la app: tablero, validación, idiomas, secciones, ELO. |
| `img/piezas-cburnett.svg` | Las piezas. Conserva su cabecera de licencia. |
| `img/*.jpg` | Fotos de los maestros. |
| `verify.mjs` | Valida los puzzles con el motor. |
| `build.mjs` | Genera `index.html`. |
| `test-e2e.cjs` | Pruebas de navegador de la web. |
| `aportar.html` | Formulario para que Manuela y José Gabriel manden retos sin código. No enlazado desde la portada. |
| `test-aportar.cjs` | Pruebas de navegador de `aportar.html`. |
| `og/plantilla.html` · `og.png` | La tarjeta con foto que sale al compartir el enlace. Cómo rehacerla: `og/LEEME.md`. |
| `index.html` · `og.png` | **Generados.** No se editan a mano. |

---

## Por dónde retomar

1. **Primero:** confirmar con José Gabriel que ve su puzzle bien en la web
   (mensaje de «¡Tablas conseguidas!», no «¡Resuelto!»).
2. Cuando contesten: meter precios y canales en `src/app.jsx` (objeto `T`),
   el usuario de TikTok de José Gabriel, y la partida de Manuela en
   `puzzles.js`. Nada más está bloqueado.
3. ~~Si Manuela también quiere mandar un reto~~ → **hecho el 4 ago**: mandó
   su combinación real contra Susana de Prada (Benasque 2026), publicada.
   Falta que confirme que la ve bien en la web.
