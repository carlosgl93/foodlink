import { Comuna } from '@/types';
import regions from '../utils/regions.json';
import { useMemo, useState } from 'react';

export const useComunas = () => {
  const [comunasSearched, setComunasSearched] = useState<Comuna[]>([]);
  const allComunas = useMemo(() => {
    const comunas: Comuna[] = [];

    regions.regiones.forEach((r) => {
      const newComunas = r.comunas.map((c, i) => {
        return {
          id: i,
          name: c,
          region: r.region,
          country: 'Chile',
        };
      });
      comunas.push(...newComunas);
    });

    return comunas;
  }, [regions]);

  // const {
  //   data: comunas,
  //   isError,
  //   isLoading,
  //   error,
  // } = useQuery(
  //   ['comunas'],
  //   async () => {
  //     const comunas = (await getDocs(collection(db, 'comunas'))).docs.map((doc) => {
  //       return {
  //         id: doc.id,
  //         ...doc.data(),
  //       } as Comuna;
  //     });
  //     return comunas;
  //   },
  //   {
  //     onSuccess(data) {
  //       console.log('data on success', data);
  //       setComunasSearched(data as Comuna[]);
  //     },
  //   },
  // );

  return {
    allComunas,
    comunasSearched,
    setComunasSearched,
  };
};
