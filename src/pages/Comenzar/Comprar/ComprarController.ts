import {
  comprarStepState,
  InterestedProduct,
  quantitiesState,
  Quantity,
} from '@/store/comienzo/comprar';
import { interestedProductsState } from '../../../store/comienzo/comprar/index';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

export const ComprarController = () => {
  const [comprarStep, setComprarStep] = useRecoilState(comprarStepState);
  const [interestedProducts, setInterestedProducts] = useRecoilState(interestedProductsState);
  const [quantities, setQuantities] = useRecoilState(quantitiesState);

  const navigate = useNavigate();

  const increaseStep = () => {
    if (comprarStep === 2) navigate('/resultados');

    setComprarStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    if (!comprarStep) {
      navigate('/comenzar');
      return;
    }
    setComprarStep((prev) => prev - 1);
  };

  const handleSelectInterestedProduct = (product: InterestedProduct) => {
    if (interestedProducts.find((i) => i.id === product.id)) {
      setInterestedProducts((prev) => prev.filter((i) => i.id !== product.id));
      return;
    }
    setInterestedProducts((prev) => [...prev, product]);
  };

  const handleSelectQuantities = (q: Quantity) => {
    if (quantities.find((i) => i.id === q.id)) {
      setQuantities((prev) => prev.filter((i) => i.id !== q.id));
      return;
    }
    setQuantities((prev) => [...prev, q]);
  };

  return {
    quantities,
    comprarStep,
    interestedProducts,
    increaseStep,
    handleSelectInterestedProduct,
    handleSelectQuantities,
    handlePrevious,
  };
};
