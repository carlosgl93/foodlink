import { Box, Button } from '@mui/material';
import { Text, TextContainer, Title } from '@/components/StyledComponents';
import { Certification } from '@/store/comienzo/comprar';
import { CertificationsList } from '../Comprar/CertificacionesList';
import { venderSteps as steps } from './venderSteps';
import { VenderController } from './VenderController';

const Step2 = () => {
  const { handleIncreaseStep, handleDecreaseStep } = VenderController();

  return (
    <>
      <TextContainer
        sx={{
          maxWidth: { xs: '500px', md: '600px' },
          textAlign: 'center',
          mx: {
            xs: '5vw',
            md: 'auto',
          },
        }}
      >
        <Title
          variant="h1"
          sx={{
            fontSize: '2rem',
            my: '2.5vh',
          }}
        >
          {steps[1].title}
        </Title>
        <Text
          sx={{
            mx: '5vw',
            my: '1vh',
          }}
        >
          {steps[1].text}
        </Text>
      </TextContainer>{' '}
      <CertificationsList options={steps[1].options as Certification[]} />
      <Box
        sx={{
          display: 'flex',
          my: '2.5vh',
          gap: '1rem',
        }}
      >
        <Button variant="contained" onClick={handleDecreaseStep}>
          Atras
        </Button>
        <Button variant="contained" onClick={handleIncreaseStep}>
          Siguiente
        </Button>
      </Box>
    </>
  );
};
export default Step2;
