import { selectorFamily } from 'recoil';
import api from '../api';

export const getPrestadorById = selectorFamily({
  key: 'getPrestadorById',
  get: (id: number) => async () => {
    console.log('fetching prestador by ID');
    const response = await api.get(`/prestadores/${id}`, {
      params: {
        id,
      },
    });

    console.log(response);
    return response.data;
  },
});
