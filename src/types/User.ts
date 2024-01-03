export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  forWhom: string;
  nombrePaciente?: string;
  rut?: string;
  password?: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  comuna_id: string | number;
  region?: string;
  country?: string;
  imageUrl?: string;
  created_at?: string;
};
