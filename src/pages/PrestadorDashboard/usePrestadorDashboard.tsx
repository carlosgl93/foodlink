import { useNavigate } from 'react-router-dom';

export const usePrestadorDashboard = () => {
  const router = useNavigate();

  const handleConstruirPerfil = () => {
    router('/construir-perfil');
  };

  return {
    handleConstruirPerfil,
  };
};
