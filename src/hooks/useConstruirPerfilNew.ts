import { useNavigate } from 'react-router-dom';
import { useAuthNew } from './useAuthNew';
import { Proveedor } from '@/types';

export const useConstruirPerfilNew = () => {
  const { proveedor } = useAuthNew();
  const navigate = useNavigate();

  if (!proveedor?.companyRut) {
    navigate('/ingresar');
  }
  const settings: Proveedor['settings'] = proveedor!.settings;

  if (!settings) {
    navigate('/ingresar');
  }

  return {
    settings,
  };
};
