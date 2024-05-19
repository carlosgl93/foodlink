import { Title } from '@/components/StyledComponents';
import { Box, Button, styled } from '@mui/material';

export const Wrapper = styled(Box)(() => ({
  padding: '1rem',
  minHeight: '80vh',
}));

export const Container = styled(Box)(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
  justifyContent: 'center',
  padding: '1rem',
  marginBottom: '1rem',
  backgroundColor: 'white',
  boxSizing: 'border-box',
  borderRadius: '.5rem',
}));

export const StyledTitle = styled(Title)(({ theme }) => ({
  fontSize: '1.75rem',
  fontWeight: 'bold',
  marginBottom: '0.5rem',
  color: theme.palette.primary.main,
  textAlign: 'start',
}));

export const SubTitle = styled(Title)(() => ({
  fontSize: '1.175rem',
  fontWeight: 'bold',
  marginBottom: '1rem',
  color: '#414042',
}));

export const StyledList = styled('ul')(() => ({
  paddingRight: '1rem',
}));

export const StyledButton = styled(Button)(() => ({
  fontSize: '1rem',
  fontWeight: 'bold',
  color: 'white',
  margin: '1rem 0',
}));
