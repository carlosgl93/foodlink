import { useEffect } from 'react';
import { Box, ListItem, Avatar, Button } from '@mui/material';
import { getAllServiciosAndEspecialidades } from '@/api/servicios/getAllServiciosAndEspecialidades';
import { Text, Title } from '@/components/StyledComponents';
import useRecibeApoyo from '@/store/recibeApoyo';
import { Prestador } from '@/types/Prestador';
import { useRecoilValue } from 'recoil';
import { Link } from 'react-router-dom';
import Reviews from '@/components/Reviews';

type DesktopResultListProps = {
  filteredResults: Prestador[];
};

const DesktopResultList = ({ filteredResults }: DesktopResultListProps) => {
  const [{ allServicios }, { setServicios }] = useRecibeApoyo();

  const fetchServicios = useRecoilValue(getAllServiciosAndEspecialidades);
  useEffect(() => {
    if (allServicios === null) {
      setServicios(fetchServicios?.data);
    }
  }, [setServicios, fetchServicios?.data, allServicios]);

  if (filteredResults.length === 0) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '80vh',
          px: '2rem',
        }}
      >
        <Text>Conoces a alguien para esta comuna y servicio? Invitalo a Blui!</Text>
      </Box>
    );
  }
  return (
    <Box
      component={'ul'}
      sx={{
        maxWidth: '75%',
      }}
    >
      {filteredResults.map((prestador) => {
        const {
          id,
          email,
          firstname,
          lastname,
          imageUrl,
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
          <Link
            to={`/perfil-prestador/${id}`}
            style={{
              textDecoration: 'none',
            }}
            key={email}
          >
            <ListItem
              sx={{
                display: 'grid',
                gridTemplateColumns: '20% 80%',
                mb: '1rem',
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
                  src={imageUrl}
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
                    {firstname} {lastname}
                  </Title>
                  <Reviews average={average_review || 0} total_reviews={total_reviews || 0} />
                </Box>
                <Text>Servicio: {thisPrestadorServicio?.service_name}</Text>
                <Text>
                  {thisPrestadorServicio?.service_name ===
                  thisPrestadorEspecialidad?.especialidad_name
                    ? null
                    : `Especialidad: ${thisPrestadorEspecialidad?.especialidad_name}`}
                </Text>
                <Button
                  variant="outlined"
                  sx={{
                    mt: '1vh',
                    maxWidth: '50%',
                  }}
                >
                  Ver perfil
                </Button>
              </Box>
              {/* TODO implement availability */}
              {/* <Text>Availability: {prestador.availability.map((a) => a.name).join(', ')}</Text> */}
            </ListItem>
          </Link>
        );
      })}
    </Box>
  );
};

export default DesktopResultList;
