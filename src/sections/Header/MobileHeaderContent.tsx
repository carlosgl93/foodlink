import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';

import { FlexBox, HeaderIconImage } from '@/components/styled';
import useSidebar from '@/store/sidebar';
import { ChatTitle } from '@/pages/Chat/StyledChatMensajes';
import BackButton from '@/components/BackButton';
import { Box, styled } from '@mui/material';
import { interactedProveedorState } from '@/store/resultados/interactedProveedor';
import { useRecoilValue } from 'recoil';
import { chatState } from '@/store/chat/chatStore';

const MobileHeaderContent = () => {
  const [, sidebarActions] = useSidebar();
  const proveedor = useRecoilValue(interactedProveedorState);
  const chats = useRecoilValue(chatState);
  const username = `${chats?.companyName} - ${chats?.representativeName}`;
  const isChat = location.pathname === '/chat' || location.pathname === '/proveedor-chat';

  if (isChat && location.pathname === '/chat') {
    return (
      <StyledChatHeaderContainer>
        <BackButton ignoreMargin />
        <ChatTitle>
          {proveedor?.representativeName
            ? ` ${proveedor.companyName} - ${proveedor?.representativeName}`
            : proveedor?.email}
        </ChatTitle>
      </StyledChatHeaderContainer>
    );
  }

  if (isChat && location.pathname === '/proveedor-chat') {
    return (
      <StyledChatHeaderContainer>
        <BackButton ignoreMargin />
        <ChatTitle>{username}</ChatTitle>
      </StyledChatHeaderContainer>
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
        <HeaderIconImage src={`/android-chrome-192x192.png`} alt="FoodLink logo" />
      </Link>
    </FlexBox>
  );
};

export default MobileHeaderContent;

const StyledChatHeaderContainer = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '20% 80%',
  gridColumnGap: theme.spacing(4),
  height: theme.spacing(10),
  width: '100%',
  alignItems: 'center',
  justifyContent: 'space-around',
}));
