// import {
//   HeroContainer,
//   ReviewsContainer,
//   StyledAvatar,
//   StyledCTAs,
//   StyledNameContainer,
//   StyledServicio,
//   StyledTitle,
//   Wrapper,
// } from './MobilePerfilPrestadorStyledComponents';

// import Reviews from '@/components/Reviews';
// import {
//   AboutContainer,
//   AboutDescription,
//   AboutTitle,
// } from '../PerfilProveedor/MobilePerfilPrestadorStyledComponents';
// import { ListAvailableDays } from '../PerfilProveedor/ListAvailableDays';
// import { Box, styled } from '@mui/material';
// import PerfilBackButton from './PerfilBackButton';
// import { useAuthNew } from '@/hooks/useAuthNew';
// import { Proveedor } from '@/types';
// import { Tarifas } from '../PerfilProveedor/Tarifas';

// const SectionContainer = styled(Box)(() => ({
//   display: 'flex',
//   flexDirection: 'column',
//   alignItems: 'flex-start',
//   justifyContent: 'start',
//   width: '100%',
//   padding: '0 1rem',
// }));

// const SectionTitle = styled(StyledTitle)(({ theme }) => ({
//   color: theme.palette.secondary.dark,
//   fontSize: '1.5rem',
// }));

export const PreviewMobileProfile = () => {
  return <> </>;
};
//   // const { prestadorServicio, prestadorEspecialidad, handleEditPerfil, disponibilidad } =
//   //   usePreviewPerfilPrestador();
//   const { prestador } = useAuthNew();

//   const {
//     firstname,
//     imageUrl,
//     description,
//     averageReviews,
//     totalReviews,
//     availability,
//     servicio,
//     especialidad,
//     email,
//     tarifas,
//     offersFreeMeetAndGreet,
//   } = prestador as Proveedor;

//   return (
//     <Wrapper>
//       <HeroContainer>
//         <PerfilBackButton />
//         <StyledAvatar alt={`Imagen de perfil de ${firstname}`} src={imageUrl} />
//         <StyledNameContainer>
//           <StyledTitle>{firstname ? firstname : ''}</StyledTitle>
//           <ReviewsContainer>
//             <Reviews average={averageReviews || 0} total_reviews={totalReviews || 0} />
//           </ReviewsContainer>
//         </StyledNameContainer>

//         <StyledServicio>
//           {servicio} {especialidad && `/ ${especialidad}`}
//         </StyledServicio>
//         <StyledCTAs>
//           {/* <StyledContactButton onClick={handleEditPerfil}>Editar perfil</StyledContactButton> */}
//         </StyledCTAs>
//       </HeroContainer>
//       <AboutContainer>
//         <AboutTitle>Sobre {firstname ? firstname : email}</AboutTitle>
//         <AboutDescription>
//           {description ? description : 'Este prestador aun no agrega información'}
//         </AboutDescription>
//       </AboutContainer>

//       <SectionContainer>
//         <SectionTitle>Disponibilidad</SectionTitle>
//         <ListAvailableDays disponibilidad={availability ?? []} />
//       </SectionContainer>
//       <SectionContainer>
//         <SectionTitle>Tarifas</SectionTitle>
//         <Tarifas tarifas={tarifas} freeMeetGreet={offersFreeMeetAndGreet} />
//       </SectionContainer>
//     </Wrapper>
//   );
// };
