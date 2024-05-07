import { List, ListItemIcon, ListItemText } from '@mui/material';
import { ComprarController } from './ComprarController';
import { InterestedProduct } from '@/store/comienzo/comprar';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { StyledListItemButton } from './ComprarStyled';

type InterestedProductsProps = {
  options: InterestedProduct[];
};

export const InterestProducts = ({ options }: InterestedProductsProps) => {
  const { interestedProducts, handleSelectInterestedProduct } = ComprarController();

  return (
    <>
      <List>
        {options.map((item) => {
          const alreadySelected = interestedProducts.find((i) => i.id === item.id);
          return (
            <StyledListItemButton
              onClick={() => handleSelectInterestedProduct(item)}
              sx={{
                minWidth: {
                  xs: '100%',
                  md: 'fit-content',
                },
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
