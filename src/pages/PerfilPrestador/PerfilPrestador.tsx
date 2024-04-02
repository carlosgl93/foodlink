import Meta from '@/components/Meta';
import { useNavigate } from 'react-router-dom';
import { MobileProfile } from './MobileProfile';
import { DesktopProfile } from './DesktopProfile';

import { useMediaQuery } from '@mui/material';
import { tablet } from '@/theme/breakpoints';
import Loading from '@/components/Loading';
import { Suspense } from 'react';
import { useAuthNew } from '@/hooks/useAuthNew';

function PerfilPrestador() {
  const isTablet = useMediaQuery(tablet);
  const { prestador } = useAuthNew();
  const navigate = useNavigate();

  if (!prestador) {
    return navigate('/resultados');
  }

  return (
    <Suspense fallback={<Loading />}>
      <Meta title="Perfil Prestador" />

      {isTablet ? (
        <MobileProfile prestador={prestador} />
      ) : (
        <DesktopProfile prestador={prestador} />
      )}
    </Suspense>
  );
}

export default PerfilPrestador;
