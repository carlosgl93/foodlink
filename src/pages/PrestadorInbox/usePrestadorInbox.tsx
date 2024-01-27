import { useEffect, useState } from 'react';
import useAuth from '@/store/auth';
import { getPrestadorInboxMessages } from '@/api/chat/getPrestadorInboxMessages';
import { useNavigate } from 'react-router-dom';

type Chat = {
  createdAt: string;
  id: number;
  message: string;
  prestadorId: number;
  sentBy: string;
  userId: number;
  firstname: string;
};

export const usePrestadorInbox = () => {
  const [{ user }] = useAuth();
  const [prestadorInbox, setPrestadorInbox] = useState<Chat[] | undefined>([]);
  const [loading, setLoading] = useState(false);
  const router = useNavigate();

  const handleClickChat = (prestadorId: number, userId: number) => {
    router('/prestador-chat', {
      state: {
        prestadorId,
        userId,
      },
    });
  };

  useEffect(() => {
    setLoading(true);
    getPrestadorInboxMessages(user?.id as number).then((res) => {
      setPrestadorInbox(
        res?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
      );
    });
    setLoading(false);
  }, [user]);

  return {
    loading,
    prestadorInbox,
    handleClickChat,
  };
};
