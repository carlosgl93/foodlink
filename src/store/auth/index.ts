import { atom, useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import type { Actions } from './types';
import { User } from '@/types/User';
import { useEffect } from 'react';
import api from '@/api/api';
import { AxiosError } from 'axios';
import { notificationState } from '../snackbar';
import { Prestador } from '@/types/Prestador';
import { postPrestador } from '@/api/prestadores/postPrestador';

type AuthState = {
  isLoggedIn: boolean;
  user: User | null | Partial<Prestador>;
  role: 'user' | 'prestador' | null;
  loading: boolean;
  error: string | null;
};

const authState = atom<AuthState>({
  key: 'authState',
  default: {
    role: null,
    isLoggedIn: false,
    user: null,
    loading: false,
    error: null,
  },
});

const redirectToAfterLoginState = atom<string>({
  key: 'redirectToAfterLoginState',
  default: '/',
});

function useAuth(): [AuthState, Actions] {
  const [, setNotification] = useRecoilState(notificationState);
  const [user, setUser] = useRecoilState(authState);
  const [redirectToAfterLogin, setRedirectToAfterLogin] = useRecoilState(redirectToAfterLoginState);
  const navigate = useNavigate();

  async function login(email: string, password: string) {
    try {
      setUser((prev) => ({ ...prev, loading: true }));
      const loginUser = await api.post(`/users/login`, {
        email,
        password,
      });
      setUser((prev) => ({ ...prev, isLoggedIn: true, loginUser }));
      localStorage.setItem('user', JSON.stringify(user));
      setUser((prev) => ({ ...prev, loading: false }));
      redirectAfterLogin();
      setNotification({
        open: true,
        message: 'Sesión iniciada con éxito',
        severity: 'success',
      });
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        console.log(error.message);
        switch (error.message) {
          case 'Request failed with status code 401':
            setUser((prev) => ({
              ...prev,
              loading: false,
              error: 'Email o contraseña incorrecto',
            }));
            return {
              error,
              message: 'Email o contraseña incorrectos',
            };
          default:
            return error;
        }
      }
    }
  }

  async function createUser(user: User) {
    setUser((prev) => ({ ...prev, loading: true, role: 'user' }));
    try {
      await api.post('/users', user);
      setUser((prev) => ({ ...prev, isLoggedIn: true, user }));
      localStorage.setItem('user', JSON.stringify(user));
      redirectAfterLogin();
      setNotification({
        open: true,
        message: 'Cuenta creada con exito, no olvides confirmar tu email',
        severity: 'success',
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log('ERRRORORORROROR', error);
        console.log(error.message);
        switch (error?.response?.data.message) {
          case 'Este email ya esta asociado a una cuenta.':
            setUser((prev) => ({
              ...prev,
              loading: false,
              error: 'Este email ya esta asociado a una cuenta',
            }));
            return {
              error,
              message: 'Email ya esta asociado a una cuenta',
            };
          case 'Este rut ya esta asociado a una cuenta.':
            setUser((prev) => ({
              ...prev,
              loading: false,
              error: 'Este rut ya esta asociado a una cuenta',
            }));
            return {
              error,
              message: 'Rut ya esta asociado a una cuenta',
            };
          case "The 'password' field is required":
            setUser((prev) => ({
              ...prev,
              loading: false,
              error: 'El campo contraseña es requerido',
            }));
            return {
              error,
              message: 'El campo contraseña es requerido',
            };
          // default:
          //   setUser((prev) => ({
          //     ...prev,
          //     loading: false,
          //     error: 'Ocurrio un error al crear el usuario',
          //   }));
          //   return {
          //     error,
          //     message: 'Ocurrio un error al crear el usuario',
          //   };
        }
      }
    }
    setUser((prev) => ({ ...prev, loading: false }));
  }

  async function createPrestador(prestador: Partial<Prestador>) {
    console.log('creating prestador with useAuth', prestador);
    try {
      const res = await postPrestador(prestador);
      console.log(res, 'response from postPrestador');
      if (res.message !== 'Error al crear prestador') {
        console.log('response after creating prestador', res);
        setUser((prev) => ({ ...prev, isLoggedIn: true, user: prestador, role: 'prestador' }));
        localStorage.setItem('user', JSON.stringify(prestador));
        setNotification({
          open: true,
          message: 'Cuenta creada con exito, no olvides confirmar tu email',
          severity: 'success',
        });
        navigate(`/perfil-prestador/${res?.prestador?.id}`);
      } else {
        setNotification({
          open: true,
          message: 'Ocurrio un error al crear el prestador',
          severity: 'error',
        });
      }
    } catch (error) {
      console.log(error);
      if (error instanceof Error) {
        setNotification({
          open: true,
          message: error.message,
          severity: 'error',
        });
      }
    }
  }

  function logout() {
    setUser((prev) => ({ ...prev, isLoggedIn: false, user: null }));
    localStorage.removeItem('user');
    // TODO: RESET ALL STATE
    navigate('/');
  }

  function redirectAfterLogin() {
    navigate(redirectToAfterLogin);
  }
  function updateRedirectToAfterLogin(path: string) {
    setRedirectToAfterLogin(path);
  }

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUser((prev) => ({ ...prev, isLoggedIn: true, user }));
    }
  }, [setUser]);

  useEffect(() => {
    const cleanErrorMessage = setTimeout(() => {
      setUser((prev) => ({ ...prev, error: null }));
    }, 5000);

    return () => {
      clearTimeout(cleanErrorMessage);
    };
  }, [user.error, setUser]);

  return [
    user,
    { login, createUser, logout, redirectAfterLogin, updateRedirectToAfterLogin, createPrestador },
  ];
}

export default useAuth;
