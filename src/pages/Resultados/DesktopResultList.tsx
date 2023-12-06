import { Text, Title } from '@/components/StyledComponents';
import { Prestador } from '@/utils/constants';
import { Box, ListItem, Avatar, Button } from '@mui/material';

type DesktopResultListProps = {
  filteredResults: Prestador[];
};

const DesktopResultList = ({ filteredResults }: DesktopResultListProps) => {
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
            <Text>{prestador.service}</Text>
            <Text>Phone: {prestador.phone}</Text>
            <Text>
              Address: {prestador.address}, {prestador.city}, {prestador.state}
            </Text>
            <Text>Speciality: {prestador.speciality}</Text>
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
  );
};

export default DesktopResultList;
