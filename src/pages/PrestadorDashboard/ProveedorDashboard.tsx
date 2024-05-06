import { Text } from '@/components/StyledComponents';
import {
  Container,
  StyledButton,
  StyledList,
  SubTitle,
  Wrapper,
} from './StyledPrestadorDashboardComponents';
import { usePrestadorDashboard } from './usePrestadorDashboard';
import { notificationState } from '@/store/snackbar';
import { useSetRecoilState } from 'recoil';
import { Box } from '@mui/material';
import Meta from '@/components/Meta';

export const ProveedorDashboard = () => {
  const { handleConstruirPerfil } = usePrestadorDashboard();
  const setNotification = useSetRecoilState(notificationState);

  return (
    <>
      <Meta title="Proveedor Dashboard" />
      <Wrapper
        sx={{
          display: 'grid',
          gridTemplateColumns: { sm: '1fr', md: '.7fr .7fr' },
          mx: { sm: 0, md: 'auto' },
          alignContent: 'start',
          alignItems: 'start',
        }}
      >
        <Container>
          <SubTitle>Construyamos tu perfil</SubTitle>
          <Text>Construyamos un perfil ganador. Esta es tu oportunidad de:</Text>
          <StyledList>
            <li>
              <Text>Destacar tus productos.</Text>
            </li>
            <li>
              <Text>Establecer valores competitivos y despacho.</Text>
            </li>
            <li>
              <Text>Resaltar para los clientes al agregar tus certificaciones.</Text>
            </li>
          </StyledList>
          <StyledButton fullWidth variant="contained" onClick={handleConstruirPerfil}>
            Construir perfil
          </StyledButton>
        </Container>
        <Box
          sx={{
            display: { sx: 'block', sm: 'grid' },
            height: 'fit-content',
            gridTemplateColumns: '0.5fr 0.5fr',
          }}
        >
          <Container>
            <SubTitle>Tus productos</SubTitle>
            <Text>Crea, edita, elimina tus productos</Text>
            <StyledButton
              variant="contained"
              onClick={() =>
                setNotification({
                  open: true,
                  message: 'Sección en construcción',
                  severity: 'info',
                })
              }
            >
              Productos
            </StyledButton>
          </Container>
          <Container>
            <SubTitle>Mensajes</SubTitle>
            <Text>Inbox: Contactate con tus clientes</Text>
            <StyledButton
              variant="contained"
              onClick={() =>
                setNotification({
                  open: true,
                  message: 'Sección en construcción',
                  severity: 'info',
                })
              }
            >
              Mensajes
            </StyledButton>
          </Container>
          <Container>
            <SubTitle>Ofertas</SubTitle>
            <Text>Crea, edita o elimina tus ofertas</Text>
            <StyledButton
              variant="contained"
              onClick={() =>
                setNotification({
                  open: true,
                  message: 'Sección en construcción',
                  severity: 'info',
                })
              }
            >
              Ofertas
            </StyledButton>
          </Container>
          <Container>
            <SubTitle>Marketing</SubTitle>
            <Text>Crea, edita o elimina tus campañas de marketing</Text>
            <StyledButton
              variant="contained"
              onClick={() =>
                setNotification({
                  open: true,
                  message: 'Sección en construcción',
                  severity: 'info',
                })
              }
            >
              Marketing
            </StyledButton>
          </Container>
          <Container>
            <SubTitle>Buscar clientes/compradores</SubTitle>
            <Text>Usa nuestro buscador para encontrar potenciales clientes</Text>
            <StyledButton
              variant="contained"
              onClick={() =>
                setNotification({
                  open: true,
                  message: 'Sección en construcción',
                  severity: 'info',
                })
              }
            >
              Buscar clientes
            </StyledButton>
          </Container>
          <Container>
            <SubTitle>Configuración de tu cuenta</SubTitle>
            <Text>Edita tu cuenta aquí</Text>
            <StyledButton
              variant="contained"
              onClick={() =>
                setNotification({
                  open: true,
                  message: 'Sección en construcción',
                  severity: 'info',
                })
              }
            >
              Configuración
            </StyledButton>
          </Container>
        </Box>
      </Wrapper>
    </>
  );
};
