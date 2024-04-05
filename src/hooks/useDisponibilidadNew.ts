import { db } from 'firebase/firebase';
import { useAuthNew } from './useAuthNew';
import { collection, getDocs, query } from 'firebase/firestore';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { notificationState } from '@/store/snackbar';
import { AvailabilityData } from '@/pages/ConstruirPerfil/Disponibilidad/ListAvailableDays';

// Define a function that fetches the availability data from Firestore
async function fetchAvailability(prestadorId: string) {
  const availabilityRef = collection(db, 'providers', prestadorId, 'availability');
  const fetch = query(availabilityRef);
  const snapshot = await getDocs(fetch);
  return snapshot.docs.map((doc) => doc.data()) as AvailabilityData[];
}

export const useDisponibilidadNew = () => {
  const navigate = useNavigate();
  const [, setNotification] = useRecoilState(notificationState);

  const { prestador } = useAuthNew();
  const id = prestador?.id;

  if (!id) {
    navigate('/ingresar');
  }

  // Use the useQuery hook to fetch the data when the component mounts
  const {
    data: availabilityData,
    error,
    isLoading,
    isError,
  } = useQuery(
    ['availability', id],
    () => {
      if (!id) return;
      return fetchAvailability(id);
    },
    {
      enabled: !!id,
      onError: (error) => {
        setNotification({
          open: true,
          message:
            'Error al cargar disponibilidad, comprueba tu conexión a internet y recarga la página.',
          severity: 'error',
        });
        console.log('error', error);
      },
    },
  );

  return { availabilityData, error, isLoading, isError };
};
