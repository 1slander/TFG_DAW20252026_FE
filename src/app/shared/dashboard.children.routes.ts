import { Routes } from '@angular/router';
import { Home } from '../pages/home/home';

export const dashboardChildrenRoutes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: Home, title: 'Home' },

  {
    path: 'settings',
    loadChildren: () =>
      import('../components/settings/settings.routes').then(m => m.settingsRoutes),
  },
  {
    path: 'editor',
    loadChildren: () =>
      import('../components/editor/editor.routes').then(m => m.editorRoutes),
  },
  {
    path: 'viewer',
    loadChildren: () =>
      import('../components/viewer/viewer.routes').then(m => m.viewerRoutes),
  },
  {
    path: 'car',
    loadChildren: () =>
      import('../components/car/car.routes').then(m => m.carRoutes),
  },
  {
    path: 'article',
    loadChildren: () =>
      import('../components/article/article.routes').then(m => m.articleRoutes),
  },
  {
    path: 'drawer',
    loadChildren: () =>
      import('../components/drawer/drawer.routes').then(m => m.drawerRoutes),
  },
];
