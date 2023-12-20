export type Prestador = {
  id: number;
  firstname: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  region: string;
  country: string;
  comuna_id: number | null;
  service_id: number;
  speciality_id: number;
  profile_pic: string;
  availability: string[];
};
