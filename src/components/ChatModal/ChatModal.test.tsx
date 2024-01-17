import { render, screen, fireEvent } from '@testing-library/react';
import { ChatModal } from '.';

describe('ChatModal', () => {
  let open: boolean;
  let handleClose: jest.Mock;
  let setMessage: jest.Mock;
  let handleSendMessage: jest.Mock;
  let messages: string[];

  beforeEach(() => {
    handleClose = jest.fn();
    setMessage = jest.fn();
    handleSendMessage = jest.fn();
    messages = ['Hola', 'tu'];
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders Component', () => {
    // Initially, the modal should not be in the document.
    expect(screen.queryByTestId('chatModal')).toBeNull();
    render(
      <ChatModal
        open={true}
        handleClose={handleClose}
        message=""
        setMessage={setMessage}
        handleSendMessage={handleSendMessage}
        messages={messages}
      />,
    );

    // Now, the modal should be present.
    expect(
      screen.getByPlaceholderText('Escribe tu mensaje aqui o elige una de estas opciones:'),
    ).toBeDefined();
  });

  test('renders the options', () => {
    render(
      <ChatModal
        open={true}
        handleClose={handleClose}
        message=""
        setMessage={setMessage}
        handleSendMessage={handleSendMessage}
        messages={messages}
      />,
    );

    expect(screen.getByText('Hola, me gustaría saber si estás disponible.')).toBeDefined();
    expect(screen.getByText('Haces algun descuento por numero de horas?')).toBeDefined();
    expect(screen.getByText('Me puedes contar mas sobre tu experiencia?')).toBeDefined();
  });

  test('closes the modal when clicking on the close button', () => {
    open = true;
    render(
      <ChatModal
        open={open}
        handleClose={handleClose}
        message=""
        setMessage={setMessage}
        handleSendMessage={handleSendMessage}
        messages={messages}
      />,
    );

    const closeButton = screen.getByText('Cerrar');
    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
