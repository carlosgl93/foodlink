import api from '../api';

export const postFreeMeetGreet = async (prestadorId: number, freeMeetGreet: boolean) => {
  const response = await api.post(`/tarifas/freeMeetGreet`, {
    prestadorId,
    freeMeetGreet,
  });
  return response.data.message;
};
