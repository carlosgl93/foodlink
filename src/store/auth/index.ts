import { atom, useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import type { Actions } from './types';
import { User } from '@/types/User';
import { useEffect } from 'react';

type AuthState = {
  isLoggedIn: boolean;
  user: User | null;
};

const authState = atom<AuthState>({
  key: 'authState',
  default: {
    isLoggedIn: false,
    user: null,
  },
});

const redirectToAfterLoginState = atom<string>({
  key: 'redirectToAfterLoginState',
  default: '/dashboard',
});

function useAuth(): [AuthState, Actions] {
  const [user, setUser] = useRecoilState(authState);
  const [redirectToAfterLogin, setRedirectToAfterLogin] = useRecoilState(redirectToAfterLoginState);
  const navigate = useNavigate();

  function login(user: User) {
    setUser((prev) => ({ ...prev, isLoggedIn: true, user }));
    localStorage.setItem('user', JSON.stringify(user));
  }

  function createUser(user: User) {
    setUser((prev) => ({ ...prev, isLoggedIn: true, user }));
    localStorage.setItem('user', JSON.stringify(user));
  }

  function logout() {
    setUser((prev) => ({ ...prev, isLoggedIn: false, user: null }));
    localStorage.removeItem('user');
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

  return [user, { login, createUser, logout, redirectAfterLogin, updateRedirectToAfterLogin }];
}

export default useAuth;
