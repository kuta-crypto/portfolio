# Portfolio de Jeremias Spataro

Portfolio personal desarrollado con React, TypeScript, Vite y CSS. Infomicro se presenta como proyecto educativo con una vista conceptual, sin conexión a servicios externos.

## Ejecutar

```bash
npm install
npm run dev
```

Abrí la dirección local que muestra Vite. Para generar la versión de producción: `npm run build`.

## Editar contenido

- `src/content.ts`: presentación, textos personales, tecnologías, proyecto, colores de líneas y datos de contacto. Los enlaces de contacto se muestran únicamente cuando agregás valores reales en `contact`.
- `src/App.tsx`: estructura de las secciones y vista conceptual de Infomicro. Para incorporar capturas reales, reemplazá el componente `MapConcept` por una imagen con texto alternativo apropiado y quitá la etiqueta «Vista conceptual».
- `src/styles.css`: tokens semánticos de color, tipografía, espaciados y adaptación responsive.
- `src/Planet.tsx`: cuerpos decorativos, capas de movimiento y pausa de animaciones fuera de pantalla.
- `public/planets/`: imágenes WebP locales; [origen y licencia](public/planets/ORIGIN.md).
- `scripts/render-planets.py`: generador opcional de los materiales, anillos y cráteres (Python, NumPy y Pillow; no se ejecuta en el navegador).
- `index.html` y `public/favicon.svg`: metadatos y favicon.

No hay formulario ni integración con Supabase: el caso de estudio es contenido estático.

## Diseño astronómico

El gigante gaseoso usa luz y sombras precalculadas, con múltiples bandas de anillos
y oclusión por delante y detrás de la esfera. Sobre mí presenta una luna rocosa;
Tecnologías, un planeta atmosférico frío. Las tres imágenes suman aproximadamente
226 KiB y no requieren librerías 3D. Las fuentes siguen siendo Space Grotesk y
DM Sans, servidas por Google Fonts con fallback local.

La flotación es lenta y se pausa fuera del viewport, cuando la pestaña está oculta
y al activar movimiento reducido. La rotación permanece fija para no desplazar
la iluminación precalculada. En móvil, el panel del mapa pasa debajo del plano.
La vista mantiene siempre la aclaración de que es conceptual y sin datos en vivo.

Para validar producción sin sobrescribir `dist`, se puede ejecutar:

```bash
npm run build -- --outDir .impeccable/build-preview
```

Las capturas y comprobaciones locales se guardan en `.impeccable/review/` (ignorado
por Git). Los datos personales, autores y contactos se mantienen en `src/content.ts`.

## GitHub Pages (preparación)
El proyecto usa rutas relativas para funcionar bajo el nombre del repositorio.
En Settings > Pages seleccionar GitHub Actions. El workflow Publicar portfolio
se ejecuta manualmente desde Actions > Run workflow, una vez listas las imágenes.
No publica automáticamente al subir cambios. El contenido publicado es dist/.

## Fotos pendientes
Ver public/images/README.md y src/media.ts. Agregar retrato y capturas reales.
La galería reemplaza la vista conceptual cuando hay capturas configuradas.
Antes de entregar: completar contactos que se quieran hacer públicos, publicar
Pages y anotar URL pública y URL del repositorio en la ficha del trabajo.
Estética: temática espacial oscura. Interactividad: menú móvil desplegable y
animaciones que respetan la preferencia de movimiento reducido.
