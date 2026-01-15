/**
 * Ejemplo de configuración de la aplicación
 * Este archivo muestra cómo configurar interceptores, proveedores y módulos globales
 */

import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

// Nota: Este es un ejemplo. La configuración real dependerá de tu proyecto.
// En Angular 14+, se recomienda usar standalone components y ApplicationConfig

export const appConfig: ApplicationConfig = {
  providers: [
    // Router
    provideRouter(routes),

    // HTTP Client
    provideHttpClient(
      // Aquí irían los interceptores si usas la nueva forma functional
    ),

    // Módulos de Core (si usas módulos)
    // importProvidersFrom(CoreModule),
  ],
};

/*
  ALTERNATIVA CON MÓDULOS (Angular < 14):
  
  @NgModule({
    declarations: [AppComponent],
    imports: [
      BrowserModule,
      BrowserAnimationsModule,
      HttpClientModule,
      CoreModule,
      AppRoutingModule,
    ],
    providers: [
      { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
      { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
  })
  export class AppModule {}
*/
