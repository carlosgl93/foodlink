import { atom } from 'recoil';

type TCreateProductState = {
  nombre: string;
  precio: string;
  descripción: string;
  imagen: File | null;
  [key: string]: string | File | null;
};

export const isCreatingProductState = atom<boolean>({
  key: 'isCreatingProduct',
  default: false,
});

export const createProductState = atom<TCreateProductState>({
  key: 'createProduct',
  default: {
    nombre: '',
    precio: '',
    descripción: '',
    imagen: null,
  },
});
