import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
  signal,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonSearchComponent } from '../../../../shared/components/pokemon-search/pokemon-search.component';
import { PokemonCardComponent } from '../../../../shared/components/pokemon-card/pokemon-card.component';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { PokemonFacadeService } from '../../services/pokemon-facade.service';
import { PokemonApi } from '../../../../data/api/interfaces';
import { LoadingStateComponent } from '../../../../shared/components/loading-state/loading-state.component';
import { TranslationService } from '../../../../core/i18n/translation.service';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';

@Component({
  selector: 'app-pokemon-list-page',
  standalone: true,
  imports: [PokemonSearchComponent, PokemonCardComponent, TranslatePipe, LoadingStateComponent, EmptyStateComponent],
  templateUrl: './pokemon-list-page.component.html',
  styleUrl: './pokemon-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListPageComponent implements OnInit {
  private readonly facade = inject(PokemonFacadeService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly translation = inject(TranslationService);
  readonly pokemonList = signal<PokemonApi[]>([]);
  readonly loading = signal(true);
  readonly error = signal(false);
  readonly errorMessage = signal<string>('');

  ngOnInit(): void {
    this.loadList();
    void this.onGenerationFilter();
  }

  private loadList(): void {
    this.loading.set(true);
    this.error.set(false);
    this.facade.loadPokemonList().subscribe({
      next: (pokemons: PokemonApi[]) => {
        this.pokemonList.set(pokemons);
        this.loading.set(false);
      },
      error: () => {
        this.error.set(true);
        this.errorMessage.set(this.translation.translate('pokemon.list.error') as string);
        this.loading.set(false);
      },
    });
  }

  onSearch(query: string): void {
    if (!query) {
      return;
    }
    void this.router.navigate(['/pokemon', query]);
  }

  onGenerationFilter(): void {
    const generationId = this.route.snapshot.queryParamMap.get('generation');
    // Filter by generation — implementation deferred
    void generationId;
  }
}
