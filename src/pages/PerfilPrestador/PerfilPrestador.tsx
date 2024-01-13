import { Box, useMediaQuery } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useRecoilValueLoadable } from 'recoil';

import { getPrestadorById } from '@/api/prestadores/getPrestadorById';
import Meta from '@/components/Meta';
import Loading from '@/components/Loading';
import { tablet } from '@/theme/breakpoints';
import { MobileProfile } from './MobileProfile';
import { DesktopProfile } from './DesktopProfile';
import { PerfilGeneralPrestador } from './PerfilGeneralPrestador';
import { Prestador } from '@/types/Prestador';

function PerfilPrestador() {
  const { id } = useParams();
  const isTablet = useMediaQuery(tablet);

  const prestadorId = Number(id);

  const prestadorRecoil = useRecoilValueLoadable<Prestador>(getPrestadorById(prestadorId));

  const prestadorData = prestadorRecoil.contents;

  switch (prestadorRecoil.state) {
    case 'hasValue':
      if (id && prestadorData.id === prestadorId) {
        // return PerfilGeneralPrestador
        return <PerfilGeneralPrestador prestador={prestadorData} />;
      } else {
        return (
          <>
            <Meta title="Perfil Prestador" />

            {isTablet ? (
              <MobileProfile prestador={prestadorData} />
            ) : (
              <DesktopProfile prestador={prestadorData} />
            )}
          </>
        );
      }

    case 'loading':
      return <Loading />;
    case 'hasError':
      return <Box>Hubo un error, por favor intentalo mas tarde.</Box>;
  }
}

export default PerfilPrestador;
