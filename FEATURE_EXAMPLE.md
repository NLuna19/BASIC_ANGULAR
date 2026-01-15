# Ejemplo de Feature Completo

Este documento muestra un ejemplo paso a paso de cómo crear un feature (módulo) completo en la plantilla.

## Ejemplo: Dashboard Feature

### 1. Estructura de Carpetas

```
features/dashboard/
├── components/
│   └── stats-card/
│       ├── stats-card.component.ts
│       ├── stats-card.component.html
│       └── stats-card.component.css
├── pages/
│   └── dashboard-page/
│       ├── dashboard-page.component.ts
│       ├── dashboard-page.component.html
│       └── dashboard-page.component.css
├── services/
│   ├── dashboard.service.ts
│   └── dashboard.service.spec.ts
├── models/
│   └── dashboard.model.ts
├── dashboard.module.ts
└── dashboard-routing.module.ts
```

### 2. Crear el Modelo (dashboard.model.ts)

```typescript
export interface DashboardStats {
  totalUsers: number;
  totalOrders: number;
  revenue: number;
  activeUsers: number;
}

export interface StatCard {
  title: string;
  value: number | string;
  icon: string;
  color: 'primary' | 'success' | 'danger' | 'warning';
  trend?: {
    value: number;
    direction: 'up' | 'down';
  };
}
```

### 3. Crear el Servicio (dashboard.service.ts)

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DashboardStats } from '../models/dashboard.model';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  private statsSubject = new BehaviorSubject<DashboardStats | null>(null);
  public stats$ = this.statsSubject.asObservable();

  constructor(private http: HttpClient) {}

  getStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>('/api/dashboard/stats').pipe(
      tap(stats => this.statsSubject.next(stats))
    );
  }

  refreshStats(): void {
    this.getStats().subscribe();
  }
}
```

### 4. Crear Componente Hijo (stats-card.component.ts)

```typescript
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { StatCard } from '../../models/dashboard.model';

@Component({
  selector: 'app-stats-card',
  template: `
    <div class="card" [class]="'card-' + card.color">
      <div class="card-icon">
        <i [class]="'icon-' + card.icon"></i>
      </div>
      <div class="card-content">
        <h3 class="card-title">{{ card.title }}</h3>
        <p class="card-value">{{ card.value }}</p>
        <div class="card-trend" *ngIf="card.trend">
          <span [class]="'trend-' + card.trend.direction">
            {{ card.trend.direction === 'up' ? '↑' : '↓' }}
            {{ card.trend.value }}%
          </span>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      border-radius: var(--border-radius);
      padding: var(--spacing-md);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      gap: var(--spacing-md);
    }

    .card-icon {
      font-size: 32px;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    .card-primary .card-icon {
      background-color: var(--primary-color);
    }

    .card-success .card-icon {
      background-color: var(--success-color);
    }

    .card-danger .card-icon {
      background-color: var(--danger-color);
    }

    .card-warning .card-icon {
      background-color: #ffc107;
    }

    .card-content {
      flex: 1;
    }

    .card-title {
      font-size: 12px;
      color: #999;
      margin: 0;
      text-transform: uppercase;
    }

    .card-value {
      font-size: 24px;
      font-weight: bold;
      margin: var(--spacing-xs) 0;
    }

    .card-trend {
      font-size: 12px;
    }

    .trend-up {
      color: var(--success-color);
    }

    .trend-down {
      color: var(--danger-color);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StatsCardComponent {
  @Input() card!: StatCard;
}
```

### 5. Crear Página (dashboard-page.component.ts)

```typescript
import { Component, OnInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DashboardService } from '../../services/dashboard.service';
import { DashboardStats, StatCard } from '../../models/dashboard.model';

@Component({
  selector: 'app-dashboard-page',
  template: `
    <div class="dashboard-container">
      <div class="dashboard-header">
        <h1>Dashboard</h1>
        <button (click)="onRefresh()">Actualizar</button>
      </div>

      <div class="loading" *ngIf="isLoading">
        Cargando datos...
      </div>

      <div class="error" *ngIf="error">
        {{ error }}
      </div>

      <div class="stats-grid" *ngIf="!isLoading && stats">
        <app-stats-card 
          *ngFor="let card of statCards"
          [card]="card">
        </app-stats-card>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      padding: var(--spacing-lg);
    }

    .dashboard-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: var(--spacing-lg);
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: var(--spacing-md);
    }

    .loading, .error {
      padding: var(--spacing-md);
      border-radius: var(--border-radius);
      text-align: center;
    }

    .error {
      background-color: #ffe0e0;
      color: var(--danger-color);
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  stats: DashboardStats | null = null;
  statCards: StatCard[] = [];
  isLoading = true;
  error: string | null = null;

  private destroy$ = new Subject<void>();

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadStats();
  }

  loadStats(): void {
    this.isLoading = true;
    this.error = null;

    this.dashboardService.getStats()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (stats) => {
          this.stats = stats;
          this.buildStatCards(stats);
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading stats:', error);
          this.error = 'Error al cargar las estadísticas';
          this.isLoading = false;
        },
      });
  }

  buildStatCards(stats: DashboardStats): void {
    this.statCards = [
      {
        title: 'Total de Usuarios',
        value: stats.totalUsers,
        icon: 'users',
        color: 'primary',
        trend: { value: 12, direction: 'up' },
      },
      {
        title: 'Órdenes Totales',
        value: stats.totalOrders,
        icon: 'shopping-cart',
        color: 'success',
        trend: { value: 8, direction: 'up' },
      },
      {
        title: 'Ingresos',
        value: `$${stats.revenue.toLocaleString()}`,
        icon: 'dollar-sign',
        color: 'warning',
        trend: { value: 3, direction: 'down' },
      },
      {
        title: 'Usuarios Activos',
        value: stats.activeUsers,
        icon: 'activity',
        color: 'danger',
      },
    ];
  }

  onRefresh(): void {
    this.loadStats();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
```

### 6. Crear el Módulo (dashboard.module.ts)

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { StatsCardComponent } from './components/stats-card/stats-card.component';

@NgModule({
  declarations: [
    DashboardPageComponent,
    StatsCardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DashboardRoutingModule,
  ],
})
export class DashboardModule { }
```

### 7. Crear Rutas (dashboard-routing.module.ts)

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
export class DashboardRoutingModule { }
```

### 8. Registrar el Feature en Rutas Principales

```typescript
// app.routes.ts
import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./features/dashboard/dashboard.module')
      .then(m => m.DashboardModule),
  },
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.module')
      .then(m => m.UsersModule),
  },
  {
    path: '**',
    redirectTo: '/404',
  },
];
```

### 9. Test (dashboard.service.spec.ts)

```typescript
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DashboardService } from './dashboard.service';
import { DashboardStats } from '../models/dashboard.model';

describe('DashboardService', () => {
  let service: DashboardService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DashboardService],
    });

    service = TestBed.inject(DashboardService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch stats', () => {
    const mockStats: DashboardStats = {
      totalUsers: 100,
      totalOrders: 50,
      revenue: 10000,
      activeUsers: 45,
    };

    service.getStats().subscribe(stats => {
      expect(stats).toEqual(mockStats);
    });

    const req = httpMock.expectOne('/api/dashboard/stats');
    expect(req.request.method).toBe('GET');
    req.flush(mockStats);
  });
});
```

## Beneficios de esta Estructura

✅ **Modularidad:** Cada feature es independiente
✅ **Escalabilidad:** Fácil de agregar nuevos features
✅ **Mantenibilidad:** Código organizado y estructurado
✅ **Testing:** Componentes desacoplados, fáciles de testear
✅ **Reutilización:** Componentes compartidos en `shared`
✅ **Lazy Loading:** Los features se cargan bajo demanda

---

**Última actualización:** Enero 2026
