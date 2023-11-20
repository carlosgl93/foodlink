import { Box, Button, List, ListItemButton } from '@mui/material';
import SearchBar from './SearchBar';
import { TextContainer, Title } from '@/components/StyledComponents';
import { entregaApoyoSteps } from './entregaApoyoSteps';
import useEntregaApoyo from '@/store/entregaApoyo';

const Step1 = () => {
  const [{ comunas }, { removeComuna, increaseStep }] = useEntregaApoyo();

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
          {entregaApoyoSteps[0].title}
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
            }}
          >
            {comunas.map((comuna) => (
              <ListItemButton key={comuna} onClick={() => removeComuna(comuna)}>
                {comuna}
              </ListItemButton>
            ))}
          </List>
        </Box>
      </TextContainer>
      <SearchBar />
      <Box>
        <Button disabled={comunas.length === 0} variant="contained" onClick={increaseStep}>
          Siguiente
        </Button>
      </Box>
    </>
  );
};

export default Step1;
