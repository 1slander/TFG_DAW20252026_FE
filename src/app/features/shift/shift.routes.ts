import { Routes } from '@angular/router';

export const shiftRoutes: Routes = [
  {
    path: '',
    redirectTo: 'shifts',
    pathMatch: 'full',
  },
  {
    path: 'shifts',
    loadComponent: () => import('./shifts').then((m) => m.ShiftsComponent),
    title: 'Turnos',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'shifts',
  },
];
