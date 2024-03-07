import MenuIcon from '@mui/icons-material/Menu';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import IconButton from '@mui/material/IconButton';
import { Link, useNavigate } from 'react-router-dom';

import { FlexBox, HeaderIconImage } from '@/components/styled';
import useSidebar from '@/store/sidebar';
import { ChatTitle } from '@/pages/Chat/StyledChatMensajes';
import { useRetrieveCustomerAndPrestador } from '@/hooks/useRetrieveCustomerAndPrestador';

const MobileHeaderContent = () => {
  const router = useNavigate();
  const [, sidebarActions] = useSidebar();
  const { customer, prestador } = useRetrieveCustomerAndPrestador();

  const isChat = location.pathname === '/chat' || location.pathname === '/prestador-chat';
  const isPrestadorChat = location.pathname === '/prestador-chat';
  const isCustomerChat = location.pathname === '/chat';

  const navigateBack = () => {
    if (isPrestadorChat) {
      router('/prestador-inbox');
    } else if (isCustomerChat) {
      router('/usuario-inbox');
    }
  };

  if (isChat) {
    return (
      <FlexBox sx={{ alignItems: 'center', justifyContent: 'center' }}>
        <IconButton
          onClick={navigateBack}
          size="large"
          edge="start"
          color="primary"
          aria-label="menu"
          sx={{ mr: 1 }}
        >
          <ArrowBackOutlinedIcon />
        </IconButton>
        <ChatTitle>
          {location.pathname === '/chat'
            ? `${prestador?.firstname} ${prestador?.lastname}`
            : `${customer?.firstname && customer?.firstname} 
                ${customer?.lastname && customer?.lastname}`}
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
