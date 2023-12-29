import { selectorFamily } from 'recoil';
import api from '../api';

export const getPrestadoresByEspecialidad = selectorFamily({
  key: 'prestadoresByEspecialidad',
  get:
    (filters: {
      comuna: number | null | undefined;
      servicio: number | null | undefined;
      especialidad: number | null | undefined;
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
