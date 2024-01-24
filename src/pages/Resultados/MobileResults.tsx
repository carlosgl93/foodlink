import { useEffect, useState } from 'react';
import { Box, Drawer, useTheme, Button } from '@mui/material';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';

import { Prestador } from '@/types/Prestador';
import { MobileFilters } from './MobileFilters';
import useRecibeApoyo from '@/store/recibeApoyo';
import { getAllServiciosAndEspecialidades } from '@/api/servicios/getAllServiciosAndEspecialidades';
import { useRecoilValue } from 'recoil';
import { MobileResultList } from './MobileResultList';
import { Text } from '@/components/StyledComponents';

type MobileResultsProps = {
  filteredPrestadores: Prestador[];
};

const MobileResults = ({ filteredPrestadores }: MobileResultsProps) => {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const [{ allServicios }, { setServicios }] = useRecibeApoyo();

  const fetchServicios = useRecoilValue(getAllServiciosAndEspecialidades);
  useEffect(() => {
    if (allServicios === null) {
      setServicios(fetchServicios?.data);
    }
  }, [setServicios, fetchServicios?.data, allServicios]);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const resultsLength = filteredPrestadores.length;

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: '1rem',
        }}
      >
        <Button
          fullWidth
          variant="outlined"
          onClick={toggleDrawer}
          sx={{
            borderRadius: '0.5rem',
            p: '0 1rem',
            borderColor: '#99979c',
            maxWidth: '95vw',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              p: '0.5 1rem',
            }}
          >
            <p>Filtros</p>
            <TuneOutlinedIcon />
          </Box>
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: '1rem',
        }}
      >
        <Text>
          {resultsLength > 0
            ? `${resultsLength} ${
                resultsLength === 1 ? 'prestador encontrado' : 'prestadores encontrados'
              }`
            : 'Ningun prestador encontrado para esta combinación de filtros.'}
        </Text>
      </Box>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: theme.palette.background.paper,
          m: '5vh 1vw',
          borderRadius: '0.5rem',
        }}
      >
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
          <MobileFilters closeFilters={toggleDrawer} />
        </Drawer>

        <MobileResultList
          allServicios={allServicios || []}
          filteredPrestadores={filteredPrestadores}
        />
      </Box>
    </>
  );
};

export default MobileResults;
