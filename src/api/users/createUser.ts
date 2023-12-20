import { Servicio } from '@/types/Servicio';
import { Comuna } from '@/types/Comuna';
import api from '../api';
import { Especialidad } from '../../types/Especialidad';

export const createUser = async (user: {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  comunas: Comuna[];
  servicio: Servicio;
  especialidad: Especialidad;
}) => {
  return await api.post('/users', user);
};
