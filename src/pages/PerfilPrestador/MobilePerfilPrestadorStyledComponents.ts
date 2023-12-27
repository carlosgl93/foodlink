import { Title } from '@/components/StyledComponents';
import { Avatar, Box, styled } from '@mui/material';

export const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '1rem',
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.background.paper,
}));

export const HeroContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '100%',
  backgroundColor: theme.palette.primary.main,
}));

export const StyledAvatar = styled(Avatar)(() => ({
  width: '8rem',
  height: '8rem',
  margin: '5rem auto',
}));

export const StyledNameContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  fontSize: '2rem',
  fontWeight: 500,
  textAlign: 'center',
  my: '1rem',
}));

export const StyledTitle = styled(Title)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 600,
  lineHeight: '1.5rem',
  textAlign: 'center',
  color: theme.palette.primary.contrastText,
}));
