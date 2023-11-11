import ThemeIcon from '@mui/icons-material/InvertColors';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';

import { FlexBox, HeaderIconImage } from '@/components/styled';
import useSidebar from '@/store/sidebar';
import useTheme from '@/store/theme';

import { Link } from 'react-router-dom';

function Header() {
  const [, sidebarActions] = useSidebar();
  const [, themeActions] = useTheme();

  // function showNotification() {
  //   notificationsActions.push({
  //     options: {
  //       // Show fully customized notification
  //       // Usually, to show a notification, you'll use something like this:
  //       // notificationsActions.push({ message: ... })
  //       // `message` accepts string as well as ReactNode
  //       // But you also can use:
  //       // notificationsActions.push({ options: { content: ... } })
  //       // to show fully customized notification
  //       content: (
  //         <Alert severity="info">
  //           <AlertTitle>Notification demo (random IT jokes :))</AlertTitle>
  //           {getRandomJoke()}
  //         </Alert>
  //       ),
  //     },
  //   });
  // }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="transparent" elevation={1} position="static">
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <FlexBox sx={{ alignItems: 'center' }}>
            <IconButton
              onClick={sidebarActions.toggle}
              size="large"
              edge="start"
              color="primary"
              aria-label="menu"
              sx={{ mr: 1 }}
            >
              <MenuIcon />
            </IconButton>
            {/* TODO: change Blui title for the icon */}
            <Link
              to="/"
              style={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <HeaderIconImage
                src={`${import.meta.env.VITE_PUBLIC_URL}/blui-new.png`}
                alt="Blui logo"
              />
            </Link>
          </FlexBox>

          <Tooltip title="Switch theme" arrow>
            <IconButton color="primary" edge="end" size="large" onClick={themeActions.toggle}>
              <ThemeIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
