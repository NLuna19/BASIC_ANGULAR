# Assets Folder

## Descripción

La carpeta Assets contiene **archivos estáticos** que se sirven directamente sin procesar. Incluye imágenes, iconos, fuentes personalizadas y otros recursos que la aplicación necesita.

## Objetivo

Centralizar todos los recursos estáticos en un lugar único, organizado por tipo, para facilitar el mantenimiento y acceso desde templates e CSS.

## Qué Debería Contener

- **images/** - Logo, favicon, hero, fotos (PNG, JPG, WebP)
- **icons/** - Iconos SVG personalizados
- **fonts/** - Fuentes personalizadas (WOFF2, WOFF)
- **videos/** - Videos embebidos
- **data/** - Archivos JSON estáticos

## Cómo Usar

```html
<img src="assets/images/logo.png" alt="Logo">
<img src="assets/icons/user.svg" alt="User">
<link href="assets/fonts/roboto.woff2" rel="preload">
```

## 🚀 Se copian automáticamente en build
## ✅ Comprimir imágenes antes de subir
