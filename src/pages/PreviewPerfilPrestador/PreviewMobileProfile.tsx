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
import {
  AboutContainer,
  AboutDescription,
  AboutTitle,
} from '../PerfilPrestador/MobilePerfilPrestadorStyledComponents';
import { ListAvailableDays } from '../PerfilPrestador/ListAvailableDays';
import { Prestador } from '@/types';
import { Tarifas } from './Tarifas';
import { Box, styled } from '@mui/material';
import PerfilBackButton from './PerfilBackButton';

const SectionContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'start',
  width: '100%',
  padding: '0 1rem',
}));

const SectionTitle = styled(StyledTitle)(({ theme }) => ({
  color: theme.palette.secondary.dark,
  fontSize: '1.5rem',
}));

export const PreviewMobileProfile = () => {
  const { prestador, prestadorServicio, prestadorEspecialidad, handleEditPerfil, disponibilidad } =
    usePreviewPerfilPrestador();

  const { firstname, lastname, imageUrl, average_review, total_reviews, description } =
    prestador as Prestador;

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
          <StyledContactButton onClick={handleEditPerfil}>Editar perfil</StyledContactButton>
        </StyledCTAs>
      </HeroContainer>
      <AboutContainer>
        <AboutTitle>Sobre {firstname}</AboutTitle>
        <AboutDescription>{description}</AboutDescription>
      </AboutContainer>

      <SectionContainer>
        <SectionTitle>Disponibilidad</SectionTitle>
      </SectionContainer>
      <ListAvailableDays disponibilidad={disponibilidad} />
      <SectionContainer>
        <SectionTitle>Tarifas</SectionTitle>
        <Tarifas />
      </SectionContainer>
    </Wrapper>
  );
};
