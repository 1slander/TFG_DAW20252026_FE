import { Routes } from '@angular/router';
import { Home } from '../../features/home/home';

export const dashboardChildrenRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: Home, title: 'Home' },

  {
    path: 'settings',
    loadChildren: () =>
      import('../../features/settings/settings.routes').then(m => m.settingsRoutes),
  },
  {
    path: 'role',
    loadChildren: () =>
      import('../../features/role/role.routes').then(m => m.rolesRoutes),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('../../features/user/user.routes').then(m => m.userRoutes),
  },
  {
    path: 'car',
    loadChildren: () =>
      import('../../features/car/car.routes').then(m => m.carRoutes),
  },
  {
    path: 'article',
    loadChildren: () =>
      import('../../features/article/article.routes').then(m => m.articleRoutes),
  },
  {
    path: 'sidebar-sections',
    loadChildren: () =>
      import('../../features/sidebar-sections/sidebar-sections.routes').then(m => m.sidebarSectionRoutes),
  },
];
