import { Box, Button, List } from '@mui/material';
import {
  Container,
  StyledTitle,
  SubTitle,
  Wrapper,
} from '../PrestadorDashboard/StyledPrestadorDashboardComponents';
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
import useConstruirPerfil from '@/store/construirPerfil';
import { emptyTarifaFront } from './Tarifas/emptyTarifa';
import Loading from '@/components/Loading';
import { useCallback } from 'react';

export const ConstruirPerfil = () => {
  const [construirPerfil, { handleVerPerfil }] = useConstruirPerfil();

  const isStepCompleted = useCallback(
    (key: string) => {
      if (!key) return false;

      if (Array.isArray(construirPerfil[key]) && (construirPerfil[key] as []).length > 0) {
        return true;
      }

      if (
        key === 'cuentaBancaria' &&
        construirPerfil[key] !== null &&
        construirPerfil[key] !== undefined
      ) {
        return true;
      }

      if (
        key === 'educacionFormacion' &&
        construirPerfil[key] !== null &&
        construirPerfil[key] !== undefined
      ) {
        return true;
      }

      return false;
    },
    [construirPerfil],
  );

  return (
    <Wrapper>
      <BackButton to="/prestador-dashboard" />
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
        {construirPerfil.loading ? (
          <Loading />
        ) : (
          <>
            <SubTitle>Pasos a completar</SubTitle>
            <StyledText>
              No todos son necesarios, pero aumentan las probabilidades de que los clientes te
              contacten.
            </StyledText>
            <List>
              {construirPerfilOpciones.map((opcion) => {
                const { key, value } = opcion;

                return (
                  <StyledLink key={opcion.key} to={`/construir-perfil/${opcion.key}`}>
                    <StyledListItem>
                      {isStepCompleted(key) && construirPerfil.tarifas !== emptyTarifaFront ? (
                        <StyledCheckedIcon />
                      ) : (
                        <StyledUncheckedIcon />
                      )}
                      <StyledOption>{value}</StyledOption>
                    </StyledListItem>
                  </StyledLink>
                );
              })}
            </List>
          </>
        )}
      </Container>
    </Wrapper>
  );
};
