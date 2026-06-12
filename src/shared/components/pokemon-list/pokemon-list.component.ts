import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonCardComponent } from '../pokemon-card/pokemon-card.component';
import { TranslatePipe } from '../../pipes/translate.pipe';
import { PokemonFacadeService } from '../../../features/pokemon/services/pokemon-facade.service';
import { PokemonApi } from '../../../data/api/interfaces';
import { LoadingStateComponent } from '../loading-state/loading-state.component';
import { TranslationService } from '../../../core/i18n/translation.service';
import { EmptyStateComponent } from '../empty-state/empty-state.component';
import { FavoritesService } from '../../../core/favorites/favorites.service';
import { PokemonDetailFacadeService } from '../../../features/pokemon/services/pokemon-detail-facade.service';
import { formatPokemonDisplayName } from '../../helpers/pokemon-name.helper';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [PokemonCardComponent, TranslatePipe, LoadingStateComponent, EmptyStateComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListComponent implements OnInit {
  readonly output = output<PokemonApi[]>();

  readonly isFavorites = input<boolean>(false);
  readonly searchQuery = input<string>('');

  private readonly favorites = inject(FavoritesService);
  private readonly facade = inject(PokemonFacadeService);
  private readonly detailFacade = inject(PokemonDetailFacadeService);
  private readonly translation = inject(TranslationService);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly allPokemonList = signal<PokemonApi[]>([]);
  readonly pokemonList = computed(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const all = this.allPokemonList();

    if (!query) {
      return all;
    }

    return all.filter((pokemon) => {
      const name = formatPokemonDisplayName(pokemon.name).toLowerCase();
      const slug = pokemon.name.toLowerCase();
      const id = String(pokemon.id);
      return (
        name.includes(query) ||
        slug.includes(query) ||
        id.includes(query)
      );
    });
  });

  readonly loading = signal(true);
  readonly error = signal(false);
  readonly errorMessage = signal<string>('');

  ngOnInit(): void {
    this.resolveList();
  }

  private resolveList(): void {
    
    if (this.isFavorites()) {      
      const favoriteList = this.favorites.getAll().sort((a, b) => a.pokemonId - b.pokemonId);

      favoriteList.forEach((favorite) => {
        this.detailFacade.loadPokemonDetail(favorite.pokemonId).subscribe((pokemon) => {
          if (pokemon) {
            this.allPokemonList.set([...this.allPokemonList(), pokemon]);
          }
        });
      });
    } else {      
      this.loadList();
    }

    this.loading.set(false);
    this.cdr.detectChanges();
  }

  private loadList(): void {
    this.loading.set(true);
    this.error.set(false);
    this.facade.loadPokemonList().subscribe({
      next: (pokemons: PokemonApi[]) => {
        this.allPokemonList.set(pokemons);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.errorMessage.set(this.translation.translate('pokemon.list.error') as string);
        this.loading.set(false);
      },
    });
  }
}
