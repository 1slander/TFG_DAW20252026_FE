import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register';
import { LoginComponent } from './pages/login/login';

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
    path:'login',
    component: LoginComponent
  },
  {
    path: '**',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },
];
