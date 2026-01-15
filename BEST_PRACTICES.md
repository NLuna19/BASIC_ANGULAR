# Guía de Buenas Prácticas - BASIC_ANGULAR

## 📌 Quick Reference para Desarrolladores

### 1. Crear un Nuevo Feature

```bash
# Crear estructura básica
ng generate module features/user-management --routing

# Generar componentes
ng generate component features/user-management/pages/user-list
ng generate component features/user-management/components/user-card
ng generate service features/user-management/services/user
```

**Estructura resultante:**
```
features/user-management/
├── components/
│   └── user-card/
├── pages/
│   └── user-list/
├── services/
│   └── user.service.ts
├── models/
│   └── user.model.ts
├── user-management.module.ts
└── user-management-routing.module.ts
```

### 2. Crear un Componente Reutilizable

```typescript
// shared/components/button/button.component.ts
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-button',
  template: `
    <button 
      class="btn"
      [class.btn-primary]="variant === 'primary'"
      [disabled]="disabled"
      (click)="onClick()">
      {{ label }}
    </button>
  `,
  styles: [`
    .btn {
      padding: 8px 16px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 500;
      transition: all 0.3s ease;
    }

    .btn:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

    .btn-primary {
      background-color: #007bff;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background-color: #0056b3;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() label: string = 'Click me';
  @Input() variant: 'primary' | 'secondary' | 'danger' = 'primary';
  @Input() disabled: boolean = false;
  @Output() click = new EventEmitter<void>();

  onClick() {
    this.click.emit();
  }
}
```

**Registrar en shared.module.ts:**
```typescript
import { ButtonComponent } from './components/button/button.component';

@NgModule({
  declarations: [ButtonComponent],
  exports: [ButtonComponent],
})
export class SharedModule {}
```

### 3. Crear un Servicio

```typescript
// features/user-management/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BaseApiService } from '@core/services/base-api.service';
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService extends BaseApiService<User> {
  private usersSubject = new BehaviorSubject<User[]>([]);
  public users$ = this.usersSubject.asObservable();

  constructor(http: HttpClient) {
    super(http, '/api/users');
  }

  loadUsers(): Observable<User[]> {
    return this.getAll().pipe(
      tap(users => this.usersSubject.next(users))
    );
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.endpoint}/me`);
  }
}
```

### 4. Usar un Servicio en un Componente

```typescript
// features/user-management/pages/user-list/user-list.component.ts
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  template: `
    <div class="container">
      <h1>Usuarios</h1>
      
      <div class="loading" *ngIf="isLoading">
        Cargando...
      </div>

      <div class="error" *ngIf="error">
        {{ error }}
      </div>

      <div class="user-list" *ngIf="!isLoading && !error">
        <app-user-card 
          *ngFor="let user of users"
          [user]="user"
          (delete)="onDelete(user.id)">
        </app-user-card>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  isLoading = true;
  error: string | null = null;
  
  private destroy$ = new Subject<void>();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.loadUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (users) => {
          this.users = users;
          this.isLoading = false;
        },
        error: (error) => {
          this.error = 'Error al cargar usuarios';
          this.isLoading = false;
          console.error(error);
        },
      });
  }

  onDelete(userId: string | number): void {
    if (confirm('¿Está seguro de que desea eliminar este usuario?')) {
      this.userService.delete(userId)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            this.users = this.users.filter(u => u.id !== userId);
          },
          error: () => {
            this.error = 'Error al eliminar usuario';
          },
        });
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### 5. Crear una Directiva Personalizada

```typescript
// shared/directives/highlight.directive.ts
import { Directive, ElementRef, HostListener, Input } from '@angular/core';

/**
 * Directiva que resalta un elemento al pasar el mouse
 * 
 * @example
 * <div appHighlight="yellow">Hover me!</div>
 */
@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective {
  @Input() appHighlight = 'yellow';
  @Input() defaultColor = 'transparent';

  constructor(private el: ElementRef) {
    this.setColor(this.defaultColor);
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.setColor(this.appHighlight);
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.setColor(this.defaultColor);
  }

  private setColor(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }
}
```

### 6. Crear un Pipe Personalizado

```typescript
// shared/pipes/safe-html.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

/**
 * Pipe para renderizar HTML de forma segura
 * 
 * @example
 * {{ content | safeHtml }}
 */
@Pipe({
  name: 'safeHtml',
  standalone: true,
})
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
```

### 7. Crear un Guard

```typescript
// core/guards/auth.guard.ts
import { Injectable } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
```

**Usar en rutas:**
```typescript
// app.routes.ts
const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard],
  },
];
```

### 8. Crear un Interceptor

```typescript
// core/interceptors/error.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error:', error);

        let message = 'Ocurrió un error inesperado';

        if (error.status === 404) {
          message = 'Recurso no encontrado';
        } else if (error.status === 401) {
          message = 'No autorizado';
        } else if (error.status === 403) {
          message = 'Acceso denegado';
        } else if (error.status === 500) {
          message = 'Error del servidor';
        }

        return throwError(() => ({
          status: error.status,
          message,
          error,
        }));
      })
    );
  }
}
```

**Registrar en app.config.ts:**
```typescript
import { ErrorInterceptor } from './core/interceptors/error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([httpErrorInterceptor])
    ),
  ],
};
```

### 9. Testing - Unit Test

```typescript
// features/user-management/services/user.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../models/user.model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService],
    });

    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch users', () => {
    const mockUsers: User[] = [
      { id: 1, name: 'John', email: 'john@example.com' },
      { id: 2, name: 'Jane', email: 'jane@example.com' },
    ];

    service.loadUsers().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne('/api/users');
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should delete a user', () => {
    service.delete(1).subscribe(() => {
      expect(true).toBe(true);
    });

    const req = httpMock.expectOne('/api/users/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
```

### 10. Reactive Forms

```typescript
// features/user-management/components/user-form/user-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-user-form',
  template: `
    <form [formGroup]="form" (ngSubmit)="onSubmit()">
      <div class="form-group">
        <label for="name">Nombre:</label>
        <input
          id="name"
          type="text"
          formControlName="name"
          class="form-control"
          [class.is-invalid]="hasError('name')">
        <div class="error-message" *ngIf="hasError('name')">
          El nombre es requerido
        </div>
      </div>

      <div class="form-group">
        <label for="email">Email:</label>
        <input
          id="email"
          type="email"
          formControlName="email"
          class="form-control"
          [class.is-invalid]="hasError('email')">
        <div class="error-message" *ngIf="hasError('email')">
          Ingrese un email válido
        </div>
      </div>

      <button 
        type="submit" 
        [disabled]="!form.valid">
        Guardar
      </button>
    </form>
  `,
})
export class UserFormComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  hasError(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return field ? field.invalid && field.touched : false;
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.userService.create(this.form.value).subscribe(() => {
        alert('Usuario creado exitosamente');
        this.form.reset();
      });
    }
  }
}
```

## 🎨 CSS y Styling

### Usar variables CSS para consistencia

```css
/* styles.css - Global styles */
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --danger-color: #dc3545;
  --success-color: #28a745;

  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;

  --border-radius: 4px;
  --transition: all 0.3s ease;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  color: #333;
  background-color: #f5f5f5;
}
```

## 🚀 Performance Tips

1. **Lazy Loading:** Cargar módulos bajo demanda
2. **Change Detection:** Usar `OnPush` en componentes
3. **TrackBy:** Usar trackBy en `*ngFor`
4. **Observables:** Usar `async` pipe o `takeUntil`
5. **Minificación:** Compilar con `--prod`

## 🐛 Debugging

```typescript
// Agregar logs en desarrollo
import { environment } from '@env/environment';

if (!environment.production) {
  console.log('Component initialized', this);
}
```

---

**Última actualización:** Enero 2026
