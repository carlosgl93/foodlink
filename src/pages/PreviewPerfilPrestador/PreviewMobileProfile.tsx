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

import Reviews from '@/components/Reviews';
import { StyledContactButton } from './DesktopPerfilPrestadorStyledComponents';

import { usePreviewPerfilPrestador } from './usePreviewPerfilPrestador';
import Loading from '@/components/Loading';
import {
  AboutContainer,
  AboutDescription,
  AboutTitle,
} from '../PerfilPrestador/MobilePerfilPrestadorStyledComponents';
import { ListAvailableDays } from '../PerfilPrestador/ListAvailableDays';

export const PreviewMobileProfile = () => {
  const {
    prestador,
    loading,
    error,
    prestadorServicio,
    prestadorEspecialidad,
    handleEditPerfil,
    disponibilidad,
  } = usePreviewPerfilPrestador();

  const { firstname, lastname, imageUrl, average_review, total_reviews, description } = prestador;

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
            <StyledContactButton onClick={handleEditPerfil}>Editar perfil</StyledContactButton>
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
