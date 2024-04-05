import { atom } from 'recoil';

export interface User {
  email: string;
  id: string;
  role: string;
  firstname: string;
  lastname: string;
  forWhom: string;
  patientName: string;
  rut: string;
  isLoggedIn: boolean;
}

export const userState = atom<null | User>({
  key: 'userState', // unique ID (with respect to other atoms/selectors)
  default: {
    email: '',
    id: '',
    role: '',
    firstname: '',
    lastname: '',
    forWhom: '',
    patientName: '',
    rut: '',
    isLoggedIn: false,
  },
});
