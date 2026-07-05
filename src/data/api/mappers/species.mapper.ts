import { inject, Injectable } from '@angular/core';
import { PokemonSpeciesApi } from '../interfaces';
import { TranslationService } from '../../../core/i18n/translation.service';

@Injectable({ providedIn: 'root' })
export class SpeciesMapper {
  private readonly translation = inject(TranslationService);

  extractDescription(dto: PokemonSpeciesApi | null, version?: string): string {
    if (!dto) {
      return '';
    }
    
    this.translation.language();
    this.translation.revision();
    const entry = dto.flavor_text_entries.find((e) => e.language.name === this.translation.language() && (version ? e.version.name === version : true));
    return entry?.flavor_text.replace(/\f/g, ' ').trim() ?? '';
  }

  extractVersions(dto: PokemonSpeciesApi | null): { version: string; flavor_text: string }[] {
    if (!dto) {
      return [];
    }

    return dto.flavor_text_entries
      .filter((e) => e.language.name === this.translation.language())
      .map((e) => ({
        version: e.version.name,
        flavor_text: e.flavor_text.replace(/\f/g, ' ').trim(),
      }));
  }
}
