import { Proveedor } from '@/types';
import { notificationState } from '@/store/snackbar';
import { db } from 'firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useQuery } from 'react-query';
import { useSetRecoilState } from 'recoil';

// const dayOrder = ['lunes', 'martes', 'miercoles', 'jueves', 'viernes', 'sabado', 'domingo'];

const getPrestadorByIdFirestore = async (id: string): Promise<Proveedor> => {
  const providersRef = doc(db, 'providers', id);
  const res = await getDoc(providersRef);

  const prestador = res.data() as Proveedor;

  return prestador;
};

export const usePrestador = (prestadorId: string) => {
  const setNotification = useSetRecoilState(notificationState);

  const {
    data: prestador,
    isError,
    isLoading,
    error,
  } = useQuery(['prestador', prestadorId], () => getPrestadorByIdFirestore(prestadorId), {
    enabled: !!prestadorId,
    onError: (error) => {
      console.error(error);
      setNotification({
        open: true,
        message: 'Ocurrió un error al cargar el perfil del prestador',
        severity: 'error',
      });
    },
  });

  return {
    prestador,
    isError,
    isLoading,
    error,
  };
};
