import { ChangeDetectionStrategy, Component, input, OnInit, signal } from '@angular/core';
import { EvolutionNode } from '../../../../shared/models';
import { TranslatePipe } from '../../../../shared/pipes/translate.pipe';
import { ChainLinkApi, EvolutionChainApi } from '../../../../data/api/interfaces';

@Component({
  selector: 'app-pokemon-evolution',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './pokemon-evolution.component.html',
  styleUrl: './pokemon-evolution.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonEvolutionComponent implements OnInit {
  readonly evolutionChain = input<EvolutionChainApi | null>(null);
  evolutionTree: any[] = [];

  ngOnInit(): void {
    console.log("this.evolutionChain()");
    console.log(this.evolutionChain());
    this.evolutionTree = this.buildEvolutionTree(this.evolutionChain()?.chain ?? null);

    console.log("this.evolutionTree");
    console.log(this.evolutionTree);
  }

  private buildEvolutionTree(chain: ChainLinkApi | null): any {
    if (!chain) return [];

    this.evolutionTree.push(chain.species.name);

    for (const link of chain.evolves_to) {
      this.buildEvolutionTree(link);
    }
    
    return this.evolutionTree;
  }
}
