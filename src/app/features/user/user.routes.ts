import { Routes } from '@angular/router';
import { Users } from '../../features/user/users/users';

export const userRoutes: Routes = [
  {
    path: '',
    redirectTo: 'users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    loadComponent: () => import('../../features/user/users/users').then((m) => m.Users),
    title: 'Users',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'users',
  },
];
