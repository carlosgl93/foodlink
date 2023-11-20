import { TextContainer, Title } from '@/components/StyledComponents';
import { entregaApoyoSteps } from './entregaApoyoSteps';
import SpecialityList from './SpecialityList';
import useEntregaApoyo from '@/store/entregaApoyo';
import { Box, Button } from '@mui/material';

const Step3 = () => {
  const [{ especialidades }, { increaseStep, decreaseStep }] = useEntregaApoyo();

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
      <SpecialityList items={entregaApoyoSteps[2].options} />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
        }}
      >
        <Button variant="contained" onClick={decreaseStep}>
          Atras
        </Button>
        <Button disabled={especialidades.length === 0} variant="contained" onClick={increaseStep}>
          Siguiente
        </Button>
      </Box>
    </>
  );
};

export default Step3;
