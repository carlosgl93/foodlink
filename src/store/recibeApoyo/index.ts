import { atom, useRecoilState } from 'recoil';

import type { Actions } from './types';

type RecibeApoyoState = {
  step: number;
  comunas: string[];
  servicio: string;
  especialidad: string;
  forWhom: string;
  disponibilidad: {
    id: number;
    name: string;
  }[];
};

const recibeApoyoState = atom<RecibeApoyoState>({
  key: 'recibeApoyoState',
  default: {
    step: 0,
    comunas: [],
    servicio: '',
    forWhom: '',
    especialidad: '',
    disponibilidad: [],
  },
});

function useRecibeApoyo(): [RecibeApoyoState, Actions] {
  const [apoyo, setApoyo] = useRecoilState(recibeApoyoState);

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

  // const filterByServicio = (servicio: string) => {
  //   const servicioObj = services.find((s) => s.text === servicio);

  //   setApoyo((prev) => ({
  //     ...prev,
  //     servicio: servicio,
  //     especialidad: servicioObj?.speciality[0].text || '',
  //   }));
  // };

  const selectServicio = (servicio: string) => {
    setApoyo((prev) => ({
      ...prev,
      servicio,
    }));
  };
  const selectEspecialidad = (especialidad: string) => {
    setApoyo((prev) => ({
      ...prev,
      especialidad,
    }));
  };

  const setAvailability = (availability: { id: number; name: string }) => {
    if (apoyo.disponibilidad.find((d) => d.id === availability.id)) {
      setApoyo((prev) => ({
        ...prev,
        disponibilidad: prev.disponibilidad.filter((d) => d.id !== availability.id),
      }));
      return;
    } else {
      setApoyo((prev) => ({
        ...prev,
        disponibilidad: [...prev.disponibilidad, availability],
      }));
    }
  };

  return [
    apoyo,
    {
      addComuna,
      removeComuna,
      increaseStep,
      decreaseStep,
      selectForWhom,
      // filterByServicio,
      selectServicio,
      selectEspecialidad,
      setAvailability,
    },
  ];
}

export default useRecibeApoyo;
