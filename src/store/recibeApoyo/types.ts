import { Comuna } from '@/types/Comuna';
import { Servicio } from '@/types/Servicio';

type Actions = {
  addComuna: (comuna: Comuna) => void;
  removeComuna: (comuna: Comuna) => void;
  increaseStep: () => void;
  selectForWhom: (forWhom: string) => void;
  selectServicio: (servicio: Servicio) => void;
  selectEspecialidad: (especialidad: string) => void;
  decreaseStep: () => void;
  // filterByServicio: (servicio: Service) => void;
  setAvailability: (availability: { id: number; name: string }) => void;
  setServicios: (servicios: Servicio[]) => void;
  setComunas: (comunas: Comuna[]) => void;
};

export type { Actions };
