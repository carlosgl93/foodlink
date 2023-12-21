import { atom, useRecoilState } from 'recoil';

import type { Actions } from './types';
import { Comuna } from '@/types/Comuna';
import { Servicio } from '@/types/Servicio';
import { getPrestadoresByComunaAndServicio } from '@/api/prestadores/getPrestadoresByComunaAndServicio';

type RecibeApoyoState = {
  step: number;
  comuna: Comuna | null;
  servicio: Servicio | null;
  especialidad: string;
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
    especialidad: '',
    disponibilidad: [],
    allServicios: null,
    allComunas: [],
  },
});

function useRecibeApoyo(): [RecibeApoyoState, Actions] {
  const [apoyo, setApoyo] = useRecoilState(recibeApoyoState);

  const setComunas = (comunas: Comuna[]) => {
    setApoyo((prev) => ({
      ...prev,
      allComunas: Object.values(comunas),
    }));
  };

  const setServicios = (servicios: Servicio[]) => {
    setApoyo((prev) => ({
      ...prev,
      allServicios: Object.values(servicios),
    }));
  };

  const addComuna = (comuna: Comuna) => {
    if (apoyo.comuna === comuna) return;
    setApoyo((prev) => ({
      ...prev,
      comuna: comuna,
    }));
  };

  const removeComuna = () => {
    setApoyo((prev) => ({
      ...prev,
      comuna: null,
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

  const selectServicio = (servicio: Servicio) => {
    console.log(servicio);
    getPrestadoresByComunaAndServicio({
      comuna: apoyo.comuna?.id || null,
      servicio: servicio.service_id,
    });
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
      setServicios,
      setComunas,
    },
  ];
}

export default useRecibeApoyo;
