import { Injectable } from '@angular/core';
import { PokemonApi } from '../interfaces';
import { PokemonDetail } from '../../../shared/models';
import { formatPokemonDisplayName } from '../../../shared/helpers/pokemon-name.helper';
import { resolveOfficialArtworkUrl } from '../../../shared/helpers/pokemon-url.helper';

/** Maps PokeAPI DTOs to domain view models (detail page and future features). */
@Injectable({ providedIn: 'root' })
export class PokemonMapper {
  toDetail(dto: PokemonApi, description = ''): PokemonDetail {
    return {
      id: dto.id,
      name: dto.name,
      displayName: formatPokemonDisplayName(dto.name),
      pokedexNumber: dto.id,
      height: dto.height,
      weight: dto.weight,
      imageUrl: resolveOfficialArtworkUrl(dto.sprites),
      types: dto.types.map((slot) => ({
        slot: slot.slot,
        name: slot.type.name,
      })),
      stats: dto.stats.map((s) => ({
        name: s.stat.name,
        baseValue: s.base_stat,
      })),
      about: {
        height: dto.height,
        weight: dto.weight,
        types: dto.types.map((slot) => ({
          slot: slot.slot,
          name: slot.type.name,
        })),
        abilities: dto.abilities.map((a) => ({
          name: a.ability.name,
          isHidden: a.is_hidden,
        })),
        baseExperience: dto.base_experience,
        description,
      },
      evolutionChainId: null,
    };
  }
}
