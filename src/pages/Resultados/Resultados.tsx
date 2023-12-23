import Meta from '@/components/Meta';
import useRecibeApoyo from '@/store/recibeApoyo';
import { useMediaQuery } from '@mui/material';
import { tablet } from '../../theme/breakpoints';
import DesktopResults from './DesktopResults';
import MobileResults from './MobileResults';
import { useRecoilValueLoadable } from 'recoil';
import { getPrestadoresByComunaAndServicio } from '@/api/prestadores/getPrestadoresByComunaAndServicio';
import Loading from '@/components/Loading';
import { getAllComunas } from '@/api/comunas/getAllComunas';
import { useEffect } from 'react';

function Resultados() {
  const [{ servicio, comuna }, { setComunas }] = useRecibeApoyo();
  const isTablet = useMediaQuery(tablet);

  const comunasFetched = useRecoilValueLoadable(getAllComunas);

  useEffect(() => {
    if (comunasFetched.state === 'hasValue') {
      setComunas(comunasFetched.contents?.data);
    }
  }, [comunasFetched, setComunas]);

  const prestadoresByComunaAndServicio = useRecoilValueLoadable(
    getPrestadoresByComunaAndServicio({
      comuna: comuna?.id || null,
      servicio: servicio?.service_id,
    }),
  );

  console.log('prestadoresByComunaAndServicio state', prestadoresByComunaAndServicio.state);

  switch (prestadoresByComunaAndServicio.state) {
    case 'hasValue':
      return (
        <>
          <Meta title="Resultados" />

          {isTablet ? (
            <MobileResults filteredPrestadores={prestadoresByComunaAndServicio.contents} />
          ) : (
            <DesktopResults filteredPrestadores={prestadoresByComunaAndServicio.contents} />
          )}
        </>
      );
    case 'loading':
      return <Loading />;
    case 'hasError':
      return <>There was an error</>;
  }
}

export default Resultados;
