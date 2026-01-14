import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./shared/dashboard.routes').then((m) => m.dashboardRoutes),
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
];
