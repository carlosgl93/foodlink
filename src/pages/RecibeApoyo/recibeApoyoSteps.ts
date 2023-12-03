import { services } from '@/utils/constants';

export const recibeApoyoSteps = [
  {
    title: '¿Quién busca apoyo?',
    text: '¿Estás buscando apoyo para ti o para una persona cercana?',
    options: [
      {
        text: 'Para mí',
      },
      {
        text: 'Para un amigo(a) o familiar',
      },
    ],
  },
  {
    title: '¿Donde necesitas apoyo?',
    options: [],
  },
  {
    title: '¿Que tipo de apoyo necesitas?',
    options: services,
  },
];
