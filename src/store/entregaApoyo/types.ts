type Actions = {
  addComuna: (comuna: string) => void;
  removeComuna: (comuna: string) => void;
  increaseStep: () => void;
  selectServicio: (servicio: string) => void;
  selectEspecialidad: (especialidad: string) => void;
  decreaseStep: () => void;
};

export type { Actions };
