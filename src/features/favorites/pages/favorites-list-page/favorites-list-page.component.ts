import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FavoritesService } from '../../../../core/favorites/favorites.service';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { PokemonApi } from '../../../../data/api/interfaces';
import { PokemonListComponent } from '../../../../shared/components/pokemon-list/pokemon-list.component';
import { PokemonSearchComponent } from '../../../../shared/components/pokemon-search/pokemon-search.component';
import { IMAGES } from '../../../../shared/constants';

@Component({
  selector: 'app-favorites-list-page',
  standalone: true,
  imports: [TranslatePipe, PokemonListComponent, PokemonSearchComponent],
  templateUrl: './favorites-list-page.component.html',
  styleUrl: './favorites-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesListPageComponent {
  readonly pokeballStarImage = IMAGES.pokeball_star;
  private readonly favorites = inject(FavoritesService);
  readonly favoriteCount = this.favorites.getAll().length;
  readonly searchQuery = signal<string>('');

  onSearch(query: string): void {
    this.searchQuery.set(query);    
  }
}
