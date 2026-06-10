import { ChangeDetectionStrategy, Component, computed, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { PokemonIdPipe } from '../../pipes/pokemon-id.pipe';
import { ImgFallbackDirective } from '../../directives/img-fallback.directive';
import { PokemonTypesComponent } from '../pokemon-types/pokemon-types.component';
import { PokemonApi } from '../../../data/api/interfaces';
import { resolveOfficialArtworkUrl } from '../../helpers/pokemon-url.helper';
import { formatPokemonDisplayName } from '../../helpers/pokemon-name.helper';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [RouterLink, PokemonIdPipe, ImgFallbackDirective, PokemonTypesComponent],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonCardComponent {
  readonly pokemon = input.required<PokemonApi>();
  readonly selected = output<number>();

  readonly imageUrl = computed(() => resolveOfficialArtworkUrl(this.pokemon().sprites));
  readonly displayName = computed(() => formatPokemonDisplayName(this.pokemon().name));
  readonly type = computed(() => this.pokemon().types[0].type.name.toLowerCase());

  onSelect(): void {
    this.selected.emit(this.pokemon().id);
  }
}
