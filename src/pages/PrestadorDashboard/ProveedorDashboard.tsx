import { Wrapper } from './StyledPrestadorDashboardComponents';
import { usePrestadorDashboard } from './usePrestadorDashboard';
import { notificationState } from '@/store/snackbar';
import { useSetRecoilState } from 'recoil';
import Meta from '@/components/Meta';
import { Box } from '@mui/material';
import { GeneralCard } from '@/components/GeneralCard';

export const ProveedorDashboard = () => {
  const { handleConstruirPerfil } = usePrestadorDashboard();
  const setNotification = useSetRecoilState(notificationState);

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
        <GeneralCard
          title={'Construyamos tu perfil'}
          text="Construyamos un perfil ganador. Productos, detalles basicos, despacho y más."
          ctaText={'Construir perfil'}
          onButtonClick={handleConstruirPerfil}
        />
        <Box
          sx={{
            display: { sx: 'block', sm: 'grid' },
            height: 'fit-content',
            gridTemplateColumns: '0.5fr 0.5fr',
          }}
        >
          {dashboardOptions.map(({ title, description, onClick }) => (
            <GeneralCard
              key={title}
              title={title}
              text={description}
              onButtonClick={onClick}
              ctaText={title}
            />
          ))}
        </Box>
      </Wrapper>
    </>
  );
};
