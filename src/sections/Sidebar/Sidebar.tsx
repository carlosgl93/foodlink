import { Link } from 'react-router-dom';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Button, useTheme } from '@mui/material';
import { Theme } from '@mui/material/styles';

import routes from '@/routes';
import useSidebar from '@/store/sidebar';
import React from 'react';

function Sidebar() {
  const [isSidebarOpen, sidebarActions] = useSidebar();
  const theme = useTheme<Theme>();

  return (
    <SwipeableDrawer
      anchor="left"
      open={isSidebarOpen}
      onClose={sidebarActions.close}
      onOpen={sidebarActions.open}
      disableBackdropTransition={false}
      swipeAreaWidth={30}
    >
      <List sx={{ width: 250, pt: (theme) => `${theme.mixins.toolbar.minHeight}px` }}>
        {Object.values(routes)
          .filter((route) => route.title)
          .map(({ path, title, icon: Icon }) =>
            path === '/ingresar' || path === '/registrarse' || path === '/comenzar' ? null : (
              <React.Fragment key={path}>
                <ListItem sx={{ p: 'auto' }}>
                  <ListItemButton
                    component={Link}
                    to={path as string}
                    onClick={sidebarActions.close}
                  >
                    {Icon && (
                      <ListItemIcon>
                        <Icon />
                      </ListItemIcon>
                    )}

                    <ListItemText
                      sx={{
                        ml: '0.5rem',
                      }}
                    >
                      {title}
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              </React.Fragment>
            ),
          )}
        <ListItem sx={{ mx: 'auto' }}>
          <ListItemButton component={Link} to="/ingresar" onClick={sidebarActions.close}>
            <Button
              variant="contained"
              sx={{
                backgroundColor: theme.palette.secondary.main,
                color: theme.palette.primary.main,
              }}
            >
              Ingresar
            </Button>
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ mx: 'auto' }}>
          <ListItemButton component={Link} to="/ingresar" onClick={sidebarActions.close}>
            <Button variant="outlined">Conviértete en persona de apoyo</Button>
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ mx: 'auto' }}>
          <ListItemButton component={Link} to="/comenzar" onClick={sidebarActions.close}>
            <Button variant="contained">Comenzar</Button>
          </ListItemButton>
        </ListItem>
      </List>
    </SwipeableDrawer>
  );
}

export default Sidebar;
