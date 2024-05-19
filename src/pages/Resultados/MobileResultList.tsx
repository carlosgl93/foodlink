import { ListItem, Avatar, Button, Box, useTheme, List } from '@mui/material';
import { Link } from 'react-router-dom';
import Reviews from '@/components/Reviews';
import { Text, Title } from '@/components/StyledComponents';
import { Proveedor } from '@/types';

type MobileFilteredProps = {
  filteredProveedores: Proveedor[];
};

export const MobileResultList = ({ filteredProveedores }: MobileFilteredProps) => {
  const theme = useTheme();

  return (
    <List
      component={'ul'}
      sx={{
        m: 0,
        p: 0,
      }}
    >
      {filteredProveedores?.length > 0 ? (
        filteredProveedores?.map((prestador) => {
          const { id, companyName, productType, averageReviews, totalReviews } = prestador;

          return (
            <Link
              key={id}
              to={`/perfil-proveedor/${id}`}
              style={{ textDecoration: 'none' }}
              state={{
                prestador,
              }}
            >
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
                      minHeight: '90px',
                      minWidth: '90px',
                    }}
                  />
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    py: '3vh',
                    pr: '5vw',
                  }}
                >
                  <Box>
                    <Title
                      variant="h6"
                      sx={{
                        fontSize: '1.25rem',
                        color: theme.palette.primary.main,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {companyName}
                    </Title>
                    <Reviews average={averageReviews || 0} total_reviews={totalReviews || 0} />
                  </Box>
                  <Text
                    sx={{
                      color: 'secondary.main',
                    }}
                  >
                    {productType.map((t) => t.name).join(', ')}
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
          <Text>¿Conoces a algun proveedor? Invitalo a FoodLink!</Text>
        </Box>
      )}
    </List>
  );
};
