import { Routes } from '@angular/router';
import { LoginComponent } from '../../features/auth/login/login';
import { RegisterComponent } from '../../features/auth/register/register';
import { AdminLoginComponent } from '../../features/auth/admin-login/admin-login';

export const authRoutes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },

<<<<<<< HEAD
  // { path: '', component: LoginComponent },
  // { path: 'register', component: RegisterComponent },
  // { path: 'admin', component: AdminLoginComponent},
  // { path: '**', redirectTo: 'login' },
=======
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login/admin', component: AdminLoginComponent},
  { path: '**', redirectTo: 'login' },
>>>>>>> b4b5012d82b66cf4d2e53b084b909777bd4a2a90
];