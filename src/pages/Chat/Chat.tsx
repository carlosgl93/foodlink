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

export type LocationState = {
  messages: Mensaje[];
  prestador: Prestador;
  sentBy: string;
};

export const Chat = () => {
  const location = useLocation();
  const { messages } = location.state as LocationState;

  return (
    <ChatContainer>
      {messages.map((m: Mensaje) => {
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
