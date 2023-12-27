import { User } from '@/types/User';

type Actions = {
  login: (user: User) => void;
  createUser: (user: User) => void;
  logout: () => void;
  redirectAfterLogin: () => void;
  updateRedirectToAfterLogin: (path: string) => void;
};

export type { Actions };
