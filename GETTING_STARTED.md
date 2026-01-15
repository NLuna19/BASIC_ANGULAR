# Guía de Inicio Rápido - BASIC_ANGULAR

## 🎯 Primeros Pasos

### 1. Clonar o Descargar el Proyecto

```bash
# Clonar desde un repositorio
git clone <url-del-repositorio>
cd basic-angular

# O simplemente entrar a la carpeta si ya está descargada
cd basic-angular
```

### 2. Instalar Dependencias

```bash
# Instalar todas las dependencias del proyecto
npm install

# Si usas yarn
yarn install
```

### 3. Iniciar el Servidor de Desarrollo

```bash
# Iniciar aplicación en modo desarrollo
npm start

# La aplicación estará disponible en http://localhost:4200
```

### 4. Acceder a la Aplicación

- Abre tu navegador en: `http://localhost:4200`
- La aplicación se recargará automáticamente cuando hagas cambios

## 📁 Estructura de Carpetas - Resumen Rápido

```
src/
├── app/
│   ├── core/          ← Servicios, guards, interceptores (importar una sola vez)
│   ├── shared/        ← Componentes reutilizables
│   ├── features/      ← Módulos de funcionalidades (lazy-loaded)
│   ├── layouts/       ← Componentes de estructura
│   ├── app.ts         ← Componente raíz
│   └── app.routes.ts  ← Rutas principales
├── assets/            ← Imágenes, iconos, etc.
├── environments/      ← Configuración (desarrollo/producción)
├── index.html         ← Página principal
└── main.ts            ← Punto de entrada
```

## ⚡ Comandos Esenciales

### Desarrollo

```bash
# Iniciar servidor (con hot reload)
npm start

# Ejecutar en puerto específico
ng serve --port 3000

# Build para producción
npm run build

# Watch mode (compilar automáticamente)
npm run watch
```

### Testing

```bash
# Ejecutar tests unitarios
npm test

# Tests con coverage
ng test --code-coverage
```

### Generación de Código

```bash
# Generar un módulo con routing
ng generate module features/mi-feature --routing

# Generar un componente
ng generate component features/mi-feature/pages/mi-pagina

# Generar un servicio
ng generate service features/mi-feature/services/mi-servicio

# Generar un guard
ng generate guard core/guards/mi-guard

# Generar un interceptor
ng generate interceptor core/interceptors/mi-interceptor
```

## 🚀 Crear tu Primer Feature

### Paso 1: Generar el módulo

```bash
ng generate module features/dashboard --routing
```

### Paso 2: Generar componentes

```bash
ng generate component features/dashboard/pages/dashboard-page
ng generate component features/dashboard/components/stats-card
```

### Paso 3: Generar servicio

```bash
ng generate service features/dashboard/services/dashboard
```

### Paso 4: Crear el modelo

Crea `src/app/features/dashboard/models/dashboard.model.ts`:

```typescript
export interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  revenue: number;
}
```

### Paso 5: Completar el servicio

Edita `src/app/features/dashboard/services/dashboard.service.ts`:

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DashboardStats } from '../models/dashboard.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  constructor(private http: HttpClient) {}

  getStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>('/api/dashboard/stats');
  }
}
```

### Paso 6: Completar el componente

Edita `src/app/features/dashboard/pages/dashboard-page/dashboard-page.component.ts`:

```typescript
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardStats } from '../../models/dashboard.model';

@Component({
  selector: 'app-dashboard-page',
  template: `
    <div class="dashboard">
      <h1>Dashboard</h1>
      <p>Total Users: {{ stats?.totalUsers }}</p>
      <p>Total Orders: {{ stats?.totalOrders }}</p>
      <p>Revenue: {{ stats?.revenue }}</p>
    </div>
  `,
})
export class DashboardPageComponent implements OnInit {
  stats: DashboardStats | null = null;

  constructor(private service: DashboardService) {}

  ngOnInit(): void {
    this.service.getStats().subscribe(data => {
      this.stats = data;
    });
  }
}
```

### Paso 7: Configurar las rutas

Edita `src/app/features/dashboard/dashboard-routing.module.ts`:

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
```

### Paso 8: Registrar en rutas principales

Edita `src/app/app.routes.ts`:

```typescript
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        m => m.DashboardModule
      ),
  },
];
```

## 📚 Documentación

Dentro del proyecto encontrarás:

- **README.md** - Documentación general y arquitectura
- **BEST_PRACTICES.md** - Guía de buenas prácticas
- **FEATURE_EXAMPLE.md** - Ejemplo completo de feature
- **QUICK_REFERENCE.md** - Referencia rápida de la estructura
- **GETTING_STARTED.md** - Este archivo

## 🔗 Recursos Útiles

- [Documentación Oficial de Angular](https://angular.io/docs)
- [Angular Style Guide](https://angular.io/guide/styleguide)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [RxJS Documentation](https://rxjs.dev/)
- [Angular Testing Guide](https://angular.io/guide/testing)

## ❓ Preguntas Frecuentes

### ¿Cómo cambio el puerto?

```bash
ng serve --port 3000
```

### ¿Cómo creo un componente sin módulo?

```bash
ng generate component mi-componente --skip-import
```

### ¿Cómo verifico si hay errores de linting?

```bash
ng lint
```

### ¿Cómo hago deploy?

```bash
# Build para producción
npm run build

# Los archivos generados están en dist/basic-angular/
# Sube esos archivos a tu servidor web
```

### ¿Dónde pongo mis variables de entorno?

En `src/environments/environment.ts` (desarrollo) y `src/environments/environment.prod.ts` (producción)

### ¿Cómo uso las variables de entorno?

```typescript
import { environment } from '@env/environment';

export class ApiService {
  private apiUrl = environment.apiUrl;
}
```

## ✅ Checklist de Inicio

- [ ] Instalar dependencias (`npm install`)
- [ ] Leer README.md
- [ ] Revisar BEST_PRACTICES.md
- [ ] Ejecutar `npm start`
- [ ] Abrir http://localhost:4200
- [ ] Crear tu primer feature
- [ ] Revisar FEATURE_EXAMPLE.md
- [ ] Escribir tests para tu código

## 🆘 Troubleshooting

### "ng command not found"
```bash
# Instala Angular CLI globalmente
npm install -g @angular/cli
```

### Puerto 4200 ya está en uso
```bash
# Usa otro puerto
ng serve --port 4300
```

### Cambios no se reflejan
```bash
# Detén el servidor (Ctrl+C)
# Limpia node_modules y reinstala
rm -rf node_modules
npm install

# Vuelve a iniciar
npm start
```

### Errores de tipo TypeScript
```bash
# Verifica la configuración de TypeScript
# Asegúrate que tsconfig.json está bien configurado
```

## 🎓 Próximos Pasos

1. **Estudia la estructura** - Lee README.md y QUICK_REFERENCE.md
2. **Crea un feature** - Sigue los pasos en "Crear tu Primer Feature"
3. **Aprende RxJS** - Estudia Observables y operadores
4. **Escribe tests** - Haz TDD mientras desarrollas
5. **Optimiza** - Aprende sobre change detection y lazy loading

---

**¡Feliz codificación! 🚀**

Última actualización: Enero 2026
