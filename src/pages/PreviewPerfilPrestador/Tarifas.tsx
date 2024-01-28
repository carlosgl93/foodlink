import useConstruirPerfil from '@/store/construirPerfil';
import { Wrapper } from './MobilePerfilPrestadorStyledComponents';
import { Box, styled } from '@mui/material';
import { Title } from '@/components/StyledComponents';
import { formatCLP } from '@/utils/formatCLP';

const StyledSubtitle = styled(Title)(({ theme }) => ({
  color: theme.palette.secondary.dark,
  fontSize: '1.125rem',
}));

const Grid = styled(Box)(() => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gridTemplateRows: 'repeat(2, 1fr)',
  gap: '1rem',
  width: '100%',
  padding: '1rem  0',
}));

const StyledTarifaContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'start',
  width: '100%',
}));

const StyledTarifa = styled(Title)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontSize: '1.5rem',
}));

const SmallText = styled(Title)(({ theme }) => ({
  color: theme.palette.secondary.dark,
  fontSize: '1rem',
}));

export const Tarifas = () => {
  const [{ tarifas }] = useConstruirPerfil();
  return (
    <Wrapper>
      <Grid>
        {tarifas.map((tarifa) => {
          const { id, dayName, price } = tarifa;
          return (
            <StyledTarifaContainer key={id}>
              <StyledSubtitle>{dayName}</StyledSubtitle>
              <StyledTarifa>{formatCLP(Number(price))}</StyledTarifa>
            </StyledTarifaContainer>
          );
        })}
      </Grid>
      <SmallText>Todas las tarifas son por hora.</SmallText>
    </Wrapper>
  );
};
