import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PaginatedResponse, PaginationParams } from '../../shared/models/base.model';

/**
 * Servicio base para operaciones CRUD genéricas
 * 
 * @template T Tipo de entidad con la que trabaja el servicio
 * 
 * @example
 * @Injectable({ providedIn: 'root' })
 * export class UserService extends BaseApiService<User> {
 *   constructor(http: HttpClient) {
 *     super(http, '/api/users');
 *   }
 * }
 */
@Injectable()
export class BaseApiService<T> {
  constructor(
    protected http: HttpClient,
    @Inject('API_ENDPOINT') protected endpoint: string
  ) {}

  /**
   * Obtiene todos los registros
   */
  getAll(): Observable<T[]> {
    return this.http.get<T[]>(this.endpoint);
  }

  /**
   * Obtiene un registro por ID
   */
  getById(id: string | number): Observable<T> {
    return this.http.get<T>(`${this.endpoint}/${id}`);
  }

  /**
   * Obtiene registros con paginación
   */
  getPaginated(params: PaginationParams): Observable<PaginatedResponse<T>> {
    let httpParams = new HttpParams()
      .set('page', params.page.toString())
      .set('pageSize', params.pageSize.toString());

    if (params.sortBy) {
      httpParams = httpParams.set('sortBy', params.sortBy);
    }
    if (params.sortOrder) {
      httpParams = httpParams.set('sortOrder', params.sortOrder);
    }

    return this.http.get<PaginatedResponse<T>>(this.endpoint, { params: httpParams });
  }

  /**
   * Crea un nuevo registro
   */
  create(data: Omit<T, 'id'>): Observable<T> {
    return this.http.post<T>(this.endpoint, data);
  }

  /**
   * Actualiza un registro
   */
  update(id: string | number, data: Partial<T>): Observable<T> {
    return this.http.put<T>(`${this.endpoint}/${id}`, data);
  }

  /**
   * Elimina un registro
   */
  delete(id: string | number): Observable<void> {
    return this.http.delete<void>(`${this.endpoint}/${id}`);
  }

  /**
   * Búsqueda genérica
   */
  search(query: string): Observable<T[]> {
    const params = new HttpParams().set('q', query);
    return this.http.get<T[]>(`${this.endpoint}/search`, { params });
  }
}
