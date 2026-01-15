# 🗺️ Mapa Mental de la Plantilla BASIC_ANGULAR

## Arquitectura Visual

```
┌─────────────────────────────────────────────────────────────────┐
│                    BASIC_ANGULAR TEMPLATE                        │
│                   Angular 21 + TypeScript + RxJS                 │
└─────────────────────────────────────────────────────────────────┘
                                 │
                ┌────────────────┼────────────────┐
                │                │                │
           ┌────▼────┐      ┌────▼────┐      ┌────▼────┐
           │   CORE  │      │  SHARED │      │ FEATURES │
           └────┬────┘      └────┬────┘      └────┬────┘
                │                │                │
        ┌───────┼───────┐   ┌────┴────┐    ┌──────┼──────┐
        │       │       │   │          │    │      │      │
    Services  Guards  Inter- Components Pipes Modules
             ceptors  Directives Models     Routes
                              Models
```

## Jerarquía de Importaciones

```
app.ts (Root)
  └─→ app.routes (Rutas principales)
      ├─→ layouts/ (Main, Auth, etc.)
      │   └─→ shared/ (Header, Footer, etc.)
      │       └─→ core/ (Services, Interceptors)
      │
      └─→ features/ (Lazy-loaded)
          ├─→ components/ (Específicos del feature)
          ├─→ pages/ (Contenedores)
          ├─→ services/ (Específicos del feature)
          └─→ shared/ (Componentes globales)
              └─→ core/ (Servicios globales)
```

## Flujo de Datos (Data Flow)

```
┌─────────────┐
│  Component  │ Pide datos
│  (user-list)│
└─────┬───────┘
      │
      ▼
┌─────────────────────┐
│     Service         │ Llamada HTTP
│   (user.service)    │
└─────┬───────────────┘
      │
      ▼
┌──────────────────────┐
│   Http Client        │ Intercepta
│ + Interceptors       │
└─────┬────────────────┘
      │
      ▼
┌──────────────────────┐
│   Backend API        │ Procesa
│                      │
└─────┬────────────────┘
      │
      ▼ (Response)
┌──────────────────────┐
│   Interceptors       │ Maneja respuesta
│   (Error handling)   │
└─────┬────────────────┘
      │
      ▼
┌──────────────────────┐
│   RxJS Operators     │ Transforma
│  (map, filter, etc)  │
└─────┬────────────────┘
      │
      ▼
┌──────────────────────┐
│   Observable<Data>   │ Emite datos
│                      │
└─────┬────────────────┘
      │
      ▼
┌──────────────────────┐
│    Component         │ Usa datos
│  (async pipe)        │ Renderiza
└──────────────────────┘
```

## Matriz de Módulos

```
┌────────────┬──────────────────┬─────────────────┬──────────────┐
│  MÓDULO    │  UBICACIÓN       │  IMPORTABLE     │  PROPÓSITO   │
├────────────┼──────────────────┼─────────────────┼──────────────┤
│ Core       │ core/            │ Una sola vez    │ Singleton    │
│            │                  │ (app.module)    │              │
├────────────┼──────────────────┼─────────────────┼──────────────┤
│ Shared     │ shared/          │ En cada feature │ Reutilizable │
│            │                  │ que lo necesite │              │
├────────────┼──────────────────┼─────────────────┼──────────────┤
│ Features   │ features/        │ Lazy-loaded     │ Funcional    │
│            │                  │                 │              │
├────────────┼──────────────────┼─────────────────┼──────────────┤
│ Layouts    │ layouts/         │ Según necesario │ Estructura   │
└────────────┴──────────────────┴─────────────────┴──────────────┘
```

## Estructura de Carpetas Expandida

```
basic-angular/
│
├── 📁 src/
│   │
│   ├── 📁 app/
│   │   ├── 📁 core/
│   │   │   ├── 📁 services/
│   │   │   ├── 📁 guards/
│   │   │   ├── 📁 interceptors/
│   │   │   ├── 📁 constants/
│   │   │   └── core.module.ts
│   │   │
│   │   ├── 📁 shared/
│   │   │   ├── 📁 components/    [Header, Footer, Button, Modal]
│   │   │   ├── 📁 directives/    [Highlight, Autofocus, etc]
│   │   │   ├── 📁 pipes/         [SafeHtml, Currency, etc]
│   │   │   ├── 📁 models/        [Base, Entity, ApiResponse]
│   │   │   └── shared.module.ts
│   │   │
│   │   ├── 📁 features/
│   │   │   ├── 📁 dashboard/     [Stats, Charts, Widgets]
│   │   │   ├── 📁 users/         [List, Detail, Form]
│   │   │   ├── 📁 products/      [Catalog, Detail, Cart]
│   │   │   └── 📁 orders/        [List, Detail, Create]
│   │   │
│   │   ├── 📁 layouts/
│   │   │   ├── 📁 main-layout/   [Header, Sidebar, Footer]
│   │   │   └── 📁 auth-layout/   [Login, Registro]
│   │   │
│   │   ├── app.ts               [Root Component]
│   │   ├── app.routes.ts        [Rutas principales]
│   │   ├── app.config.ts        [Configuración]
│   │   ├── app.html
│   │   └── app.css
│   │
│   ├── 📁 assets/
│   │   ├── 📁 images/
│   │   └── 📁 icons/
│   │
│   ├── 📁 environments/
│   │   ├── environment.ts
│   │   └── environment.prod.ts
│   │
│   ├── index.html
│   ├── main.ts
│   └── styles.css
│
├── 📁 public/
│   └── favicon.ico
│
├── 📁 .vscode/
│   ├── settings.json
│   └── extensions.json
│
├── 📁 docs/
│   ├── README.md               ← Documentación general
│   ├── GETTING_STARTED.md      ← Guía de inicio
│   ├── STRUCTURE.md            ← Estructura detallada
│   ├── BEST_PRACTICES.md       ← Buenas prácticas
│   ├── FEATURE_EXAMPLE.md      ← Ejemplo completo
│   ├── QUICK_REFERENCE.md      ← Referencia rápida
│   ├── INDEX.md                ← Índice de docs
│   └── PROJECT_SUMMARY.md      ← Resumen del proyecto
│
├── angular.json
├── tsconfig.json
├── package.json
└── .gitignore
```

## Flujo de Desarrollo

```
1. INICIO
   ├─ Instalar: npm install
   ├─ Ejecutar: npm start
   └─ Abrir: http://localhost:4200

2. LEER DOCUMENTACIÓN
   ├─ README.md
   ├─ GETTING_STARTED.md
   └─ STRUCTURE.md

3. CREAR FEATURE
   ├─ ng generate module features/mi-feature --routing
   ├─ ng generate component features/mi-feature/pages/mi-page
   ├─ ng generate service features/mi-feature/services/mi-service
   └─ Implementar lógica

4. USAR COMPARTIDO
   ├─ Importar SharedModule
   ├─ Usar componentes de shared/
   └─ Usar servicios de core/

5. CONFIGURAR RUTAS
   ├─ Definir rutas en mi-feature-routing.module.ts
   └─ Registrar en app.routes.ts

6. HACER TESTS
   ├─ Escribir tests unitarios
   ├─ Ejecutar: npm test
   └─ Verificar coverage

7. BUILD PRODUCCIÓN
   ├─ npm run build
   ├─ Archivos en dist/
   └─ Deploy a servidor
```

## Convenciones de Naming

```
┌──────────────────────┬─────────────────────────────────┐
│ TIPO                 │ PATRÓN                          │
├──────────────────────┼─────────────────────────────────┤
│ Component TypeScript  │ my-component.component.ts       │
│ Component HTML       │ my-component.component.html     │
│ Component CSS        │ my-component.component.css      │
│ Component Test       │ my-component.component.spec.ts  │
├──────────────────────┼─────────────────────────────────┤
│ Service              │ my-service.service.ts           │
│ Service Test         │ my-service.service.spec.ts      │
├──────────────────────┼─────────────────────────────────┤
│ Directive            │ my-directive.directive.ts       │
│ Pipe                 │ my-pipe.pipe.ts                 │
│ Guard                │ my-guard.guard.ts               │
│ Interceptor          │ my-interceptor.interceptor.ts   │
├──────────────────────┼─────────────────────────────────┤
│ Module               │ my-module.module.ts             │
│ Routing Module       │ my-module-routing.module.ts     │
├──────────────────────┼─────────────────────────────────┤
│ Model/Interface      │ my-model.model.ts               │
│ Selector             │ app-my-component                │
├──────────────────────┼─────────────────────────────────┤
│ Carpeta              │ my-folder (minúsculas)          │
│ Variable             │ myVariable (camelCase)          │
│ Constante            │ MY_CONSTANT (UPPER_CASE)        │
└──────────────────────┴─────────────────────────────────┘
```

## Dependencias Permitidas

```
✅ PERMITIDO                    ❌ NO PERMITIDO
└─ Feature ← Shared             └─ Feature-A ← Feature-B
└─ Feature ← Core               └─ Shared ← Features
└─ Shared ← Core                └─ Shared ← Interceptors
└─ Layouts ← Shared             └─ Core imports de Features
└─ Layouts ← Core
```

## Checklist de Implementación

```
□ Crear Feature
  □ ng generate module features/nombre --routing
  □ Crear componentes (pages y components)
  □ Crear servicio
  □ Crear modelos
  □ Configurar rutas
  □ Hacer componentes standalone si es necesario
  
□ Usar Servicios
  □ Crear en core/ si es global
  □ Crear en feature/ si es específico
  □ Usar BaseApiService para CRUD
  □ Implementar error handling
  
□ Componentes Reutilizables
  □ Crear en shared/components/
  □ Exportar en shared.module.ts
  □ Documentar @Input y @Output
  □ OnPush ChangeDetection
  
□ Testing
  □ Escribir tests unitarios
  □ Tests para servicios
  □ Tests para componentes
  □ Verificar coverage
  
□ Documentación
  □ Documentar métodos públicos
  □ Agregar ejemplos en comentarios
  □ JSDoc para funciones complejas
```

## Decisiones Arquitectónicas

```
¿Service en Core o Feature?
├─ Core Si:
│  ├─ Se usa en múltiples features
│  ├─ Es un servicio global (Auth, API, Logger)
│  └─ Necesita ser singleton
└─ Feature Si:
   ├─ Se usa solo en un feature
   └─ Es lógica de negocio específica

¿Component en Shared o Feature?
├─ Shared Si:
│  ├─ Es reutilizable
│  ├─ No tiene dependencias de feature
│  └─ Es agnóstico de dominio
└─ Feature Si:
   ├─ Es específico del feature
   └─ Contiene lógica de negocio del feature

¿Module o Standalone?
├─ Module Si:
│  └─ Necesitas NgModule
└─ Standalone Si:
   ├─ Angular 14+
   ├─ Quieres estructura más simple
   └─ No necesitas NgModule
```

## Roadmap de Aprendizaje

```
PRINCIPIANTE (1-2 semanas)
├─ Leer documentación
├─ Crear componentes simples
├─ Entender servicios básicos
└─ Hacer tu primer feature

INTERMEDIO (2-4 semanas)
├─ Trabajar con servicios complejos
├─ Implementar autenticación
├─ Hacer testing
└─ Optimizar performance

AVANZADO (4-8 semanas)
├─ State management (NgRx)
├─ Custom decorators
├─ Advanced RxJS patterns
└─ Performance optimization
```

---

**Última actualización:** Enero 2026
