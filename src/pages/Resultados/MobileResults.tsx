import { useEffect, useState } from 'react';
import { Box, Drawer, useTheme, Button, ListItem, Avatar } from '@mui/material';

import { Text, Title } from '@/components/StyledComponents';
import { Prestador } from '@/types/Prestador';
import { MobileFilters } from './MobileFilters';
import useRecibeApoyo from '@/store/recibeApoyo';
import { getAllServiciosAndEspecialidades } from '@/api/servicios/getAllServiciosAndEspecialidades';
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import Reviews from '@/components/Reviews';

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
        Filtros
      </Button>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        <MobileFilters closeFilters={toggleDrawer} />
      </Drawer>
      <Box
        component={'ul'}
        sx={{
          m: 0,
          p: 0,
        }}
      >
        {filteredPrestadores.length > 0 ? (
          filteredPrestadores.map((prestador) => {
            const {
              id,
              firstname,
              lastname,
              service_id,
              speciality_id,
              average_review,
              total_reviews,
            } = prestador;
            const thisPrestadorServicio = allServicios?.find((s) => s.service_id === service_id);

            const thisPrestadorEspecialidad = thisPrestadorServicio?.especialidades.find(
              (e) => e.especialidad_id === speciality_id,
            );
            return (
              <Link key={id} to={`/perfil-prestador/${id}`} style={{ textDecoration: 'none' }}>
                <ListItem
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: '30% 70%',
                    justifyContent: 'space-around',
                    gap: '1rem',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'start',
                      alignContent: 'start',
                      alignItems: 'start',
                    }}
                  >
                    <Avatar
                      sx={{
                        height: '90px',
                        width: '90px',
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      py: '3vh',
                    }}
                  >
                    <Box>
                      <Title
                        variant="h6"
                        sx={{
                          fontSize: '1.4rem',
                          color: theme.palette.primary.main,
                        }}
                      >
                        {firstname} {lastname}
                      </Title>
                      <Reviews average={average_review || 0} total_reviews={total_reviews || 0} />
                    </Box>
                    <Text>{thisPrestadorServicio?.service_name}</Text>

                    <Text>
                      {thisPrestadorServicio?.service_name ===
                      thisPrestadorEspecialidad?.especialidad_name
                        ? null
                        : thisPrestadorEspecialidad?.especialidad_name}
                    </Text>
                    <Button
                      variant="outlined"
                      sx={{
                        mt: '2vh',
                      }}
                    >
                      Ver perfil
                    </Button>
                  </Box>
                  {/* <Text>Availability: {availability.map((a) => a.name).join(', ')}</Text> */}
                </ListItem>
              </Link>
            );
          })
        ) : (
          <Box
            sx={{
              px: '2rem',
            }}
          >
            <Text>Conoces a alguien para esta comuna y servicio? Invitalo a Blui!</Text>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default MobileResults;
