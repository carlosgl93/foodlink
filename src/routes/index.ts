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
    component: asyncComponentLoader(() => import('@/pages/Nosotros')),
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
    component: asyncComponentLoader(() => import('@/pages/Ingresar')),
    path: '/ingresar',
    title: 'Ingresar',
    // icon: AddTaskIcon,
  },
  [Pages.RegistrarPrestador]: {
    component: asyncComponentLoader(() => import('@/pages/RegistrarPrestador')),
    path: '/registrar-prestador',
    title: 'Registrarse',
    // icon: AddTaskIcon,
  },
  [Pages.RegistrarUsuario]: {
    component: asyncComponentLoader(() => import('@/pages/RegistrarUsuario')),
    path: '/registrar-usuario',
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
    component: asyncComponentLoader(() => import('@/pages/Comienzo')),
    path: '/comienzo',
    // title: 'Ingresar',
    // icon: AddTaskIcon,
  },
  [Pages.EntregaApoyo]: {
    component: asyncComponentLoader(() => import('@/pages/EntregaApoyo')),
    path: '/entrega-apoyo',
    // title: 'Ingresar',
    // icon: AddTaskIcon,
  },
  [Pages.RecibeApoyo]: {
    component: asyncComponentLoader(() => import('@/pages/RecibeApoyo')),
    path: '/recibe-apoyo',
    // title: 'Ingresar',
    // icon: AddTaskIcon,
  },
  [Pages.Resultados]: {
    component: asyncComponentLoader(() => import('@/pages/Resultados')),
    path: '/resultados',
    // title: 'Ingresar',
    // icon: AddTaskIcon,
  },
  [Pages.PerfilPrestador]: {
    component: asyncComponentLoader(() => import('@/pages/PerfilPrestador')),
    path: '/perfil-prestador/:id',
    // title: 'Ingresar',
    // icon: AddTaskIcon,
  },
  [Pages.PerfilUsuario]: {
    component: asyncComponentLoader(() => import('@/pages/PerfilUsuario')),
    path: '/perfil-usuario/:id',
    // title: 'Ingresar',
    // icon: AddTaskIcon,
  },
  [Pages.EmailVerificado]: {
    component: asyncComponentLoader(() => import('@/pages/EmailVerificado')),
    path: '/email-verificado',
    // title: 'Ingresar',
    // icon: AddTaskIcon,
  },
  [Pages.NotFound]: {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: '*',
  },
};

export default routes;
