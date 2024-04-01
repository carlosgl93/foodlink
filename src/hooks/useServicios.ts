import { Servicio } from '@/types/Servicio';
import { services } from '../utils/services';

export const useServicios = () => {
  const allServicios: Servicio[] = services;
  return { allServicios };
};
