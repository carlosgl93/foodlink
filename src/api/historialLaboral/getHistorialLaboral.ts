import api from '../api';

export const getHistorialLaboral = async (prestadorId: number) => {
  const readHistorialLaboral = await api.get('/historialLaboral', {
    params: { prestadorId },
  });

  if (readHistorialLaboral.data === '') return undefined;
  return readHistorialLaboral.data;
};
