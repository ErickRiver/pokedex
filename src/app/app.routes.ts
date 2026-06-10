import { Routes } from '@angular/router';
import { AppLayoutComponent } from '../core/layout/app-layout/app-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'pokemon' },
      {
        path: 'pokemon',
        loadChildren: () =>
          import('../features/pokemon/pokemon.routes').then((m) => m.POKEMON_ROUTES),
      },
      {
        path: 'favorites',
        loadChildren: () =>
          import('../features/favorites/favorites.routes').then((m) => m.FAVORITES_ROUTES),
      },
    ],
  },
  { path: '**', redirectTo: 'pokemon' },
];
