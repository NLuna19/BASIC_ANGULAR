# Environments Folder

## Descripción

La carpeta Environments contiene **archivos de configuración específicos por entorno** (desarrollo, producción, testing). Permite que la aplicación se comporte diferente según dónde se ejecute.

## Objetivo

Separar la configuración según el entorno, permitiendo valores diferentes para desarrollo vs producción sin cambiar código.

## Archivos

### environment.ts (Desarrollo)
Configuración para `ng serve` y desarrollo local.

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  apiTimeout: 30000,
  logLevel: 'debug',
  enableDevTools: true,
  mockData: true,
};
```

### environment.prod.ts (Producción)
Configuración para `npm run build --configuration production`.

```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.miapp.com/api',
  apiTimeout: 15000,
  logLevel: 'error',
  enableDevTools: false,
  mockData: false,
};
```

## Qué Debería Contener

- **production** - Boolean indicando si es prod
- **apiUrl** - URL base de la API
- **apiTimeout** - Timeout para peticiones HTTP
- **logLevel** - Nivel de logging (debug, info, warn, error)
- **enableDevTools** - Habilitar herramientas de desarrollo
- **mockData** - Usar datos mock o API real
- **featureFlags** - Flags para features en beta
- **analytics** - ID de Google Analytics, etc
- **version** - Versión de la app

## 📝 Ejemplo Completo

```typescript
// environment.ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  apiTimeout: 30000,
  logLevel: 'debug',
  enableDevTools: true,
  mockData: false,
  featureFlags: {
    newDashboard: true,
    advancedAnalytics: false,
  },
  analytics: {
    googleAnalyticsId: 'dev-id',
  },
  version: '1.0.0-dev',
};
```

## 🔌 Cómo Usar en la Aplicación

### En Servicios
```typescript
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiUrl = environment.apiUrl;
  private timeout = environment.apiTimeout;

  constructor(private http: HttpClient) {}

  getUsers() {
    return this.http.get(`${this.apiUrl}/users`, {
      timeout: this.timeout
    });
  }
}
```

### En Componentes
```typescript
import { environment } from '@env/environment';

export class AppComponent {
  isProduction = environment.production;
  logLevel = environment.logLevel;

  ngOnInit() {
    if (!environment.production) {
      console.log('Modo desarrollo activado');
    }
  }
}
```

### En Templates
```html
<div *ngIf="!isProduction" class="dev-banner">
  ⚠️ Estás en modo desarrollo
</div>

<version>{{ appVersion }}</version>
```

## 🔨 Build Automático

Angular automáticamente reemplaza `environment.ts` con `environment.prod.ts` cuando compilas con `--configuration production`:

```bash
# Desarrollo (usa environment.ts)
ng serve

# Producción (usa environment.prod.ts)
ng build --configuration production
```

## ✅ Mejores Prácticas

- ✅ Nunca guardar secretos en archivos (usar variables de entorno del sistema)
- ✅ Mantener estructura consistente en ambos archivos
- ✅ Documentar qué significa cada valor
- ✅ No commitear valores sensibles (API keys, tokens)
- ✅ Usar fichero `.env` para secretos locales

## 🔐 Variables de Entorno Seguras

Para valores sensibles, usa variables del sistema:

```typescript
// environment.prod.ts
export const environment = {
  production: true,
  apiUrl: process.env['API_URL'] || 'https://api.default.com',
  apiKey: process.env['API_KEY'], // Definida en el servidor
};
```

En `.gitignore`:
```
.env
.env.local
```

---

**Última actualización:** Enero 2026
