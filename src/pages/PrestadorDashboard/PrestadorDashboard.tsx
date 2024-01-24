import { Text } from '@/components/StyledComponents';
import {
  Container,
  StyledButton,
  StyledList,
  SubTitle,
  Wrapper,
} from './StyledPrestadorDashboardComponents';
import { usePrestadorDashboard } from './usePrestadorDashboard';

export const PrestadorDashboard = () => {
  const { handleConstruirPerfil } = usePrestadorDashboard();

  return (
    <Wrapper>
      <Container>
        <SubTitle>Construyamos tu perfil</SubTitle>
        <Text>Construyamos un perfil ganador. Esta es tu oportunidad de:</Text>
        <StyledList>
          <li>
            <Text>Destacar tus habilidades y experiencia.</Text>
          </li>
          <li>
            <Text>Establecer valores competitivos y disponibilidad.</Text>
          </li>
          <li>
            <Text>Resaltar para los clientes al agregar tu experiencia e intereses.</Text>
          </li>
        </StyledList>
        <StyledButton variant="contained" onClick={handleConstruirPerfil}>
          Construir perfil
        </StyledButton>
      </Container>
    </Wrapper>
  );
};
