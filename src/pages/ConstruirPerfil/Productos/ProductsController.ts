import { createProductState, isCreatingProductState } from '../../../store/products/index';
import { useProducts } from '@/hooks/useProducts';
import { useRecoilState } from 'recoil';

export const ProductsController = () => {
  const [isCreatingProduct, setIsCreatingProduct] = useRecoilState(isCreatingProductState);
  const [createProduct, setCreateProduct] = useRecoilState(createProductState);
  const { getProductsIsLoading, products, createProductMutation, createProductIsLoading } =
    useProducts();

  const handleToggleCreateProduct = () => {
    setIsCreatingProduct((prev) => !prev);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, files } = event.target;
    setCreateProduct((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    createProductMutation();
  };

  return {
    createProductIsLoading,
    getProductsIsLoading,
    isCreatingProduct,
    createProduct,
    products,
    handleSubmit,
    handleChange,
    setCreateProduct,
    handleToggleCreateProduct,
  };
};
