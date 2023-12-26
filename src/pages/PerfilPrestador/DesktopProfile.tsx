import { Prestador } from '@/types/Prestador';
import { Box } from '@mui/material';
import { styles } from './styles';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import {
  StyledAvatar,
  StyledBackButton,
  StyledCTAs,
  StyledContactButton,
  StyledHeroBox,
  StyledHeroContent,
  StyledName,
  StyledServicio,
  StyledShortListButton,
} from './PerfilPrestadorStyledComponents';
import useRecibeApoyo from '@/store/recibeApoyo';
import { useEffect, useState } from 'react';
import { Especialidad, Servicio } from '@/types/Servicio';

type DesktopProfileProps = {
  prestador: Prestador;
};

export const DesktopProfile = ({ prestador }: DesktopProfileProps) => {
  const { firstname, lastname, imageUrl, service_id, speciality_id } = prestador;
  const [{ allServicios }] = useRecibeApoyo();
  const [prestadorServicio, setPrestadorServicio] = useState({} as Servicio);
  const [prestadorEspecialidad, setPrestadorEspecialidad] = useState({} as Especialidad);

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
    <>
      <StyledHeroBox>
        <Box sx={styles.topBar}>
          <StyledBackButton
            variant="contained"
            startIcon={<ArrowBackOutlinedIcon />}
            onClick={() => {
              window.history.back();
            }}
          >
            Atras
          </StyledBackButton>
        </Box>
        <StyledHeroContent>
          <Box>
            <StyledAvatar alt={`Imagen de perfil de ${firstname}`} src={imageUrl} />
          </Box>
          <Box>
            <StyledName>
              {firstname} {lastname}
            </StyledName>
            <StyledServicio>
              {prestadorServicio?.service_name} / {prestadorEspecialidad?.especialidad_name}
            </StyledServicio>
            <StyledCTAs>
              <StyledContactButton>Contactar</StyledContactButton>
              <StyledShortListButton startIcon={<BookmarkBorderOutlinedIcon />}>
                Guardar
              </StyledShortListButton>
            </StyledCTAs>
          </Box>
        </StyledHeroContent>
      </StyledHeroBox>
    </>
  );
};
