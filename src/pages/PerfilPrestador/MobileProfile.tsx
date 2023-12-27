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

type MobileProfileProps = {
  prestador: Prestador;
};

export const MobileProfile = ({ prestador }: MobileProfileProps) => {
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
  const [prestadorServicio, setPrestadorServicio] = useState({} as Servicio);
  const [prestadorEspecialidad, setPrestadorEspecialidad] = useState({} as Especialidad);
  const navigate = useNavigate();

  const handleContact = () => {
    if (isLoggedIn && user) {
      navigate(`/chat/${id}`);
      return;
    }

    updateRedirectToAfterLogin(`/perfil-prestador/${id}`);
    navigate('/ingresar');
    return;
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
          <StyledContactButton onClick={handleContact}>Contactar</StyledContactButton>
          <StyledShortListButton startIcon={<BookmarkBorderOutlinedIcon />}>
            Guardar
          </StyledShortListButton>
        </StyledCTAs>

        {/* TODO: UPDATE PRESTADOR TYPE WITH REVIEWS - FETCH REVIEWS TOO/ADJUST FETCH PRETADOR BY ID QUERY TO INCLUDE NECESARRY INFORMATION FROM OTHER TABLES LIKE REVIEWS */}
      </HeroContainer>
    </Wrapper>
  );
};
