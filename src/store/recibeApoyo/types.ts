import { Comuna } from '@/types/Comuna';
import { Prestador } from '@/types/Prestador';
import { Especialidad, Servicio } from '@/types/Servicio';

type Actions = {
  addComuna: (comuna: Comuna) => void;
  removeComuna: (comuna: Comuna) => void;
  increaseStep: () => void;
  selectForWhom: (forWhom: string) => void;
  selectServicio: (servicio: Servicio | null) => void;
  selectEspecialidad: (especialidad: Especialidad | null) => void;
  decreaseStep: () => void;
  // filterByServicio: (servicio: Service) => void;
  setAvailability: (availability: { id: number; name: string }) => void;
  setServicios: (servicios: Servicio[]) => void;
  setComunas: (comunas: Comuna[]) => void;
  setPrestadores: (prestadores: Prestador[]) => void;
};

export type { Actions };
