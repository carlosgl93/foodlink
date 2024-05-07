import { List, ListItemIcon, ListItemText } from '@mui/material';
import { InterestedProduct } from '@/store/comienzo/comprar';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { StyledListItemButton } from '../Comprar/ComprarStyled';
import { VenderController } from './VenderController';

type OfferedProductsProps = {
  options: InterestedProduct[];
};

export const OfferedProducts = ({ options }: OfferedProductsProps) => {
  const { offeredProducts, handleSelectOfferedProduct } = VenderController();

  return (
    <>
      <List>
        {options.map((item) => {
          const alreadySelected = offeredProducts.find((i) => i.id === item.id);
          return (
            <StyledListItemButton
              onClick={() => handleSelectOfferedProduct(item)}
              sx={{
                color: alreadySelected ? 'white' : 'primary.main',
                backgroundColor: alreadySelected ? 'primary.dark' : 'white',
                my: '0.5rem',
                ':hover': {
                  backgroundColor: alreadySelected ? 'primary.dark' : 'primary.light',
                  color: alreadySelected ? 'white' : 'primary.dark',
                },
              }}
              key={item.name}
            >
              <ListItemText primary={item.name} />
              <ListItemIcon
                sx={{
                  color: 'primary.main',
                  marginLeft: 'auto',
                }}
              >
                <ChevronRightIcon />
              </ListItemIcon>
            </StyledListItemButton>
          );
        })}
      </List>
    </>
  );
};
