import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Box,
  Divider,
} from '@mui/material';
import { Link } from 'react-router-dom';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

import { generalOptionsDrawerList, usuarioDrawerOptions } from './usuarioDrawerOptions';
import { ChevronRightOutlined } from '@mui/icons-material';
import { useAuthNew } from '@/hooks/useAuthNew';
import { User } from '@/store/auth/user';

type UsuarioDrawerListProps = {
  closeDrawer: () => void;
};

export const UsuarioDrawerList = ({ closeDrawer }: UsuarioDrawerListProps) => {
  const { user, logout } = useAuthNew();

  const { companyName, representativeName } = user as User;

  return (
    <List
      component={'nav'}
      sx={{
        width: 250,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <ListItem
        sx={{
          ml: '0.5rem',
        }}
      >
        <Avatar />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            ml: '1rem',
          }}
        >
          <ListItemText>{representativeName}</ListItemText>
          <span
            style={{
              fontSize: '0.85rem',
            }}
          >
            {companyName}
          </span>
        </Box>
      </ListItem>
      <ListItem>
        <ListItemButton
          onClick={() => {
            logout();
            closeDrawer();
          }}
        >
          <ListItemIcon>
            <LogoutOutlinedIcon />
          </ListItemIcon>
          Salir
        </ListItemButton>
      </ListItem>

      <Divider />
      {usuarioDrawerOptions.map(({ path, title, icon: Icon }) => (
        <ListItem sx={{ p: '0 auto' }} key={path}>
          <ListItemButton
            component={Link}
            to={path as string}
            onClick={closeDrawer}
            sx={{ py: '0' }}
          >
            {Icon && (
              <ListItemIcon>
                <Icon />
              </ListItemIcon>
            )}

            <ListItemText>{title}</ListItemText>
          </ListItemButton>
        </ListItem>
      ))}
      <Divider />
      {generalOptionsDrawerList.map((item) => {
        const { title, path } = item;
        return (
          <ListItem key={path}>
            <ListItemButton component={Link} to={path} onClick={closeDrawer} sx={{ py: '0' }}>
              <ListItemText
                sx={{
                  ml: '0.5rem',
                }}
              >
                {title}
              </ListItemText>
              <ChevronRightOutlined />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};
