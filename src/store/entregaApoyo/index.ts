import { atom, useRecoilState } from 'recoil';

import type { Actions } from './types';

type EntregaApoyoState = {
  step: number;
  comunas: string[];
  servicios: string[];
  especialidades: string[];
};
const entregaApoyoState = atom<EntregaApoyoState>({
  key: 'entregaApoyoState',
  default: {
    step: 0,
    comunas: [],
    servicios: [],
    especialidades: [],
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
    if (apoyo.servicios.find((s: string) => s === servicio)) {
      setApoyo((prev) => ({
        ...prev,
        servicios: prev.servicios.filter((s) => s !== servicio),
      }));
      return;
    } else {
      setApoyo((prev) => ({
        ...prev,
        servicios: [...prev.servicios, servicio],
      }));
    }
  };
  const selectEspecialidad = (especialidad: string) => {
    if (apoyo.especialidades.find((e: string) => e === especialidad)) {
      setApoyo((prev) => ({
        ...prev,
        especialidades: prev.especialidades.filter((e) => e !== especialidad),
      }));
      return;
    } else {
      setApoyo((prev) => ({
        ...prev,
        especialidades: [...prev.especialidades, especialidad],
      }));
    }
  };

  return [
    apoyo,
    { addComuna, removeComuna, increaseStep, selectServicio, selectEspecialidad, decreaseStep },
  ];
}

export default useEntregaApoyo;
