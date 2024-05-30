import { interactedProveedorState } from '@/store/resultados/interactedProveedor';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { createProduct, getProducts } from '@/api/productos';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { createProductState, isCreatingProductState } from '@/store/products';
import { notificationState } from '@/store/snackbar';
import { useAuthNew } from './useAuthNew';

export const useProducts = () => {
  const { proveedor } = useAuthNew();
  const interactedProveedor = useRecoilValue(interactedProveedorState);
  const { nombre, precio, descripción, imagen } = useRecoilValue(createProductState);
  const setIsCreatingProduct = useSetRecoilState(isCreatingProductState);
  const setNotification = useSetRecoilState(notificationState);

  const queryClient = useQueryClient();

  const { data: products, isLoading: getProductsIsLoading } = useQuery(
    'proveedorProducts',
    () => getProducts(proveedor?.id ?? interactedProveedor?.id ?? ''),
    {
      enabled: !!proveedor?.id,
    },
  );

  const { mutate: createProductMutation, isLoading: createProductIsLoading } = useMutation(
    () =>
      createProduct({
        providerId: proveedor?.id ?? interactedProveedor?.id ?? '',
        nombre,
        precio,
        descripción,
        imagen,
      }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('proveedorProducts');
        setNotification({
          message: 'Producto creado correctamente',
          severity: 'success',
          open: true,
        });
        setIsCreatingProduct(false);
      },
    },
  );

  return { products, getProductsIsLoading, createProductIsLoading, createProductMutation };
};
