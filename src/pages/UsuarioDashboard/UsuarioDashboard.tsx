import { Box } from '@mui/material';
import { UsuarioDashboardController } from './UsuarioDashboardController';
import { GeneralCard } from '@/components/GeneralCard';

export const UsuarioDashboard = () => {
  const { usuarioDashboardOptions } = UsuarioDashboardController();

  return (
    <Box
      sx={{
        p: '1rem',
      }}
    >
      {usuarioDashboardOptions.map((option) => (
        <GeneralCard {...option} key={option.title} />
      ))}
    </Box>
  );
};
