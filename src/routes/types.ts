import { FC } from 'react';
import { PathRouteProps } from 'react-router-dom';

import type { SvgIconProps } from '@mui/material/SvgIcon';

enum Pages {
  Welcome,
  Nosotros,
  Ayuda,
  Ingresar,
  RegistrarUsuario,
  RegistrarPrestador,
  Comenzar,
  Prestador,
  Comienzo,
  EntregaApoyo,
  RecibeApoyo,
  NotFound,
  PerfilPrestador,
  Resultados,
  EmailVerificado,
  PerfilUsuario,
  EmailVerificadoPrestador,
}

type PathRouteCustomProps = {
  title?: string;
  component: FC;
  icon?: FC<SvgIconProps>;
  path: string;
};

type Routes = Record<Pages, PathRouteProps & PathRouteCustomProps>;

export type { Routes };
export { Pages };
