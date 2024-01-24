import { Box, Button, List } from '@mui/material';
import {
  Container,
  StyledTitle,
  SubTitle,
  Wrapper,
} from '../PrestadorDashboard/StyledPrestadorDashboardComponents';
import { useConstruirPerfil } from './useConstruirPerfil';
import { construirPerfilOpciones } from './construirPerfilOpciones';
import {
  StyledCheckedIcon,
  StyledLink,
  StyledListItem,
  StyledOption,
  StyledText,
  StyledUncheckedIcon,
} from './StyledConstruirPerfilComponents';
import BackButton from '@/components/BackButton';

export const ConstruirPerfil = () => {
  const { perfil, handleVerPerfil } = useConstruirPerfil();

  return (
    <Wrapper>
      <BackButton />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          mb: '1rem',
        }}
      >
        <StyledTitle>Mi perfil</StyledTitle>
        <Button variant="contained" onClick={handleVerPerfil}>
          Ver perfil
        </Button>
      </Box>
      <Container>
        <SubTitle>Pasos a completar</SubTitle>
        <StyledText>
          No todos son necesarios, pero aumentan las probabilidades de que los clientes te
          contacten.
        </StyledText>
        <List>
          {construirPerfilOpciones.map((opcion) => {
            const key = opcion.key;
            return (
              <StyledLink key={opcion.key} to={`/construir-perfil/${opcion.key}`}>
                <StyledListItem>
                  {key && perfil[key] ? <StyledCheckedIcon /> : <StyledUncheckedIcon />}
                  <StyledOption>{opcion.value}</StyledOption>
                </StyledListItem>
              </StyledLink>
            );
          })}
        </List>
      </Container>
    </Wrapper>
  );
};
