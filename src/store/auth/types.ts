type Actions = {
  login: (email: string, password: string) => void;
  // createUser: (user: User) => void;
  logout: () => void;
  redirectAfterLogin: () => void;
  updateRedirectToAfterLogin: (path: string) => void;
};

export type { Actions };
