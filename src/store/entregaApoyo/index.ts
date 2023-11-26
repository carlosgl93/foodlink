import { atom, useRecoilState } from 'recoil';

import type { Actions } from './types';
import { entregaApoyoSteps } from '../../pages/EntregaApoyo/entregaApoyoSteps';

type EntregaApoyoState = {
  step: number;
  comunas: string[];
  servicio: string;
  especialidades: string[];
  selectedEspecialidad: string;
};
const entregaApoyoState = atom<EntregaApoyoState>({
  key: 'entregaApoyoState',
  default: {
    step: 0,
    comunas: [],
    servicio: '',
    especialidades: [],
    selectedEspecialidad: '',
  },
});

function useEntregaApoyo(): [EntregaApoyoState, Actions] {
  const [apoyo, setApoyo] = useRecoilState(entregaApoyoState);

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

  const selectServicio = (servicio: string) => {
    setApoyo((prev) => ({
      ...prev,
      servicio,
    }));
    const serviceSpecialities = entregaApoyoSteps[1].options.find(
      (o) => o.text === servicio,
    )?.speciality;
    setApoyo((prev) => ({
      ...prev,
      especialidades: serviceSpecialities ? serviceSpecialities.map((s) => s.text) : [],
    }));
  };
  const selectEspecialidad = (especialidad: string) => {
    setApoyo((prev) => ({
      ...prev,
      selectedEspecialidad: especialidad,
    }));
  };

  return [
    apoyo,
    { addComuna, removeComuna, increaseStep, selectServicio, selectEspecialidad, decreaseStep },
  ];
}

export default useEntregaApoyo;
