import { Comuna } from '@/types';
import { atom } from 'recoil';

export interface User {
  id: string;
  email: string;
  role: string;
  companyName: string;
  representativeName: string;
  isLoggedIn: boolean;
  companyRut: string;
  phone?: string;
  address?: string;
  comunas?: Comuna[];
}

export const userState = atom<null | User>({
  key: 'userState', // unique ID (with respect to other atoms/selectors)
  default: {
    email: '',
    id: '',
    role: '',
    companyName: '',
    representativeName: '',
    companyRut: '',
    isLoggedIn: false,
    phone: '',
    address: '',
    comunas: [],
  },
});
