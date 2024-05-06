import { ForWhom } from '@/hooks/useAuthNew';
import { Comuna } from '@/types/Comuna';
import { Proveedor } from '@/types';
import { Especialidad, Servicio } from '@/types/Servicio';

type Actions = {
  addComuna: (comuna: Comuna) => void;
  removeComuna: (comuna: Comuna) => void;
  increaseStep: () => void;
  selectForWhom: (forWhom: ForWhom) => void;
  selectServicio: (servicio: Servicio | null) => void;
  selectEspecialidad: (especialidad: Especialidad | undefined) => void;
  decreaseStep: () => void;
  // filterByServicio: (servicio: Service) => void;
  setAvailability: (availability: { id: number; name: string }) => void;
  setServicios: (servicios: Servicio[]) => void;
  setComunas: (comunas: Comuna[]) => void;
  setPrestadores: (prestadores: Proveedor[]) => void;
  resetRecibeApoyoState: () => void;
};

export type { Actions };
