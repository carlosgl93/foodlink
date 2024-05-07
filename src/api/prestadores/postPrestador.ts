import { Proveedor } from '@/types';
import { db } from 'firebase/firebase';
import { doc, setDoc } from 'firebase/firestore';

export const postProveedor = async (proveedor: Proveedor): Promise<Proveedor> => {
  const providerRef = doc(db, 'providers', proveedor.id);

  try {
    await setDoc(providerRef, proveedor);
    return proveedor;
  } catch (error) {
    console.log(error);
    throw new Error('Error creating proveedor');
  }
};
