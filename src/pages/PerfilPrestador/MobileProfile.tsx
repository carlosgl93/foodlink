import {
  AboutContainer,
  AboutDescription,
  AboutTitle,
  HeroContainer,
  ReviewsContainer,
  StyledAvatar,
  StyledCTAs,
  StyledNameContainer,
  StyledServicio,
  StyledTitle,
  Wrapper,
} from './MobilePerfilPrestadorStyledComponents';

import Reviews from '@/components/Reviews';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import {
  StyledContactButton,
  StyledShortListButton,
} from './DesktopPerfilPrestadorStyledComponents';
import { ChatModal } from '@/components/ChatModal';

import { usePerfilPrestador } from './usePerfilPrestador';
import { ListAvailableDays } from './ListAvailableDays';
import PerfilBackButton from './PerfilBackButton';
import { Prestador } from '@/types';

type MobileProfileProps = {
  prestador: Prestador;
};

export const MobileProfile = ({ prestador }: MobileProfileProps) => {
  const {
    messages,
    handleClose,
    handleContact,
    handleSendMessage,
    open,
    message,
    setMessage,
    prestadorServicio,
    prestadorEspecialidad,
    disponibilidad,
  } = usePerfilPrestador(prestador);

  const { firstname, lastname, imageUrl, average_review, total_reviews, description } = prestador;

  return (
    <Wrapper>
      <HeroContainer>
        <PerfilBackButton />

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
      <AboutContainer>
        <AboutTitle>Sobre {firstname}</AboutTitle>
        <AboutDescription>{description}</AboutDescription>
      </AboutContainer>
      <ListAvailableDays disponibilidad={disponibilidad} />
    </Wrapper>
  );
};
