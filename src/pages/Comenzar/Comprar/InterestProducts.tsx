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
      <List
        sx={{
          gap: 1,
        }}
      >
        {options.map((item) => {
          const alreadySelected = interestedProducts.find((i) => i.id === item.id);
          return (
            <StyledListItemButton
              onClick={() => handleSelectInterestedProduct(item)}
              sx={{
                color: alreadySelected ? 'white' : 'primary.main',
                backgroundColor: alreadySelected ? 'primary.dark' : 'white',
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
