import { Certification, InterestedProduct } from '@/store/comienzo/comprar';
import { Comuna } from './Comuna';
import { OffererDispatch } from '@/store/comienzo/vender';

export interface Proveedor {
  email: string;
  id: string;
  role: string;
  companyName: string;
  representativeName: string;
  companyRut: string;
  dispatch: OffererDispatch;
  comunas: Comuna[];
  productType: InterestedProduct[];
  phone?: string;
  isLoggedIn?: boolean;
  averageReviews?: number;
  description?: string;
  totalReviews?: number;
  imageUrl?: string;
  dob?: string;
  address?: string;
  certifications?: Certification[];
  paymentMethods?: string[];
  settings: {
    products: boolean;
    detallesBasicos: boolean;
    comunas: boolean;
    cuentaBancaria: boolean;
    insignias: boolean;
    sobreMi: boolean;
    misPreferencias: boolean;
    inmunizacion: boolean;
  };
}
