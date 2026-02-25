import { Routes } from '@angular/router';

export const restaurantRoutes: Routes = [
  {
    path: '',
    redirectTo: 'restaurants',
    pathMatch: 'full',
  },
  {
    path: 'restaurants',
    loadComponent: () => import('./restaurants').then((m) => m.RestaurantsComponent),
    title: 'Restaurantes',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'restaurants',
  },
];
