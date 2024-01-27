import api from '../api';

export const getPrestadorComunas = async (prestadorId: number) => {
  try {
    const response = await api.get(`/prestador/comunas`, {
      params: {
        prestadorId,
      },
    });
    return response;
  } catch (error) {
    console.error(error);
  }
};
