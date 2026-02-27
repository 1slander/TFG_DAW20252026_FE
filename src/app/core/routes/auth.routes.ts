import { Routes } from '@angular/router';
import { LoginComponent } from '../../features/auth/login/login';
import { RegisterComponent } from '../../features/auth/register/register';
import { AdminLoginComponent } from '../../features/auth/admin-login/admin-login';

export const authRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login/admin', component: AdminLoginComponent},
  { path: '**', redirectTo: 'login' },
];