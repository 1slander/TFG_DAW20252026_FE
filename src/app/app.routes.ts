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

  //RUTAS PARA USER
  {
    path: 'user',
    loadChildren: () =>
      import('./core/routes/user.routes').then((m) => m.userRoutes),
  },
  
  //RUTAS DE AUTH
 {
    path: 'auth',
    loadChildren: () =>
      import('./core/routes/auth.routes').then((m) => m.authRoutes),
  },

  {
    path: '**',
    redirectTo: 'user/dashboard',
  },
];

// {
//   path: 'dashboard',
//   loadChildren: () =>
//     import('./shared/dashboard.routes').then((m) => m.dashboardRoutes),
// },