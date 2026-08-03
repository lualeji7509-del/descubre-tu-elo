# La imagen de vista previa (`og.png`)

Es la tarjeta que sale cuando alguien **pega el enlace en WhatsApp, Instagram,
Telegram o X**: foto grande, titular y descripción. Sin ella el enlace aparece
como una línea de texto sola y casi nadie lo abre.

- **La imagen:** `og.png`, en la raíz del proyecto. 1200 × 630 píxeles.
- **La plantilla:** `og/plantilla.html`, que es de donde sale.
- **Las etiquetas** que le dicen a WhatsApp dónde mirar: en `build.mjs`,
  apartado `4d`.

---

## Cambiar la imagen

1. Edita `og/plantilla.html` como cualquier página web.
2. Ábrela en el navegador para ver cómo queda.
3. Haz una captura de **1200 × 630** y guárdala como `og.png` en la raíz.
4. En `build.mjs`, sube el número de `og.png?v=1` → `?v=2`.
   **Este paso no es opcional:** WhatsApp guarda la tarjeta durante días y sin
   cambiar ese número seguiría enseñando la vieja.
5. `npm run build` y subir.

Si tienes Playwright instalado, los pasos 2 y 3 se hacen solos:

```js
const { chromium } = require('playwright');
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 1200, height: 630 } });
  await p.goto('file://' + process.cwd() + '/og/plantilla.html');
  await p.screenshot({ path: 'og.png' });
  await b.close();
})();
```

---

## Comprobar que funciona

No se puede ver desde el propio móvil sin más: hay que preguntárselo a quien
dibuja la tarjeta.

- **WhatsApp / general:** <https://www.opengraph.xyz/>
- **Facebook e Instagram:** <https://developers.facebook.com/tools/debug/>
  (tiene un botón de «Scrape Again» que borra la copia guardada)
- **X / Twitter:** <https://cards-dev.twitter.com/validator>

O directamente: pégate el enlace a ti mismo por WhatsApp y mira qué sale.

---

## Dos cosas que conviene no olvidar

**La imagen sí se descarga de internet, y está bien.** La regla del proyecto es
que *la página* no pida nada a la red, y se sigue cumpliendo: quien baja `og.png`
es el servidor de WhatsApp al construir la tarjeta, no el móvil de quien la
recibe. Al abrir la web, el navegador sigue sin pedir nada.

**La dirección de la imagen va completa** (`https://…/og.png`), nunca relativa.
Una dirección relativa no la sabe resolver quien está leyendo la página desde
fuera.
