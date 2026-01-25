import { Routes } from '@angular/router';
import { Dashboard } from '../pages/dashboard/dashboard';
import { Home } from '../pages/home/home'
import { dashboardChildrenRoutes } from '../shared/dashboard.children.routes';
//import { AdminSettingsComponent } from '../pages/admin/admin-settings.component';
//import { AdminListComponent } from '../pages/admin/admin-list.component';

export const adminRoutes: Routes = [
  {
    path: 'dashboard',
    component: Dashboard,
    data: { area: 'admin' },
    children: [
      ...dashboardChildrenRoutes,

      // 👇 RUTAS SOLO ADMIN
      {
        path: 'admin',
        loadChildren: () =>
          import('../components/admin/admin.routes').then(m => m.adminRoutes),
      },

      { path: '**', redirectTo: 'home' },

      //{ path: '', component: Home },           // /admin/dashboard
      //{ path: 'settings', component: AdminSettingsComponent },// /admin/dashboard/settings
      //{ path: 'list', component: AdminListComponent },        // /admin/dashboard/list
    ],
  },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
];
