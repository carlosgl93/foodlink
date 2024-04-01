import { Prestador } from '@/store/auth/prestador';
import useRecibeApoyo from '@/store/recibeApoyo';
import { db } from 'firebase/firebase';
import { collection, query, limit, where, getDocs } from 'firebase/firestore';
import { useQuery } from 'react-query';

export const useGetPrestadores = () => {
  const [{ servicio, comuna, especialidad }] = useRecibeApoyo();

  const getPrestadoresByComunaAndServicio = async () => {
    const prestadorCollectionRef = collection(db, 'providers');
    let prestadoresQuery = query(prestadorCollectionRef, limit(15));

    if (comuna) {
      prestadoresQuery = query(prestadoresQuery, where('comunas', 'array-contains', comuna.name));
    }

    if (servicio) {
      prestadoresQuery = query(prestadoresQuery, where('servicio', '==', servicio.serviceName));
    }

    if (especialidad) {
      prestadoresQuery = query(
        prestadoresQuery,
        where('especialidad', '==', especialidad.especialidadName),
      );
    }

    const querySnapshot = await getDocs(prestadoresQuery);
    const results = querySnapshot.docs.map((doc) => doc.data());
    return results as Prestador[];
  };

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery<Prestador[]>(
    ['prestadoresByComunaAndServicio', comuna, servicio, especialidad],
    getPrestadoresByComunaAndServicio,
    {
      onError: (error) => {
        console.log('error', error);
      },
      onSuccess: (data) => {
        console.log('data', data);
      },
    },
  );

  return {
    data,
    isLoading,
    isError,
  };
};
