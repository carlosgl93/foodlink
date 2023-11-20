import { Box } from '@mui/material';

import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { Image } from '@/components/ImageContainer';
import { Text, TextContainer, Title } from '@/components/StyledComponents';
import StyledList from '@/components/StyledList';

const comienzoOptions = [
  {
    text: 'Recibir apoyo',
    url: '/recibe-apoyo',
  },
  {
    text: 'Entregar apoyo',
    url: '/entrega-apoyo',
  },
];

function Comienzo() {
  return (
    <>
      <Meta title="Comienza a usar Blui" />
      <FullSizeCenteredFlexBox
        sx={{
          flexDirection: 'column',
          justifyContent: 'start',
          gap: 2,
          pt: 4,
        }}
      >
        <Box>
          <Image
            src="/images/blui-new.png"
            sx={{
              width: '100%',
              maxWidth: 200,
              height: 'auto',
            }}
          />
        </Box>
        <TextContainer
          sx={{
            maxWidth: 500,
            textAlign: 'center',
          }}
        >
          <Title
            variant="h1"
            sx={{
              fontSize: '2rem',
            }}
          >
            ¡Te damos la bienvenida!
          </Title>
          <Text
            sx={{
              textAlign: 'center',
            }}
          >
            Elige una opción para continuar
          </Text>
        </TextContainer>
        <StyledList items={comienzoOptions} />
      </FullSizeCenteredFlexBox>
    </>
  );
}

export default Comienzo;
