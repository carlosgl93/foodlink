import api from '../api';
import { HistorialLaboralEntry } from '@/hooks/useHistorialLaboral';

export interface SaveHistorialLaboral extends HistorialLaboralEntry {
  prestadorId: number;
}

export const postHistorialLaboral = async (data: SaveHistorialLaboral[]) => {
  const saveHistorialLaboral = await api.post('/historialLaboral', data);

  return saveHistorialLaboral.data;
};
