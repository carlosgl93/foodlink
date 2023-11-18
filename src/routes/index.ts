import asyncComponentLoader from '@/utils/loader';

import { Pages, Routes } from './types';

const routes: Routes = {
  [Pages.Welcome]: {
    component: asyncComponentLoader(() => import('@/pages/Welcome')),
    path: '/',
    title: 'Inicio',
    // icon: HomeIcon,
  },
  [Pages.Nosotros]: {
    component: asyncComponentLoader(() => import('@/pages/nosotros')),
    path: '/nosotros',
    title: 'Nosotros',
    // icon: GitHubIcon,
  },
  [Pages.Ayuda]: {
    component: asyncComponentLoader(() => import('@/pages/Page2')),
    path: '/ayuda',
    title: 'Ayuda',
    // icon: AddTaskIcon,
  },
  [Pages.Ingresar]: {
    component: asyncComponentLoader(() => import('@/pages/Page2')),
    path: '/ingresar',
    title: 'Ingresar',
    // icon: AddTaskIcon,
  },
  [Pages.Registrarse]: {
    component: asyncComponentLoader(() => import('@/pages/Page2')),
    path: '/registrarse',
    title: 'Registrarse',
    // icon: AddTaskIcon,
  },
  [Pages.Prestador]: {
    component: asyncComponentLoader(() => import('@/pages/PersonaApoyo')),
    path: '/persona-de-apoyo',
    title: 'Registrarse',
    // icon: AddTaskIcon,
  },
  [Pages.Comenzar]: {
    component: asyncComponentLoader(() => import('@/pages/Page2')),
    path: '/comenzar',
    title: 'Comenzar',
    // icon: AddTaskIcon,
  },
  [Pages.Comienzo]: {
    component: asyncComponentLoader(() => import('@/pages/Page2')),
    path: '/comienzo',
    // title: 'Ingresar',
    // icon: AddTaskIcon,
  },

  [Pages.NotFound]: {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: '*',
  },
};

export default routes;
