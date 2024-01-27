import { useEffect, useState } from 'react';
import useAuth from '@/store/auth';
import { useNavigate } from 'react-router-dom';
import { getUsuarioInboxMessages } from '@/api/chat/getUsuarioInboxMessages';

type Chat = {
  createdAt: string;
  id: number;
  message: string;
  prestadorId: number;
  sentBy: string;
  userId: number;
  firstname: string;
  lastname: string;
};

export const useUsuarioInbox = () => {
  const [{ user }] = useAuth();
  const [usuarioInbox, setUsuarioInbox] = useState<Chat[] | undefined>([]);
  const [loading, setLoading] = useState(false);
  const router = useNavigate();

  const handleClickChat = (prestadorId: number, userId: number) => {
    router('/chat', {
      state: {
        prestadorId,
        userId,
        prestadorName: usuarioInbox?.find((chat) => chat.prestadorId === prestadorId)?.firstname,
        prestadorLastname: usuarioInbox?.find((chat) => chat.prestadorId === prestadorId)?.lastname,
      },
    });
  };

  useEffect(() => {
    setLoading(true);
    getUsuarioInboxMessages(user?.id as number).then((res) => {
      setUsuarioInbox(
        res?.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()),
      );
    });
    setLoading(false);
  }, [user]);

  return {
    loading,
    usuarioInbox,
    handleClickChat,
  };
};
