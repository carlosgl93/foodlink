import { useEffect, useRef, useState } from 'react';
import { sendMessage } from '@/api/chat/sendMessage';
import useAuth from '@/store/auth';
import { getMessages } from '@/api/chat/getMessages';

type useChatMessagesProps = {
  userId: number;
  prestadorId: number;
};

export const usePrestadorChatMessages = ({ userId, prestadorId }: useChatMessagesProps) => {
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [{ user }] = useAuth();

  useEffect(() => {
    setLoading(true);
    getMessages(userId, prestadorId, user?.token as string)
      .then((res) => {
        setMessages(res);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  const handleSendMessage = async () => {
    setLoading(true);
    try {
      const messageResponse = await sendMessage({
        message,
        prestadorId,
        userId,
        sentBy: 'prestador',
        token: user?.token || '',
      });
      setMessages(() => messageResponse.messages);
      setMessage('');
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const scrollToElement = () => {
    const { current } = lastMessageRef;
    if (current !== null) {
      current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const sendWithEnter = (e: React.KeyboardEvent) => {
    if (e.code === 'Enter') {
      handleSendMessage();
    } else {
      return;
    }
  };
  useEffect(() => {
    scrollToElement();
  }, [messages]);

  return {
    messages,
    loading,
    error,
    message,
    lastMessageRef,
    handleInputChange,
    handleSendMessage,
    sendWithEnter,
  };
};
