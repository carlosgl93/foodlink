import { Text, TextContainer, Title } from '@/components/StyledComponents';
import { recibeApoyoSteps } from './recibeApoyoSteps';
import useRecibeApoyo from '@/store/recibeApoyo';
import { Box, Button } from '@mui/material';
import ForWhomList from './ForWhomList';
import { useNavigate } from 'react-router-dom';

const Step1 = () => {
  const [{ forWhom }, { increaseStep }] = useRecibeApoyo();
  const router = useNavigate();

  const handlePrevious = () => {
    router('/comienzo');
  };

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
          {recibeApoyoSteps[0].title}
        </Title>
        <Text>{recibeApoyoSteps[0].text}</Text>
      </TextContainer>
      <ForWhomList options={recibeApoyoSteps[0].options} />
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
        <Button disabled={forWhom.length === 0} variant="contained" onClick={increaseStep}>
          Siguiente
        </Button>
      </Box>
    </>
  );
};

export default Step1;
