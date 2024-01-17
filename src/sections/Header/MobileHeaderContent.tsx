import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import IconButton from '@mui/material/IconButton';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { FlexBox, HeaderIconImage } from '@/components/styled';
import useSidebar from '@/store/sidebar';
import useAuth from '@/store/auth';
import { ChatTitle } from '@/pages/Chat/StyledChatMensajes';
import { LocationState } from '@/pages/Chat/Chat';

const MobileHeaderContent = () => {
  const location = useLocation();
  const router = useNavigate();
  const [, sidebarActions] = useSidebar();
  const [{ user }] = useAuth();

  if (location.pathname === '/chat') {
    const { prestador } = location.state as LocationState;
    return (
      <FlexBox sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <IconButton
          onClick={() => router(-1)}
          size="large"
          edge="start"
          color="primary"
          aria-label="menu"
          sx={{ mr: 1 }}
        >
          <ArrowBackOutlinedIcon />
        </IconButton>
        <ChatTitle>
          {user!.role === 'prestador'
            ? `${user!.firstname} ${user!.lastname}`
            : `${prestador.firstname} ${prestador!.lastname}`}
        </ChatTitle>
      </FlexBox>
    );
  }

  return (
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
      <Link
        to="/"
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <HeaderIconImage src={`/images/blui-new.png`} alt="Blui logo" />
      </Link>
    </FlexBox>
  );
};

export default MobileHeaderContent;
