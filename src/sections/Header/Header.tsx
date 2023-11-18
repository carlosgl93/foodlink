import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import { useMediaQuery } from '@mui/material';
import { tablet } from '../../theme/breakpoints';
import MobileHeaderContent from './MobileHeaderContent';
import DesktopHeaderContent from './DesktopHeaderContent';

function Header() {
  const isTablet = useMediaQuery(tablet);

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
    <Box>
      <AppBar
        color="transparent"
        elevation={1}
        position="static"
        sx={{
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          {isTablet ? <MobileHeaderContent /> : <DesktopHeaderContent />}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
