import { Prestador } from '@/types/Prestador';
import {
  HeroContainer,
  StyledAvatar,
  StyledNameContainer,
  StyledTitle,
  Wrapper,
} from './MobilePerfilPrestadorStyledComponents';

type MobileProfileProps = {
  prestador: Prestador;
};

export const MobileProfile = ({ prestador }: MobileProfileProps) => {
  const { firstname, lastname } = prestador;

  return (
    <Wrapper>
      <HeroContainer>
        <StyledAvatar />
        <StyledNameContainer>
          <StyledTitle>
            {firstname} {lastname}
          </StyledTitle>
        </StyledNameContainer>

        {/* TODO: UPDATE PRESTADOR TYPE WITH REVIEWS - FETCH REVIEWS TOO/ADJUST FETCH PRETADOR BY ID QUERY TO INCLUDE NECESARRY INFORMATION FROM OTHER TABLES LIKE REVIEWS */}
      </HeroContainer>
    </Wrapper>
  );
};
