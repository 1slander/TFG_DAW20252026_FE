import { Roles } from './roles/roles';
import { Routes } from '@angular/router';


export const rolesRoutes: Routes = [
  {
    path: '',
    redirectTo: 'role',
    pathMatch: 'full',
  },
  {
    path: 'roles',
    loadComponent: () => import('./roles/roles').then((m) => m.Roles),
    title: 'Roles',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'roles',
  },
];
