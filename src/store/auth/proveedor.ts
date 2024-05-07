import { Proveedor } from '@/types';
import { atom } from 'recoil';

export const proveedorState = atom<null | Proveedor>({
  key: 'proveedorState',
  default: {
    email: '',
    id: '',
    role: '',
    companyName: '',
    representativeName: '',
    productType: [],
    companyRut: '',
    comunas: [],
    dispatch: '',
    averageReviews: 0,
    totalReviews: 0,
    description: '',
    settings: {
      products: false,
      detallesBasicos: false,
      comunas: false,
      insignias: false,
      cuentaBancaria: false,
      sobreMi: false,
      misPreferencias: false,
      inmunizacion: false,
    },
  },
});
