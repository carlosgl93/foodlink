import { Box, styled } from '@mui/material';
import {
  ChatOutlined as ChatOutlinedIcon,
  BookmarkBorderOutlined as BookmarkBorderOutlinedIcon,
} from '@mui/icons-material';
import {
  StyledAvatar,
  StyledNameContainer,
  StyledTitle,
  StyledCTAs,
} from './MobilePerfilPrestadorStyledComponents';
import { ChatModal } from '@/components/ChatModal';
import Loading from '@/components/Loading';
import {
  StyledContactButton,
  StyledShortListButton,
} from './DesktopPerfilPrestadorStyledComponents';
import { Conversation } from '@/api/firebase/chat';

interface HeroContentProps {
  companyName: string;
  email: string;
  imageUrl: string | undefined;
  messagesLoading: boolean;
  messages: Conversation;
  handleContact: () => void;
  open: boolean;
  handleClose: () => void;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  savingMessageLoading: boolean;
}

const HeroContent: React.FC<HeroContentProps> = ({
  companyName,
  email,
  imageUrl,
  messagesLoading,
  messages,
  handleContact,
  open,
  handleClose,
  message,
  setMessage,
  savingMessageLoading,
}) => {
  return (
    <StyledBox>
      <StyledAvatar alt={`Logo ${companyName}`} src={imageUrl} />
      <StyledNameContainer>
        <StyledTitle>{companyName ? companyName : email}</StyledTitle>
      </StyledNameContainer>

      <StyledCTAs>
        {messagesLoading ? (
          <Loading />
        ) : (
          <>
            <StyledContactButton startIcon={<ChatOutlinedIcon />} onClick={handleContact}>
              {(messages?.messages ?? []).length > 0 ? 'Chat' : 'Contactar'}
            </StyledContactButton>
            <ChatModal
              isLoading={savingMessageLoading}
              open={open}
              handleClose={handleClose}
              message={message}
              setMessage={setMessage}
            />
            <StyledShortListButton startIcon={<BookmarkBorderOutlinedIcon />}>
              Guardar
            </StyledShortListButton>
          </>
        )}
      </StyledCTAs>
    </StyledBox>
  );
};

export default HeroContent;

const StyledBox = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  padding: '0.5rem 1rem',
  gap: '1rem',
}));
