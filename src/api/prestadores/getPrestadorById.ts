import { Prestador } from '@/types';
import api from '../api';

export const getPrestadorById = async (id: number): Promise<Prestador> => {
  const response = await api.get(`/prestadores/${id}`, {
    params: {
      id,
    },
  });

  return response.data;
};
