import Meta from '@/components/Meta';
import { MobileProfile } from './MobileProfile';
import { DesktopProfile } from './DesktopProfile';

import { useMediaQuery } from '@mui/material';
import { tablet } from '@/theme/breakpoints';

function PerfilPrestador() {
  const isTablet = useMediaQuery(tablet);

  return (
    <>
      <Meta title="Perfil Prestador" />

      {isTablet ? <MobileProfile /> : <DesktopProfile />}
    </>
  );
}

export default PerfilPrestador;
