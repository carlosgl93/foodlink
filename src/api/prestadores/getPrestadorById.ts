import { selectorFamily } from 'recoil';
import api from '../api';

export const getPrestadorById = selectorFamily({
  key: 'getPrestadorById',
  get: (id: number) => async () => {
    const response = await api.get(`/prestadores/${id}`, {
      params: {
        id,
      },
    });

    return response.data;
  },
});
