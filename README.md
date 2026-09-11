# Nico 420 - Prueba Logica Web

Prototipo de combate tactico por turnos para validar la logica base del juego Nico 420.

## Estructura

- index.html: entrada principal.
- assets/: logos y recursos visuales.
- css/: estilos compilados.
- scss/: fuente de estilos.
- js/: logica del juego.
- pages/: reservado para futuras paginas; actualmente no contiene paginas activas.

## Scripts

- npm run build: compila estilos SCSS a CSS.
- npm run dev: compilacion automatica de SCSS en modo watch.
- npm run build:css: compilacion SCSS -> CSS.
- npm run watch:css: watch de SCSS -> CSS.
- npm run clean:css: elimina css/styles.css.

Los estilos se mantienen en `scss/styles.scss` y `css/styles.css` es el resultado
compilado que consume `index.html`. No se usan estilos inline ni una segunda copia
monolitica de la aplicacion.

## Ejecucion

1. Instalar dependencias:

   npm install

2. Compilar estilos:

   npm run build

3. Abrir index.html en el navegador.

## Notas

- El favicon usa assets/logo.png.
- El header usa assets/ekstudio-logo-sin-fondo-2.png.
