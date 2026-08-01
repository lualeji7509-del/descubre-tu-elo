# RETOMAR — dónde nos quedamos

> Última sesión: **1 de agosto de 2026**.
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
- 9 puzzles verificados: 5 de nivel WFM (1000–1600) y 4 de nivel GM (2050–2400).
- ELO estimado calculado a partir de la dificultad real de cada puzzle.
- Bilingüe español / inglés con selector; arranca en el idioma del móvil.
- Piezas Cburnett, las mismas que usan ellos en Instagram.
- Fotos de los dos y la foto conjunta de la Torre Eiffel.
- Secciones: portada, Los maestros, El reto, Historia, Consejos, Clases,
  En directo y pie con derechos reservados.
- Un solo archivo `index.html` sin ninguna petición a internet.

**En curso:** nada abierto. La sesión se cerró esperando respuesta de ellos.

**Pendiente, y depende de ELLOS (no de programar):**

1. **Precios y forma de reserva de las clases.** Ahora la web dice que se
   acuerda por mensaje privado y enlaza al DM de Manuela. No hay precios
   inventados y no debe haberlos hasta que ella los dé.
2. **Canales de Twitch o YouTube.** La sección «En directo» enlaza a sus
   perfiles de Instagram y avisa de que si comparten canal, aparecerá ahí.
   No inventar canales.
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
| `test-e2e.cjs` | Pruebas de navegador. |
| `index.html` | **Generado.** No se edita a mano. |

---

## Por dónde retomar

Cuando ellos contesten: meter precios y canales en `src/app.jsx` (objeto `T`),
y la partida de Manuela en `puzzles.js`. Nada más está bloqueado.
