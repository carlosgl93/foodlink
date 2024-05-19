import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { auth, db } from '../../firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, query, where, getDocs, limit, doc, setDoc } from 'firebase/firestore';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { notificationState } from '@/store/snackbar';
import { Comuna, Proveedor } from '@/types';
import { FirebaseError } from 'firebase/app';
import { User, userState } from '@/store/auth/user';
import { proveedorState } from '@/store/auth/proveedor';
import useEntregaApoyo from '@/store/entregaApoyo';
import useRecibeApoyo from '@/store/recibeApoyo';
import { redirectToAfterLoginState } from '@/store/auth';
import { comunasState } from '@/store/construirPerfil/comunas';
import { certificationsState, InterestedProduct } from '@/store/comienzo/comprar';
import { OffererDispatch } from '@/store/comienzo/vender';

export type ForWhom = 'paciente' | 'tercero' | '';

export type CreateUserParams = {
  representativeName: string;
  confirmPassword: string;
  companyName: string;
  companyRut: string;
  password: string;
  phone: string;
  email: string;
};

export type CreateProveedorParams = {
  representativeName: string;
  companyName: string;
  companyRut: string;
  email: string;
  password: string;
  despacho: OffererDispatch;
  productType: InterestedProduct[];
  comunas?: Comuna[];
};

const defaultNewUser = { dob: '', phone: '', gender: '', address: '' };

export const useAuthNew = () => {
  const setNotification = useSetRecoilState(notificationState);
  const [user, setUserState] = useRecoilState(userState);
  const [proveedor, setProveedorState] = useRecoilState(proveedorState);
  const redirectAfterLogin = useRecoilValue(redirectToAfterLoginState);
  const selectedComunas = useRecoilValue(comunasState);
  const certifications = useRecoilValue(certificationsState);
  const [, { resetEntregaApoyoState }] = useEntregaApoyo();
  const [, { resetRecibeApoyoState }] = useRecibeApoyo();

  const isLoggedIn = user?.isLoggedIn || proveedor?.isLoggedIn;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: createProveedor, isLoading: createProveedorLoading } = useMutation(
    async ({
      companyName,
      companyRut,
      email,
      password,
      productType,
      representativeName,
      despacho,
    }: CreateProveedorParams) => {
      setNotification({
        open: true,
        message: 'Creando tu cuenta...',
        severity: 'info',
      });

      // Check if a user with the given email already exists in the users collection
      const userQuery = query(collection(db, 'users'), where('email', '==', email));
      const userSnapshot = await getDocs(userQuery);
      if (!userSnapshot.empty) {
        throw new Error('Este email ya tiene una cuenta.');
      }

      // Check if a user with the given email already exists in the providers collection
      const providerQuery = query(collection(db, 'providers'), where('email', '==', email));
      const providerSnapshot = await getDocs(providerQuery);
      if (!providerSnapshot.empty) {
        throw new Error('Este email ya tiene una cuenta.');
      }

      return createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
        const newPrestador: Proveedor = {
          email,
          id: user.uid,
          role: 'proveedor',
          companyName,
          companyRut,
          comunas: selectedComunas ?? [],
          dispatch: despacho,
          representativeName,
          productType: productType ?? [],
          averageReviews: 0,
          totalReviews: 0,
          description: '',
          certifications: certifications ?? [],
          settings: {
            products: false,
            detallesBasicos: false,
            comunas: true,
            cuentaBancaria: false,
            insignias: false,
            sobreMi: false,
            misPreferencias: false,
            inmunizacion: false,
          },
        };
        const providerRef = doc(db, 'providers', newPrestador.id);
        return setDoc(providerRef, newPrestador).then(() => {
          return newPrestador;
        });
      });
    },
    {
      onSuccess(data) {
        setNotification({
          open: true,
          message: `Cuenta creada exitosamente`,
          severity: 'success',
        });
        setProveedorState({ ...data, isLoggedIn: true } as Proveedor);
        queryClient.setQueryData(['proveedor', data.email], proveedor);

        navigate('/proveedor-dashboard');
      },
      onError(error: FirebaseError) {
        let message = 'Hubo un error creando el proveedor: ';

        switch (error.code) {
          case 'auth/email-already-in-use':
            message += 'El correo electrónico ya está en uso.';
            break;
          case 'auth/invalid-email':
            message += 'El correo electrónico no es válido.';
            break;
          case 'auth/operation-not-allowed':
            message += 'La operación no está permitida.';
            break;
          case 'auth/weak-password':
            message += 'La contraseña es demasiado débil.';
            break;
          default:
            message += error.message;
        }

        setNotification({
          open: true,
          message,
          severity: 'error',
        });
      },
    },
  );

  const { mutate: createUser, isLoading: createUserLoading } = useMutation(
    async ({ companyName, representativeName, companyRut, email, password }: CreateUserParams) => {
      setNotification({
        open: true,
        message: 'Creando tu cuenta...',
        severity: 'info',
      });
      // Check if a user with the given email already exists in the users collection
      const userQuery = query(collection(db, 'users'), where('email', '==', email));
      const userSnapshot = await getDocs(userQuery);
      if (!userSnapshot.empty) {
        throw new Error('Este email ya tiene una cuenta.');
      }

      // Check if a user with the given email already exists in the providers collection
      const providerQuery = query(collection(db, 'providers'), where('email', '==', email));
      const providerSnapshot = await getDocs(providerQuery);
      if (!providerSnapshot.empty) {
        throw new Error('Este email ya tiene una cuenta.');
      }
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = {
        ...defaultNewUser,
        email: email,
        id: user.uid,
        role: 'user',
        companyName,
        representativeName,
        companyRut,
        comuna: selectedComunas,
      };
      const userRef = doc(db, 'users', user.uid);
      return await setDoc(userRef, newUser).then(() => newUser);
    },
    {
      onSuccess(data) {
        setNotification({
          open: true,
          message: `Cuenta creada exitosamente`,
          severity: 'success',
        });
        setUserState({ ...data, isLoggedIn: true } as User);
        queryClient.setQueryData(['user', data?.email], user);
        window.scrollTo(0, 0);
        redirectAfterLogin ? navigate(redirectAfterLogin) : navigate(`/usuario-dashboard`);
      },
      onError(error: FirebaseError) {
        let message = 'Hubo un error creando tu cuenta: ';

        switch (error.code) {
          case 'auth/email-already-in-use':
            message += 'El correo electrónico ya está en uso.';
            break;
          case 'auth/invalid-email':
            message += 'El correo electrónico no es válido.';
            break;
          case 'auth/operation-not-allowed':
            message += 'La operación no está permitida.';
            break;
          case 'auth/weak-password':
            message += 'La contraseña es demasiado débil.';
            break;
          default:
            message += error.message;
        }

        setNotification({
          open: true,
          message,
          severity: 'error',
        });
      },
    },
  );

  const { mutate: login, isLoading: loginLoading } = useMutation(
    async ({ correo, contrasena }: { correo: string; contrasena: string }) => {
      setNotification({
        open: true,
        message: 'Iniciando sesión...',
        severity: 'info',
      });
      return signInWithEmailAndPassword(auth, correo, contrasena).then(async () => {
        const usersColectionRef = collection(db, 'users');
        const proveedorCollectionRef = collection(db, 'providers');
        const userQuery = query(usersColectionRef, limit(1), where('email', '==', correo));
        const proveedor = query(proveedorCollectionRef, limit(1), where('email', '==', correo));
        const users = await getDocs(userQuery);
        const proveedores = await getDocs(proveedor);

        if (users.docs.length > 0) {
          const user = users.docs[0].data() as User;
          setUserState({ ...user, isLoggedIn: true });
          queryClient.setQueryData(['user', correo], user);
          return { role: 'user', data: user };
        } else if (proveedores.docs.length > 0) {
          const proveedor = proveedores.docs[0].data() as Proveedor;
          setProveedorState({ ...proveedor, isLoggedIn: true });
          queryClient.setQueryData(['proveedor', correo], proveedor);
          return { role: 'proveedor', data: proveedor };
        }
      });
    },
    {
      onError(error: FirebaseError) {
        let message = 'Error: ';

        switch (error.code) {
          case 'auth/user-not-found':
            message += 'No se encontró ningún usuario con ese correo electrónico.';
            break;
          case 'auth/wrong-password':
            message += 'La contraseña es incorrecta.';
            break;
          case 'auth/invalid-email':
            message += 'El correo electrónico no es válido.';
            break;
          case 'auth/invalid-credential':
            message += 'Email o contraseña incorrecta.';
            break;
          default:
            message += error.message;
        }

        setNotification({
          open: true,
          message,
          severity: 'error',
        });
      },
      onSuccess(data) {
        setNotification({
          open: true,
          message: `Sesión iniciada exitosamente`,
          severity: 'success',
        });
        if (data?.role === 'user') {
          setUserState({ ...data.data, isLoggedIn: true } as User);
          redirectAfterLogin ? navigate(redirectAfterLogin) : navigate(`/usuario-dashboard`);
        } else {
          if (data?.role === 'proveedor') {
            setProveedorState({ ...data.data, isLoggedIn: true } as Proveedor);
            redirectAfterLogin ? navigate(redirectAfterLogin) : navigate(`/proveedor-dashboard`);
          }
        }
      },
    },
  );

  const { mutate: logout } = useMutation(() => signOut(auth), {
    onSuccess: () => {
      setUserState(null);
      setProveedorState(null);
      resetEntregaApoyoState();
      resetRecibeApoyoState();
      queryClient.resetQueries();
      navigate('/ingresar');
    },
  });

  return {
    createUser,
    createUserLoading,
    createProveedor,
    createProveedorLoading,
    login,
    loginLoading,
    user,
    proveedor,
    logout,
    isLoggedIn,
  };
};
