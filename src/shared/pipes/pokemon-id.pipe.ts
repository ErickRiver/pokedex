import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'pokemonId', standalone: true })
export class PokemonIdPipe implements PipeTransform {
  transform(value: number): string {
    return `#${String(value).padStart(4, '0')}`;
  }
}
