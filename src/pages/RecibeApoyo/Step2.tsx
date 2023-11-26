import { Box, Button, List, ListItemButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import SearchBar from './SearchBar';
import { TextContainer, Title } from '@/components/StyledComponents';
import { recibeApoyoSteps } from './recibeApoyoSteps';
import useRecibeApoyo from '@/store/recibeApoyo';
import { useNavigate } from 'react-router-dom';

const Step2 = () => {
  const [{ comunas }, { removeComuna }] = useRecibeApoyo();
  const router = useNavigate();

  const handleNext = () => {
    router('/resultados');
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
          {recibeApoyoSteps[1].title}
        </Title>
        <Box>
          <Title
            variant="h6"
            sx={{
              fontSize: '1.1rem',
            }}
          >
            Comunas seleccionadas:
          </Title>
          <List
            sx={{
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
              maxWidth: '600px',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto',
            }}
          >
            {comunas.map((comuna) => (
              <ListItemButton
                key={comuna}
                onClick={() => removeComuna(comuna)}
                sx={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  margin: '0.5rem',
                  padding: '0.5rem',
                  border: '1px solid #ccc',
                  borderRadius: '0.5rem',
                  cursor: 'pointer',
                  maxWidth: 'fit-content',
                }}
              >
                {comuna}
                <CloseIcon sx={{ marginLeft: '0.5rem' }} />
              </ListItemButton>
            ))}
          </List>
        </Box>
      </TextContainer>
      <SearchBar />
      <Box
        sx={{
          my: '2.5vh',
        }}
      >
        <Button disabled={comunas.length === 0} variant="contained" onClick={handleNext}>
          Siguiente
        </Button>
      </Box>
    </>
  );
};

export default Step2;
