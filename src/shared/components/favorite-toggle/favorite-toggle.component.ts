import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { FavoritesService } from '../../../core/favorites/favorites.service';

@Component({
  selector: 'app-favorite-toggle',
  standalone: true,
  imports: [],
  templateUrl: './favorite-toggle.component.html',
  styleUrl: './favorite-toggle.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteToggleComponent {
  private readonly favorites = inject(FavoritesService);
  readonly pokemonId = input.required<number>();
  readonly type = input<string | null>();

  protected readonly isFavorite = computed(() =>
    this.favorites.isFavorite(this.pokemonId()),
  );

  toggle(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.favorites.toggle(this.pokemonId());
  }
}
