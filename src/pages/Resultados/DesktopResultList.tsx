import { useEffect } from 'react';
import { Box, ListItem, Avatar, Button } from '@mui/material';
import { getAllServiciosAndEspecialidades } from '@/api/servicios/getAllServiciosAndEspecialidades';
import { Text, Title } from '@/components/StyledComponents';
import useRecibeApoyo from '@/store/recibeApoyo';
import { Prestador } from '@/types/Prestador';
import { useRecoilValue } from 'recoil';

type DesktopResultListProps = {
  filteredResults: Prestador[];
};

const DesktopResultList = ({ filteredResults }: DesktopResultListProps) => {
  const [{ allServicios }, { setServicios }] = useRecibeApoyo();
  console.log(allServicios);
  console.log(filteredResults);

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
        }}
      >
        <Text>No hay prestadores para esta comuna y servicio.</Text>
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
        const thisPrestadorServicio = allServicios?.find(
          (s) => s.service_id === prestador.service_id,
        );
        return (
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
                  {prestador.firstname} {prestador.lastname}
                </Title>
                {/* TODO: REVIEWS */}
              </Box>
              <Text>Servicio: {thisPrestadorServicio?.service_name}</Text>
              <Text>
                Especialidad:{' '}
                {
                  thisPrestadorServicio?.especialidades.find(
                    (e) => e.especialidad_id === prestador.speciality_id,
                  )?.especialidad_name
                }
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
            {/* TODO implement availability */}
            {/* <Text>Availability: {prestador.availability.map((a) => a.name).join(', ')}</Text> */}
          </ListItem>
        );
      })}
    </Box>
  );
};

export default DesktopResultList;
