import { Routes } from '@angular/router';
import { PokemonListPageComponent } from './pages/pokemon-list-page/pokemon-list-page.component';
import { PokemonDetailPageComponent } from './pages/pokemon-detail-page/pokemon-detail-page.component';

export const POKEMON_ROUTES: Routes = [
  { path: '', component: PokemonListPageComponent },
  { path: ':idOrName', component: PokemonDetailPageComponent },
];
