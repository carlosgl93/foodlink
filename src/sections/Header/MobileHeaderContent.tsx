import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import IconButton from '@mui/material/IconButton';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';

import { FlexBox, HeaderIconImage } from '@/components/styled';
import useSidebar from '@/store/sidebar';
import useAuth from '@/store/auth';
import { ChatTitle } from '@/pages/Chat/StyledChatMensajes';
import { usePrestador } from '@/pages/PerfilPrestador/usePrestador';
import Loading from '@/components/Loading';

const MobileHeaderContent = () => {
  const router = useNavigate();
  const [, sidebarActions] = useSidebar();
  const [{ user }] = useAuth();
  const location = useLocation();
  const prestadorFromLocation = location.state?.prestador;
  const [params] = useSearchParams();
  const prestadorId = Number(params.get('prestadorId'));
  const { prestador, loading, error } = usePrestador({
    id: prestadorFromLocation ? Number(prestadorFromLocation.id) : prestadorId,
  });

  if (location.pathname === '/chat') {
    return (
      <FlexBox sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <IconButton
          onClick={() =>
            router(`/perfil-prestador/${prestadorId}`, {
              state: {
                prestador,
              },
            })
          }
          size="large"
          edge="start"
          color="primary"
          aria-label="menu"
          sx={{ mr: 1 }}
        >
          <ArrowBackOutlinedIcon />
        </IconButton>
        <ChatTitle>
          {loading && <Loading />}
          {error && <p>Hubo un error</p>}

          {user?.role === 'prestador'
            ? `${user?.firstname} ${user?.lastname}`
            : `${prestador?.firstname} ${prestador?.lastname}`}
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
