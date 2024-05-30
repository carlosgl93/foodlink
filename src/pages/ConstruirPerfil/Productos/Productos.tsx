import { SubTitle, Title, Wrapper } from '@/components/StyledComponents';
import { ProductsController } from './ProductsController';
import { CancelButton } from '@/components/CancelButton';
import { CenteredFlexBox } from '@/components/styled';
import { AddButton } from '@/components/AddButton';
import { CreateProduct } from './CreateProduct';
import { ListProducts } from './ListProducts';
import Loading from '@/components/Loading';
import { Container } from '@mui/material';

export const Productos = () => {
  const { getProductsIsLoading, isCreatingProduct, handleToggleCreateProduct } =
    ProductsController();

  return (
    <Wrapper>
      <Title>Productos</Title>
      <Container
        sx={{
          margin: '1rem 2rem',
        }}
      >
        <CenteredFlexBox
          sx={{
            justifyContent: 'space-between',
            px: '1rem',
          }}
        >
          <SubTitle>{isCreatingProduct ? 'Crear Producto:' : 'Tus productos:'}</SubTitle>
          {isCreatingProduct ? (
            <CancelButton action={handleToggleCreateProduct} />
          ) : (
            <AddButton action={handleToggleCreateProduct} />
          )}
        </CenteredFlexBox>
        {getProductsIsLoading && <Loading />}
        {!getProductsIsLoading && <ListProducts />}
        {isCreatingProduct && <CreateProduct />}
      </Container>
    </Wrapper>
  );
};
