import { TextContainer, Title } from '@/components/StyledComponents';
import { entregaApoyoSteps } from './entregaApoyoSteps';
import ServiceTypeList from './ServiceTypeList';
import useEntregaApoyo from '@/store/entregaApoyo';
import { Box, Button } from '@mui/material';

const Step2 = () => {
  const [{ servicio }, { increaseStep, decreaseStep }] = useEntregaApoyo();

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
          {entregaApoyoSteps[1].title}
        </Title>
      </TextContainer>
      <ServiceTypeList items={entregaApoyoSteps[1].options} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          my: '2.5vh',
          gap: '5vw',
        }}
      >
        <Button variant="contained" onClick={decreaseStep}>
          Atras
        </Button>
        <Button disabled={servicio.length === 0} variant="contained" onClick={increaseStep}>
          Siguiente
        </Button>
      </Box>
    </>
  );
};

export default Step2;
