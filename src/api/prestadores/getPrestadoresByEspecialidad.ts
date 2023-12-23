import { selectorFamily } from 'recoil';
import api from '../api';
import { Especialidad } from '@/types/Servicio';

export const getPrestadoresByEspecialidad = selectorFamily({
  key: 'prestadoresByEspecialidad',
  get:
    (filters: {
      comuna: number | null;
      servicio: number | null | undefined;
      especialidad: Especialidad | null;
    }) =>
    async () => {
      try {
        console.log('getting especialidades');
        const response = await api.get(`/prestadores`, {
          params: {
            comuna: filters.comuna || null,
            servicio: filters.servicio,
            especialidad: filters.especialidad,
          },
        });
        console.log(response);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },
});
