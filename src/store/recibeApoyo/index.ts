import { atom, useRecoilState } from 'recoil';
import { services } from './services';

import type { Actions } from './types';
// import { recibeApoyoSteps } from '../../pages/RecibeApoyo/recibeApoyoSteps';

type RecibeApoyoState = {
  step: number;
  comunas: string[];
  servicio: string;
  especialidad: string;
  forWhom: string;
};
const RecibeApoyoState = atom<RecibeApoyoState>({
  key: 'RecibeApoyoState',
  default: {
    step: 0,
    comunas: [],
    servicio: '',
    forWhom: '',
    especialidad: '',
  },
});

function useRecibeApoyo(): [RecibeApoyoState, Actions] {
  const [apoyo, setApoyo] = useRecoilState(RecibeApoyoState);

  const addComuna = (comuna: string) => {
    if (apoyo.comunas.find((c: string) => c === comuna)) return;
    setApoyo((prev) => ({
      ...prev,
      comunas: [...prev.comunas, comuna],
    }));
  };

  const removeComuna = (comuna: string) => {
    setApoyo((prev) => ({
      ...prev,
      comunas: prev.comunas.filter((c) => c !== comuna),
    }));
  };

  const increaseStep = () => {
    setApoyo((prev) => ({
      ...prev,
      step: prev.step + 1,
    }));
  };

  const decreaseStep = () => {
    setApoyo((prev) => ({
      ...prev,
      step: prev.step - 1,
    }));
  };

  const selectForWhom = (forWhom: string) => {
    setApoyo((prev) => ({
      ...prev,
      forWhom: forWhom,
    }));
  };

  const filterByServicio = (servicio: string) => {
    const servicioObj = services.find((s) => s.text === servicio);

    setApoyo((prev) => ({
      ...prev,
      servicio: servicio,
      especialidad: servicioObj?.speciality[0].text || '',
    }));
  };

  return [
    apoyo,
    { addComuna, removeComuna, increaseStep, decreaseStep, selectForWhom, filterByServicio },
  ];
}

export default useRecibeApoyo;
