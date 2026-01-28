import { Routes } from '@angular/router';
import { SideBarMenu } from '../../shared/components/sidebar-menu/sidebar-menu';

export const sidebarSectionRoutes: Routes = [
  {
    path: 'table',
    loadComponent: () => import('./table/table').then((m) => m.Table),
    title: 'Table',
  },
  {
    path: 'list',
    loadComponent: () => import('./list/list').then((m) => m.List),
    title: 'List',
  },
  {
    path: 'buttons',
    loadComponent: () => import('./buttons/buttons').then((m) => m.Buttons),
    title: 'Buttons',
  },
  {
    path: 'tabs',
    loadComponent: () => import('./tabs/tabs').then((m) => m.Tabs),
    title: 'Tabs',
  },
];
