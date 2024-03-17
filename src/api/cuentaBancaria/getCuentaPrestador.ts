import api from '../api';

export const getCuentaPrestador = async (prestadorId: number) => {
  const readCuentaPrestador = await api.get('/cuentaBancaria', {
    params: { prestadorId },
  });

  if (readCuentaPrestador.data === '') return undefined;
  return readCuentaPrestador.data;
};
