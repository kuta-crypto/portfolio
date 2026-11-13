# Materiales planetarios

Estas tres imágenes son ilustraciones originales generadas matemáticamente para
este portfolio. No son fotografías de cuerpos reales ni contienen imágenes de
terceros. No se descargan texturas durante la ejecución de la web.

| Archivo | Material | Resolución | Peso aproximado |
| --- | --- | --- | --- |
| `hero.webp` | Gigante gaseoso mineral con anillos | 1200 × 900 | 186 KiB |
| `small.webp` | Luna rocosa, relieve y cráteres | 600 × 600 | 27 KiB |
| `violet.webp` | Gigante atmosférico de tonos fríos | 500 × 500 | 13 KiB |

**Origen:** `scripts/render-planets.py`, incluido en este proyecto. Usa ruido
fractal determinista para el albedo, intersecciones de rayos con una esfera y
un plano para los anillos, sombras mutuas y una sola fuente de luz. Los cráteres
se calculan como relieve; la semilla aleatoria es fija. WebP con transparencia,
supersampling y reducción Lanczos.

**Licencia de estas imágenes originales:** CC0-1.0. Se pueden usar, modificar y
redistribuir, también comercialmente, sin atribución obligatoria. No se modifica
la licencia del resto del proyecto ni la de sus dependencias.

**Regeneración (opcional):** Python 3 con NumPy y Pillow; ejecutar
`python scripts/render-planets.py` desde la raíz. Estas herramientas son sólo
para generar los archivos: no son dependencias de React, Vite ni del navegador.

La inclinación, flotación y rotación tienen contenedores independientes en
`src/Planet.tsx`. Sólo se anima la flotación. La rotación de la imagen queda fija
para mantener la dirección de la iluminación precalculada. La animación se pausa
fuera del viewport, en pestañas ocultas y con `prefers-reduced-motion`.
