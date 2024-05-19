import { Proveedor } from '@/types';
import { atom } from 'recoil';

export const interactedProveedorState = atom<Proveedor | null>({
  key: 'interactedProveedorState',
  default: null,
});
