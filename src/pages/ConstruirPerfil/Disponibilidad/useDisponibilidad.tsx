import { useState } from 'react';
import { useConstruirPerfil } from '../useConstruirPerfil';

export const useDisponibilidad = () => {
  const [editDisponibilidad, setEditDisponibilidad] = useState(false);
  const { perfil } = useConstruirPerfil();
  const { disponibilidad } = perfil;

  const handleEditDisponibilidad = () => {
    setEditDisponibilidad(!editDisponibilidad);
  };

  return {
    disponibilidad,
    editDisponibilidad,
    handleEditDisponibilidad,
  };
};
