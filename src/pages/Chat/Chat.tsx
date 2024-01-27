import { useLocation } from 'react-router-dom';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { Mensaje } from '@/types/Mensaje';
import {
  ChatContainer,
  StyledChatInput,
  StyledChatInputContainer,
  StyledChatSendButton,
  StyledMensajeTimestamp,
  StyledPrestadorMensajeContainer,
  StyledPrestadorMensajeText,
  StyledTimestampContainer,
  StyledUsuarioMensajeContainer,
  StyledUsuarioMensajeText,
} from './StyledChatMensajes';

import { Prestador } from '@/types/Prestador';

import { useChatMessages } from './useChatMessages';
import useAuth from '@/store/auth';
import Loading from '@/components/Loading';
import { formatDate } from '@/utils/formatDate';

export type LocationState = {
  messages: Mensaje[];
  prestador: Prestador;
  sentBy: string;
};

export const Chat = () => {
  const location = useLocation();
  const [{ user }] = useAuth();

  const prestador = location.state?.prestador;

  const {
    messages,
    message,
    loading,
    error,
    lastMessageRef,
    handleInputChange,
    handleSendMessage,
    sendWithEnter,
  } = useChatMessages({
    userId: user?.id,
    prestadorId: prestador?.id || location.state?.prestadorId,
  });

  return (
    <ChatContainer>
      {loading && <Loading />}
      {error && <p>Hubo un error</p>}
      {messages &&
        messages.map((m: Mensaje, index) => {
          const isLastMessage = index === messages.length - 1;
          if (m.sent_by === 'prestador') {
            return (
              <StyledPrestadorMensajeContainer
                key={m.id}
                ref={isLastMessage ? lastMessageRef : null}
              >
                <StyledPrestadorMensajeText>{m.message}</StyledPrestadorMensajeText>
                <StyledTimestampContainer>
                  <StyledMensajeTimestamp>{formatDate(m.created_at)}</StyledMensajeTimestamp>
                </StyledTimestampContainer>
              </StyledPrestadorMensajeContainer>
            );
          } else {
            return (
              <StyledUsuarioMensajeContainer key={m.id} ref={isLastMessage ? lastMessageRef : null}>
                <StyledUsuarioMensajeText>{m.message}</StyledUsuarioMensajeText>
                <StyledTimestampContainer>
                  <StyledMensajeTimestamp>{formatDate(m.created_at)}</StyledMensajeTimestamp>
                </StyledTimestampContainer>
              </StyledUsuarioMensajeContainer>
            );
          }
        })}
      <StyledChatInputContainer>
        <StyledChatInput
          value={message}
          placeholder="Escribe tu mensaje"
          onChange={(e) => handleInputChange(e)}
          onKeyDown={sendWithEnter}
        />
        <StyledChatSendButton onClick={handleSendMessage} disabled={message.length === 0}>
          <SendOutlinedIcon />
        </StyledChatSendButton>
      </StyledChatInputContainer>
    </ChatContainer>
  );
};
