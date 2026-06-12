import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,  
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonSearchComponent } from '../../../../shared/components/pokemon-search/pokemon-search.component';
import { PokemonListComponent } from '../../../../shared/components/pokemon-list/pokemon-list.component';
import { IMAGES } from '../../../../shared/constants';

@Component({
  selector: 'app-pokemon-list-page',
  standalone: true,
  imports: [PokemonSearchComponent, PokemonListComponent],
  templateUrl: './pokemon-list-page.component.html',
  styleUrl: './pokemon-list-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PokemonListPageComponent implements OnInit {  
  readonly pokeballImage = IMAGES.pokeball;
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);  
  
  ngOnInit(): void {    
    void this.onGenerationFilter();
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
