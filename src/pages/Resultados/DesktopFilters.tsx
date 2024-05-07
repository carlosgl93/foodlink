import { Title } from '@/components/StyledComponents';
import { List, ListItemButton, ListItemText } from '@mui/material';
import { Box } from '@mui/system';

import { useComunas } from '@/hooks';
import SearchBar from '../Comenzar/SearchBar';
import { InterestProducts } from '../Comenzar/Comprar/InterestProducts';
import { Certification, InterestedProduct } from '@/store/comienzo/comprar';
import { comprarSteps } from '../Comenzar/Comprar/comprarSteps';
import { CertificationsList } from '../Comenzar/Comprar/CertificacionesList';

const DesktopFilters = () => {
  const { selectedComunas, handleRemoveComuna } = useComunas();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
      }}
    >
      <Box
        sx={{
          my: '1rem',
        }}
      >
        <Title
          variant="h6"
          sx={{
            fontSize: '1.2rem',
          }}
        >
          Tipo de productos
        </Title>
        <InterestProducts options={comprarSteps[0].options as InterestedProduct[]} />
      </Box>
      <Title
        variant="h6"
        sx={{
          fontSize: '1.2rem',
        }}
      >
        Certificaciones
      </Title>
      <CertificationsList options={comprarSteps[1].options as Certification[]} />
      <Title
        variant="h6"
        sx={{
          fontSize: '1.2rem',
        }}
      >
        Comunas
      </Title>
      <SearchBar />
      {selectedComunas && (
        <List>
          {selectedComunas.map((comuna) => (
            <ListItemButton
              key={comuna.id}
              onClick={() => handleRemoveComuna(comuna!)}
              sx={{
                color: 'secondary.main',
                display: 'grid',
                gridTemplateColumns: '90% 10%',
                alignItems: 'center',
                border: '1px solid',
                borderColor: 'primary.dark',
                borderRadius: '0.25rem',
                padding: '0.5rem 1rem',
                backgroundColor: 'primary.main',
                ':hover': {
                  backgroundColor: 'primary.light',
                },
                my: '1vh',
              }}
            >
              <ListItemText primary={comuna.name} />
            </ListItemButton>
          ))}
        </List>
      )}
    </Box>
  );
};
export default DesktopFilters;
