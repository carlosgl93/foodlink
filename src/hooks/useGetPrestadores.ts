import { Proveedor } from '@/types';
import { db } from 'firebase/firebase';
import { collection, query, where, getDocs, limit } from 'firebase/firestore';
import { useQuery } from 'react-query';
import { useComunas } from './useComunas';
import { useRecoilValue } from 'recoil';
import { interestedProductsState } from '@/store/comienzo/comprar';
import { certificationsState } from '../store/comienzo/comprar/index';

export const useGetPrestadores = () => {
  const interestedProducts = useRecoilValue(interestedProductsState);
  const certifications = useRecoilValue(certificationsState);
  const { selectedComunas } = useComunas();

  const getProveedoresByProductCertificationComuna = async () => {
    const providersCollectionRef = collection(db, 'providers');

    console.log(certifications);

    const prestadoresQuery = query(providersCollectionRef, limit(15));

    if (!selectedComunas.length && !interestedProducts.length && !certifications.length) {
      const querySnapshot = await getDocs(prestadoresQuery);
      const prestadores = querySnapshot.docs.map((doc) => doc.data());
      return prestadores as Proveedor[];
    }

    let prestadoresByComuna: Proveedor[] = [];
    let prestadoresByProductType: Proveedor[] = [];
    let proveedoresByCertification: Proveedor[] = [];

    if (selectedComunas.length) {
      const comunasQuery = query(
        providersCollectionRef,
        where(
          'comunas',
          'array-contains-any',
          selectedComunas.map((c) => ({
            name: c.name,
            id: c.id,
            country: c.country,
            region: c.region,
          })),
        ),
      );

      const comunasSnapshot = await getDocs(comunasQuery);
      prestadoresByComuna = comunasSnapshot.docs.map((doc) => doc.data()) as Proveedor[];
    }

    if (interestedProducts.length) {
      const productTypeQuery = query(
        providersCollectionRef,
        where(
          'productType',
          'array-contains-any',
          interestedProducts.map((p) => ({ name: p.name, id: p.id, value: p.value })),
        ),
      );

      const productTypeSnapshot = await getDocs(productTypeQuery);
      prestadoresByProductType = productTypeSnapshot.docs.map((doc) => doc.data()) as Proveedor[];
    }

    if (certifications.length) {
      const certificationsQuery = query(
        providersCollectionRef,
        where(
          'certifications',
          'array-contains-any',
          certifications.map((cert) => ({ name: cert.name, id: cert.id, value: cert.value })),
        ),
      );

      const certificationsSnapshot = await getDocs(certificationsQuery);
      proveedoresByCertification = certificationsSnapshot.docs.map((doc) =>
        doc.data(),
      ) as Proveedor[];
    }

    // Merge the results
    const mergedPrestadores = [
      ...prestadoresByComuna,
      ...prestadoresByProductType,
      ...proveedoresByCertification,
    ];

    // Remove duplicates
    const prestadores = Array.from(new Set(mergedPrestadores.map((p) => p.id))).map((id) => {
      return mergedPrestadores.find((p) => p.id === id);
    });
    return prestadores as Proveedor[];
  };

  const {
    data = [],
    isLoading,
    isError,
  } = useQuery<Proveedor[]>(
    [
      'proveedoresByProductCertificationComuna',
      selectedComunas,
      interestedProducts,
      certifications,
    ],
    getProveedoresByProductCertificationComuna,
    {
      onSuccess: () => {
        console.log('success');
      },
      onError: (error) => {
        console.log('error', error);
      },
    },
  );

  return {
    data,
    isLoading,
    isError,
  };
};
