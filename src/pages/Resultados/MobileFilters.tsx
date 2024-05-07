import { Box, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { StyledListItem, Title } from '@/components/StyledComponents';
import { InterestedProduct, Certification } from '../../store/comienzo/comprar/index';
import { comprarSteps } from '../Comenzar/Comprar/comprarSteps';
import { InterestProducts } from '../Comenzar/Comprar/InterestProducts';
import { CertificationsList } from '../Comenzar/Comprar/CertificacionesList';
import SearchBar from '../Comenzar/SearchBar';
import { useComunas } from '@/hooks';

type MobileFiltersProps = {
  closeFilters: () => void;
};

export const MobileFilters = ({ closeFilters }: MobileFiltersProps) => {
  const { selectedComunas, handleRemoveComuna } = useComunas();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        maxWidth: '80vw',
        p: '1rem',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mb: '1.75rem',
        }}
      >
        <Button
          variant="outlined"
          onClick={closeFilters}
          sx={{
            display: 'flex',
            borderRadius: '1rem',
            borderColor: '#99979c',
          }}
        >
          Cerrar <CloseIcon />
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Title
          variant="h6"
          sx={{
            fontSize: '1.2rem',
          }}
        >
          Comuna para despacho.
        </Title>
      </Box>
      <SearchBar />
      {selectedComunas.map((comuna) => (
        <StyledListItem key={comuna.id}>
          {comuna.name}
          <CloseIcon onClick={() => handleRemoveComuna(comuna)} />
        </StyledListItem>
      ))}

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
    </Box>
  );
};
