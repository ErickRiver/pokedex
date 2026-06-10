import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { API_BASE_URL } from '../../core/http/api-base-url.token';
import { ApiEndpoints } from '../../shared/constants';
import { PokemonApi, PokemonSpeciesApi } from '../api/interfaces';

@Injectable({ providedIn: 'root' })
export class SpeciesApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = inject(API_BASE_URL);

  getByIdOrName(idOrName: string | number): Observable<PokemonSpeciesApi> {
    return this.http.get<PokemonSpeciesApi>(
      `${this.baseUrl}${ApiEndpoints.pokemonSpecies}/${idOrName}`,
    );
  }

  getByUrl(url: string): Observable<PokemonSpeciesApi> {
    return this.http.get<PokemonSpeciesApi>(url);
  }
}
