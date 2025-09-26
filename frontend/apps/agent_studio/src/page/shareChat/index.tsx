import type { FC } from 'react';

import { memo, useEffect } from 'react';
import { cn } from '@/utils/tw';
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
import useQueryRouter from '@/utils/router';
import { useNavigate } from 'react-router-dom';

const ShareChat: FC = () => {
  const navigate = useNavigate();
  const queryRouter = useQueryRouter();

  const { userId } = useGlobalModel();
  const { initConversation } = useConversationModel();
  const { isCompareMode } = useMessageGroupModel();
  const { getPromptList } = useSystemPromptModel();
  const { onConversationChange } = useChat();

  const { isChatPageLoading, getConversationBySessionId } = useConversationManage();

  useEffect(() => {
    getPromptList();
  }, []);

  useEffect(() => {
    if (userId) {
      getShareChatPageDetail();
    }
  }, [userId]);

  const getShareChatPageDetail = async () => {
    const sid = queryRouter.get('sid');
    if (!sid) return;

    const res = await getConversationBySessionId(sid);
    if (res && res.isShared === 1) {
      onConversationChange(res);
    } else {
      navigate(NAV_PATH_MAP.CHAT);
      initConversation();
    }
  };

  return (
    <Skeleton loading={isChatPageLoading} active>
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
