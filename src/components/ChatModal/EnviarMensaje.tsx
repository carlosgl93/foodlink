import React from 'react';
import { Title } from '../StyledComponents';
import {
  StyledTextArea,
  StyledMessageOption,
  StyledModalCTAsContainer,
  StyledCerrarButton,
  StyledEnviarButton,
} from './ChatModalStyledComponents';
import { useChat } from '@/hooks';
import { useParams } from 'react-router-dom';
import { useAuthNew } from '@/hooks/useAuthNew';
import Loading from '../Loading';
import { Box } from '@mui/material';
import { interactedProveedorState } from '@/store/resultados/interactedProveedor';
import { useRecoilValue } from 'recoil';

type EnviarMensajeProps = {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  handleClose: () => void;
};

const commonMessages = [
  'Hola, me gustaría saber si tienes stock disponible.',
  '¿Haces algun descuento por numero volumen de compra?',
  '¿Me puedes contar mas sobre tus productos?',
];

export const EnviarMensaje = ({ handleClose, message, setMessage }: EnviarMensajeProps) => {
  const handleClickPredefinedMessage = (message: string) => {
    setMessage(message);
  };
  const { id } = useParams();
  const { user } = useAuthNew();
  const proveedor = useRecoilValue(interactedProveedorState);
  const { handleSendFirstMessage, sendFirstMessageLoading } = useChat(user?.id ?? '', id ?? '');

  return (
    <Box
      sx={{
        width: {
          xs: '90vw',
          sm: '80vw',
          md: '50vw',
        },
      }}
    >
      {sendFirstMessageLoading ? (
        <Loading />
      ) : (
        <>
          <Title sx={{ fontSize: '2rem', textAlign: 'center', mb: '1rem' }}>Enviar mensaje</Title>
          <StyledTextArea
            minRows={3}
            cols={45}
            placeholder="Escribe tu mensaje aqui o elige una de estas opciones:"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          {commonMessages.map((m, index) => (
            <StyledMessageOption
              variant="outlined"
              key={index}
              id={m}
              onClick={() => handleClickPredefinedMessage(m)}
            >
              {m}
            </StyledMessageOption>
          ))}
          <StyledModalCTAsContainer>
            <StyledCerrarButton variant="contained" onClick={handleClose}>
              Cerrar
            </StyledCerrarButton>
            <StyledEnviarButton
              variant="contained"
              color="primary"
              onClick={() =>
                handleSendFirstMessage({
                  message,
                  sentBy: 'user',
                  providerId: id ?? '',
                  userId: user?.id ?? '',
                  companyName: user?.companyName ?? '',
                  representativeName: user?.representativeName ?? '',
                  proveedorCompanyName: proveedor?.companyName,
                  proveedorRepresentativeName: proveedor?.representativeName,
                })
              }
              disabled={message.length < 5}
            >
              Enviar
            </StyledEnviarButton>
          </StyledModalCTAsContainer>
        </>
      )}
    </Box>
  );
};
