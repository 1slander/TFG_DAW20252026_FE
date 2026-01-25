import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register';
import { LoginComponent } from './pages/login/login';

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
      import('./routes/admin.routes').then((m)=>m.adminRoutes)
  },

  //RUTAS PARA USER
  {
    path: 'api',
    loadChildren: () =>
      import('./routes/api.routes').then((m) => m.apiRoutes),
  },
  
  //RUTAS DE AUTH
 {
    path: 'auth',
    loadChildren: () =>
      import('./routes/auth.routes').then((m) => m.authRoutes),
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