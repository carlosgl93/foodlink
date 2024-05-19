import { redirectToAfterLoginState } from '@/store/auth';
import { tablet } from '@/theme/breakpoints';
import { useMediaQuery } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Proveedor } from '@/types';
import { useSetRecoilState } from 'recoil';
import { notificationState } from '@/store/snackbar';
import { useAuthNew } from '@/hooks/useAuthNew';
import { useChat, useNavigationHistory } from '@/hooks';
import { interactedProveedorState } from '@/store/resultados/interactedProveedor';

export const usePerfilPrestador = (proveedor: Proveedor) => {
  const setRedirectToAfterLogin = useSetRecoilState(redirectToAfterLoginState);
  const setInteractedProveedor = useSetRecoilState(interactedProveedorState);
  const { user } = useAuthNew();
  const { messages, messagesLoading } = useChat(user?.id ?? '', proveedor.id);
  const setNotification = useSetRecoilState(notificationState);
  const [message, setMessage] = useState('');
  const [open, setOpen] = useState(false);
  const isTablet = useMediaQuery(tablet);
  const history = useNavigationHistory();
  const providerId = proveedor.id;
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fromRecibeApoyo =
    history.filter((h) => !h.includes('/registrar-usuario') && h.includes('/comenzar/comprar'))
      .length > 0;

  const handleContact = () => {
    if (user?.id.length) {
      if ((messages.messages ?? []).length > 0) {
        navigate('/chat', {
          state: {
            prestador: proveedor,
            messages,
            sentBy: user.role || 'user',
          },
        });
        return;
      }
      handleOpen();
      return;
    }

    setRedirectToAfterLogin(`/perfil-proveedor/${providerId}`);
    setNotification({
      open: true,
      message: 'Debes iniciar sesión para poder contactar a un proveedor',
      severity: 'info',
    });
    if (fromRecibeApoyo) {
      navigate('/registrar-usuario');
    } else {
      navigate('/ingresar');
    }
    return;
  };

  useEffect(() => {
    setInteractedProveedor(proveedor);
  }, []);

  return {
    prestador: proveedor,
    messages,
    isTablet,
    open,
    message,
    messagesLoading,
    handleContact,
    handleOpen,
    handleClose,
    setMessage,
  };
};
