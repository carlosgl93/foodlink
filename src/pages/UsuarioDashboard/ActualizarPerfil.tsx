import { StyledTitle, SubTitle, Text } from '@/components/StyledComponents';
import { Button, Card, CardContent, styled } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const BuscarPrestadores = styled(Button)(() => ({
  width: '100%',
  fontSize: '1rem',
  fontWeight: 'bold',
  color: 'white',
  margin: '1rem 0',
}));

export const ActualizarPerfil = () => {
  const router = useNavigate();

  const handleGoToProfile = () => {
    router(`/perfil-usuario`);
  };

  return (
    <Card sx={{ margin: '1rem 0', borderRadius: '1rem' }}>
      <CardContent>
        <StyledTitle>Actualizar perfil</StyledTitle>
        <SubTitle>Agrega más información sobre tu empresa.</SubTitle>
        <Text>Productos, promociones, servicios, y más.</Text>
        <BuscarPrestadores fullWidth variant="contained" onClick={handleGoToProfile} sx={{ mt: 2 }}>
          Ir al perfil
        </BuscarPrestadores>
      </CardContent>
    </Card>
  );
};
