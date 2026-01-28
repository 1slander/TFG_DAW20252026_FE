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
    path: 'editor',
    loadChildren: () =>
      import('../../features/editor/editor.routes').then(m => m.editorRoutes),
  },
  {
    path: 'viewer',
    loadChildren: () =>
      import('../../features/viewer/viewer.routes').then(m => m.viewerRoutes),
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
    path: 'drawer',
    loadChildren: () =>
      import('../../features/sidebar-sections/drawer.routes').then(m => m.drawerRoutes),
  },
];
