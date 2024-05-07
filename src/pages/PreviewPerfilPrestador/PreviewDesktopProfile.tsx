// import { Box } from '@mui/material';
// import { styles } from './styles';
// import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
// import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
// import {
//   ProfileGrid,
//   StyledAbout,
//   StyledAvatar,
//   StyledBackButton,
//   StyledCTAs,
//   StyledContactButton,
//   StyledHeroBox,
//   StyledHeroContent,
//   StyledName,
//   StyledServicio,
//   StyledShortListButton,
// } from './DesktopPerfilPrestadorStyledComponents';
// import useRecibeApoyo from '@/store/recibeApoyo';
// import { useEffect, useState } from 'react';
// import { Especialidad, Servicio } from '@/types/Servicio';
// import { Text, Title } from '@/components/StyledComponents';
// import Reviews from '@/components/Reviews';
// import { useNavigate } from 'react-router-dom';
// import useAuth from '@/store/auth';

// import { Prestador } from '@/types';

export const PreviewDesktopProfile = () => {
  return <></>;
};
//   const [{ isLoggedIn, user }, { updateRedirectToAfterLogin }] = useAuth();

//   const {
//     id,
//     firstname,
//     lastname,
//     imageUrl,
//     service_id,
//     speciality_id,
//     average_review,
//     total_reviews,
//     description,
//   } = user as Prestador;

//   const [{ allServicios }] = useRecibeApoyo();
//   const [prestadorServicio, setPrestadorServicio] = useState({} as Servicio);
//   const [prestadorEspecialidad, setPrestadorEspecialidad] = useState({} as Especialidad);
//   const navigate = useNavigate();

//   const handleContact = () => {
//     console.log(isLoggedIn, user);
//     if (isLoggedIn && user) {
//       navigate(`/chat/${id}`);
//       return;
//     }

//     updateRedirectToAfterLogin(`/perfil-prestador/${id}`);
//     navigate('/registrar-usuario');
//     return;
//   };

//   useEffect(() => {
//     const thisPrestadorServicio = allServicios?.find((s) => s.id === service_id);
//     if (thisPrestadorServicio) {
//       setPrestadorServicio(thisPrestadorServicio);
//     }

//     const thisPrestadorEspecialidad = thisPrestadorServicio?.especialidades.find(
//       (e) => e.id === speciality_id,
//     ) as Especialidad;

//     if (thisPrestadorEspecialidad) {
//       setPrestadorEspecialidad(thisPrestadorEspecialidad);
//     }
//   }, [allServicios, service_id, speciality_id]);

//   return (
//     <>
//       <StyledHeroBox>
//         <Box sx={styles.topBar}>
//           <StyledBackButton
//             variant="contained"
//             startIcon={<ArrowBackOutlinedIcon />}
//             onClick={() => {
//               window.history.back();
//             }}
//           >
//             Atras
//           </StyledBackButton>
//         </Box>
//         <StyledHeroContent>
//           <Box>
//             <StyledAvatar alt={`Imagen de perfil de ${firstname}`} src={imageUrl} />
//           </Box>
//           <Box>
//             <StyledName>
//               {firstname} {lastname}
//             </StyledName>
//             <Reviews average={average_review || 0} total_reviews={total_reviews || 0} />

//             <StyledServicio>
//               {prestadorServicio?.serviceName} / {prestadorEspecialidad?.especialidadName}
//             </StyledServicio>
//             <StyledCTAs>
//               <StyledContactButton onClick={handleContact}>Contactar</StyledContactButton>
//               <StyledShortListButton startIcon={<BookmarkBorderOutlinedIcon />}>
//                 Guardar
//               </StyledShortListButton>
//             </StyledCTAs>
//           </Box>
//         </StyledHeroContent>
//       </StyledHeroBox>
//       <StyledAbout>
//         <Box
//           sx={{
//             px: '10%',
//             alignItems: 'start',
//           }}
//         >
//           <Title
//             align="left"
//             sx={{
//               fontSize: '1.3rem',
//             }}
//           >
//             Acerca de {firstname} {lastname && lastname[0]?.toUpperCase() + '.'}
//           </Title>
//         </Box>
//         <Box>
//           <Text
//             sx={{
//               px: '10%',
//               fontSize: '1rem',
//               alignItems: 'start',
//               fontWeight: '600',
//             }}
//           >
//             {description}
//           </Text>
//         </Box>
//       </StyledAbout>
//       <ProfileGrid>
//         {/* top left availability */}
//         {/* Blui Verified */}
//         <Box>Blui Verified</Box>
//         {/* top right services offered */}
//         <Box>Services Offered</Box>
//         {/* left below availability: Indicative rates */}
//         <Box>
//           <Box>Availability</Box>
//           <Box>Indicative rates</Box>
//         </Box>
//         {/* right below services offered: Badges */}
//         <Box>Badges</Box>
//         {/* Inmunizacion */}
//         <Box>
//           <Text>Inmunizacion</Text>
//         </Box>
//         <Box>Experiencia</Box>
//         <Box>Ubicaciones de trabajo</Box>
//         <Box>More Information</Box>

//         <Box>Reviews</Box>
//       </ProfileGrid>
//     </>
//   );
// };
