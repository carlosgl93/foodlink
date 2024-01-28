import { TarifaFront } from '@/types';
import api from '../api';

export const postTarifas = async (prestadorId: number, tarifas: TarifaFront[]) => {
  const response = await api.post(`/tarifas`, {
    prestadorId,
    tarifas,
  });
  return response.data.message;
};
