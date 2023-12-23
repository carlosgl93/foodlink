import { useCallback } from 'react';

import { atom, useRecoilState } from 'recoil';

import type { Actions } from './types';
import { Comuna } from '@/types/Comuna';
import { Especialidad, Servicio } from '@/types/Servicio';
import { getPrestadoresByComunaAndServicio } from '@/api/prestadores/getPrestadoresByComunaAndServicio';
import { getPrestadoresByEspecialidad } from '@/api/prestadores/getPrestadoresByEspecialidad';

type RecibeApoyoState = {
  step: number;
  comuna: Comuna | null;
  servicio: Servicio | null;
  especialidad: Especialidad | null;
  forWhom: string;
  disponibilidad: {
    id: number;
    name: string;
  }[];
  allServicios: Servicio[] | null;
  allComunas: Comuna[] | [];
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
  },
});

function useRecibeApoyo(): [RecibeApoyoState, Actions] {
  const [apoyo, setApoyo] = useRecoilState(recibeApoyoState);

  const setComunas = useCallback(
    (comunas: Comuna[]) => {
      setApoyo((prev) => ({
        ...prev,
        allComunas: Object.values(comunas),
      }));
    },
    [setApoyo],
  );

  const setServicios = useCallback(
    (servicios: Servicio[]) => {
      setApoyo((prev) => ({
        ...prev,
        allServicios: Object.values(servicios),
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
    getPrestadoresByComunaAndServicio({
      comuna: comuna.id,
      servicio: apoyo.servicio?.service_id || null,
    });
  };

  const removeComuna = () => {
    setApoyo((prev) => ({
      ...prev,
      comuna: null,
    }));
    getPrestadoresByComunaAndServicio({
      comuna: null,
      servicio: apoyo.servicio?.service_id || null,
    });
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

  const selectServicio = (servicio: Servicio) => {
    getPrestadoresByComunaAndServicio({
      comuna: apoyo.comuna?.id || null,
      servicio: servicio.service_id,
    });
    setApoyo((prev) => ({
      ...prev,
      servicio,
    }));
  };
  const selectEspecialidad = (especialidad: Especialidad) => {
    console.log('selected Especialidad', especialidad);
    getPrestadoresByEspecialidad({
      comuna: apoyo.comuna?.id || null,
      servicio: apoyo.servicio!.service_id,
      especialidad: especialidad,
    });
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
      setServicios,
      setComunas,
    },
  ];
}

export default useRecibeApoyo;
