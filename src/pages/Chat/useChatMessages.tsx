import { useEffect, useState } from 'react';
import { getMessages } from '@/api/chat/getMessages';
import { useSearchParams } from 'react-router-dom';
import { useRecoilValueLoadable } from 'recoil';

type useChatMessagesProps = {
  userId?: number;
  prestadorId?: number;
};

export const useChatMessages = ({ userId, prestadorId }: useChatMessagesProps) => {
  const [refreshKey, setRefreshKey] = useState(Date.now());

  const [params] = useSearchParams();

  const prestadorIdFromSearchParams = parseInt(params.get('prestadorId') as string);
  const userIdFromSearchParams = parseInt(params.get('userId') as string);

  const messagesRecoil = useRecoilValueLoadable(
    getMessages({
      prestadorId: prestadorId ? prestadorId : prestadorIdFromSearchParams,
      userId: userId ? userId : userIdFromSearchParams,
      refreshKey: refreshKey,
    }),
  );

  useEffect(() => {
    const now = Date.now();
    const diff = now - refreshKey;

    if (diff > 1 * 60 * 1000) {
      setRefreshKey(Date.now());
    }
  }, [prestadorIdFromSearchParams, userIdFromSearchParams]);

  const messages = messagesRecoil.state === 'hasValue' && messagesRecoil.contents;
  const loading = messagesRecoil.state === 'loading';
  const error = messagesRecoil.state === 'hasError';

  return {
    messages,
    loading,
    error,
  };
};
