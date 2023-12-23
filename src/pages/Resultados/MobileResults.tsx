import { useState } from 'react';
import { Box, Drawer, useTheme, Button, ListItem, Avatar } from '@mui/material';

import { Text, Title } from '@/components/StyledComponents';
import { Prestador } from '@/types/Prestador';

type MobileResultsProps = {
  filteredPrestadores: Prestador[];
};

const MobileResults = ({ filteredPrestadores }: MobileResultsProps) => {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: theme.palette.background.paper,
        m: '5vh 3vw',
        borderRadius: '0.5rem',
      }}
    >
      <Button onClick={toggleDrawer}>Toggle Filters</Button>
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
        {/* <Filters /> */}
      </Drawer>
      <Box
        component={'ul'}
        sx={{
          maxWidth: '75%',
        }}
      >
        {filteredPrestadores.map((prestador) => (
          <ListItem
            key={prestador.email}
            sx={{
              display: 'flex',
              justifyContent: 'space-around',
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
                  height: '120px',
                  width: '120px',
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
                  color="primary"
                  sx={{
                    fontSize: '1.4rem',
                  }}
                >
                  {prestador.firstname}
                </Title>
                {/* TODO: REVIEWS */}
              </Box>
              <Text>{prestador.service_id}</Text>
              <Text>Phone: {prestador.phone}</Text>
              <Text>
                Address: {prestador.address}, {prestador.city}, {prestador.region}
              </Text>
              <Text>Speciality: {prestador.speciality_id}</Text>
              <Button
                variant="outlined"
                sx={{
                  mt: '2vh',
                }}
              >
                Ver perfil
              </Button>
            </Box>
            {/* <Text>Availability: {prestador.availability.map((a) => a.name).join(', ')}</Text> */}
          </ListItem>
        ))}
      </Box>
    </Box>
  );
};

export default MobileResults;
