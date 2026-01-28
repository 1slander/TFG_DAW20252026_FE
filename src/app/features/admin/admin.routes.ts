import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: '',
    redirectTo: 'admins',
    pathMatch: 'full',
  },
  {
    path: 'admins',
    loadComponent: () => import('./admins/admin').then((m) => m.Admin),
    title: 'Admins',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'admins',
  },
];
