import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register/register';
import { LoginComponent } from './features/auth/login/login';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'api/dashboard',
    pathMatch: 'full',
  },

  //RUTAS PARA ADMIN
  {
    path:'admin',
    loadChildren:()=>
      import('./core/routes/admin.routes').then((m)=>m.adminRoutes)
  },

  //RUTAS PARA API
  {
    path: 'api',
    loadChildren: () =>
      import('./core/routes/api.routes').then((m) => m.apiRoutes),
  },
  
  //RUTAS DE AUTH
 {
    path: 'auth',
    loadChildren: () =>
      import('./core/routes/auth.routes').then((m) => m.authRoutes),
  },

  {
    path: '**',
    redirectTo: 'api/dashboard',
  },
];

// {
//   path: 'dashboard',
//   loadChildren: () =>
//     import('./shared/dashboard.routes').then((m) => m.dashboardRoutes),
// },