type Actions = {
  addComuna: (comuna: string) => void;
  removeComuna: (comuna: string) => void;
  increaseStep: () => void;
  selectForWhom: (forWhom: string) => void;
  selectServicio: (servicio: string) => void;
  selectEspecialidad: (especialidad: string) => void;
  decreaseStep: () => void;
  // filterByServicio: (servicio: Service) => void;
  setAvailability: (availability: { id: number; name: string }) => void;
};

export type { Actions };
