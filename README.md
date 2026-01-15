# BASIC_ANGULAR - Plantilla Reutilizable de Angular

Una plantilla base siguiendo los estándares y mejores prácticas de Angular para proyectos escalables y mantenibles.

## 📋 Tabla de Contenidos

- [Estructura del Proyecto](#estructura-del-proyecto)
- [Estándares de Arquitectura](#estándares-de-arquitectura)
- [Convenciones de Código](#convenciones-de-código)
- [Instalación y Ejecución](#instalación-y-ejecución)
- [Buenas Prácticas](#buenas-prácticas)

## 🏗️ Estructura del Proyecto

```
src/
├── app/                          # Módulo raíz de la aplicación
│   ├── core/                     # Servicios, interceptores, guards (singleton)
│   │   ├── services/             # Servicios de negocio (HTTP, autenticación, etc.)
│   │   ├── interceptors/         # Interceptores HTTP
│   │   ├── guards/               # Route guards (canActivate, canDeactivate, etc.)
│   │   └── core.module.ts        # Módulo core
│   │
│   ├── shared/                   # Componentes, directivas y pipes reutilizables
│   │   ├── components/           # Componentes compartidos (header, footer, modal, etc.)
│   │   ├── directives/           # Directivas personalizadas
│   │   ├── pipes/                # Pipes personalizados
│   │   ├── models/               # Interfaces y clases de modelos de datos
│   │   └── shared.module.ts      # Módulo shared
│   │
│   ├── features/                 # Módulos de características/páginas (lazy-loaded)
│   │   ├── dashboard/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── services/
│   │   │   ├── models/
│   │   │   ├── dashboard.module.ts
│   │   │   └── dashboard-routing.module.ts
│   │   ├── users/
│   │   └── ...
│   │
│   ├── layouts/                  # Componentes de layout/plantillas
│   │   ├── main-layout/
│   │   │   ├── main-layout.component.ts
│   │   │   ├── main-layout.component.html
│   │   │   └── main-layout.component.css
│   │   └── ...
│   │
│   ├── app.config.ts             # Configuración global de la app
│   ├── app.routes.ts             # Rutas principales
│   ├── app.ts                    # Componente raíz
│   ├── app.css                   # Estilos globales
│   └── app.html                  # Template raíz
│
├── assets/                       # Archivos estáticos
│   ├── images/
│   ├── icons/
│   └── ...
│
├── environments/                 # Configuración por entorno
│   ├── environment.ts            # Configuración desarrollo
│   └── environment.prod.ts       # Configuración producción
│
├── styles.css                    # Estilos globales
├── main.ts                       # Entry point de la aplicación
└── index.html                    # Archivo HTML principal
```

## 🎯 Estándares de Arquitectura

### Core Module

Contiene servicios singleton, interceptores y guards que se usan en toda la aplicación.

**Características:**
- Se importa una única vez en `AppModule` o en la configuración de la aplicación
- Contiene servicios de autenticación, API, logging, etc.
- Incluye interceptores HTTP para manejo de errores y tokens
- Contiene guards para proteger rutas

**Ejemplo:**
```typescript
// services/api.service.ts
@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}
  
  get<T>(endpoint: string) {
    return this.http.get<T>(`/api/${endpoint}`);
  }
}
```

### Shared Module

Componentes, directivas, pipes y modelos reutilizables que pueden usarse en múltiples módulos.

**Características:**
- Se importa en los módulos de features que lo necesitan
- Exporta componentes compartidos (buttons, modales, alerts, etc.)
- Contiene pipes y directivas personalizadas
- Define interfaces y tipos comunes

**Ejemplo:**
```typescript
// components/button/button.component.ts
@Component({
  selector: 'app-button',
  template: '<button (click)="onClick()">{{ label }}</button>',
})
export class ButtonComponent {
  @Input() label: string = '';
  @Output() click = new EventEmitter<void>();
  
  onClick() {
    this.click.emit();
  }
}
```

### Features Module

Módulos independientes con lógica de negocio específica. Pueden ser lazy-loaded.

**Estructura de un Feature:**
```
features/users/
├── components/          # Componentes específicos del feature
├── pages/               # Componentes de página/contenedor
├── services/            # Servicios específicos del feature
├── models/              # Interfaces/tipos específicos
├── users.module.ts      # Módulo del feature
└── users-routing.module.ts  # Rutas del feature
```

**Ejemplo de routing lazy-loaded:**
```typescript
// app.routes.ts
const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.module').then(m => m.UsersModule)
  }
];
```

### Layouts

Componentes que definen la estructura visual de la aplicación.

**Ejemplo:**
```typescript
// layouts/main-layout/main-layout.component.ts
@Component({
  selector: 'app-main-layout',
  template: `
    <header>...</header>
    <nav>...</nav>
    <main><router-outlet></router-outlet></main>
    <footer>...</footer>
  `,
})
export class MainLayoutComponent {}
```

## 📝 Convenciones de Código

### Naming Conventions

| Tipo | Convención | Ejemplo |
|------|-----------|---------|
| Componentes | `component.ts` | `user-list.component.ts` |
| Servicios | `service.ts` | `user.service.ts` |
| Módulos | `.module.ts` | `users.module.ts` |
| Interfaces | `model.ts` | `user.model.ts` |
| Directivas | `directive.ts` | `highlight.directive.ts` |
| Pipes | `pipe.ts` | `safe-html.pipe.ts` |
| Tests | `.spec.ts` | `user.service.spec.ts` |

### Selector Naming

Usar prefijo `app-` para componentes personalizados:
```typescript
@Component({
  selector: 'app-user-card',
  template: '...',
})
```

### Carpetas en minúsculas

Todas las carpetas deben estar en minúsculas con guiones:
```
src/app/features/user-management/
src/app/shared/components/user-card/
```

## 🚀 Instalación y Ejecución

### Requisitos Previos
- Node.js (v18 o superior)
- npm (v10 o superior)
- Angular CLI (v21 o superior)

### Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd basic-angular

# Instalar dependencias
npm install
```

### Comandos Principales

```bash
# Iniciar servidor de desarrollo
npm start

# Construir para producción
npm run build

# Ejecutar tests unitarios
npm test

# Ejecutar watch mode (reconstruir automáticamente)
npm run watch
```

## 💡 Buenas Prácticas

### 1. **Inyección de Dependencias**

Siempre usar inyección de dependencias en lugar de `new`:

```typescript
// ✅ Correcto
constructor(private service: MyService) {}

// ❌ Incorrecto
const service = new MyService();
```

### 2. **Observables y RxJS**

Usar Observables para operaciones asincrónicas:

```typescript
// ✅ Correcto
getData$(): Observable<User[]> {
  return this.http.get<User[]>('/api/users');
}

// ❌ Incorrecto - Usar callbacks
getData(callback: (data: User[]) => void) {
  // ...
}
```

### 3. **OnPush Change Detection**

Usar `OnPush` para mejorar rendimiento:

```typescript
@Component({
  selector: 'app-user-card',
  template: '...',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCardComponent {
  @Input() user: User;
}
```

### 4. **Unsubscribe en OnDestroy**

Siempre desuscribirse de Observables:

```typescript
export class UserListComponent implements OnDestroy {
  private destroy$ = new Subject<void>();

  ngOnInit() {
    this.userService.getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe(users => this.users = users);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### 5. **Tipado Fuerte**

Siempre definir tipos explícitos:

```typescript
// ✅ Correcto
users: User[] = [];
getData(): Observable<User[]> {
  return this.http.get<User[]>('/api/users');
}

// ❌ Incorrecto
users: any = [];
getData() {
  return this.http.get('/api/users');
}
```

### 6. **Validación de Forms**

Usar Reactive Forms para validaciones complejas:

```typescript
form = new FormGroup({
  name: new FormControl('', [Validators.required, Validators.minLength(3)]),
  email: new FormControl('', [Validators.required, Validators.email]),
});

submit() {
  if (this.form.valid) {
    // Procesar
  }
}
```

### 7. **Lazy Loading**

Cargar módulos bajo demanda:

```typescript
const routes: Routes = [
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.module')
      .then(m => m.UsersModule)
  }
];
```

### 8. **Tratamiento de Errores**

Implementar interceptores para manejo centralizado de errores:

```typescript
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        console.error('API Error:', error);
        return throwError(() => error);
      })
    );
  }
}
```

### 9. **Environments**

Usar archivos de configuración por entorno:

```typescript
// En el componente
import { environment } from '@env/environment';

export class ApiService {
  private apiUrl = environment.apiUrl;
}
```

### 10. **Documentación**

Documentar componentes y servicios públicos:

```typescript
/**
 * Componente que muestra una lista de usuarios
 * 
 * @example
 * <app-user-list [users]="users"></app-user-list>
 */
@Component({
  selector: 'app-user-list',
  template: '...',
})
export class UserListComponent {
  @Input() users: User[] = [];
}
```

## 🔧 Estructura Típica de un Feature

Ejemplo completo de un módulo de features:

```
features/users/
├── components/
│   ├── user-card/
│   │   ├── user-card.component.ts
│   │   ├── user-card.component.html
│   │   ├── user-card.component.css
│   │   └── user-card.component.spec.ts
│   └── user-form/
│       ├── user-form.component.ts
│       ├── user-form.component.html
│       └── user-form.component.css
├── pages/
│   ├── user-list/
│   │   ├── user-list.component.ts
│   │   ├── user-list.component.html
│   │   └── user-list.component.spec.ts
│   └── user-detail/
│       ├── user-detail.component.ts
│       ├── user-detail.component.html
│       └── user-detail.component.spec.ts
├── services/
│   ├── user.service.ts
│   └── user.service.spec.ts
├── models/
│   └── user.model.ts
├── users.module.ts
└── users-routing.module.ts
```

## 📚 Recursos Útiles

- [Documentación Oficial de Angular](https://angular.io/docs)
- [Angular Style Guide](https://angular.io/guide/styleguide)
- [RxJS Documentation](https://rxjs.dev/)

## 📄 Licencia

Este proyecto es una plantilla reutilizable de código abierto.
