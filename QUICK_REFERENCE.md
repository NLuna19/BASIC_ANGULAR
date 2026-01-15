# 🚀 Angular Plantilla - Referencia Rápida

## 📁 Estructura Visual de Carpetas

```
basic-angular/
│
├── 📄 README.md                    ← Documentación principal
├── 📄 BEST_PRACTICES.md            ← Guía de buenas prácticas
├── 📄 FEATURE_EXAMPLE.md           ← Ejemplo de feature completo
├── 📄 QUICK_REFERENCE.md           ← Este archivo
│
├── 📦 src/
│   │
│   ├── 📁 app/                     ← Código de la aplicación
│   │   │
│   │   ├── 📁 core/                (Core Module - Singleton)
│   │   │   ├── 📁 services/
│   │   │   │   ├── base-api.service.ts
│   │   │   │   ├── auth.service.ts
│   │   │   │   └── ...
│   │   │   ├── 📁 interceptors/
│   │   │   │   ├── error.interceptor.ts
│   │   │   │   ├── auth.interceptor.ts
│   │   │   │   └── ...
│   │   │   ├── 📁 guards/
│   │   │   │   ├── auth.guard.ts
│   │   │   │   └── ...
│   │   │   ├── 📁 constants/
│   │   │   │   └── app.constants.ts
│   │   │   └── core.module.ts
│   │   │
│   │   ├── 📁 shared/              (Shared Module - Reutilizable)
│   │   │   ├── 📁 components/
│   │   │   │   ├── header/
│   │   │   │   ├── footer/
│   │   │   │   ├── button/
│   │   │   │   └── ...
│   │   │   ├── 📁 directives/
│   │   │   │   ├── highlight.directive.ts
│   │   │   │   └── ...
│   │   │   ├── 📁 pipes/
│   │   │   │   ├── safe-html.pipe.ts
│   │   │   │   └── ...
│   │   │   ├── 📁 models/
│   │   │   │   ├── base.model.ts
│   │   │   │   └── ...
│   │   │   └── shared.module.ts
│   │   │
│   │   ├── 📁 features/            (Feature Modules - Lazy Loaded)
│   │   │   ├── 📁 dashboard/
│   │   │   │   ├── 📁 components/
│   │   │   │   ├── 📁 pages/
│   │   │   │   ├── 📁 services/
│   │   │   │   ├── 📁 models/
│   │   │   │   ├── dashboard.module.ts
│   │   │   │   └── dashboard-routing.module.ts
│   │   │   │
│   │   │   ├── 📁 users/
│   │   │   │   └── (Misma estructura que dashboard)
│   │   │   │
│   │   │   └── 📁 products/
│   │   │       └── (Misma estructura que dashboard)
│   │   │
│   │   ├── 📁 layouts/             (Layout Components)
│   │   │   ├── 📁 main-layout/
│   │   │   │   ├── main-layout.component.ts
│   │   │   │   ├── main-layout.component.html
│   │   │   │   └── main-layout.component.css
│   │   │   │
│   │   │   └── 📁 auth-layout/
│   │   │       └── (Estructura similar)
│   │   │
│   │   ├── app.ts                  ← Root Component
│   │   ├── app.routes.ts            ← Rutas principales
│   │   ├── app.config.ts            ← Configuración global
│   │   ├── app.css                  ← Estilos globales
│   │   └── app.html                 ← Template raíz
│   │
│   ├── 📁 assets/                  ← Archivos estáticos
│   │   ├── 📁 images/
│   │   └── 📁 icons/
│   │
│   ├── 📁 environments/             ← Configuración por entorno
│   │   ├── environment.ts           ← Desarrollo
│   │   └── environment.prod.ts      ← Producción
│   │
│   ├── 📄 styles.css                ← Estilos globales
│   ├── 📄 main.ts                   ← Entry point
│   └── 📄 index.html                ← HTML principal
│
├── 📦 public/                       ← Archivos públicos (favicon, etc)
│
├── 📄 angular.json                  ← Configuración de Angular CLI
├── 📄 tsconfig.json                 ← Configuración de TypeScript
├── 📄 tsconfig.app.json
├── 📄 tsconfig.spec.json
├── 📄 package.json                  ← Dependencias
└── 📄 .gitignore                    ← Git ignore
```

## 🎯 Estructura de Feature (Ejemplo)

```
features/users/
├── components/
│   ├── user-card/
│   │   ├── user-card.component.ts
│   │   ├── user-card.component.html
│   │   ├── user-card.component.css
│   │   └── user-card.component.spec.ts
│   │
│   └── user-form/
│       ├── user-form.component.ts
│       ├── user-form.component.html
│       ├── user-form.component.css
│       └── user-form.component.spec.ts
│
├── pages/
│   ├── user-list/
│   │   ├── user-list.component.ts
│   │   ├── user-list.component.html
│   │   ├── user-list.component.css
│   │   └── user-list.component.spec.ts
│   │
│   └── user-detail/
│       ├── user-detail.component.ts
│       ├── user-detail.component.html
│       ├── user-detail.component.css
│       └── user-detail.component.spec.ts
│
├── services/
│   ├── user.service.ts
│   └── user.service.spec.ts
│
├── models/
│   └── user.model.ts
│
├── users.module.ts
└── users-routing.module.ts
```

## 📋 Comandos Útiles

### Generar Código

```bash
# Generar un módulo con routing
ng generate module features/my-feature --routing

# Generar un componente
ng generate component features/my-feature/pages/my-page

# Generar un servicio
ng generate service features/my-feature/services/my-service

# Generar un guard
ng generate guard core/guards/my-guard

# Generar un interceptor
ng generate interceptor core/interceptors/my-interceptor

# Generar una directiva
ng generate directive shared/directives/my-directive

# Generar un pipe
ng generate pipe shared/pipes/my-pipe
```

### Desarrollo

```bash
# Iniciar servidor de desarrollo
npm start

# Construir para producción
npm run build

# Ejecutar tests
npm test

# Watch mode (rebuild automático)
npm run watch
```

## 🏗️ Diagrama de Dependencias

```
┌─────────────────────────────────────────┐
│            App Component                 │
│        (app.ts + app.routes)            │
└─────────────────────────────────────────┘
                  │
        ┌─────────┴─────────┐
        │                   │
   ┌────▼────┐         ┌────▼────┐
   │  Layouts │         │ Features │
   └──────────┘         └──────────┘
        │                    │
   ┌────▼────────┐    ┌──────┴──────┐
   │ Main Layout │    │ Dashboard   │
   │ Auth Layout │    │ Users       │
   │             │    │ Products    │
   └─────────────┘    └─────────────┘
        │                    │
        │            ┌───────┴──────────┐
        │            │                  │
        └────────────┼──────────────────┘
                     │
                ┌────▼─────────┐
                │   Shared M.   │
                │ Components    │
                │ Pipes         │
                │ Directives    │
                │ Models        │
                └───────────────┘
                     │
                ┌────▼─────────┐
                │   Core M.     │
                │ Services      │
                │ Guards        │
                │ Interceptors  │
                │ Constants     │
                └───────────────┘
```

## 🎯 Importación Correcta

### ✅ Correcto

```typescript
// Core Module - una sola vez
import { CoreModule } from './core/core.module';

// Shared Module - en cada feature que lo necesite
import { SharedModule } from '@shared/shared.module';

// Feature Module - lazy loaded
const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.module')
      .then(m => m.UsersModule)
  }
];
```

### ❌ Incorrecto

```typescript
// ❌ No importar Core múltiples veces
import { CoreModule } from './core/core.module';

// ❌ No importar directamente componentes de features
import { UserListComponent } from './features/users/pages/user-list/user-list.component';

// ❌ No cargar features eagerly (solo lazy-load)
import { UsersModule } from './features/users/users.module';
```

## 📊 Matriz de Módulos

| Módulo | Ubicación | Importable | Veces | Propósito |
|--------|-----------|-----------|-------|----------|
| **Core** | `core/` | Sí | Una | Servicios singleton globales |
| **Shared** | `shared/` | Sí | Múltiples | Componentes reutilizables |
| **Feature** | `features/` | Lazy-load | Una | Lógica de negocio específica |
| **Layout** | `layouts/` | Sí | Según necesario | Estructura visual |

## 🔄 Flujo de una Solicitud HTTP

```
┌─────────────┐
│  Component  │
│  (user-list)│
└──────┬──────┘
       │ subscribe()
       │
┌──────▼────────┐
│  Service      │
│  (user.svc)   │
└──────┬────────┘
       │ http.get()
       │
┌──────▼────────┐
│ Interceptor   │
│ (Auth)        │
└──────┬────────┘
       │ Agregar token
       │
┌──────▼────────┐
│ HTTP Request  │
│ (/api/users)  │
└──────┬────────┘
       │
       │ (respuesta del servidor)
       │
┌──────▼────────┐
│ Interceptor   │
│ (Error)       │
└──────┬────────┘
       │ Manejar errores
       │
┌──────▼────────┐
│  RxJS Pipe    │
│ (tap, map)    │
└──────┬────────┘
       │ Transformar datos
       │
┌──────▼────────┐
│  Observable   │
│  <User[]>     │
└─────────────────┘
```

## 🧪 Testing por Tipo

### Unit Test (Servicio)
```
core/services/user.service.ts
core/services/user.service.spec.ts
```

### Component Test
```
features/users/pages/user-list/user-list.component.ts
features/users/pages/user-list/user-list.component.spec.ts
```

### Integration Test
```
Pruebas de múltiples componentes juntos
No necesitan archivo específico .spec.ts
```

## 💾 Guardar en Git

```bash
# Inicializar git
git init

# Configurar usuario
git config user.name "Tu nombre"
git config user.email "tu@email.com"

# Crear rama principal
git checkout -b main

# Agregar archivos
git add .

# Commit inicial
git commit -m "Initial commit: Angular template structure"

# Crear rama de desarrollo
git checkout -b develop

# Push
git push origin main
```

## 🚀 Deploying

```bash
# Build para producción
npm run build

# Los archivos están en dist/basic-angular/
# Subirlos al servidor o servicio de hosting
```

---

**Última actualización:** Enero 2026
