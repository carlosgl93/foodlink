import { atom } from 'recoil';

type Availability = {
  monday: [];
  tuesday: [];
  wednesday: [];
  thursday: [];
  friday: [];
  saturday: [];
  sunday: [];
};

export interface Prestador {
  email: string;
  id: string;
  role: string;
  firstname?: string;
  lastname?: string;
  rut: string;
  comunas: string[];
  servicio: string | undefined;
  especialidad?: string | undefined;
  telefono?: string;
  isLoggedIn?: boolean;
  availability?: Availability;
  averageReviews?: number;
  description?: string;
  totalReviews?: number;
  offersFreeMeetAndGreet: boolean;
  imageUrl?: string;
  settings?: {
    disponibilidad: boolean;
    comunas: boolean;
    tarifas: boolean;
    experiencia: boolean;
    cuentaBancaria: boolean;
    historialLaboral: boolean;
    educacionFormacion: boolean;
    registroSuperIntendenciaSalud: boolean;
    insignias: boolean;
    inmunizacion: boolean;
    idiomas: boolean;
    antecedentesCulturales: boolean;
    religion: boolean;
    interesesHobbies: boolean;
    sobreMi: boolean;
    misPreferencias: boolean;
  };
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
    availability: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: [],
    },
    averageReviews: 0,
    totalReviews: 0,
    description: '',
    offersFreeMeetAndGreet: false,
  },
});
