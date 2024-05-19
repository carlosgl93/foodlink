import asyncComponentLoader from '@/utils/loader';

import { Pages, Routes } from './types';

const routes: Routes = {
  [Pages.Welcome]: {
    component: asyncComponentLoader(() => import('@/pages/Welcome')),
    path: '/',
    title: 'Inicio',
  },
  // [Pages.Nosotros]: {
  //   component: asyncComponentLoader(() => import('@/pages/Nosotros')),
  //   path: '/nosotros',
  //   title: 'Nosotros',
  // },
  // [Pages.Ayuda]: {
  //   component: asyncComponentLoader(() => import('@/pages/Page2')),
  //   path: '/ayuda',
  //   title: 'Ayuda',
  // },
  [Pages.Ingresar]: {
    component: asyncComponentLoader(() => import('@/pages/Ingresar')),
    path: '/ingresar',
    title: 'Ingresar',
  },
  [Pages.RegistrarProveedor]: {
    component: asyncComponentLoader(() => import('@/pages/RegistrarProveedor')),
    path: '/registrar-proveedor',
    title: 'Registrarse',
  },
  [Pages.RegistrarUsuario]: {
    component: asyncComponentLoader(() => import('@/pages/RegistrarUsuario')),
    path: '/registrar-usuario',
    title: 'Registrarse',
  },
  [Pages.Comenzar]: {
    component: asyncComponentLoader(() => import('@/pages/Comenzar')),
    path: '/comenzar',
  },
  [Pages.ComenzarComprar]: {
    component: asyncComponentLoader(() => import('@/pages/Comenzar/Comprar')),
    path: '/comenzar/comprar',
  },
  [Pages.ComenzarVender]: {
    component: asyncComponentLoader(() => import('@/pages/Comenzar/Vender')),
    path: '/comenzar/vender',
  },
  // [Pages.EntregaApoyo]: {
  //   component: asyncComponentLoader(() => import('@/pages/EntregaApoyo')),
  //   path: '/entrega-apoyo',
  // },
  // [Pages.RecibeApoyo]: {
  //   component: asyncComponentLoader(() => import('@/pages/RecibeApoyo')),
  //   path: '/recibe-apoyo',
  // },
  [Pages.Resultados]: {
    component: asyncComponentLoader(() => import('@/pages/Resultados')),
    path: '/resultados',
  },
  [Pages.PerfilProveedor]: {
    component: asyncComponentLoader(() => import('@/pages/PerfilProveedor')),
    path: '/perfil-proveedor/:id',
  },
  // [Pages.PreviewPerfilPrestador]: {
  //   component: asyncComponentLoader(() => import('@/pages/PreviewPerfilPrestador')),
  //   path: '/preview-perfil-prestador/',
  // },
  [Pages.ConstruirPerfil]: {
    component: asyncComponentLoader(() => import('@/pages/ConstruirPerfil')),
    path: '/construir-perfil',
  },
  [Pages.CrearProveedor]: {
    component: asyncComponentLoader(() => import('@/pages/CrearProveedor')),
    path: '/backoffice/crear-proveedor',
  },
  [Pages.UsuarioDashboard]: {
    component: asyncComponentLoader(() => import('@/pages/UsuarioDashboard')),
    path: '/usuario-dashboard',
  },
  // [Pages.Disponibilidad]: {
  //   component: asyncComponentLoader(() => import('@/pages/ConstruirPerfil/Disponibilidad')),
  //   path: '/construir-perfil/disponibilidad',
  // },
  // [Pages.EditarComunasPrestador]: {
  //   component: asyncComponentLoader(() => import('@/pages/ConstruirPerfil/Comunas')),
  //   path: '/construir-perfil/comunas',
  // },
  // [Pages.Tarifas]: {
  //   component: asyncComponentLoader(() => import('@/pages/ConstruirPerfil/Tarifas')),
  //   path: '/construir-perfil/tarifas',
  // },
  // [Pages.Experiencia]: {
  //   component: asyncComponentLoader(() => import('@/pages/ConstruirPerfil/Experiencia')),
  //   path: '/construir-perfil/experiencia',
  // },
  // [Pages.CuentaBancaria]: {
  //   component: asyncComponentLoader(() => import('@/pages/ConstruirPerfil/CuentaBancaria')),
  //   path: '/construir-perfil/cuentaBancaria',
  // },
  // [Pages.HistorialLaboral]: {
  //   component: asyncComponentLoader(() => import('@/pages/ConstruirPerfil/HistorialLaboral')),
  //   path: '/construir-perfil/historialLaboral',
  // },
  // [Pages.EducacionFormacion]: {
  //   component: asyncComponentLoader(() => import('@/pages/ConstruirPerfil/EducacionFormacion')),
  //   path: '/construir-perfil/educacionFormacion',
  // },
  // [Pages.DetallesBasicos]: {
  //   component: asyncComponentLoader(() => import('@/pages/ConstruirPerfil/DetallesBasicos')),
  //   path: '/construir-perfil/detallesBasicos',
  // },
  [Pages.Chat]: {
    component: asyncComponentLoader(() => import('@/pages/Chat')),
    path: '/chat/',
  },
  [Pages.ProveedorChat]: {
    component: asyncComponentLoader(() => import('@/pages/PrestadorChat')),
    path: '/proveedor-chat',
  },
  [Pages.PrestadorInbox]: {
    component: asyncComponentLoader(() => import('@/pages/PrestadorInbox')),
    path: '/proveedor-inbox',
  },
  [Pages.UsuarioInbox]: {
    component: asyncComponentLoader(() => import('@/pages/UsuarioInbox')),
    path: '/usuario-inbox',
  },
  // [Pages.PerfilUsuario]: {
  //   component: asyncComponentLoader(() => import('@/pages/PerfilUsuario')),
  //   path: '/perfil-usuario',
  // },

  // [Pages.EmailVerificado]: {
  //   component: asyncComponentLoader(() => import('@/pages/EmailVerificado')),
  //   path: '/email-verificado',
  // },
  // [Pages.EmailVerificadoPrestador]: {
  //   component: asyncComponentLoader(() => import('@/pages/EmailVerificadoPrestador')),
  //   path: '/email-verificado-prestador',
  // },
  [Pages.ProveedorDashboard]: {
    component: asyncComponentLoader(() => import('@/pages/PrestadorDashboard')),
    path: '/proveedor-dashboard',
  },
  [Pages.NotFound]: {
    component: asyncComponentLoader(() => import('@/pages/NotFound')),
    path: '*',
  },
};

export const protectedRoutes = [
  '/proveedor-dashboard',
  '/email-verificado-proveedor',
  '/construir-perfil',
  '/construir-perfil/disponibilidad',
  '/construir-perfil/comunas',
  '/construir-perfil/tarifas',
  '/construir-perfil/experiencia',
  '/construir-perfil/cuentaBancaria',
  '/construir-perfil/historialLaboral',
  '/construir-perfil/educacionFormacion',
  '/construir-perfil/detallesBasicos',
  '/chat',
  '/proveedor-chat',
  '/proveedor-inbox',
  '/usuario-inbox',
  '/perfil-usuario',
  '/usuario-dashboard',
  '/email-verificado',
];

export default routes;
