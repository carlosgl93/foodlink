import { Box, styled } from '@mui/material';
import { StyledTitle } from '../UsuarioDashboard/EncuentraApoyo';

const Wrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'start',
  marginTop: '3rem',
  marginBottom: 'rem',
  paddingLeft: '16px',
  paddingRight: '16px',
  width: '100%',
}));

export const ResultadosHeader = () => {
  return (
    <Wrapper>
      <StyledTitle>Buscar Prestadores</StyledTitle>
    </Wrapper>
  );
};
