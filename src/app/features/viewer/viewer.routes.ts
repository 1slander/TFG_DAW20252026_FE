import { Routes } from '@angular/router';
import { Viewers } from '../../features/viewer/viewers/viewers';

export const viewerRoutes: Routes = [
  {
    path: '',
    redirectTo: 'viewers',
    pathMatch: 'full',
  },
  {
    path: 'viewers',
    loadComponent: () => import('../../features/viewer/viewers/viewers').then((m) => m.Viewers),
    title: 'Viewers',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'viewers',
  },
];
