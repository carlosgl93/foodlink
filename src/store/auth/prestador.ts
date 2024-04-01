import { atom } from 'recoil';

export interface Prestador {
  email: string;
  id: string;
  role: string;
  firstname: string;
  lastname: string;
  rut: string;
  comunas: string[];
  servicio: string;
  especialidad: string;
  isLoggedIn: boolean;
  availability?: string;
  averageReviews?: number;
  description?: string;
  totalReviews?: number;
}

export const prestadorState = atom<null | Prestador>({
  key: 'prestadorState', // unique ID (with respect to other atoms/selectors)
  default: {
    // default value (aka initial value)
    email: '',
    id: '',
    role: '',
    firstname: '',
    lastname: '',
    rut: '',
    comunas: [],
    servicio: '',
    especialidad: '',
    isLoggedIn: false,
  },
});
