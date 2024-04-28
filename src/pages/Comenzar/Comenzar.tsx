import { Box } from '@mui/material';

import Meta from '@/components/Meta';
import { FullSizeCenteredFlexBox } from '@/components/styled';
import { Text, TextContainer, Title } from '@/components/StyledComponents';
import StyledList from '@/components/StyledList';

const comienzoOptions = [
  {
    text: 'Comprar',
    url: '/comenzar/comprar',
  },
  {
    text: 'Vender',
    url: '/comenzar/vender',
  },
];

function Comenzar() {
  return (
    <>
      <Meta title="Comienza a usar FoodLink" />
      <FullSizeCenteredFlexBox
        sx={{
          flexDirection: 'column',
          justifyContent: 'start',
          gap: 2,
          pt: 12,
          minHeight: '75vh',
        }}
      >
        <Box>
          {/* <Image
            src="/images/blui-new.png"
            sx={{
              width: '100%',
              maxWidth: 125,
              height: 'auto',
              marginTop: '5vh',
              marginBottom: '5vh',
            }}
          /> */}
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

export default Comenzar;
