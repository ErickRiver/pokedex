import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FavoritesService } from '../../../../core/favorites/favorites.service';
import { PokemonCardComponent } from '../../../../shared/components/pokemon-card/pokemon-card.component';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { PokemonApi } from '../../../../data/api/interfaces';

@Component({
  selector: 'app-favorites-list-page',
  standalone: true,
  imports: [PokemonCardComponent, TranslatePipe],
  templateUrl: './favorites-list-page.component.html',
  styleUrl: './favorites-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoritesListPageComponent {
  private readonly favorites = inject(FavoritesService);

  /** Placeholder until favorite pokemon resolution is implemented. */
  readonly favoritePokemon: PokemonApi[] = [];

  readonly favoriteCount = this.favorites.getAll().length;
}
