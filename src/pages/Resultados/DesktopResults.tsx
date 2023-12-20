import { Box, useTheme } from '@mui/material';

import DesktopFilters from './DesktopFilters';
import DesktopResultList from './DesktopResultList';
import { Prestador } from '@/types/Prestador';

type DesktopResultsProps = {
  filteredPrestadores: Prestador[];
};

const DesktopResults = ({ filteredPrestadores }: DesktopResultsProps) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'grid',
        minHeight: '100vh',
        gridTemplateColumns: '25% 75%',
        backgroundColor: theme.palette.background.paper,
        gap: theme.spacing(16),
        m: '5vh 3vw',
        borderRadius: '0.5rem',
      }}
    >
      {/* FILTERS */}
      <DesktopFilters />

      <DesktopResultList filteredResults={filteredPrestadores} />
    </Box>
  );
};

export default DesktopResults;
