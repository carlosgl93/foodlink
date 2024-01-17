import { ListItem, Avatar, Button, Box, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';
import Reviews from '@/components/Reviews';
import { Text, Title } from '@/components/StyledComponents';
import { Prestador } from '@/types/Prestador';
import { Servicio } from '@/types/Servicio';

type MobileFilteredProps = {
  filteredPrestadores: Prestador[];
  allServicios: Servicio[] | null;
};

export const MobileResultList = ({ filteredPrestadores, allServicios }: MobileFilteredProps) => {
  const theme = useTheme();

  return (
    <Box
      component={'ul'}
      sx={{
        m: 0,
        p: 0,
      }}
    >
      {filteredPrestadores?.length > 0 ? (
        filteredPrestadores?.map((prestador) => {
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
  );
};
