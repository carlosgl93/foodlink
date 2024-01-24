import Meta from '@/components/Meta';
import { PreviewMobileProfile } from './PreviewMobileProfile';
import { PreviewDesktopProfile } from './PreviewDesktopProfile';

import { useMediaQuery } from '@mui/material';
import { tablet } from '@/theme/breakpoints';

function PreviewPerfilPrestador() {
  const isTablet = useMediaQuery(tablet);

  return (
    <>
      <Meta title="Preview Perfil Prestador" />

      {isTablet ? <PreviewMobileProfile /> : <PreviewDesktopProfile />}
    </>
  );
}

export default PreviewPerfilPrestador;
