import routes from '@/routes';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Button,
  useTheme,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { routesToExcludeInHeader } from '../Header/routesToExcludeInHeader';

type UsuarioDrawerListProps = {
  closeDrawer: () => void;
  logout: () => void;
};

export const UsuarioDrawerList = ({ closeDrawer, logout }: UsuarioDrawerListProps) => {
  const theme = useTheme();

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
        <Button
          component={Link}
          to="/perfil-usuario"
          variant="contained"
          sx={{
            backgroundColor: theme.palette.secondary.main,
            color: theme.palette.primary.main,
            '&:hover': {
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.secondary.main,
            },
          }}
        >
          Perfil
        </Button>
      </ListItem>
      <ListItem sx={{ mx: 'auto' }}>
        <Button
          onClick={() => logout()}
          variant="contained"
          sx={{
            '&:hover': {
              backgroundColor: theme.palette.primary.dark,
            },
          }}
        >
          Salir
        </Button>
      </ListItem>
    </List>
  );
};
