import { Pipe, PipeTransform } from '@angular/core';

/** Converts PokeAPI height (decimeters) to meters for display. */
@Pipe({ name: 'pokemonHeight', standalone: true })
export class PokemonHeightPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value == null || Number.isNaN(value)) {
      return '—';
    }
    const meters = value / 10;
    return `${formatMetric(meters)} m`;
  }
}

function formatMetric(value: number): string {
  return parseFloat(value.toFixed(1)).toString();
}
