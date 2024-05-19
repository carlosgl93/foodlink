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

export type OffererDispatch = 'nacional' | 'regional' | 'comunas';

export const offererDispatchState = atom<OffererDispatch>({
  key: 'offererDispatch',
  default: 'comunas',
});
