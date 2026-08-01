/* Piezas de ajedrez dibujadas en SVG.
   Chess pieces drawn as SVG.

   ¿Por qué no se usan los símbolos ♔♕♖ de siempre?
   Porque en iPhone el navegador los convierte en emoji e ignora el color:
   las blancas y las negras salían IGUALES. Dibujadas así siempre se
   distinguen, en cualquier teléfono.

   Why not the usual ♔♕♖ characters? Because iOS turns them into emoji and
   ignores CSS colour, so white and black pieces looked identical. Drawn as
   SVG they always read correctly, on any phone.

   Lienzo / canvas: 45 × 45                                                */

export const PIECE_PATHS = {
  p: [
    'M22.5 8.5a5 5 0 0 1 2.9 9.1c2.7 1.5 4.6 4 4.6 7 0 2.6-1.2 4.4-2.4 5.9H17.4c-1.2-1.5-2.4-3.3-2.4-5.9 0-3 1.9-5.5 4.6-7a5 5 0 0 1 2.9-9.1z',
    'M13.5 30.5h18c1.3 2.3 2 4.2 2 6h-22c0-1.8.7-3.7 2-6z',
  ],
  r: ['M12 12h4.5v3.2h4V12h4v3.2h4V12H33v8.5H12z', 'M15.5 20.5h14l1.6 12h-17.2z', 'M11.5 32.5h22v5h-22z'],
  n: [
    'M13 37c0-6 1-10 4-13l-5 1.5-1-4 4-2c1-6 6-10.5 12-11.5L26 3l3 5c3.5 2 5 6 5 11 0 6-.5 12-1.5 18z',
    'M23.6 16.2a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z',
  ],
  b: [
    'M22.5 4.6a2.4 2.4 0 1 1 0 4.8 2.4 2.4 0 0 1 0-4.8z',
    'M22.5 9.4c3.7 0 6.7 4.1 6.7 8.8 0 3.3-1.4 5.6-2.9 7.2h-7.6c-1.5-1.6-2.9-3.9-2.9-7.2 0-4.7 3-8.8 6.7-8.8z',
    'M17 25.4h11c1.7 1.5 2.7 3.5 3.1 5.8H13.9c.4-2.3 1.4-4.3 3.1-5.8z',
    'M11.8 32.2h21.4v5H11.8z',
    'M24.8 12.4l-4.2 5',
  ],
  q: [
    'M11.8 32.5 9.8 15l6.6 5.4 3.1-9.1 3 9.6 3-9.6 3.1 9.1L35.2 15l-2 17.5z',
    'M12.6 33.5h19.8v4h-19.8z',
    'M9.8 12.6a2.1 2.1 0 1 1 0 4.2 2.1 2.1 0 0 1 0-4.2zM16.4 8.8a2.1 2.1 0 1 1 0 4.2 2.1 2.1 0 0 1 0-4.2zM22.5 7a2.1 2.1 0 1 1 0 4.2A2.1 2.1 0 0 1 22.5 7zM28.6 8.8a2.1 2.1 0 1 1 0 4.2 2.1 2.1 0 0 1 0-4.2zM35.2 12.6a2.1 2.1 0 1 1 0 4.2 2.1 2.1 0 0 1 0-4.2z',
  ],
  k: [
    'M22.5 5.5v7M19.2 8.4h6.6',
    'M22.5 13.6c-4.6 0-8.1 3-8.1 6.5 0 2.4 1.7 4.1 4 4.1 1.8 0 3.3-1.1 4.1-2.7.8 1.6 2.3 2.7 4.1 2.7 2.3 0 4-1.7 4-4.1 0-3.5-3.5-6.5-8.1-6.5z',
    'M14.2 24.4c1.8 3 3 5.6 3 8.1h10.6c0-2.5 1.2-5.1 3-8.1z',
    'M12.4 33h20.2v4.5H12.4z',
  ],
};

/* La cruz del rey se dibuja con línea, no con relleno. */
export const STROKE_ONLY = { k: [0], b: [4] };
