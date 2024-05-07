import { Certification, InterestedProduct } from '@/store/comienzo/comprar';
import { Comuna } from './Comuna';

export interface Proveedor {
  email: string;
  id: string;
  role: string;
  companyName: string;
  representativeName: string;
  companyRut: string;
  dispatch: string;
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
