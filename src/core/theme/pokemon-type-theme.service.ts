import { Injectable, signal } from '@angular/core';
import {
  DEFAULT_TYPE_THEME,
  POKEMON_TYPE_THEMES,
  PokemonTypeTheme,
} from '../../shared/constants/pokemon-type-theme.const';

@Injectable({ providedIn: 'root' })
export class PokemonTypeThemeService {
  readonly primaryType = signal<string | null>(null);

  setPrimaryType(typeName: string | null): void {
    this.primaryType.set(typeName);
  }

  clearPrimaryType(): void {
    this.primaryType.set(null);
  }

  getTheme(typeName: string | null): PokemonTypeTheme {
    if (!typeName) {
      return DEFAULT_TYPE_THEME;
    }
    return POKEMON_TYPE_THEMES[typeName] ?? DEFAULT_TYPE_THEME;
  }

  getLayoutBackground(typeName: string | null): string {
    return this.getTheme(typeName).layoutBackground;
  }
}
