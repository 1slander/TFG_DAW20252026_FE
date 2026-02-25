
import { Routes } from '@angular/router';


export const rolesRoutes: Routes = [
  {
    path: '',
    redirectTo: 'role',
    pathMatch: 'full',
  },
  {
    path: 'roles',
    loadComponent: () => import('./roles').then((m) => m.RolesComponent),
    title: 'Roles',
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'roles',
  },
];
