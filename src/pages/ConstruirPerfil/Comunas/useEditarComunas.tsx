import api from '@/api/api';
import { removePrestadorComuna } from '@/api/comunas/removePrestadorComuna';
import useAuth from '@/store/auth';
import useRecibeApoyo from '@/store/recibeApoyo';
import { notificationState } from '@/store/snackbar';
import { Comuna } from '@/types/Comuna';
import { useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

export const useEditarComunas = () => {
  const [{ user }] = useAuth();
  const [{ allComunas }] = useRecibeApoyo();
  const [prestadorComunas, setPrestadorComunas] = useState<Comuna[]>([]);
  const [, setNotification] = useRecoilState(notificationState);
  const [searchedComuna, setSearchedComuna] = useState('');
  const [comunasState, setComunasState] = useState(allComunas || []);

  const handleGetPrestadorComunas = useCallback(async () => {
    try {
      // const response = await getPrestadorComunas(prestador.id);
      const comunasIds = (user?.comunas as string)
        .split(',')
        .map((comuna: string) => parseInt(comuna));
      const prestadorComunas = allComunas.filter((comuna) => {
        return comunasIds?.some((prestadorComuna: number) => {
          return prestadorComuna === comuna.id;
        });
      });
      return prestadorComunas;
    } catch (error) {
      setNotification({
        message: 'Hubo un error al obtener las comunas',
        severity: 'error',
        open: true,
      });
    }
  }, [allComunas, setNotification]);

  const handleRemovePrestadorComuna = useCallback(
    async (prestadorId: number, comunaId: number) => {
      try {
        const response = await removePrestadorComuna(prestadorId, comunaId);
        setNotification({
          message: 'Comuna eliminada',
          severity: 'success',
          open: true,
        });
        return response;
      } catch (error) {
        setNotification({
          message: 'Hubo un error al eliminar la comuna',
          severity: 'error',
          open: true,
        });
      }
    },
    [setNotification],
  );

  const handleUpdatePrestadorComunas = async () => {
    try {
      await api.post('/prestador/comunas', {});
      setNotification({
        message: 'Comunas actualizadas',
        severity: 'success',
        open: true,
      });
    } catch (error) {
      setNotification({
        message: 'Hubo un error al actualizar las comunas',
        severity: 'error',
        open: true,
      });
    }
  };

  const handleRemoveComuna = useCallback((comuna: Comuna) => {
    setPrestadorComunas(() =>
      prestadorComunas.filter((comunaState) => comunaState.id !== comuna.id),
    );
  }, []);

  const handleAddComuna = useCallback((comuna: Comuna) => {
    return setPrestadorComunas((prev) => [...prev, comuna]);
  }, []);

  const handleSelectComuna = useCallback(
    (comuna: Comuna) => {
      if (prestadorComunas?.some((comunaState) => comunaState.id === comuna.id)) {
        return;
      } else {
        handleAddComuna(comuna);
      }
      setSearchedComuna('');
      setComunasState(allComunas);
    },
    [allComunas, handleAddComuna, prestadorComunas],
  );

  const onChangeHandler = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setSearchedComuna(e.target.value);
    const match = allComunas?.filter((comuna) => {
      if (comuna.name.toLowerCase().includes(e.target.value.toLowerCase())) {
        return comuna;
      }
    });
    if (match) {
      setComunasState(match);
    }
  };

  useEffect(() => {
    handleGetPrestadorComunas()
      .then((data) => {
        setPrestadorComunas(() => data as Comuna[]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return {
    allComunas,
    prestadorId: user?.id,
    prestadorComunas,
    searchedComuna,
    comunasState,
    handleRemovePrestadorComuna,
    handleUpdatePrestadorComunas,
    handleSelectComuna,
    handleRemoveComuna,
    setSearchedComuna,
    onChangeHandler,
  };
};
