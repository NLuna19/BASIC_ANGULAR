/**
 * Interfaz base para entidades de la aplicación
 */
export interface Entity {
  id: string | number;
  createdAt?: Date;
  updatedAt?: Date;
}

/**
 * Interfaz base para respuestas de API
 */
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

/**
 * Interfaz base para respuestas paginadas
 */
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

/**
 * Interfaz para parámetros de paginación
 */
export interface PaginationParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}
