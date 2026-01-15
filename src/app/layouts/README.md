# Layouts Module

## Descripción

La carpeta Layouts contiene componentes de **estructura visual y plantilla** que definen el esquema general. Los layouts envuelven el contenido del router con `<router-outlet>`.

## Objetivo

Proporcionar diferentes estructuras visuales para diferentes secciones de la aplicación (autenticación, contenido principal, administración, etc).

## Qué Debería Contener

- **main-layout/** - Header, Sidebar, Footer + router-outlet
- **auth-layout/** - Página limpia para login/registro
- **admin-layout/** - Layout específico para administración
- **blank-layout/** - Sin decoraciones (404, 500)

## Estructura Típica

```
layouts/main-layout/
├── main-layout.component.ts
├── main-layout.component.html
├── main-layout.component.css
└── main-layout.component.spec.ts
```

## ✅ Reglas Importantes

- Pueden usar componentes de `shared/`
- Contienen `<router-outlet>` para el contenido
- Pueden tener lógica de navegación
- Simples y enfocados en estructura
