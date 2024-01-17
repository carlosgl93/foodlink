import { Box, Typography, styled } from '@mui/material';

export const ChatContainer = styled(Box)(() => ({
  minHeight: '72.5vh',
  paddingTop: '5vh',
}));

export const ChatTitleContainer = styled(Box)(() => ({}));

export const ChatTitle = styled(Typography)(({ theme }) => ({
  fontSize: '2rem',
  fontWeight: 'bolder',
  color: theme.palette.primary.main,
}));

export const StyledPrestadorMensajeContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  gap: '1rem',
  marginBottom: '0.5rem',
  maxWidth: '50vw',
}));

export const StyledPrestadorMensajeText = styled(Typography)(() => ({
  fontSize: '1.5rem',
  fontWeight: 'bold',
  backgroundColor: 'black',
  color: 'white',
}));

export const StyledUsuarioMensajeContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'end',
  gap: '1rem',
  marginBottom: '0.5rem',
  maxWidth: '50vw',
  marginLeft: '47.5vw',
}));

export const StyledUsuarioMensajeText = styled(Typography)(({ theme }) => ({
  fontSize: '1rem',
  fontWeight: 'bold',
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  padding: '1rem',
  borderRadius: '1rem',
}));
