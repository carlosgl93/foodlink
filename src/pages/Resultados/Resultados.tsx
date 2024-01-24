import Meta from '@/components/Meta';
import useRecibeApoyo from '@/store/recibeApoyo';
import { useMediaQuery } from '@mui/material';
import { tablet } from '../../theme/breakpoints';
import DesktopResults from './DesktopResults';
import MobileResults from './MobileResults';
import { useRecoilValueLoadable } from 'recoil';
import Loading from '@/components/Loading';
import { getAllComunas } from '@/api/comunas/getAllComunas';
import { useEffect } from 'react';
import { getPrestadoresByEspecialidad } from '@/api/prestadores/getPrestadoresByEspecialidad';
import { ResultadosHeader } from './ResultadosHeader';

function Resultados() {
  const [{ servicio, comuna, especialidad, prestadores }, { setComunas, setPrestadores }] =
    useRecibeApoyo();

  const isTablet = useMediaQuery(tablet);

  const comunasFetched = useRecoilValueLoadable(getAllComunas);

  useEffect(() => {
    if (comunasFetched.state === 'hasValue') {
      setComunas(comunasFetched.contents?.data);
    }
  }, [comunasFetched, setComunas]);

  const prestadoresByEspecialidad = useRecoilValueLoadable(
    getPrestadoresByEspecialidad({
      comuna: comuna?.id || null,
      servicio: servicio?.service_id,
      especialidad: especialidad?.especialidad_id,
    }),
  );

  useEffect(() => {
    if (prestadoresByEspecialidad.state === 'hasValue') {
      setPrestadores(prestadoresByEspecialidad.contents);
    }
  }, [prestadoresByEspecialidad, setPrestadores]);

  switch (prestadoresByEspecialidad.state) {
    case 'hasValue':
      return (
        <>
          <Meta title="Resultados" />

          <ResultadosHeader />

          {isTablet ? (
            <MobileResults filteredPrestadores={prestadores} />
          ) : (
            <DesktopResults filteredPrestadores={prestadores} />
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
