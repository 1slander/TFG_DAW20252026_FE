import { Routes } from '@angular/router';
import { RegisterComponent } from './features/auth/register/register';
import { LoginComponent } from './features/auth/login/login';
import { DashboardComponent } from './features/dashboard/dashboard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },

  // RUTAS DE AUTH
  {
    path: 'auth',
    loadChildren: () =>
      import('./core/routes/auth.routes').then((m) => m.authRoutes),
  },

  // RUTAS DASHBOARD (UNIFICADO)
  {
    path: 'dashboard',
    component: DashboardComponent, // El Layout se carga solo una vez!
    // canActivate: [AuthGuard] // (Futuro)
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },

      {
        path: 'home',
        loadComponent: () => import('./features/home/home').then(m => m.HomeComponent),
        title: 'Home'
      },

      // -- RUTAS PARA OWNER(1) / ADMIN(2) --
      {
        path: 'admin',
        loadChildren: () => import('./features/admin/admin.routes').then((m) => m.adminRoutes)
      },
      {
        path: 'role',
        loadChildren: () => import('./features/role/role.routes').then((m) => m.rolesRoutes)
      },
      {
        path: 'user',
        loadChildren: () => import('./features/user/user.routes').then((m) => m.userRoutes)
      },

      // -- RUTAS GENERALES / OPERACIONALES --
      {
        path: 'shift',
        loadChildren: () => import('./features/shift/shift.routes').then((m) => m.shiftRoutes)
      },
      {
        path: 'restaurant',
        loadChildren: () => import('./features/restaurant/restaurant.routes').then((m) => m.restaurantRoutes)
      },
      {
        path: 'employee',
        loadChildren: () => import('./features/employee/employee.routes').then(m => m.employeeRoutes)
      },

      // CONFIGURACIÓN PROPIA
      {
        path: 'settings',
        loadChildren: () => import('./features/settings/settings.routes').then(m => m.settingsRoutes)
      },

      // CATCH-ALL INTERNO DEL DASHBOARD
      { path: '**', redirectTo: 'home' }
    ],
  },

  // CATCH-ALL GLOBAL Y DESCONOCIDAS
  {
    path: '**',
    redirectTo: 'dashboard',
  },
];