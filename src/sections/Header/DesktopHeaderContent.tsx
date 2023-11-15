import React from 'react';
import { Link } from 'react-router-dom';

import { FlexBox, HeaderIconImage } from '@/components/styled';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Button, useTheme, Box } from '@mui/material';
import { Theme } from '@mui/material/styles';

import routes from '@/routes';

const DesktopHeaderContent = () => {
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
          <HeaderIconImage src={`/images/blui-new.png`} alt="Blui logo" />
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
            path === '/ingresar' || path === '/registrarse' || path === '/comenzar' ? null : (
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
        <ListItem sx={{ mx: 'auto' }}>
          <Button
            component={Link}
            to="/ingresar"
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
            Ingresar
          </Button>
        </ListItem>
        <ListItem sx={{ mx: 'auto', width: '100%' }}>
          <Button
            component={Link}
            to="/ingresar"
            sx={{
              whiteSpace: 'nowrap',
              width: 'auto',
              textOverflow: 'ellipsis',
            }}
            variant="outlined"
          >
            Conviértete en persona de apoyo
          </Button>
        </ListItem>
        <ListItem sx={{ mx: 'auto' }}>
          <Button
            component={Link}
            to="/comenzar"
            variant="contained"
            sx={{
              '&:hover': {
                backgroundColor: theme.palette.primary.dark,
              },
            }}
          >
            Comenzar
          </Button>
        </ListItem>
      </List>
    </FlexBox>
  );
};

export default DesktopHeaderContent;
