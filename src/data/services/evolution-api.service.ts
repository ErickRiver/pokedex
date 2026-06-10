import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../core/http/api-base-url.token';
import { ApiEndpoints } from '../../shared/constants';
import { EvolutionChainApi } from '../api/interfaces';

@Injectable({ providedIn: 'root' })
export class EvolutionApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  getById(id: number): Observable<EvolutionChainApi> {
    return this.http.get<EvolutionChainApi>(
      `${this.baseUrl}${ApiEndpoints.evolutionChain}/${id}/`,
    );
  }

  getByUrl(url: string): Observable<EvolutionChainApi> {
    return this.http.get<EvolutionChainApi>(url);
  }
}
