import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import IconButton from '@mui/material/IconButton';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import { FlexBox, HeaderIconImage } from '@/components/styled';
import useSidebar from '@/store/sidebar';
import useAuth from '@/store/auth';
import { ChatTitle } from '@/pages/Chat/StyledChatMensajes';
import { useCustomer } from '@/hooks/useCustomer';

const MobileHeaderContent = () => {
  const router = useNavigate();
  const [, sidebarActions] = useSidebar();
  const [{ user }] = useAuth();
  const location = useLocation();

  const prestador = location.state?.prestador;

  const userId = location.state?.userId || user?.id;

  const { customer } = useCustomer(userId);

  if (location.pathname === '/chat' || location.pathname === '/prestador-chat') {
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
          {user?.role === 'prestador'
            ? `${customer?.firstname} ${customer?.lastname}`
            : `${prestador?.firstname || location.state.prestadorName} ${
                prestador?.lastname || location.state.prestadorLastname
              }`}
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
