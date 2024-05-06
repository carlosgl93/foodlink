import { Box, Button } from '@mui/material';
import { Text, TextContainer, Title } from '@/components/StyledComponents';
import { comprarSteps } from './comprarSteps';
import { ComprarController } from './ComprarController';
import { Certification } from '@/store/comienzo/comprar';
import { CertificationsList } from './CertificacionesList';

const Step2 = () => {
  const { increaseStep, certifications, handlePrevious } = ComprarController();

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
      <CertificationsList options={comprarSteps[1].options as Certification[]} />
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
        <Button disabled={!certifications.length} variant="contained" onClick={increaseStep}>
          Siguiente
        </Button>
      </Box>
    </>
  );
};
export default Step2;
