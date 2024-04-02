import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { auth, db } from '../../firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  limit,
  writeBatch,
  doc,
} from 'firebase/firestore';
import { useRecoilState } from 'recoil';
import { notificationState } from '@/store/snackbar';
import { Comuna } from '@/types';
import { Servicio, Especialidad } from '@/types/Servicio';
import { FirebaseError } from 'firebase/app';
import { User, userState } from '@/store/auth/user';
import { Prestador, prestadorState } from '@/store/auth/prestador';

export type ForWhom = 'paciente' | 'tercero' | '';

export type CreateUserParams = {
  nombre: string;
  apellido: string;
  paraQuien: ForWhom;
  nombrePaciente?: string;
  rut: string;
  comuna: string;
  correo: string;
  contrasena: string;
};

export type CreatePrestadorParams = {
  nombre: string;
  apellido: string;
  rut: string;
  telefono: string;
  correo: string;
  contrasena: string;
  comunas: Comuna[];
  servicio: Servicio | undefined;
  especialidad: Especialidad | undefined;
};

export const useAuthNew = () => {
  const [, setNotification] = useRecoilState(notificationState);
  const [user, setUserState] = useRecoilState(userState);
  const [prestador, setPrestadorState] = useRecoilState(prestadorState);

  const isLoggedIn = user?.isLoggedIn || prestador?.isLoggedIn;
  const navigate = useNavigate();

  const { mutate: createPrestador, isLoading: createPrestadorLoading } = useMutation(
    ({
      nombre,
      apellido,
      rut,
      telefono,
      correo,
      contrasena,
      comunas,
      servicio,
      especialidad,
    }: CreatePrestadorParams) => {
      setNotification({
        open: true,
        message: 'Creando tu cuenta...',
        severity: 'info',
      });

      return createUserWithEmailAndPassword(auth, correo, contrasena).then(({ user }) => {
        const newPrestador: Prestador = {
          email: correo,
          id: user.uid,
          role: 'prestador',
          firstname: nombre,
          lastname: apellido,
          rut,
          comunas: comunas.map((comuna) => comuna.name),
          servicio: servicio?.serviceName,
          especialidad: especialidad?.especialidadName,
          telefono,
          availability: {
            monday: [],
            tuesday: [],
            wednesday: [],
            thursday: [],
            friday: [],
            saturday: [],
            sunday: [],
          },
          averageReviews: 0,
          totalReviews: 0,
          description: '',
          offersFreeMeetAndGreet: false,
          isLoggedIn: true,
        };
        return addDoc(collection(db, 'providers'), newPrestador).then(() => {
          const defaultAvailability = [
            { day: 'monday', times: [] },
            { day: 'tuesday', times: [] },
            // ...
          ];

          const batch = writeBatch(db);

          defaultAvailability.forEach((day) => {
            const dayRef = doc(db, 'providers', user.uid, 'availability', day.day);
            batch.set(dayRef, { times: day.times });
          });

          return batch.commit().then(() => newPrestador);
        });
      });
    },
    {
      onSuccess(data) {
        console.log('data', data);
        setNotification({
          open: true,
          message: `Cuenta creada exitosamente`,
          severity: 'success',
        });
        setPrestadorState({ ...data, isLoggedIn: true } as Prestador);
        navigate('/prestador-dashboard');
      },
      onError(error: FirebaseError) {
        let message = 'Hubo un error creando el prestador: ';

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
    async ({
      nombre,
      apellido,
      paraQuien,
      nombrePaciente,
      rut,
      comuna,
      correo,
      contrasena,
    }: CreateUserParams) => {
      setNotification({
        open: true,
        message: 'Creando tu cuenta...',
        severity: 'info',
      });
      await createUserWithEmailAndPassword(auth, correo, contrasena).then(async ({ user }) => {
        await addDoc(collection(db, 'users'), {
          email: correo,
          id: user.uid,
          role: 'user',
          firstname: nombre,
          lastname: apellido,
          forWhom: paraQuien ?? 'paciente',
          patientName: nombrePaciente,
          rut,
          comuna,
        });
      });
    },
    {
      onSuccess() {
        setNotification({
          open: true,
          message: `Cuenta creada exitosamente`,
          severity: 'success',
        });
        navigate(`/usuario-dashboard`);
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
        const prestadorCollectionRef = collection(db, 'providers');
        const userQuery = query(usersColectionRef, limit(1), where('email', '==', correo));
        const prestadorQuery = query(
          prestadorCollectionRef,
          limit(1),
          where('email', '==', correo),
        );
        const users = await getDocs(userQuery);
        const prestadores = await getDocs(prestadorQuery);

        if (users.docs.length > 0) {
          const user = users.docs[0].data() as User;
          setUserState({ ...user, isLoggedIn: true });
          return { role: 'user', data: user };
        } else if (prestadores.docs.length > 0) {
          const prestador = prestadores.docs[0].data() as Prestador;
          setPrestadorState({ ...prestador, isLoggedIn: true });
          return { role: 'prestador', data: prestador };
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
          navigate(`/usuario-dashboard`);
        } else {
          if (data?.role === 'prestador') {
            navigate(`/prestador-dashboard`);
          }
        }
      },
    },
  );

  const { mutate: logout } = useMutation(() => signOut(auth), {
    onSuccess: () => {
      setUserState(null);
      setPrestadorState(null);
      navigate('/ingresar');
    },
  });

  return {
    createUser,
    createUserLoading,
    createPrestador,
    createPrestadorLoading,
    login,
    loginLoading,
    user,
    prestador,
    logout,
    isLoggedIn,
  };
};
