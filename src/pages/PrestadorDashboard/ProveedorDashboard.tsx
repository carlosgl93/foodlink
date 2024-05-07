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
import useOrientation from '@/hooks/useOrientation';

export const ProveedorDashboard = () => {
  const { handleConstruirPerfil } = usePrestadorDashboard();
  const setNotification = useSetRecoilState(notificationState);
  const isMobile = useOrientation();
  console.log(isMobile);

  const dashboardOptions = [
    {
      title: 'Tus productos',
      description: 'Crea, edita, elimina tus productos',
      onClick: () =>
        setNotification({
          open: true,
          message: 'Sección en construcción',
          severity: 'info',
        }),
    },
    {
      title: 'Mensajes',
      description: 'Inbox: Contactate con tus clientes',
      onClick: () =>
        setNotification({
          open: true,
          message: 'Sección en construcción',
          severity: 'info',
        }),
    },
    {
      title: 'Ofertas',
      description: 'Crea, edita o elimina tus ofertas',
      onClick: () =>
        setNotification({
          open: true,
          message: 'Sección en construcción',
          severity: 'info',
        }),
    },
    {
      title: 'Marketing',
      description: 'Crea, edita o elimina tus campañas de marketing',
      onClick: () =>
        setNotification({
          open: true,
          message: 'Sección en construcción',
          severity: 'info',
        }),
    },
    {
      title: 'Buscar clientes',
      description: 'Usa nuestro buscador para encontrar potenciales clientes',
      onClick: () =>
        setNotification({
          open: true,
          message: 'Sección en construcción',
          severity: 'info',
        }),
    },
    {
      title: 'Configuración',
      description: 'Edita tu cuenta aquí',
      onClick: () =>
        setNotification({
          open: true,
          message: 'Sección en construcción',
          severity: 'info',
        }),
    },
  ];

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
          {dashboardOptions.map(({ title, description, onClick }, index) => (
            <Container key={index}>
              <SubTitle>{title}</SubTitle>
              <Text>{description}</Text>
              <StyledButton
                fullWidth={isMobile ? true : false}
                variant="contained"
                onClick={onClick}
              >
                {title}
              </StyledButton>
            </Container>
          ))}
        </Box>
      </Wrapper>
    </>
  );
};
