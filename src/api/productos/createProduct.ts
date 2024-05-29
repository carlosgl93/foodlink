import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { db, storage } from 'firebase/firebase';
import { v4 as uuidv4 } from 'uuid';

type CreateProductData = {
  providerId: string;
  nombre: string;
  precio: string;
  descripción: string;
  imagen: File | null;
};

export const createProduct = async ({
  providerId,
  nombre,
  precio,
  descripción,
  imagen,
}: CreateProductData) => {
  console.log('providerId', providerId);
  console.log('nombre', nombre);
  console.log('imagen', imagen);

  // Define the maximum image size (in bytes)
  const MAX_IMAGE_SIZE = 500 * 1024; // 500KB

  // Check the image size
  if (imagen && imagen.size > MAX_IMAGE_SIZE) {
    throw new Error('La imagen no puede pesar mas de 0.5 MBs');
  }

  const productId = uuidv4();
  const productRef = doc(db, 'products', productId);

  let imageUrl = '';
  if (imagen) {
    const imageRef = ref(storage, `products/${productId}`);
    const uploadTask = uploadBytesResumable(imageRef, imagen);

    await uploadTask.then(async () => {
      imageUrl = await getDownloadURL(imageRef);
    });
  }

  const productData = {
    id: productId,
    providerId,
    nombre,
    precio,
    descripción,
    imageUrl,
  };

  await setDoc(productRef, productData);
};
