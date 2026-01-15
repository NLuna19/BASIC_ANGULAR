/**
 * Archivo de constantes globales de la aplicación
 */

// Rutas principales
export const ROUTES = {
  ROOT: '',
  DASHBOARD: '/dashboard',
  USERS: '/users',
  SETTINGS: '/settings',
  LOGIN: '/login',
  LOGOUT: '/logout',
  NOT_FOUND: '/404',
  UNAUTHORIZED: '/401',
};

// Mensajes de error
export const ERROR_MESSAGES = {
  GENERIC: 'Ocurrió un error inesperado. Por favor, intente nuevamente.',
  NETWORK: 'Error de conexión. Verifique su conexión a internet.',
  UNAUTHORIZED: 'No tiene permisos para acceder a este recurso.',
  NOT_FOUND: 'El recurso solicitado no existe.',
  VALIDATION: 'Por favor, corrija los errores en el formulario.',
};

// Mensajes de éxito
export const SUCCESS_MESSAGES = {
  CREATED: 'Registro creado exitosamente.',
  UPDATED: 'Registro actualizado exitosamente.',
  DELETED: 'Registro eliminado exitosamente.',
  SAVED: 'Cambios guardados exitosamente.',
};

// Paginación por defecto
export const DEFAULT_PAGINATION = {
  PAGE: 1,
  PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 100,
};

// Timeouts
export const TIMEOUTS = {
  REQUEST: 30000, // 30 segundos
  DEBOUNCE: 300, // 300ms
  THROTTLE: 1000, // 1 segundo
};
