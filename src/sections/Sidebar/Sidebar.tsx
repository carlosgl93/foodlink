import React from 'react';
import { Link } from 'react-router-dom';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Drawer from '@mui/material/Drawer';
import { Button, useTheme } from '@mui/material';
import { Theme } from '@mui/material/styles';

import routes from '@/routes';
import useSidebar from '@/store/sidebar';
import { routesToExcludeInHeader } from '../Header/routesToExcludeInHeader';

function Sidebar() {
  const [isSidebarOpen, sidebarActions] = useSidebar();
  const theme = useTheme<Theme>();

  return (
    <Drawer anchor="left" open={isSidebarOpen} onClose={sidebarActions.close}>
      <List
        sx={{
          width: 300,
          pt: (theme) => `${theme.mixins.toolbar.minHeight}px`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        {Object.values(routes)
          .filter((route) => route.title)
          .map(({ path, title, icon: Icon }) =>
            routesToExcludeInHeader.includes(path) ? null : (
              <div
                key={path}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
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
              </div>
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
          <ListItemButton component={Link} to="/persona-de-apoyo" onClick={sidebarActions.close}>
            <Button variant="outlined">Conviértete en persona de apoyo</Button>
          </ListItemButton>
        </ListItem>
        <ListItem sx={{ mx: 'auto' }}>
          <ListItemButton component={Link} to="/comienzo" onClick={sidebarActions.close}>
            <Button variant="contained">Comenzar</Button>
          </ListItemButton>
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
