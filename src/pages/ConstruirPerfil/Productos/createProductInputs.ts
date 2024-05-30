export type CreateProductInput = {
  name: string;
  label: string;
  type: string;
  required: boolean;
};

export const createProductInputs: CreateProductInput[] = [
  {
    name: 'nombre',
    label: 'Nombre',
    type: 'text',
    required: true,
  },
  {
    name: 'precio',
    label: 'Precio',
    type: 'number',
    required: true,
  },
  {
    name: 'descripción',
    label: 'Descripción',
    type: 'text',
    required: false,
  },
  {
    name: 'imagen',
    label: 'Imagen',
    type: 'file',
    required: false,
  },
];
