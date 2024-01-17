import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Prestador } from '@/types/Prestador';
import {
  HeroContainer,
  ReviewsContainer,
  StyledAvatar,
  StyledCTAs,
  StyledNameContainer,
  StyledServicio,
  StyledTitle,
  Wrapper,
} from './MobilePerfilPrestadorStyledComponents';
import useAuth from '@/store/auth';
import useRecibeApoyo from '@/store/recibeApoyo';
import { Servicio, Especialidad } from '@/types/Servicio';
import Reviews from '@/components/Reviews';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import {
  StyledContactButton,
  StyledShortListButton,
} from './DesktopPerfilPrestadorStyledComponents';
import { ChatModal } from '@/components/ChatModal';
import { sendMessage } from '@/api/chat/sendMessage';
import { useRecoilState } from 'recoil';
import { notificationState } from '@/store/snackbar';

type MobileProfileProps = {
  prestador: Prestador;
  messages: string[];
};

export const MobileProfile = ({ prestador, messages }: MobileProfileProps) => {
  const {
    id,
    firstname,
    lastname,
    imageUrl,
    service_id,
    speciality_id,
    average_review,
    total_reviews,
  } = prestador;
  const [{ allServicios }] = useRecibeApoyo();
  const [{ isLoggedIn, user }, { updateRedirectToAfterLogin }] = useAuth();
  const [notification, setNotification] = useRecoilState(notificationState);
  const [prestadorServicio, setPrestadorServicio] = useState({} as Servicio);
  const [prestadorEspecialidad, setPrestadorEspecialidad] = useState({} as Especialidad);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

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
      prestadorId: id,
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

  return (
    <Wrapper>
      <HeroContainer>
        <StyledAvatar alt={`Imagen de perfil de ${firstname}`} src={imageUrl} />
        <StyledNameContainer>
          <StyledTitle>
            {firstname} {lastname}
          </StyledTitle>
          <ReviewsContainer>
            <Reviews average={average_review || 0} total_reviews={total_reviews || 0} />
          </ReviewsContainer>
        </StyledNameContainer>

        <StyledServicio>
          {prestadorServicio?.service_name} / {prestadorEspecialidad?.especialidad_name}
        </StyledServicio>
        <StyledCTAs>
          <StyledContactButton onClick={handleContact}>
            {messages?.length > 0 ? 'Ver conversación' : 'Contactar'}
          </StyledContactButton>
          <ChatModal
            open={open}
            handleClose={handleClose}
            message={message}
            setMessage={setMessage}
            handleSendMessage={handleSendMessage}
            messages={messages}
          />
          <StyledShortListButton startIcon={<BookmarkBorderOutlinedIcon />}>
            Guardar
          </StyledShortListButton>
        </StyledCTAs>
      </HeroContainer>
    </Wrapper>
  );
};
