# Cómo subir tus propios retos

### Para Manuela y José Gabriel · *For Manuela and José Gabriel*

No hace falta saber programar ni instalar nada. Se hace desde el navegador,
también desde el móvil. Cinco minutos la primera vez, uno las siguientes.

---

## Antes de empezar (una sola vez)

1. Abre una cuenta gratis en <https://github.com/signup>.
2. Pásale tu nombre de usuario a Luis para que te dé acceso.
3. Acepta la invitación que te llegará por correo.

> **Ojo:** el repositorio es público. Todo lo que subas lo puede leer
> cualquiera. Nada de teléfonos, direcciones ni partidas sin publicar.

---

## Añadir un reto

### 1 · Saca la posición

Entra en <https://lichess.org/editor>, coloca las piezas arrastrando y elige
de quién es el turno. Abajo verás un texto largo como este:

```
1r1q3k/p5pp/8/4N3/8/8/5PPP/6K1 w - - 0 1
```

Eso es el **FEN**. Cópialo.

### 2 · Abre el archivo de los retos

👉 <https://github.com/lualeji7509-del/descubre-tu-elo/edit/main/puzzles.js>

Ese enlace abre el archivo listo para escribir.

### 3 · Copia un bloque y cámbialo

Busca un puzzle cualquiera, copia el bloque entero y pega una copia debajo.
Luego cambia los valores:

```js
  {
    level: 'wfm',                    // 'wfm' o 'gm'
    rating: 1300,                    // dificultad, en ELO
    fen: 'PEGA-AQUÍ-TU-FEN',
    solution: ['Nf7+', 'Kg8', 'Nxd8'],
    theme:   { es: 'Tenedor de caballo', en: 'Knight fork' },
    explain: {
      es: 'Por qué funciona la jugada.',
      en: 'Why the move works.',
    },
  },
```

**Lo único delicado son las jugadas de `solution`.** Se escriben **siempre con
las letras inglesas**: `K` rey, `Q` dama, `R` torre, `B` alfil, `N` caballo.
La web las traduce sola al español al mostrarlas.

Se alternan: la primera la juega quien resuelve, la segunda es la respuesta del
rival, la tercera otra vez quien resuelve. Si el reto es de una sola jugada,
pon una sola.

### 4 · Guarda

Baja hasta abajo, escribe en una línea qué has hecho («Añado mi partida de
Aix-en-Provence») y pulsa **Commit changes**.

---

## Qué pasa después

En cuanto guardas, un programa revisa tu reto con un **motor de ajedrez de
verdad**. Comprueba tres cosas:

1. Que todas las jugadas son legales.
2. Que si dices que es mate (`#`), es mate de verdad.
3. Que **no hay otra solución igual de buena**. Un puzzle con dos respuestas no
   sirve para medir a nadie.

**Si algo está mal, la web no se toca.** Sigue funcionando con la versión
anterior y te llega un aviso por correo. No puedes romper nada.

**Si está todo bien**, la web se actualiza sola en un par de minutos:
<https://lualeji7509-del.github.io/descubre-tu-elo/>

Puedes ver cómo va en la pestaña
[Actions](https://github.com/lualeji7509-del/descubre-tu-elo/actions):
✅ verde es publicado, ❌ rojo es que algo falla y ahí pone qué.

---

## Cambiar tu biografía o los textos

Están todos juntos en `src/app.jsx`, dentro de un bloque llamado `T`, en dos
idiomas. Se editan igual que los puzzles y se publican igual de solos.

👉 <https://github.com/lualeji7509-del/descubre-tu-elo/edit/main/src/app.jsx>

Hay más cosas alrededor que en el archivo de puzzles, así que ve con cuidado:
cambia sólo el texto **entre comillas** y no toques comas, llaves ni corchetes.
Si se rompe algo, no pasa nada: la web sigue con la versión buena y se puede
volver atrás con un clic.

---

## Si te atascas

Escríbele a Luis con la posición y la solución y te lo mete él. Empezar por ahí
las primeras veces es perfectamente razonable.
