import { useCallback } from 'react';

import { atom, useRecoilState } from 'recoil';

import type { Actions } from './types';
import { Comuna } from '@/types/Comuna';
import { Especialidad, Servicio } from '@/types/Servicio';
import { Proveedor } from '@/types';
import { ForWhom } from '@/hooks/useAuthNew';

type RecibeApoyoState = {
  step: number;
  comuna: Comuna | null;
  servicio: Servicio | null;
  especialidad: Especialidad | null;
  forWhom: ForWhom;
  disponibilidad: {
    id: number;
    name: string;
  }[];
  allServicios: Servicio[] | null;
  allComunas: Comuna[] | [];
  prestadores: Proveedor[] | [];
};

const recibeApoyoState = atom<RecibeApoyoState>({
  key: 'recibeApoyoState',
  default: {
    step: 0,
    comuna: null,
    servicio: null,
    forWhom: '',
    especialidad: null,
    disponibilidad: [],
    allServicios: null,
    allComunas: [],
    prestadores: [],
  },
});

function useRecibeApoyo(): [RecibeApoyoState, Actions] {
  const [apoyo, setApoyo] = useRecoilState(recibeApoyoState);

  const resetRecibeApoyoState = () => {
    setApoyo({
      step: 0,
      comuna: null,
      servicio: null,
      forWhom: '',
      especialidad: null,
      disponibilidad: [],
      allServicios: null,
      allComunas: [],
      prestadores: [],
    });
  };

  const setComunas = useCallback(
    (comunas: Comuna[]) => {
      if (comunas.length === 0) return;
      setApoyo((prev) => ({
        ...prev,
        allComunas: Object?.values(comunas),
      }));
    },
    [setApoyo],
  );

  const setServicios = useCallback(
    (servicios: Servicio[]) => {
      setApoyo((prev) => ({
        ...prev,
        allServicios: Object?.values(servicios),
      }));
    },
    [setApoyo],
  );

  const addComuna = (comuna: Comuna) => {
    if (apoyo.comuna === comuna) return;
    setApoyo((prev) => ({
      ...prev,
      comuna: comuna,
    }));
    // getPrestadoresByComunaAndServicio({
    //   comuna: comuna.id,
    //   servicio: apoyo.servicio?.service_id || null,
    // });
  };

  const removeComuna = () => {
    setApoyo((prev) => ({
      ...prev,
      comuna: null,
    }));
    // getPrestadoresByComunaAndServicio({
    //   comuna: null,
    //   servicio: apoyo.servicio?.service_id || null,
    // });
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

  const selectForWhom = (forWhom: ForWhom) => {
    setApoyo((prev) => ({
      ...prev,
      forWhom: forWhom,
    }));
  };

  const selectServicio = (servicio: Servicio | null) => {
    if (apoyo.servicio === servicio) return;

    setApoyo((prev) => ({
      ...prev,
      servicio,
    }));
  };
  const selectEspecialidad = (especialidad: Especialidad | undefined) => {
    if (apoyo.especialidad === especialidad) return;
    if (!especialidad) {
      setApoyo((prev) => ({
        ...prev,
        especialidad: null,
      }));
      // getPrestadoresByComunaAndServicio({
      //   comuna: apoyo.comuna?.id || null,
      //   servicio: apoyo.servicio?.service_id || null,
      // });
      return;
    }

    // getPrestadoresByEspecialidad({
    //   comuna: apoyo.comuna?.id || null,
    //   servicio: apoyo.servicio!.service_id,
    //   especialidad: especialidad.especialidad_id,
    // });
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

  const setPrestadores = useCallback(
    (prestadores: Proveedor[]) => {
      setApoyo((prev) => ({
        ...prev,
        prestadores,
      }));
    },
    [setApoyo],
  );
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
      setServicios,
      setComunas,
      setPrestadores,
      resetRecibeApoyoState,
    },
  ];
}

export default useRecibeApoyo;
