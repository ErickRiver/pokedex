import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PokemonListComponent } from '../../../../shared/components/pokemon-list/pokemon-list.component';
import { PokemonSearchComponent } from '../../../../shared/components/pokemon-search/pokemon-search.component';
import { IMAGES } from '../../../../shared/constants';

@Component({
  selector: 'app-favorites-list-page',
  standalone: true,
  imports: [PokemonListComponent, PokemonSearchComponent],
  templateUrl: './favorites-list-page.component.html',
  styleUrl: './favorites-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesListPageComponent {
  readonly pokeballStarImage = IMAGES.pokeball_star;
  readonly searchQuery = signal<string>('');

  onSearch(query: string): void {
    this.searchQuery.set(query);
  }
}
