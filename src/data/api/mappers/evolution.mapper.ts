import { Injectable } from '@angular/core';
import { ChainLinkApi } from '../interfaces';
import { EvolutionNode } from '../../../shared/models';
import { formatPokemonDisplayName } from '../../../shared/helpers/pokemon-name.helper';

@Injectable({ providedIn: 'root' })
export class EvolutionMapper {
  toEvolutionTree(link: ChainLinkApi): EvolutionNode {
    const speciesId = this.extractIdFromUrl(link.species.url);
    return {
      speciesId,
      speciesName: link.species.name,
      displayName: formatPokemonDisplayName(link.species.name),
      imageUrl: '',
      minLevel: link.evolution_details[0]?.min_level ?? null,
      evolvesTo: link.evolves_to.map((child) => this.toEvolutionTree(child)),
    };
  }

  private extractIdFromUrl(url: string): number {
    const match = url.match(/\/(\d+)\/?$/);
    return match ? Number(match[1]) : 0;
  }
}
