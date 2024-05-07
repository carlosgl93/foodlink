import { List, ListItemIcon, ListItemText } from '@mui/material';
import { ComprarController } from './ComprarController';
import { Quantity } from '@/store/comienzo/comprar';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { StyledListItemButton } from './ComprarStyled';

type QuantityListProps = {
  options: Quantity[];
};

export const QuantityList = ({ options }: QuantityListProps) => {
  const { quantities, handleSelectQuantities } = ComprarController();

  return (
    <>
      <List
        sx={{
          gap: 1,
        }}
      >
        {options.map((item) => {
          const alreadySelected = quantities.find((i) => i.id === item.id);
          return (
            <StyledListItemButton
              onClick={() => handleSelectQuantities(item)}
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
