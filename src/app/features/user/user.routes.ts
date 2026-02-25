import { Routes } from '@angular/router';


export const userRoutes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    loadComponent: () => import('./users').then((m) => m.UsersComponent),
    title: 'Users',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'users',
  },
];
