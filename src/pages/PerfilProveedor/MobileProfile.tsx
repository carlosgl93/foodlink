import { StyledText } from '../ConstruirPerfil/StyledConstruirPerfilComponents';
import { usePerfilPrestador } from './usePerfilPrestador';
import { Badge, Box, styled } from '@mui/material';
import PerfilBackButton from './PerfilBackButton';
import {
  AboutDescription,
  AboutTitle,
  HeroContainer,
  StyledTitle,
  Wrapper,
} from './MobilePerfilPrestadorStyledComponents';
import { useAuthNew } from '@/hooks/useAuthNew';
import { useParams } from 'react-router-dom';
import HeroContent from './HeroSection';
import { Proveedor } from '@/types';
import { useChat } from '@/hooks';

export const SectionContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  justifyContent: 'start',
  width: '100%',
  padding: '0.5rem 1rem',
  backgroundColor: theme.palette.background.default,
  margin: '1rem, auto',
}));

export const SectionTitle = styled(StyledTitle)(({ theme }) => ({
  margin: '1rem auto',
  color: theme.palette.primary.main,
  fontSize: '1.5rem',
}));

export const StyledBadge = styled(Badge)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.background.paper,
  borderRadius: '0.5rem',
  padding: '0.5rem 1rem',
  margin: '0.3rem auto',
  fontWeight: 'bold',
  fontSize: '1rem',
  width: 'fit-content',
}));

type MobileProfileProps = {
  proveedor: Proveedor;
};

export const MobileProfile = ({ proveedor }: MobileProfileProps) => {
  const { handleClose, handleContact, open } = usePerfilPrestador(proveedor as Proveedor);

  const { id } = useParams();
  const { user } = useAuthNew();

  const { message, setMessage, messages, messagesLoading, savingMessageLoading } = useChat(
    user?.id ?? '',
    id ?? '',
  );
  const {
    companyName,
    productType,
    imageUrl,
    description,
    email,
    certifications,
    dispatch,
    comunas,
    representativeName,
    paymentMethods,
  } = proveedor;

  const heroContentProps = {
    companyName,
    email,
    imageUrl,
    messagesLoading,
    messages,
    handleContact,
    open,
    handleClose,
    message,
    setMessage,
    savingMessageLoading,
  };

  return (
    <Wrapper>
      <HeroContainer>
        <PerfilBackButton />
        <HeroContent {...heroContentProps} />
      </HeroContainer>
      <SectionContainer>
        <AboutTitle>Sobre {companyName ? companyName : email}</AboutTitle>
        <StyledText>Representante principal: {representativeName}</StyledText>
        <AboutDescription>
          {description ? description : 'Este proveedor aun no agrega una descripción'}
        </AboutDescription>
      </SectionContainer>
      <SectionContainer>
        <SectionTitle>Productos</SectionTitle>
        <Box>
          {productType?.map((p) => (
            <StyledBadge key={p?.id}>{p.name}</StyledBadge>
          ))}
        </Box>
      </SectionContainer>
      <SectionContainer>
        <SectionTitle>Certificaciones</SectionTitle>
        <Box>
          {certifications?.map((c) => (
            <StyledBadge key={c?.id}>{c?.name}</StyledBadge>
          ))}
        </Box>
      </SectionContainer>
      <SectionContainer>
        <SectionTitle>Despacho</SectionTitle>
        <Box>
          {dispatch === 'nacional' ? (
            <StyledText>{companyName} ofrece despacho a nivel nacional</StyledText>
          ) : (
            comunas.map((comuna) => <StyledBadge key={comuna.id}>{comuna.name}</StyledBadge>)
          )}
        </Box>
      </SectionContainer>
      <SectionContainer>
        <SectionTitle>Métodos de pago</SectionTitle>
        <Box>
          {paymentMethods ? (
            paymentMethods?.map((p, i) => <StyledBadge key={i}>{p}</StyledBadge>)
          ) : (
            <StyledText key="else">Este proveedor aun no agrega métodos de pago</StyledText>
          )}
        </Box>
      </SectionContainer>
    </Wrapper>
  );
};
