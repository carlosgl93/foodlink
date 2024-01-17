import { Box, useMediaQuery } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useRecoilValueLoadable } from 'recoil';

import { getPrestadorById } from '@/api/prestadores/getPrestadorById';
import Meta from '@/components/Meta';
import Loading from '@/components/Loading';
import { tablet } from '@/theme/breakpoints';
import { MobileProfile } from './MobileProfile';
import { DesktopProfile } from './DesktopProfile';
import { Prestador } from '@/types/Prestador';
import useAuth from '@/store/auth';
import { getMessages } from '@/api/chat/getMessages';

function PerfilPrestador() {
  const { id } = useParams();
  const isTablet = useMediaQuery(tablet);
  const [{ user }] = useAuth();

  const prestadorId = Number(id);

  const prestadorRecoil = useRecoilValueLoadable<Prestador>(getPrestadorById(prestadorId));
  const messagesRecoil = useRecoilValueLoadable(
    getMessages({
      userId: user?.id,
      prestadorId: prestadorId,
    }),
  );

  const prestadorData = prestadorRecoil.contents;
  const messagesData = messagesRecoil.contents;

  switch (prestadorRecoil.state) {
    case 'hasValue':
      return (
        <>
          <Meta title="Perfil Prestador" />

          {isTablet ? (
            <MobileProfile prestador={prestadorData} messages={messagesData} />
          ) : (
            <DesktopProfile prestador={prestadorData} messages={messagesData} />
          )}
        </>
      );

    case 'loading':
      return <Loading />;
    case 'hasError':
      return <Box>Hubo un error, por favor intentalo mas tarde.</Box>;
  }
}

export default PerfilPrestador;
