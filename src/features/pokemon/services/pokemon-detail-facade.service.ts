import { Injectable, inject } from '@angular/core';
import { map, Observable, switchMap, of } from 'rxjs';
import { CacheService } from '../../../core/cache/cache.service';
import { CacheKeys } from '../../../shared/constants';
import { EvolutionApiService, PokemonApiService, SpeciesApiService } from '../../../data/services';
import { EvolutionChainApi, PokemonApi, PokemonSpeciesApi } from '../../../data/api/interfaces';

/** Orchestrates pokemon, species, and evolution data for the detail page. */
@Injectable({ providedIn: 'root' })
export class PokemonDetailFacadeService {
  private readonly api = inject(PokemonApiService);
  private readonly speciesApi = inject(SpeciesApiService);
  private readonly evolutionApi = inject(EvolutionApiService);
  private readonly cache = inject(CacheService);  

  loadPokemonDetail(idOrName: string | number): Observable<PokemonApi | null> {
    const cacheKey = CacheKeys.pokemonDetail(idOrName);
    const cached = this.cache.get<PokemonApi>(cacheKey);
    if (cached) {
      return of(cached);
    }

    return this.api.getByIdOrName(idOrName).pipe(
      switchMap((pokemon) => {
        if (!pokemon) {
          return of(null);
        }

        return of(pokemon);
      }),
    );
  }

  loadPokemonSpecies(idOrName: string | number): Observable<PokemonSpeciesApi | null> {
    const cacheKey = CacheKeys.pokemonSpecies(idOrName);
    const cached = this.cache.get<PokemonSpeciesApi | null>(cacheKey);
    if (cached) {
      return of(cached);
    }

    return this.speciesApi.getByIdOrName(idOrName).pipe(
      switchMap((species) => {
        return of(species);
      }),
    );
  }

  loadPokemonEvolution(url: string): Observable<EvolutionChainApi | null> {
    const cacheKey = CacheKeys.evolutionChain(url);
    const cached = this.cache.get<EvolutionChainApi>(cacheKey);
    if (cached) {
      return of(cached);
    }

    return this.evolutionApi.getByUrl(url).pipe(
      switchMap((evolution) => {
        return of(evolution);
      }),
    );
  }
}
