import { ProductListItem } from '@/components/ProductListItem';
import { List } from '@mui/material';
import { ProductsController } from './ProductsController';

export const ListProducts = () => {
  const { products } = ProductsController();

  return (
    <List>
      {products?.map((p) => (
        <ProductListItem key={p?.id} name={p?.name} price={p?.price} />
      ))}
    </List>
  );
};
