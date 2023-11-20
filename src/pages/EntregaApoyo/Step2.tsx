import { TextContainer, Title } from '@/components/StyledComponents';
import { entregaApoyoSteps } from './entregaApoyoSteps';
import ServiceTypeList from './ServiceTypeList';
import useEntregaApoyo from '@/store/entregaApoyo';
import { Box, Button } from '@mui/material';

const Step2 = () => {
  const [{ servicios }, { increaseStep, decreaseStep }] = useEntregaApoyo();

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
        }}
      >
        <Button variant="contained" onClick={decreaseStep}>
          Atras
        </Button>
        <Button disabled={servicios.length === 0} variant="contained" onClick={increaseStep}>
          Siguiente
        </Button>
      </Box>
    </>
  );
};

export default Step2;
