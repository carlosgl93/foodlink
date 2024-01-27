import { atom, useRecoilState, useRecoilValueLoadable } from 'recoil';

import type { Actions } from './types';
import { getAllComunas } from '@/api/comunas/getAllComunas';
import { getAllServiciosAndEspecialidades } from '@/api/servicios/getAllServiciosAndEspecialidades';
import { useEffect } from 'react';
import { Especialidad, Servicio } from '@/types/Servicio';
import { Comuna } from '@/types/Comuna';

type EntregaApoyoState = {
  step: number;
  selectedComunas: Comuna[];
  selectedServicio: Servicio | null;
  especialidadesFromServicio: null | Especialidad[];
  selectedEspecialidad: Especialidad | null;
  allServicios: Servicio[] | null;
  allComunas: Comuna[] | null;
};
const entregaApoyoState = atom<EntregaApoyoState>({
  key: 'entregaApoyoState',
  default: {
    step: 0,
    selectedComunas: [],
    selectedServicio: null,
    especialidadesFromServicio: null,
    selectedEspecialidad: null,
    allServicios: null,
    allComunas: [],
  },
});

function useEntregaApoyo(): [EntregaApoyoState, Actions] {
  const [apoyo, setApoyo] = useRecoilState(entregaApoyoState);

  const { allServicios, allComunas } = apoyo;

  const fetchComunas = useRecoilValueLoadable(getAllComunas);
  const fetchServicios = useRecoilValueLoadable(getAllServiciosAndEspecialidades);

  useEffect(() => {
    if (!allServicios) {
      if (fetchServicios.state === 'hasValue') {
        setApoyo((prev) => ({
          ...prev,
          allServicios: Object.values(fetchServicios.contents?.data),
        }));
      }
    }
  }, [allServicios, fetchServicios, setApoyo]);

  useEffect(() => {
    if (allComunas?.length === 0) {
      if (fetchComunas.state === 'hasValue') {
        setApoyo((prev) => ({
          ...prev,
          allComunas: fetchComunas.contents?.data,
        }));
      }
    }
  }, [allComunas, fetchComunas, setApoyo]);

  const addComuna = (comuna: Comuna) => {
    if (apoyo.selectedComunas.find((c) => c.id === comuna.id)) return;
    setApoyo((prev) => ({
      ...prev,
      selectedComunas: [...prev.selectedComunas, comuna],
    }));
  };

  const removeComuna = (comuna: Comuna) => {
    setApoyo((prev) => ({
      ...prev,
      selectedComunas: prev.selectedComunas.filter((c) => c !== comuna),
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

  const selectServicio = (servicio: Servicio) => {
    setApoyo((prev) => ({
      ...prev,
      selectedServicio: servicio,
    }));

    setApoyo((prev) => ({
      ...prev,
      especialidadesFromServicio: servicio.especialidades,
    }));
  };
  const selectEspecialidad = (especialidad: Especialidad) => {
    setApoyo((prev) => ({
      ...prev,
      selectedEspecialidad: especialidad,
    }));
  };

  return [
    apoyo,
    {
      addComuna,
      removeComuna,
      increaseStep,
      selectServicio,
      selectEspecialidad,
      decreaseStep,
    },
  ];
}

export default useEntregaApoyo;
