import type { FC } from 'react';

import { memo, useEffect, useState } from 'react';
import { cn } from '@/utils/tw';
import { useParams, useRouter } from 'next/navigation';
import { Skeleton } from 'antd';
import ChatHeader from '@/components/chatComponents/ChatHeader';
import useSystemPromptModel from '@/store/chat/systemPromptModel';
import useConversationManage from '@/hooks/useConversationManage';
import useConversationModel from '@/store/chat/conversationModel';
import useMessageGroupModel from '@/store/chat/messageGroupModel';
import CompareChat from '@/components/chatComponents/CompareChat';
import NormalChat from '@/components/chatComponents/NormalChat';
import { NAV_PATH_MAP } from '@/constant/nav';
import useChat from '@/hooks/useChat';
import useGlobalModel from '@/store/globalModel';

const ShareChat: FC = () => {
  const { sessionId } = useParams();
  const router = useRouter();

  const { userId } = useGlobalModel();
  const { initConversation } = useConversationModel();
  const { isCompareMode } = useMessageGroupModel();
  const { getPromptList } = useSystemPromptModel();
  const { onConversationChange } = useChat();

  const { getConversationBySessionId } = useConversationManage();

  const [isShareChatPageLoading, setIsShareChatPageLoading] = useState<boolean>(true);

  useEffect(() => {
    getPromptList();
  }, []);

  useEffect(() => {
    if (!sessionId || !userId) return;
    getShareChatPageDetail();
  }, [sessionId, userId]);

  const getShareChatPageDetail = async () => {
    if (typeof sessionId !== 'string') return;

    setIsShareChatPageLoading(true);
    const res = await getConversationBySessionId(sessionId);
    if (res && res.isShared === 1) {
      onConversationChange(res);
    } else {
      router.push(`${NAV_PATH_MAP.CHAT}`);
      initConversation();
    }
    setIsShareChatPageLoading(false);
  };

  return (
    <Skeleton loading={isShareChatPageLoading} active>
      <div className={cn('flex h-full flex-col')}>
        <ChatHeader isSharePage />
        <div className={cn('flex-1 overflow-hidden')}>
          {isCompareMode ? <CompareChat isReadonly /> : <NormalChat isReadonly />}
        </div>
      </div>
    </Skeleton>
  );
};

export default memo(ShareChat);
