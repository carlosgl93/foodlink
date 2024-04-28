import { Box, Button } from '@mui/material';
import { Text, TextContainer, Title } from '@/components/StyledComponents';
import { comprarSteps } from './comprarSteps';
import { QuantityList } from './Quantity';
import { ComprarController } from './ComprarController';
import { Quantity } from '@/store/comienzo/comprar';

const Step2 = () => {
  const { increaseStep, quantities, handlePrevious } = ComprarController();

  return (
    <>
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
            my: '2.5vh',
          }}
        >
          {comprarSteps[1].title}
        </Title>
        <Text
          sx={{
            mx: '5vw',
            my: '1vh',
          }}
        >
          {comprarSteps[1].text}
        </Text>
      </TextContainer>{' '}
      <QuantityList options={comprarSteps[1].options as Quantity[]} />
      <Box
        sx={{
          display: 'flex',
          my: '2.5vh',
          gap: '1rem',
        }}
      >
        <Button variant="contained" onClick={handlePrevious}>
          Atras
        </Button>
        <Button disabled={!quantities.length} variant="contained" onClick={increaseStep}>
          Siguiente
        </Button>
      </Box>
    </>
  );
};
export default Step2;
