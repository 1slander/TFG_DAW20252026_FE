import { Routes } from '@angular/router';
import { Dashboard } from '../pages/dashboard/dashboard';
import { Home } from '../pages/home/home';
import { dashboardChildrenRoutes } from '../shared/dashboard.children.routes';
//import { UserProfileComponent } from '../pages/user/user-profile.component';

export const apiRoutes: Routes = [
  {
    path: 'dashboard',
    component: Dashboard,
    data: { area: 'user' },
    children: [
       ...dashboardChildrenRoutes,

       {
        path: 'api',
        loadChildren: () =>
          import('../components/user/user.routes').then(m => m.userRoutes),
      },

      // wildcard dentro del dashboard user
      { path: '**', redirectTo: 'home' },
      //{ path: '', component: Home },       // /user/dashboard
      //{ path: 'profile', component: UserProfileComponent }, // /user/dashboard/profile
    ],
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
