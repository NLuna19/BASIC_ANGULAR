# 🏗️ Estructura Completa del Proyecto

## Árbol de Carpetas Completo

```
basic-angular/
│
├── 📄 README.md                      ← Documentación principal
├── 📄 GETTING_STARTED.md             ← Guía de inicio rápido
├── 📄 BEST_PRACTICES.md              ← Buenas prácticas
├── 📄 FEATURE_EXAMPLE.md             ← Ejemplo de feature
├── 📄 QUICK_REFERENCE.md             ← Referencia rápida
├── 📄 STRUCTURE.md                   ← Este archivo
│
├── 📄 angular.json                   ← Configuración de Angular CLI
├── 📄 tsconfig.json                  ← Configuración base de TypeScript
├── 📄 tsconfig.app.json              ← Configuración TypeScript para app
├── 📄 tsconfig.spec.json             ← Configuración TypeScript para tests
├── 📄 package.json                   ← Dependencias del proyecto
├── 📄 package-lock.json              ← Lock file de npm
│
├── 📁 public/                        ← Archivos estáticos públicos
│   └── favicon.ico
│
├── 📁 src/                           ← Código fuente principal
│   │
│   ├── 📁 app/                       ← Código de la aplicación
│   │   │
│   │   ├── 📁 core/                  ← [CORE MODULE] Singleton - Importar UNA SOLA VEZ
│   │   │   │
│   │   │   ├── 📁 constants/         ← Constantes globales
│   │   │   │   └── 📄 app.constants.ts
│   │   │   │
│   │   │   ├── 📁 services/          ← Servicios globales
│   │   │   │   ├── 📄 base-api.service.ts       ← Base service reutilizable
│   │   │   │   ├── 📄 auth.service.ts          ← [CREAR] Servicio de autenticación
│   │   │   │   ├── 📄 http.service.ts          ← [CREAR] Servicio HTTP
│   │   │   │   └── 📄 logging.service.ts       ← [CREAR] Servicio de logging
│   │   │   │
│   │   │   ├── 📁 interceptors/      ← Interceptores HTTP
│   │   │   │   ├── 📄 error.interceptor.ts     ← [CREAR] Manejo de errores
│   │   │   │   ├── 📄 auth.interceptor.ts      ← [CREAR] Agregar token
│   │   │   │   └── 📄 loading.interceptor.ts   ← [CREAR] Indicador de loading
│   │   │   │
│   │   │   ├── 📁 guards/            ← Route Guards
│   │   │   │   ├── 📄 auth.guard.ts           ← [CREAR] Proteger rutas
│   │   │   │   ├── 📄 role.guard.ts           ← [CREAR] Validar roles
│   │   │   │   └── 📄 unsaved-changes.guard.ts ← [CREAR] Cambios sin guardar
│   │   │   │
│   │   │   ├── 📄 core.module.ts              ← Módulo Core
│   │   │   └── 📄 .gitkeep                    ← Placeholder
│   │   │
│   │   ├── 📁 shared/                ← [SHARED MODULE] Reutilizable - Importar en Features
│   │   │   │
│   │   │   ├── 📁 components/        ← Componentes compartidos
│   │   │   │   ├── 📁 header/
│   │   │   │   │   ├── 📄 header.component.ts
│   │   │   │   │   ├── 📄 header.component.html
│   │   │   │   │   ├── 📄 header.component.css
│   │   │   │   │   └── 📄 header.component.spec.ts
│   │   │   │   │
│   │   │   │   ├── 📁 footer/
│   │   │   │   │   └── (Estructura similar a header)
│   │   │   │   │
│   │   │   │   ├── 📁 button/
│   │   │   │   │   └── (Estructura similar)
│   │   │   │   │
│   │   │   │   ├── 📁 modal/
│   │   │   │   │   └── (Estructura similar)
│   │   │   │   │
│   │   │   │   ├── 📁 navbar/
│   │   │   │   │   └── (Estructura similar)
│   │   │   │   │
│   │   │   │   └── [AGREGAR MÁS COMPONENTES SEGÚN NECESITES]
│   │   │   │
│   │   │   ├── 📁 directives/       ← Directivas personalizadas
│   │   │   │   ├── 📄 highlight.directive.ts
│   │   │   │   ├── 📄 highlight.directive.spec.ts
│   │   │   │   ├── 📄 autofocus.directive.ts
│   │   │   │   └── 📄 [CREAR MÁS DIRECTIVAS]
│   │   │   │
│   │   │   ├── 📁 pipes/            ← Pipes personalizados
│   │   │   │   ├── 📄 safe-html.pipe.ts
│   │   │   │   ├── 📄 safe-html.pipe.spec.ts
│   │   │   │   ├── 📄 custom-currency.pipe.ts
│   │   │   │   └── 📄 [CREAR MÁS PIPES]
│   │   │   │
│   │   │   ├── 📁 models/           ← Interfaces y modelos compartidos
│   │   │   │   ├── 📄 base.model.ts          ← Modelos base
│   │   │   │   ├── 📄 user.model.ts         ← [CREAR]
│   │   │   │   ├── 📄 api-response.model.ts ← [CREAR]
│   │   │   │   └── 📄 [CREAR MÁS MODELOS]
│   │   │   │
│   │   │   ├── 📄 shared.module.ts          ← Módulo Shared
│   │   │   └── 📄 .gitkeep
│   │   │
│   │   ├── 📁 features/              ← [FEATURE MODULES] Lazy Loaded - Cada feature es independiente
│   │   │   │
│   │   │   ├── 📁 dashboard/                ← EJEMPLO: Feature Dashboard
│   │   │   │   ├── 📁 components/
│   │   │   │   │   └── 📁 stats-card/
│   │   │   │   │       ├── 📄 stats-card.component.ts
│   │   │   │   │       ├── 📄 stats-card.component.html
│   │   │   │   │       ├── 📄 stats-card.component.css
│   │   │   │   │       └── 📄 stats-card.component.spec.ts
│   │   │   │   │
│   │   │   │   ├── 📁 pages/
│   │   │   │   │   └── 📁 dashboard-page/
│   │   │   │   │       ├── 📄 dashboard-page.component.ts
│   │   │   │   │       ├── 📄 dashboard-page.component.html
│   │   │   │   │       ├── 📄 dashboard-page.component.css
│   │   │   │   │       └── 📄 dashboard-page.component.spec.ts
│   │   │   │   │
│   │   │   │   ├── 📁 services/
│   │   │   │   │   ├── 📄 dashboard.service.ts
│   │   │   │   │   └── 📄 dashboard.service.spec.ts
│   │   │   │   │
│   │   │   │   ├── 📁 models/
│   │   │   │   │   └── 📄 dashboard.model.ts
│   │   │   │   │
│   │   │   │   ├── 📄 dashboard.module.ts
│   │   │   │   └── 📄 dashboard-routing.module.ts
│   │   │   │
│   │   │   ├── 📁 users/             ← EJEMPLO: Feature Users (Misma estructura que dashboard)
│   │   │   │   ├── 📁 components/
│   │   │   │   ├── 📁 pages/
│   │   │   │   ├── 📁 services/
│   │   │   │   ├── 📁 models/
│   │   │   │   ├── 📄 users.module.ts
│   │   │   │   └── 📄 users-routing.module.ts
│   │   │   │
│   │   │   ├── 📁 products/         ← [AGREGAR MÁS FEATURES SEGÚN NECESITES]
│   │   │   ├── 📁 orders/
│   │   │   ├── 📁 settings/
│   │   │   │
│   │   │   └── 📄 .gitkeep
│   │   │
│   │   ├── 📁 layouts/               ← Componentes de Layout/Template
│   │   │   │
│   │   │   ├── 📁 main-layout/       ← Layout principal
│   │   │   │   ├── 📄 main-layout.component.ts
│   │   │   │   ├── 📄 main-layout.component.html
│   │   │   │   └── 📄 main-layout.component.css
│   │   │   │
│   │   │   ├── 📁 auth-layout/       ← Layout para autenticación
│   │   │   │   ├── 📄 auth-layout.component.ts
│   │   │   │   ├── 📄 auth-layout.component.html
│   │   │   │   └── 📄 auth-layout.component.css
│   │   │   │
│   │   │   └── [AGREGAR MÁS LAYOUTS SEGÚN NECESITES]
│   │   │
│   │   ├── 📄 app.ts                ← Componente raíz
│   │   ├── 📄 app.html              ← Template raíz
│   │   ├── 📄 app.css               ← Estilos globales
│   │   ├── 📄 app.spec.ts           ← Tests del componente root
│   │   ├── 📄 app.routes.ts         ← Rutas principales
│   │   ├── 📄 app.config.ts         ← Configuración de la app
│   │   └── 📄 app.config.example.ts ← Ejemplo de configuración
│   │
│   ├── 📁 assets/                   ← Archivos estáticos
│   │   ├── 📁 images/               ← Imágenes
│   │   │   ├── logo.png
│   │   │   └── [AGREGAR MÁS IMÁGENES]
│   │   │
│   │   ├── 📁 icons/                ← Iconos
│   │   │   └── [AGREGAR ICONOS SVG]
│   │   │
│   │   └── 📄 .gitkeep
│   │
│   ├── 📁 environments/              ← Configuración por entorno
│   │   ├── 📄 environment.ts        ← Variables de desarrollo
│   │   └── 📄 environment.prod.ts   ← Variables de producción
│   │
│   ├── 📄 main.ts                   ← Punto de entrada de la aplicación
│   ├── 📄 index.html                ← Página HTML principal
│   ├── 📄 styles.css                ← Estilos globales
│   └── 📄 favicon.ico               ← Favicon
│
├── 📁 node_modules/                 ← Dependencias instaladas (NO EDITAR)
│
├── 📁 dist/                         ← Salida de build (NO EDITAR, se genera automáticamente)
│   └── basic-angular/
│       ├── index.html
│       ├── main.js
│       ├── styles.css
│       └── [OTROS ARCHIVOS DE BUILD]
│
├── 📁 .git/                         ← Repositorio de git
├── 📁 .vscode/                      ← Configuración de VS Code
│
└── 📁 docs/                         ← [OPCIONAL] Documentación adicional
    ├── ARCHITECTURE.md
    ├── API_INTEGRATION.md
    ├── TESTING.md
    └── DEPLOYMENT.md
```

## 📋 Descripción de Cada Carpeta

### `src/app/core/`
**Propósito:** Servicios, interceptores y guards singleton que se usan en toda la aplicación.

**Características:**
- Se importa una sola vez
- Contiene lógica global
- No debe ser importado en features

**Contenido típico:**
- `services/` - HTTP, autenticación, logging
- `interceptors/` - Manejo de tokens, errores, loading
- `guards/` - Protección de rutas
- `constants/` - Constantes globales

### `src/app/shared/`
**Propósito:** Componentes, directivas, pipes y modelos reutilizables.

**Características:**
- Se importa en los features que lo necesiten
- Contiene elementos sin lógica específica de negocio
- Debe ser agnóstico de dominio

**Contenido típico:**
- `components/` - Button, Modal, Alert, Card, etc.
- `directives/` - Highlight, Autofocus, etc.
- `pipes/` - SafeHtml, CustomCurrency, etc.
- `models/` - Interfaces y tipos comunes

### `src/app/features/`
**Propósito:** Módulos independientes con lógica de negocio específica.

**Características:**
- Cada feature es un módulo independiente
- Se cargan bajo demanda (lazy-loaded)
- Pueden tener sus propios servicios, componentes, etc.
- Deben ser lo más independientes posible

**Estructura de cada feature:**
- `components/` - Componentes específicos del feature
- `pages/` - Componentes de página/contenedor
- `services/` - Servicios específicos del feature
- `models/` - Interfaces específicas del feature
- `<nombre>.module.ts` - Módulo del feature
- `<nombre>-routing.module.ts` - Rutas del feature

### `src/app/layouts/`
**Propósito:** Componentes que definen la estructura visual de la aplicación.

**Típicamente contiene:**
- `main-layout/` - Header, sidebar, footer
- `auth-layout/` - Solo para login/registro
- `admin-layout/` - Para panel administrativo

### `src/assets/`
**Propósito:** Archivos estáticos como imágenes, iconos, etc.

**Estructura:**
- `images/` - Imágenes PNG, JPG, etc.
- `icons/` - Iconos SVG
- `fonts/` - Fuentes personalizadas

### `src/environments/`
**Propósito:** Configuración específica por entorno.

**Contiene:**
```typescript
// Ejemplo: environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  apiTimeout: 30000,
};
```

## 🔗 Relaciones Entre Módulos

```
app.ts (Root Component)
  ↓
  ├→ layouts/main-layout/ (Estructura visual)
  │   ├→ shared/components/ (Header, Navbar)
  │   └→ router-outlet → features/
  │
  ├→ features/dashboard (Lazy loaded)
  │   ├→ shared/components (Button, Card, etc.)
  │   ├→ shared/pipes (SafeHtml, etc.)
  │   └→ core/services (ApiService, AuthService)
  │
  └→ features/users (Lazy loaded)
      ├→ shared/components
      ├→ shared/models
      └→ core/services
```

## ✨ Reglas de Oro

1. **Core Module** → Importar UNA sola vez (en app.module o app.config)
2. **Shared Module** → Importar en cada feature que lo necesite
3. **Features** → Completamente independientes y lazy-loaded
4. **Rutas** → Definidas en routing.module.ts de cada feature
5. **Servicios** → Colocar en core si es global, en feature si es específico
6. **Componentes** → En shared si es reutilizable, en feature si es específico

## 🎯 Ejemplo de Dependencias Correctas

```
❌ INCORRECTO:
feature-a/ → usa componente de feature-b/
feature-b/ → usa componente de feature-a/ → Circular dependency

✅ CORRECTO:
feature-a/ → usa componente de shared/ → usa servicio de core/
feature-b/ → usa componente de shared/ → usa servicio de core/
```

---

**Última actualización:** Enero 2026
