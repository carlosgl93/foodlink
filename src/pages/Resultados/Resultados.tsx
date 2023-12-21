import Meta from '@/components/Meta';
import useRecibeApoyo from '@/store/recibeApoyo';
import { useMediaQuery } from '@mui/material';
import { tablet } from '../../theme/breakpoints';
import DesktopResults from './DesktopResults';
import MobileResults from './MobileResults';
import { useRecoilValueLoadable } from 'recoil';
import { getPrestadoresByComunaAndServicio } from '@/api/prestadores/getPrestadoresByComunaAndServicio';
import Loading from '@/components/Loading';

function Resultados() {
  const [{ servicio, comuna }] = useRecibeApoyo();
  const isTablet = useMediaQuery(tablet);
  const prestadoresByComunaAndServicio = useRecoilValueLoadable(
    getPrestadoresByComunaAndServicio({
      comuna: comuna?.id || null,
      servicio: servicio?.service_id,
    }),
  );

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
