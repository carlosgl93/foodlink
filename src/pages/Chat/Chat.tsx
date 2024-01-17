import { useLocation } from 'react-router-dom';

import { Mensaje } from '@/types/Mensaje';
import {
  ChatContainer,
  StyledPrestadorMensajeContainer,
  StyledPrestadorMensajeText,
  StyledUsuarioMensajeContainer,
  StyledUsuarioMensajeText,
} from './StyledChatMensajes';
import { Prestador } from '@/types/Prestador';

import { useChatMessages } from './useChatMessages';
import useAuth from '@/store/auth';
import Loading from '@/components/Loading';

export type LocationState = {
  messages: Mensaje[];
  prestador: Prestador;
  sentBy: string;
};

export const Chat = () => {
  const location = useLocation();
  const [{ user }] = useAuth();

  const { messages, loading, error } = useChatMessages({
    userId: user?.id,
    prestadorId: location.state?.prestador?.id,
  });

  return (
    <ChatContainer>
      {loading && <Loading />}
      {error && <p>Hubo un error</p>}
      {messages &&
        messages.map((m: Mensaje) => {
          if (m.sent_by === 'prestador') {
            return (
              <StyledPrestadorMensajeContainer key={m.id}>
                <StyledPrestadorMensajeText>{m.message}</StyledPrestadorMensajeText>
              </StyledPrestadorMensajeContainer>
            );
          } else {
            return (
              <StyledUsuarioMensajeContainer key={m.id}>
                <StyledUsuarioMensajeText>{m.message}</StyledUsuarioMensajeText>
              </StyledUsuarioMensajeContainer>
            );
          }
        })}
    </ChatContainer>
  );
};
