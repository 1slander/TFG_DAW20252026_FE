import { Routes } from '@angular/router';
import { LoginComponent } from '../pages/login/login';
import { RegisterComponent } from '../pages/register/register';

export const authRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: '**', redirectTo: 'login' },
];