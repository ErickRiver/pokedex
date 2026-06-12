import { ChangeDetectionStrategy, ChangeDetectorRef, Component, effect, inject, input, OnInit, signal } from '@angular/core';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { ApiResourceRef, ChainLinkApi, EvolutionChainApi, PokemonApi } from '../../../../data/api/interfaces';
import { HttpErrorResponse } from '@angular/common/http';
import { PokemonDetailFacadeService } from '../../services/pokemon-detail-facade.service';
import { extractIdFromUrl } from '../../../../shared/helpers/pokemon-url.helper';
import { PokemonTypesComponent } from '../../../../shared/components/pokemon-types/pokemon-types.component';
import { forkJoin, of } from 'rxjs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemon-evolution',
  standalone: true,
  imports: [TranslatePipe, PokemonTypesComponent, RouterLink],
  templateUrl: './pokemon-evolution.component.html',
  styleUrl: './pokemon-evolution.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonEvolutionComponent implements OnInit {
  readonly evolutionChain = input<EvolutionChainApi | null>(null);
  readonly pokemon = input<PokemonApi | null>(null);
  readonly loading = signal(false);
  readonly error = signal(false);
  readonly errorKey = signal<string | null>(null);
  private readonly facade = inject(PokemonDetailFacadeService);
  private readonly cdr = inject(ChangeDetectorRef);

  readonly evolutionArray = signal<PokemonApi[]>([]);

  ngOnInit(): void {
    this.getEvolutionChain();
  }

  private buildEvolutionTree(chain: ChainLinkApi | null): ApiResourceRef[] {
    if (!chain) return [];

    const tree: ApiResourceRef[] = [chain.species];

    for (const link of chain.evolves_to) {
      tree.push(...this.buildEvolutionTree(link));
    }

    return tree;
  }

  private getEvolutionChain(): void {
    this.loading.set(true);
    this.error.set(false);
    this.errorKey.set(null);
    this.evolutionArray.set([]);

    const evolutionTree = this.buildEvolutionTree(this.evolutionChain()?.chain ?? null);
    const currentPokemon = this.pokemon();

    const requests = evolutionTree.map((species) => {
      const id = extractIdFromUrl(species.url);

      if (currentPokemon?.id?.toString() === id) {
        return of(currentPokemon);
      }

      return this.facade.loadPokemonDetail(id);
    });

    if (requests.length === 0) {
      this.loading.set(false);
      return;
    }

    forkJoin(requests).subscribe({
      next: (pokemons) => {
        this.evolutionArray.set(pokemons.filter((pokemon): pokemon is PokemonApi => pokemon !== null));
        this.loading.set(false);
        this.cdr.detectChanges();
      },
      error: (error: HttpErrorResponse) => {
        this.error.set(true);
        this.errorKey.set(
          error.status === 404 ? 'pokemon.detail.unknown' : 'pokemon.detail.error',
        );
        this.loading.set(false);
        this.cdr.detectChanges();
      },
    });
  }

}
