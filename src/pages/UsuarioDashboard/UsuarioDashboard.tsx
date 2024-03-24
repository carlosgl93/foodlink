import { Box } from '@mui/material';
import { EncuentraApoyo } from './EncuentraApoyo';
import { ActualizarPerfil } from './ActualizarPerfil';

export const UsuarioDashboard = () => {
  return (
    <Box
      sx={{
        p: '1rem',
      }}
    >
      <ActualizarPerfil />
      <EncuentraApoyo />
    </Box>
  );
};
