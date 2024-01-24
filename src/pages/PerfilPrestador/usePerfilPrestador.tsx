import useAuth from '@/store/auth';
import { tablet } from '@/theme/breakpoints';
import { useMediaQuery } from '@mui/material';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useChatMessages } from '../Chat/useChatMessages';
import { usePrestador } from './usePrestador';
import { sendMessage } from '@/api/chat/sendMessage';
import useRecibeApoyo from '@/store/recibeApoyo';
import { notificationState } from '@/store/snackbar';
import { Servicio, Especialidad } from '@/types/Servicio';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import {
  DisponibilidadFromFront,
  getDisponibilidadByPrestadorId,
} from '@/api/disponibilidad/getDisponibilidadByPrestadorId';

export const usePerfilPrestador = () => {
  const { id } = useParams();
  const location = useLocation();
  const prestadorFromLocation = location.state?.prestador;
  const isTablet = useMediaQuery(tablet);
  const [{ user, isLoggedIn }, { updateRedirectToAfterLogin }] = useAuth();

  const prestadorId = Number(id) || prestadorFromLocation?.id;

  const { messages } = useChatMessages({
    userId: user?.id,
    prestadorId: prestadorId,
  });

  const { prestador, loading, error } = usePrestador({ id: prestadorId });
  const [{ allServicios }] = useRecibeApoyo();
  const [notification, setNotification] = useRecoilState(notificationState);
  const [prestadorServicio, setPrestadorServicio] = useState({} as Servicio);
  const [prestadorEspecialidad, setPrestadorEspecialidad] = useState({} as Especialidad);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [disponibilidad, setDisponibilidad] = useState<DisponibilidadFromFront[]>([]);

  const { service_id, speciality_id } = prestador;

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const navigate = useNavigate();

  const handleContact = () => {
    if (isLoggedIn && user) {
      if (messages?.length > 0) {
        navigate('/chat', {
          state: {
            prestador,
            messages,
            sentBy: user.role || 'user',
          },
        });
        return;
      }
      // navigate(`/chat/${id}`);
      handleOpen();
      return;
    }

    updateRedirectToAfterLogin(`/perfil-prestador/${id}`);
    navigate('/ingresar');
    return;
  };

  const handleSendMessage = async () => {
    const res = await sendMessage({
      message,
      prestadorId: prestadorId,
      userId: user!.id as number,
      token: user!.token as string,
      sentBy: user?.role || 'user',
    });

    if (res.status === 'success') {
      setNotification({
        ...notification,
        open: true,
        message: 'Mensaje enviado con exito',
        severity: res.status,
      });
      // handleClose();
      navigate('/chat', {
        state: {
          prestador,
          messages: [
            ...messages,
            {
              created_at: new Date().toISOString(),
              id: Math.floor(Math.random() * 10000),
              message,
              prestador_id: prestador.id,
              sent_by: user?.role || 'user',
              usuario_id: user?.id,
            },
          ],
        },
      });
      return;
    } else {
      setNotification({
        ...notification,
        open: true,
        message: 'Hubo un error, por favor intentalo mas tarde',
        severity: res.status,
      });
      handleClose();
      return;
    }
  };

  useEffect(() => {
    const thisPrestadorServicio = allServicios?.find((s) => s.service_id === service_id);
    if (thisPrestadorServicio) {
      setPrestadorServicio(thisPrestadorServicio);
    }

    const thisPrestadorEspecialidad = thisPrestadorServicio?.especialidades.find(
      (e) => e.especialidad_id === speciality_id,
    ) as Especialidad;

    if (thisPrestadorEspecialidad) {
      setPrestadorEspecialidad(thisPrestadorEspecialidad);
    }
  }, [allServicios, service_id, speciality_id]);

  useEffect(() => {
    getDisponibilidadByPrestadorId(prestadorId).then((res) => {
      setDisponibilidad(res as DisponibilidadFromFront[]);
    });
  }, [prestadorId]);

  return {
    prestador,
    loading,
    error,
    messages,
    isTablet,
    prestadorServicio,
    prestadorEspecialidad,
    open,
    message,
    disponibilidad,
    handleContact,
    handleOpen,
    handleClose,
    handleSendMessage,
    setMessage,
  };
};
