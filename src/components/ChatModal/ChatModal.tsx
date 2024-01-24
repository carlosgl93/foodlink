import { ModalContent, StyledModal } from './ChatModalStyledComponents';
import { EnviarMensaje } from './EnviarMensaje';

type ChatModalProps = {
  open: boolean;
  handleClose: () => void;
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSendMessage: () => Promise<void>;
  messages: string[];
};

export const ChatModal = ({
  open,
  handleClose,
  message,
  setMessage,
  handleSendMessage,
}: ChatModalProps) => {
  return (
    <StyledModal id="chatModal" open={open} onClose={handleClose}>
      <ModalContent>
        <EnviarMensaje
          setMessage={setMessage}
          message={message}
          handleSendMessage={handleSendMessage}
          handleClose={handleClose}
        />
      </ModalContent>
    </StyledModal>
  );
};
