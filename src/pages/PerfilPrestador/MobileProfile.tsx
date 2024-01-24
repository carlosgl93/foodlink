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
import Loading from '@/components/Loading';
import { ListAvailableDays } from './ListAvailableDays';

export const MobileProfile = () => {
  const {
    prestador,
    messages,
    loading,
    error,
    handleClose,
    handleContact,
    handleSendMessage,
    open,
    message,
    setMessage,
    prestadorServicio,
    prestadorEspecialidad,
    disponibilidad,
  } = usePerfilPrestador();

  const { firstname, lastname, imageUrl, average_review, total_reviews, description } = prestador;

  console.log('disponibilidad from perfil', disponibilidad);

  if (loading) {
    return <Loading />;
  } else if (error) {
    return <p>Hubo un error</p>;
  } else {
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
        <AboutContainer>
          <AboutTitle>Sobre {firstname}</AboutTitle>
          <AboutDescription>{description}</AboutDescription>
        </AboutContainer>
        <ListAvailableDays disponibilidad={disponibilidad} />
      </Wrapper>
    );
  }
};
