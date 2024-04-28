import { useNavigate } from 'react-router-dom';
import { ComprarController } from './ComprarController';
import { Text, TextContainer, Title } from '@/components/StyledComponents';
import { comprarSteps } from './comprarSteps';
import { Box, Button } from '@mui/material';
import { InterestProducts } from './InterestProducts';
import { InterestedProduct } from '@/store/comienzo/comprar';

const Step1 = () => {
  const { interestedProducts, increaseStep } = ComprarController();
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
          {comprarSteps[0].title}
        </Title>
      </TextContainer>
      <Text
        sx={{
          mx: '5vw',
          my: '1vh',
        }}
      >
        {comprarSteps[0].text}
      </Text>
      <InterestProducts options={comprarSteps[0].options as InterestedProduct[]} />

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
        <Button disabled={!interestedProducts.length} variant="contained" onClick={increaseStep}>
          Siguiente
        </Button>
      </Box>
    </>
  );
};

export default Step1;
