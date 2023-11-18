import { Box, Button, Container, Typography, styled } from '@mui/material';

export const Section = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(4),
  backgroundColor: '#f9f7f6',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export const TextContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  gap: '3rem',
  [theme.breakpoints.down('sm')]: {
    paddingBottom: theme.spacing(4),
  },
}));

export const Text = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.dark,
  fontSize: '1rem',
  fontWeight: 400,
  textAlign: 'justify',
  textRendering: 'optimizeLegibility',
}));

export const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 'bold',
  fontSize: '3rem',
  color: theme.palette.primary.dark,
}));

export const AvatarContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(2),
  paddingBottom: '3rem',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
  flexWrap: 'wrap',
  '& > *': {
    flex: '1 1 50%', // Minimum 2 avatars per row on xs and sm screens
    [theme.breakpoints.up('sm')]: {
      flex: '1 1 33%', // 3 avatars per row on md screens
    },
    [theme.breakpoints.up('md')]: {
      flex: '1 1 25%', // 3 avatars per row on md screens
    },
    [theme.breakpoints.up('lg')]: {
      flex: '1 1 17.5%', // 4 avatars per row on lg screens
    },
  },
}));

export const PersonContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.common.white,
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
}));
