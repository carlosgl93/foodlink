import { db } from 'firebase/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';

type Product = {
  id: string;
  name: string;
  price: string;
};

export const getProducts = async (proveedorId: string): Promise<Product[]> => {
  const productsRef = collection(db, 'products');

  const q = query(productsRef, where('proveedorId', '==', proveedorId));
  const result = (await getDocs(q)).docs.map((doc) => doc.data()) as Product[];
  return result;
};
