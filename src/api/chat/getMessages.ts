import { selectorFamily } from 'recoil';
import api from '../api';

export const getMessages = selectorFamily({
  key: 'getMessages',
  get:
    (filters: { userId: number | null | undefined; prestadorId: number | null | undefined }) =>
    async () => {
      try {
        const response = await api.get(`/chat`, {
          params: {
            userId: filters.userId || null,
            prestadorId: filters.prestadorId,
          },
        });
        console.log('response from getMessages', response.data);
        return response.data;
      } catch (error) {
        console.error(error);
        if (error instanceof Error) {
          throw new Error(error.message);
        }
      }
    },
});
