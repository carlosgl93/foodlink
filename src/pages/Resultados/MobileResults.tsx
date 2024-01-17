import { useEffect, useState } from 'react';
import { Box, Drawer, useTheme, Button } from '@mui/material';

import { Prestador } from '@/types/Prestador';
import { MobileFilters } from './MobileFilters';
import useRecibeApoyo from '@/store/recibeApoyo';
import { getAllServiciosAndEspecialidades } from '@/api/servicios/getAllServiciosAndEspecialidades';
import { useRecoilValue } from 'recoil';
import { MobileResultList } from './MobileResultList';

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

  console.log(filteredPrestadores);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: theme.palette.background.paper,
        m: '5vh 1vw',
        borderRadius: '0.5rem',
      }}
    >
      <Button variant="outlined" onClick={toggleDrawer}>
        {/* <Filter9Plus /> */}
        {/* TODO ADD FUNNEL filters icon */}
        Filtros
      </Button>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <MobileFilters closeFilters={toggleDrawer} />
      </Drawer>
      <MobileResultList
        allServicios={allServicios || []}
        filteredPrestadores={filteredPrestadores}
      />
    </Box>
  );
};

export default MobileResults;
