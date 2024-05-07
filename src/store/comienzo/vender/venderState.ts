import { atom } from 'recoil';
import { InterestedProduct } from '../comprar';

export const venderStepsState = atom({
  key: 'venderSteps',
  default: 0,
});

export const offeredProductsState = atom<InterestedProduct[]>({
  key: 'offeredProducts',
  default: [],
});

export type offererDispatch = 'nacional' | 'regional' | 'comunas';

export const offererDispatchState = atom<offererDispatch>({
  key: 'offererDispatch',
  default: 'comunas',
});
