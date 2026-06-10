import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../core/http/api-base-url.token';
import { ApiEndpoints } from '../../shared/constants';
import { PaginatedResult, PokemonApi } from '../api/interfaces';

@Injectable({ providedIn: 'root' })
export class PokemonApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  getList(offset = 0, limit = 151): Observable<PaginatedResult> {
    const params = new HttpParams().set('offset', offset).set('limit', limit);
    return this.http.get<PaginatedResult>(`${this.baseUrl}${ApiEndpoints.pokemon}`, {
      params,
    });
  }

  getAll(): Observable<PaginatedResult> {
    return this.http.get<PaginatedResult>(`${this.baseUrl}${ApiEndpoints.pokemon}`);
  }

  getByIdOrName(idOrName: string | number): Observable<PokemonApi> {
    return this.http.get<PokemonApi>(`${this.baseUrl}${ApiEndpoints.pokemon}/${idOrName}`);
  }
}
