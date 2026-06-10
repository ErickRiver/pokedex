import { Injectable, inject } from '@angular/core';
import { Observable, forkJoin, of, switchMap, tap } from 'rxjs';
import { CacheService } from '../../../core/cache/cache.service';
import { CacheKeys } from '../../../shared/constants';
import { PokemonApiService } from '../../../data/services';
import { PokemonApi } from '../../../data/api/interfaces';

/** Orchestrates list loading with cache for the pokemon list page. */
@Injectable({ providedIn: 'root' })
export class PokemonFacadeService {
  private readonly api = inject(PokemonApiService);
  private readonly cache = inject(CacheService);

  loadPokemonList(offset = 0, limit = 9): Observable<PokemonApi[]> {
    const cacheKey = CacheKeys.pokemonList(offset, limit);
    const cached = this.cache.get<PokemonApi[]>(cacheKey);
    if (cached) {
      return of(cached);
    }

    return this.api.getList(offset, limit).pipe(
      switchMap((page) => {
        if (!page.results.length) {
          return of([]);
        }
        const detailRequests = page.results.map((ref) => this.api.getByIdOrName(ref.name));
        return forkJoin(detailRequests);
      }),
      tap((pokemonList) => this.cache.set(cacheKey, pokemonList)),
    );
  }
}
