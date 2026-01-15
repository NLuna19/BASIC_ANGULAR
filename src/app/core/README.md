# Core Module

## Descripción

El módulo Core contiene servicios, guards e interceptadores **singleton** que se usan globalmente en toda la aplicación. Este módulo debe importarse **una sola vez** en la configuración principal de la app.

## Objetivo

Centralizar la lógica de negocio global, autenticación, manejo de errores y configuración de HTTP que necesita estar disponible en toda la aplicación.

## Qué Debería Contener

- **services/** - Servicios globales (API, Auth, Logger, Storage)
- **guards/** - Route Guards (Auth, Role, UnsavedChanges)
- **interceptors/** - Interceptadores HTTP (Error, Auth, Loading)
- **constants/** - Constantes globales de la aplicación

## ✅ Reglas Importantes

- Se importa **una sola vez** en `app.config.ts`
- Contiene lógica **global y reutilizable**
- NO debe tener dependencias de features específicos
- Servicios con `providedIn: 'root'` (singletons)
