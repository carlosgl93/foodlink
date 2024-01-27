import api from '../api';

export const removePrestadorComuna = async (prestadorId: number, comunaId: number) => {
  const removeComuna = await api.delete('/prestador/comuna', {
    params: {
      prestadorId,
      comunaId,
    },
  });
  return removeComuna.data;
};
