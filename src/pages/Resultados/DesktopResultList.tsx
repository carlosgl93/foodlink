import { Text, Title } from '@/components/StyledComponents';
import useRecibeApoyo from '@/store/recibeApoyo';
import { Prestador } from '@/types/Prestador';
import { Box, ListItem, Avatar, Button } from '@mui/material';

type DesktopResultListProps = {
  filteredResults: Prestador[];
};

const DesktopResultList = ({ filteredResults }: DesktopResultListProps) => {
  const [{ servicio, especialidad }] = useRecibeApoyo();

  return (
    <Box
      component={'ul'}
      sx={{
        maxWidth: '75%',
      }}
    >
      {filteredResults.map((prestador) => (
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
            <Text>{servicio?.service_name}</Text>
            <Text>Phone: {prestador.phone}</Text>
            <Text>
              Address: {prestador.address}, {prestador.city}, {prestador.region}
            </Text>
            <Text>Speciality: {especialidad}</Text>
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
      ))}
    </Box>
  );
};

export default DesktopResultList;
