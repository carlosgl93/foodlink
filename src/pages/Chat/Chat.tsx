import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import {
  ChatContainer,
  StyledChatInput,
  StyledChatInputContainer,
  StyledChatSendButton,
  StyledMensajeTimestamp,
  StyledPrestadorMensajeContainer,
  StyledPrestadorMensajeText,
  StyledPrestadorName,
  StyledTimestampContainer,
  StyledUsuarioMensajeContainer,
  StyledUsuarioMensajeText,
} from './StyledChatMensajes';

import Loading from '@/components/Loading';
import { formatDate } from '@/utils/formatDate';
import { Box } from '@mui/material';
import { usePrestadorChatMessages } from '../PrestadorChat/usePrestadorChatMessages';
import { useAuthNew } from '@/hooks/useAuthNew';
import { useRecoilValue } from 'recoil';
import { chatState } from '@/store/chat/chatStore';
import { interactedProveedorState } from '@/store/resultados/interactedProveedor';
import { useChat } from '@/hooks';

export const Chat = () => {
  const { user } = useAuthNew();
  const conversation = useRecoilValue(chatState);
  const customer = user;
  const proveedor = useRecoilValue(interactedProveedorState);
  const customerId = customer?.id;

  const { isSending, lastMessageRef } = usePrestadorChatMessages({
    userId: customerId ?? '',
    prestadorId: proveedor?.id ?? '',
  });

  const { message, messagesLoading, setMessage, handleSaveMessage, sendWithEnter } = useChat(
    customerId ?? '',
    proveedor?.id ?? '',
  );

  if (messagesLoading) {
    return (
      <ChatContainer>
        <Loading />
      </ChatContainer>
    );
  }

  return (
    <ChatContainer>
      {isSending ? (
        <Loading />
      ) : (
        conversation?.messages.map((m, index: number) => {
          const isLastMessage = index === conversation.messages.length - 1;
          if (m.sentBy === 'provider') {
            return (
              <StyledPrestadorMensajeContainer
                key={m.id + m.timestamp}
                ref={isLastMessage ? lastMessageRef : null}
              >
                <StyledPrestadorName>
                  {`${conversation.proveedorCompanyName} - ${conversation.representativeName}`}:
                </StyledPrestadorName>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}
                >
                  <StyledPrestadorMensajeText>{m.message}</StyledPrestadorMensajeText>
                  <StyledTimestampContainer>
                    <StyledMensajeTimestamp>{formatDate(m.timestamp)}</StyledMensajeTimestamp>
                  </StyledTimestampContainer>
                </Box>
              </StyledPrestadorMensajeContainer>
            );
          } else {
            return (
              <StyledUsuarioMensajeContainer
                key={m.id + m.timestamp}
                ref={isLastMessage ? lastMessageRef : null}
              >
                <StyledUsuarioMensajeText>{m.message}</StyledUsuarioMensajeText>
                <StyledTimestampContainer>
                  <StyledMensajeTimestamp>{formatDate(m.timestamp)}</StyledMensajeTimestamp>
                </StyledTimestampContainer>
              </StyledUsuarioMensajeContainer>
            );
          }
        })
      )}
      <StyledChatInputContainer>
        <StyledChatInput
          value={message}
          placeholder="Escribe tu mensaje"
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) =>
            sendWithEnter(e, {
              message,
              sentBy: 'user',
              providerId: proveedor?.id ?? '',
              userId: customerId ?? '',
              companyName: user?.companyName ?? '',
              representativeName: user?.representativeName,
            })
          }
        />
        <StyledChatSendButton
          onClick={() =>
            handleSaveMessage({
              message,
              sentBy: 'user',
              providerId: conversation.providerId,
              userId: conversation.userId,
              companyName: user?.companyName ?? '',
              representativeName: user?.representativeName,
            })
          }
          disabled={message.length === 0}
        >
          <SendOutlinedIcon />
        </StyledChatSendButton>
      </StyledChatInputContainer>
    </ChatContainer>
  );
};
