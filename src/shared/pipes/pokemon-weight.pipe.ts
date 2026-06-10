import { Pipe, PipeTransform } from '@angular/core';

/** Converts PokeAPI weight (hectograms) to kilograms for display. */
@Pipe({ name: 'pokemonWeight', standalone: true })
export class PokemonWeightPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value == null || Number.isNaN(value)) {
      return '—';
    }
    const kilograms = value / 10;
    return `${formatMetric(kilograms)} kg`;
  }
}

function formatMetric(value: number): string {
  return parseFloat(value.toFixed(1)).toString();
}
