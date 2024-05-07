import { atom } from 'recoil';

export type InterestedProduct = {
  id?: string;
  name: string;
  value: string;
};

export type Quantity = {
  id?: string;
  name: string;
  value: string;
};

export type Certification = {
  id?: string;
  name: string;
  value: string;
};

export const comprarStepState = atom<number>({
  key: 'comprarStep',
  default: 0,
});

export const interestedProductsState = atom<InterestedProduct[]>({
  key: 'interestedProducts',
  default: [],
});

export const quantitiesState = atom<Quantity[]>({
  key: 'quantity',
  default: [],
});

export const certificationsState = atom<Certification[]>({
  key: 'certifications',
  default: [],
});
