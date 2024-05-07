import routes from '@/routes';
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { routesToExcludeInHeader } from '../Header/routesToExcludeInHeader';

type NotLoggedInDrawerListProps = {
  closeDrawer: () => void;
};

export const NotLoggedInDrawerList = ({ closeDrawer }: NotLoggedInDrawerListProps) => {
  return (
    <List
      sx={{
        width: 250,
        // pt: (theme) => `${theme.mixins.toolbar.minHeight}px`,
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
                <ListItemButton component={Link} to={path as string} onClick={closeDrawer}>
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
        <ListItemButton component={Link} to="/ingresar" onClick={closeDrawer}>
          <Button variant="contained">Ingresar</Button>
        </ListItemButton>
      </ListItem>
      <ListItem sx={{ mx: 'auto' }}>
        <ListItemButton component={Link} to="/comenzar" onClick={closeDrawer}>
          <Button variant="contained">Comenzar</Button>
        </ListItemButton>
      </ListItem>
    </List>
  );
};
