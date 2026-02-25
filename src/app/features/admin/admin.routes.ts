import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: '',
    redirectTo: 'admins',
    pathMatch: 'full',
  },
  {
    path: 'admins',
    loadComponent: () => import('./admin').then((m) => m.AdminComponent),
    title: 'Admins',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'admins',
  },
];
