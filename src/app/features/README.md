# Features Module

## Descripción

La carpeta Features contiene módulos **independientes y lazy-loaded** que representan diferentes áreas de funcionalidad. Cada feature es autocontenido con su propia lógica de negocio.

## Objetivo

Organizar la aplicación por funcionalidades permitiendo que cada feature sea independiente, reutilizable y cargado bajo demanda para mejor performance.

## Estructura de Cada Feature

```
features/nombre/
├── components/      # UI específica del feature
├── pages/           # Contenedores/Páginas
├── services/        # Servicios específicos
├── models/          # Interfaces específicas
├── nombre.module.ts
└── nombre-routing.module.ts
```

## Ejemplos de Features

dashboard, users, products, orders, settings, auth, analytics

## ✅ Reglas Importantes

- Completamente independientes
- Lazy-loaded automáticamente
- Pueden usar componentes de `shared/`
- Pueden usar servicios de `core/`
- **NUNCA** tener dependencias entre features
