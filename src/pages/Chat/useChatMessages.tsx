import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { sendMessage } from '@/api/chat/sendMessage';
import useAuth from '@/store/auth';
import api from '@/api/api';

type useChatMessagesProps = {
  userId?: number;
  prestadorId?: number;
};

export const useChatMessages = ({ userId, prestadorId }: useChatMessagesProps) => {
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [{ user }] = useAuth();

  const [params] = useSearchParams();

  const prestadorIdFromSearchParams = parseInt(params.get('prestadorId') as string);
  const userIdFromSearchParams = parseInt(params.get('userId') as string);

  useEffect(() => {
    const fetchMessages = async () => {
      setLoading(true);
      try {
        const res = await api.get('/chat', {
          params: {
            prestadorId: prestadorId ? prestadorId : prestadorIdFromSearchParams,
            userId: userId ? userId : userIdFromSearchParams,
            token: user?.token || '',
          },
        });
        console.log(res);
        setMessages(res.data);
        setLoading(false);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
    };
    fetchMessages();
  }, []);

  const handleSendMessage = async () => {
    try {
      const messageResponse = await sendMessage({
        message,
        prestadorId: prestadorId ? prestadorId : prestadorIdFromSearchParams,
        userId: userId ? userId : userIdFromSearchParams,
        sentBy: user?.role || 'user',
        token: user?.token || '',
      });
      setMessages(() => messageResponse.messages);
      setMessage('');
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
