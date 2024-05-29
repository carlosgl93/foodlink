import { ListItem, Avatar, Box } from '@mui/material';
import { SubTitle, Text } from './StyledComponents';

type ProductListItemProps = {
  name: string;
  price: string;
};

export const ProductListItem = ({ name, price }: ProductListItemProps) => {
  return (
    <ListItem
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        gap: '1rem',
      }}
    >
      <Avatar
        alt="todo: product name"
        src="todo: product image"
        sx={{
          height: '4rem',
          width: '4rem',
        }}
      />
      <Box
        sx={{
          width: '80%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '0.1rem',
        }}
      >
        <SubTitle
          sx={{
            mb: 0,
          }}
        >
          {name}
        </SubTitle>
        <Text>Precio: {price}</Text>
      </Box>
    </ListItem>
  );
};
