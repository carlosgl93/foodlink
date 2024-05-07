import { useNavigate } from 'react-router-dom';
import { Text, TextContainer, Title } from '@/components/StyledComponents';
import { Box, Button } from '@mui/material';
import { InterestedProduct } from '@/store/comienzo/comprar';
import { VenderController } from './VenderController';
import { venderSteps } from './venderSteps';
import { OfferedProducts } from './OfferedProducts';

const Step1 = () => {
  const { offeredProducts, handleIncreaseStep } = VenderController();
  const router = useNavigate();

  const handlePrevious = () => {
    router('/comenzar');
  };

  return (
    <>
      <TextContainer
        sx={{
          maxWidth: 500,
          textAlign: 'center',
          alignContent: 'center',
          justifyContent: 'center',
        }}
      >
        <Title
          variant="h1"
          sx={{
            fontSize: '2rem',
            my: '2.5vh',
          }}
        >
          {venderSteps[0].title}
        </Title>
      </TextContainer>
      <Text
        sx={{
          mx: '5vw',
          my: '1vh',
        }}
      >
        {venderSteps[0].text}
      </Text>
      <OfferedProducts options={venderSteps[0].options as InterestedProduct[]} />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          my: '2.5vh',
          gap: '5vw',
        }}
      >
        <Button variant="contained" onClick={handlePrevious}>
          Atras
        </Button>
        <Button disabled={!offeredProducts.length} variant="contained" onClick={handleIncreaseStep}>
          Siguiente
        </Button>
      </Box>
    </>
  );
};

export default Step1;
