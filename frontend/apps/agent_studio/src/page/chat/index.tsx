import type { FC } from 'react';

import { memo, useEffect } from 'react';
import { cn } from '@/utils/tw';
import useMessageGroupModel from '@/store/chat/messageGroupModel';
import ChatHeader from '@/components/chatComponents/ChatHeader';
import CompareChat from '@/components/chatComponents/CompareChat';
import NormalChat from '@/components/chatComponents/NormalChat';
import useSystemPromptModel from '@/store/chat/systemPromptModel';
import useModelConfigModel from '@/store/chat/modelConfigModel';
import useQueryRouter from '@/utils/router';
import useConversationModel from '@/store/chat/conversationModel';
import { Skeleton } from 'antd';
import useGlobalModel from '@/store/globalModel';
import useConversationManage from '@/hooks/useConversationManage';
import { useRouter } from 'next/navigation';
import { NAV_PATH_MAP } from '@/constant/nav';
import useChat from '@/hooks/useChat';

const Chat: FC = () => {
  const router = useRouter();
  const queryRouter = useQueryRouter();

  const { userId } = useGlobalModel();
  const { initConversation } = useConversationModel();
  const { isCompareMode } = useMessageGroupModel();
  const { promptList, getPromptList, setSelectedPrompt } = useSystemPromptModel();
  const { modelList, getModelList } = useModelConfigModel();
  const { onConversationChange } = useChat();

  const { isChatPageLoading, getConversationBySessionId } = useConversationManage();

  useEffect(() => {
    getPromptList();
    getModelList();
  }, []);

  useEffect(() => {
    if (!modelList.length) return;

    const sessionId = queryRouter.get('sid');
    const uid = queryRouter.get('uid'); // prompt 调试
    const copyConfig = queryRouter.get('copyConfig'); // 新建对话保留配置
    const copyChat = queryRouter.get('copyChat'); // 复制对话

    if (uid) {
      queryRouter.remove('uid');
      initConversation();
      const name = promptList.find(f => f.uid === uid)?.name;
      if (name) {
        setSelectedPrompt('basic', { uid, name }, false, true);
      }
    } else if (sessionId) {
      getConversationBySessionId(sessionId).then(res => {
        if (!res) {
          queryRouter.remove('sid');
          initConversation();
          return;
        }
        if (res.userId === userId) {
          onConversationChange(res);
        } else if (res.isShared === 1) {
          router.push(`${NAV_PATH_MAP.CHAT}/share/${res.sessionId}`);
        } else {
          queryRouter.remove('sid');
          initConversation();
        }
      });
    } else if (copyConfig) {
      queryRouter.remove('copyConfig');
      initConversation({ keepCurrentCfg: true });
    } else if (copyChat) {
      queryRouter.remove('copyChat');
      initConversation({ keepCurrentCfg: true, keepCurrentMsgs: true });
    } else {
      initConversation();
    }
  }, [modelList.length]);

  return (
    <Skeleton loading={isChatPageLoading} active>
      <div className={cn('flex h-full flex-col')}>
        <ChatHeader />
        <div className={cn('flex-1 overflow-hidden')}>{isCompareMode ? <CompareChat /> : <NormalChat />}</div>
      </div>
    </Skeleton>
  );
};

export default memo(Chat);
