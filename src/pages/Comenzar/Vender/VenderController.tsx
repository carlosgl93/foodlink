import {
  offererDispatch,
  offererDispatchState,
  venderStepsState,
} from '@/store/comienzo/vender/venderState';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { offeredProductsState } from '../../../store/comienzo/vender/venderState';
import { Certification, certificationsState, InterestedProduct } from '@/store/comienzo/comprar';

export const VenderController = () => {
  const navigate = useNavigate();
  const [venderSteps, setVenderSteps] = useRecoilState(venderStepsState);
  const [offeredProducts, setOfferedProducts] = useRecoilState(offeredProductsState);
  const [certifications, setCertifications] = useRecoilState(certificationsState);
  const [despacho, setDespacho] = useRecoilState(offererDispatchState);
  const handleIncreaseStep = () => {
    if (venderSteps === 2) {
      navigate('/registrar-proveedor', { replace: true });
      return;
    }
    setVenderSteps((prev) => prev + 1);
  };

  const handleDecreaseStep = () => {
    if (!venderSteps) {
      navigate('/comenzar');
      return;
    }
    setVenderSteps((prev) => prev - 1);
  };

  const handleSelectOfferedProduct = (product: InterestedProduct) => {
    if (offeredProducts.find((i) => i.id === product.id)) {
      setOfferedProducts((prev) => prev.filter((i) => i.id !== product.id));
      return;
    }
    setOfferedProducts((prev) => [...prev, product]);
  };

  const handleSelectCertifications = (c: Certification) => {
    if (certifications.find((i) => i.id === c.id)) {
      setCertifications((prev) => prev.filter((i) => i.id !== c.id));
      return;
    }
    setCertifications((prev) => [...prev, c]);
  };

  const handleSelectDespacho = (d: offererDispatch) => {
    setDespacho(d);
  };

  return {
    venderSteps,
    offeredProducts,
    certifications,
    despacho,
    handleIncreaseStep,
    handleDecreaseStep,
    handleSelectOfferedProduct,
    handleSelectCertifications,
    handleSelectDespacho,
  };
};
