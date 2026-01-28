import { Routes } from '@angular/router';
import { Dashboard } from '../../features/dashboard/dashboard';
import { Home } from '../../features/home/home';
import { dashboardChildrenRoutes } from '../../shared/routes/dashboard.children.routes';
//import { UserProfileComponent } from '../pages/user/user-profile.component';

export const apiRoutes: Routes = [
  {
    path: 'dashboard',
    component: Dashboard,
    data: { area: 'api' },
    children: [
      ...dashboardChildrenRoutes,


      {
        path: 'viewer',
        loadChildren: () =>
          import('../../features/viewer/viewer.routes').then(m => m.viewerRoutes),
      },

      // wildcard dentro del dashboard user
      { path: '**', redirectTo: 'home' },
      //{ path: '', component: Home },       // /user/dashboard
      //{ path: 'profile', component: UserProfileComponent }, // /user/dashboard/profile
    ],
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
