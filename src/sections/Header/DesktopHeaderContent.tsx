import { Link } from 'react-router-dom';

import { FlexBox } from '@/components/styled';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Button, useTheme, Box } from '@mui/material';
import { Theme } from '@mui/material/styles';

import routes from '@/routes';
import { routesToExcludeInHeader } from './routesToExcludeInHeader';
import useAuth from '@/store/auth';

const DesktopHeaderContent = () => {
  const [user, { logout }] = useAuth();

  const theme = useTheme<Theme>();
  return (
    <FlexBox sx={{ alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
      <Box
        sx={{
          width: '30vw',
        }}
      >
        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
          }}
        >
          {/* <HeaderIconImage src={`/images/blui-new.png`} alt="Blui logo" /> */}
          <p>TODO: LOGO</p>
        </Link>
      </Box>

      <List
        sx={{
          display: 'flex',
          flexDirection: 'row',
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
                <ListItem>
                  <ListItemButton component={Link} to={path as string}>
                    {Icon && (
                      <ListItemIcon>
                        <Icon />
                      </ListItemIcon>
                    )}

                    <ListItemText>{title}</ListItemText>
                  </ListItemButton>
                </ListItem>
              </div>
            ),
          )}

        {user.isLoggedIn ? (
          <>
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
          </>
        ) : (
          <>
            <ListItem sx={{ mx: 'auto' }}>
              <Button component={Link} to="/ingresar" variant="contained">
                Ingresar
              </Button>
            </ListItem>
            <ListItem sx={{ mx: 'auto' }}>
              <Button component={Link} to="/comienzo" variant="contained">
                Comenzar
              </Button>
            </ListItem>
          </>
        )}
      </List>
    </FlexBox>
  );
};

export default DesktopHeaderContent;
