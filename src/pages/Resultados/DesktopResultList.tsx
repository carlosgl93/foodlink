import { useEffect } from 'react';
import { Box, ListItem, Avatar, Button, useTheme } from '@mui/material';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import StarOutlinedIcon from '@mui/icons-material/StarOutlined';
import { getAllServiciosAndEspecialidades } from '@/api/servicios/getAllServiciosAndEspecialidades';
import { Text, Title } from '@/components/StyledComponents';
import useRecibeApoyo from '@/store/recibeApoyo';
import { Prestador } from '@/types/Prestador';
import { useRecoilValue } from 'recoil';

type DesktopResultListProps = {
  filteredResults: Prestador[];
};

const DesktopResultList = ({ filteredResults }: DesktopResultListProps) => {
  const theme = useTheme();

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
        const thisPrestadorServicio = allServicios?.find(
          (s) => s.service_id === prestador.service_id,
        );

        const thisPrestadorEspecialidad = thisPrestadorServicio?.especialidades.find(
          (e) => e.especialidad_id === prestador.speciality_id,
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
                <Box>
                  {prestador.average_review ? (
                    <>
                      {Array.from(Array(prestador.average_review).keys()).map((i) => (
                        <StarOutlinedIcon key={i} sx={{ color: theme.palette.primary.main }} />
                      ))}
                      {Array.from(Array(5 - prestador.average_review).keys()).map((i) => (
                        <StarBorderOutlinedIcon
                          key={i}
                          sx={{ color: theme.palette.primary.main }}
                        />
                      ))}
                    </>
                  ) : (
                    <>
                      {Array.from(Array(5).keys()).map((i) => (
                        <StarBorderOutlinedIcon
                          key={i}
                          sx={{ color: theme.palette.primary.main }}
                        />
                      ))}
                    </>
                  )}
                </Box>
                {/* TODO: REVIEWS */}
              </Box>
              <Text>Servicio: {thisPrestadorServicio?.service_name}</Text>
              <Text>Especialidad: {thisPrestadorEspecialidad?.especialidad_name}</Text>
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
