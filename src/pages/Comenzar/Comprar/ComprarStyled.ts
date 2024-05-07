import { Box, ListItemButton, styled } from '@mui/material';

export const Wrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  backgroundColor: theme.palette.background.default,
}));

export const StyledListItemButton = styled(ListItemButton)(() => ({
  display: 'grid',
  gridTemplateColumns: '90% 10%',
  alignItems: 'center',
  border: '1px solid',
  borderColor: 'primary.dark',
  borderRadius: '0.25rem',
  padding: '0.5rem 1rem',
}));
