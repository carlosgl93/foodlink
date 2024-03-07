import api from '../api';

export const getCuentaPrestador = async (prestadorId: number) => {
  const readCuentaPrestador = await api.get('/cuentaBancaria', {
    params: { prestadorId },
  });

  return readCuentaPrestador.data;
};
