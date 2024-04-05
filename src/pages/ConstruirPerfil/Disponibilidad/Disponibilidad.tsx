import {
  Container,
  StyledTitle,
  SubTitle,
  Wrapper,
} from '@/pages/PrestadorDashboard/StyledPrestadorDashboardComponents';
import BackButton from '@/components/BackButton';
import { StyledText } from '../StyledConstruirPerfilComponents';
import { Button } from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { ListAvailableDays } from './ListAvailableDays';
import { EditAvailableDays } from './EditAvailableDays';
import useConstruirPerfil from '@/store/construirPerfil';
import { useDisponibilidadNew } from '@/hooks/useDisponibilidadNew';
import Loading from '@/components/Loading';
import { Suspense } from 'react';

export const Disponibilidad = () => {
  const [{ editDisponibilidad }, { handleEditDisponibilidad }] = useConstruirPerfil();
  const { availabilityData } = useDisponibilidadNew();

  return (
    <Wrapper>
      <BackButton action={editDisponibilidad ? handleEditDisponibilidad : undefined} />
      <Container>
        <StyledTitle>Disponibilidad</StyledTitle>
        <SubTitle>Dias y horas disponible</SubTitle>
        <StyledText>
          Agrega que dias y horas estas disponible para que te lleguen solicitudes que te acomoden.
        </StyledText>
        <Suspense fallback={<Loading />}>
          {!editDisponibilidad ? (
            <>
              <Button
                variant="text"
                startIcon={<EditOutlinedIcon />}
                onClick={handleEditDisponibilidad}
              >
                Edita tu disponibilidad y horas
              </Button>
              <ListAvailableDays availability={availabilityData} />
            </>
          ) : (
            <EditAvailableDays />
          )}
        </Suspense>
      </Container>
    </Wrapper>
  );
};
