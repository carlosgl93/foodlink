import { useEffect, useRef, useState } from 'react';
import { getMessages } from '@/api/chat/getMessages';
import { useSearchParams } from 'react-router-dom';
import { useRecoilValueLoadable } from 'recoil';
import { sendMessage } from '@/api/chat/sendMessage';
import useAuth from '@/store/auth';

type useChatMessagesProps = {
  userId?: number;
  prestadorId?: number;
};

export const useChatMessages = ({ userId, prestadorId }: useChatMessagesProps) => {
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [{ user }] = useAuth();

  const [params] = useSearchParams();

  const prestadorIdFromSearchParams = parseInt(params.get('prestadorId') as string);
  const userIdFromSearchParams = parseInt(params.get('userId') as string);

  const messagesRecoil = useRecoilValueLoadable(
    getMessages({
      prestadorId: prestadorId ? prestadorId : prestadorIdFromSearchParams,
      userId: userId ? userId : userIdFromSearchParams,
    }),
  );

  const messagesRecoilValue = messagesRecoil.state === 'hasValue' && messagesRecoil.contents;
  const loading = messagesRecoil.state === 'loading';
  const error = messagesRecoil.state === 'hasError';

  useEffect(() => {
    setMessages(messagesRecoilValue);
  }, [messagesRecoilValue]);

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
