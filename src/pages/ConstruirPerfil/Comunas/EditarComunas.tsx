import { Box, Button, List, ListItemButton, styled } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TextContainer, Title } from '@/components/StyledComponents';
import { Wrapper } from '@/pages/PrestadorDashboard/StyledPrestadorDashboardComponents';
import BackButton from '@/components/BackButton';
import { useEditarComunas } from './useEditarComunas';
import { ComunasSearchBar } from './ComunasSearchBar';

const StyledTextContainer = styled(TextContainer)(() => ({
  textAlign: 'center',
}));

const StyledTitle = styled(Title)(() => ({
  fontSize: '2rem',
  marginTop: '2.5vh',
}));

const StyledSubtitle = styled(Title)(() => ({
  fontSize: '1.2rem',
  marginTop: '2.5vh',
}));

const StyledList = styled(List)(() => ({
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  maxWidth: '600px',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
}));

const StyledListItemButton = styled(ListItemButton)(() => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  margin: '0.5rem',
  padding: '0.5rem',
  border: '1px solid #ccc',
  borderRadius: '0.5rem',
  cursor: 'pointer',
  maxWidth: 'fit-content',
}));

const ContentContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1rem',
  my: '1vh',
}));

export const EditarComunas = () => {
  const { prestadorComunas, handleUpdatePrestadorComunas, handleRemoveComuna } = useEditarComunas();

  return (
    <Wrapper>
      <BackButton />
      <StyledTextContainer>
        <StyledTitle>Editar comunas</StyledTitle>
        <Box>
          <StyledSubtitle>Comunas seleccionadas:</StyledSubtitle>
          <StyledList>
            {prestadorComunas?.map((comuna) => (
              <StyledListItemButton key={comuna.id} onClick={() => handleRemoveComuna(comuna)}>
                {comuna.name}
                <CloseIcon sx={{ marginLeft: '0.5rem' }} />
              </StyledListItemButton>
            ))}
          </StyledList>
        </Box>
      </StyledTextContainer>
      <ContentContainer>
        <ComunasSearchBar />
        <Button variant="contained" onClick={handleUpdatePrestadorComunas}>
          Guardar
        </Button>
      </ContentContainer>
    </Wrapper>
  );
};
