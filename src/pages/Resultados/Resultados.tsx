import Meta from '@/components/Meta';
import { useMediaQuery } from '@mui/material';
import { tablet } from '../../theme/breakpoints';
import DesktopResults from './DesktopResults';
import MobileResults from './MobileResults';
import Loading from '@/components/Loading';
import { ResultadosHeader } from './ResultadosHeader';
import { Suspense } from 'react';
import { useGetPrestadores } from '@/hooks/useGetPrestadores';

function Resultados() {
  const { data } = useGetPrestadores();
  const isTablet = useMediaQuery(tablet);

  return (
    <Suspense fallback={<Loading />}>
      <Meta title="Resultados" />

      <ResultadosHeader />

      {isTablet ? (
        <MobileResults filteredPrestadores={data} />
      ) : (
        <DesktopResults filteredPrestadores={data} />
      )}
    </Suspense>
  );
}

export default Resultados;
