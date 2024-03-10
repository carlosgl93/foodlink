import { getCuentaPrestador } from '@/api/cuentaBancaria/getCuentaPrestador';
import { postCuentaPrestador } from '@/api/cuentaBancaria/postCuentaPrestador';
import { CuentaBancariaInputs } from '@/pages/ConstruirPerfil/CuentaBancaria/CuentaBancaria';
import useAuth from '@/store/auth';
import { notificationState } from '@/store/snackbar';
import { CuentaBancaria } from '@/types/CuentaBancaria';
import { AxiosError } from 'axios';
import { useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

export const useCuentaBancaria = () => {
  const [notification, setNotification] = useRecoilState(notificationState);
  const [{ user }] = useAuth();

  const router = useNavigate();
  const client = useQueryClient();

  const {
    data: prestadorCuentaBancaria,
    isLoading: getCuentaPrestadorLoading,
    error: getCuentaPrestadorError,
  } = useQuery<CuentaBancaria, AxiosError>(
    'prestadorCuentaBancaria',
    () => getCuentaPrestador(user?.id as number),
    {
      onError: (error: AxiosError) => {
        setNotification({
          ...notification,
          open: true,
          message: `Hubo un error obteniendo tu cuenta: ${error.message}`,
          severity: 'error',
        });
      },
    },
  );

  const {
    mutate,
    isLoading: postCuentaPrestadorLoading,
    error: postCuentaPrestadorError,
  } = useMutation(
    (data: CuentaBancariaInputs) => {
      setNotification(() => {
        return {
          ...notification,
          open: true,
          message: 'Guardando tu cuenta bancaria',
          severity: 'info',
        };
      });
      return postCuentaPrestador({ prestadorId: user?.id as number, ...data });
    },
    {
      onSuccess: () => {
        client.invalidateQueries('prestadorCuentaBancaria');
        setNotification({
          ...notification,
          open: true,
          message: 'Cuenta bancaria guardada',
          severity: 'success',
        });
      },
      onError: (error: { message: string }) => {
        setNotification({
          ...notification,
          open: true,
          message: `Hubo un error guardando tu cuenta: ${error.message}`,
          severity: 'error',
        });
      },
    },
  );

  useEffect(() => {
    if (!user) {
      router('/ingresar');
    }
  }, [user]);

  return {
    // cuentaBancaria,
    prestadorCuentaBancaria,
    getCuentaPrestadorLoading,
    getCuentaPrestadorError,
    postCuentaPrestador: mutate,
    postCuentaPrestadorLoading,
    postCuentaPrestadorError,
  };
};
