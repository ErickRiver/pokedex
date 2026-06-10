import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { PokemonTypeSlotApi } from '../../../data/api/interfaces';
import { TranslatePipe } from '../../pipes/translate.pipe';

@Component({
  selector: 'app-pokemon-types',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './pokemon-types.component.html',
  styleUrl: './pokemon-types.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonTypesComponent {
  readonly types = input.required<PokemonTypeSlotApi[]>();

  typeTranslationKey(typeName: string): string {
    return `pokemon.types.${typeName}`;
  }
}
