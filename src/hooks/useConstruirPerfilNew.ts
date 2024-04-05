import { useNavigate } from 'react-router-dom';
import { useAuthNew } from './useAuthNew';

export const useConstruirPerfilNew = () => {
  const { prestador } = useAuthNew();
  const navigate = useNavigate();

  if (!prestador?.firstname) {
    navigate('/ingresar');
  }
  const settings = prestador ? prestador!.settings : undefined;

  if (!settings) {
    navigate('/ingresar');
  }

  return {
    settings,
  };
};
