import { Injectable, computed, inject, signal } from '@angular/core';
import { StorageKeys } from '../../shared/constants';
import { FavoriteEntry } from '../../shared/models';
import { StorageService } from '../storage/storage.service';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
  private readonly storage = inject(StorageService);
  private readonly entries = signal<FavoriteEntry[]>(this.loadFromStorage());

  readonly favoriteIds = computed(() => new Set(this.entries().map((e) => e.pokemonId)));

  isFavorite(pokemonId: number): boolean {
    return this.favoriteIds().has(pokemonId);
  }

  toggle(pokemonId: number): void {
    if (this.isFavorite(pokemonId)) {
      this.entries.update((list) => list.filter((e) => e.pokemonId !== pokemonId));
    } else {
      this.entries.update((list) => [
        ...list,
        { pokemonId, addedAt: new Date().toISOString() },
      ]);
    }
    this.persist();
  }

  getAll(): FavoriteEntry[] {
    return this.entries();
  }

  private loadFromStorage(): FavoriteEntry[] {
    return this.storage.get<FavoriteEntry[]>(StorageKeys.favorites) ?? [];
  }

  private persist(): void {
    this.storage.set(StorageKeys.favorites, this.entries());
  }
}
