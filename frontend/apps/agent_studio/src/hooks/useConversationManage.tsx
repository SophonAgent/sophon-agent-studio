import type { PageInfo } from '@/interface/base';
import type {
  ConversationItem,
  ConversationListRequestParams,
  SimpleConversationItem,
  UpdateConversationRequestParams,
} from '@/interface/chat';

import { NAV_PATH_MAP } from '@/constant/nav';
import useFeedback from '@/context/feedbackContext';
import chat from '@/services/chat';
import useConversationModel from '@/store/chat/conversationModel';
import useQueryRouter from '@/utils/router';
import { useState } from 'react';
import copyToClipboard from 'copy-to-clipboard';
import useGlobalModel from '@/store/globalModel';
import { useTranslation } from 'react-i18next';

function useConversationManage() {
  const { t } = useTranslation();
  const queryRouter = useQueryRouter();

  const { userId } = useGlobalModel();
  const {
    currentConversation,
    __updateCurrentConversation,
    initConversation,
    cleanupAllConversationBackgroundTasks,
  } = useConversationModel();

  const { messageApi, notificationApi } = useFeedback();

  const [isChatPageLoading, setIsChatPageLoading] = useState<boolean>(false);

  const [conversationHistoryList, setConversationHistoryList] = useState<SimpleConversationItem[]>([]);
  const [isConversationHistoryListLoading, setIsConversationHistoryListLoading] = useState<boolean>(false);

  const getConversationBySessionId = async (sessionId?: string): Promise<ConversationItem | undefined> => {
    if (!sessionId || !userId) return undefined;

    setIsChatPageLoading(true);
    try {
      const res = await chat.getConversationBySessionId(sessionId, userId);
      return res?.data;
    } catch (err) {
      messageApi.error(t('MESSAGE_ERROR_1'));
      console.error(t('MESSAGE_ERROR_1'), ': ', err);
      return undefined;
    } finally {
      setIsChatPageLoading(false);
    }
  };

  const getConversationHistoryList = async (
    params: ConversationListRequestParams,
  ): Promise<{ datas: SimpleConversationItem[]; pageInfo: PageInfo } | undefined> => {
    setIsConversationHistoryListLoading(true);
    try {
      const res = await chat.getConversationList(params);
      setConversationHistoryList(res?.data?.datas || []);
      return res?.data;
    } catch (err) {
      messageApi.error(t('MESSAGE_ERROR_2'));
      console.error(t('MESSAGE_ERROR_2'), ': ', err);
      return undefined;
    } finally {
      setIsConversationHistoryListLoading(false);
    }
  };

  const deleteConversation = async (item: SimpleConversationItem) => {
    if (!item.sessionId || !userId) return;

    try {
      const res = await chat.deleteConversation(item.sessionId, userId);
      if (res?.data) {
        if (currentConversation.sessionId === item.sessionId) {
          cleanupAllConversationBackgroundTasks();
          queryRouter.remove('sid');
          initConversation();
        }
      }
    } catch (err) {
      messageApi.error(t('MESSAGE_ERROR_3'));
      console.error(t('MESSAGE_ERROR_3'), ': ', err);
    }
  };

  const clearAllConversation = async () => {
    if (!userId) return;

    try {
      const res = await chat.clearAllConversation(userId);
      if (res && queryRouter.get('sid')) {
        cleanupAllConversationBackgroundTasks();
        queryRouter.remove('sid');
        initConversation();
      }
    } catch (err) {
      messageApi.error(t('MESSAGE_ERROR_4'));
      console.error(t('MESSAGE_ERROR_4'), ': ', err);
    }
  };

  const updateConversation = async (params: UpdateConversationRequestParams): Promise<boolean> => {
    const { id, sessionId, isShared = 0, name = '' } = params;
    if (!userId || !id || !sessionId) return false;

    try {
      await chat.updateConversation({ id, sessionId, isShared, name, userId });
      return true;
    } catch (err) {
      messageApi.error(t('MESSAGE_ERROR_5'));
      console.error(t('MESSAGE_ERROR_5'), ': ', err);
      return false;
    }
  };

  const shareConversation = async (conversation?: SimpleConversationItem) => {
    const { sessionId, isShared } = conversation || {};

    if (isShared !== 1) {
      const res = await updateConversation({ ...conversation, isShared: 1 });
      if (!res) return;
    }

    const url = `${location.host}/paas#${NAV_PATH_MAP.CHAT_SHARE}?sid=${sessionId}`;
    copyToClipboard(url, { format: 'text/plain' });
    notificationApi.success({
      message: t('MESSAGE_8'),
      description: url,
    });

    if (queryRouter.get('sid') === sessionId) {
      __updateCurrentConversation({ isShared: 1 });
    }
  };

  return {
    isChatPageLoading,
    conversationHistoryList,
    isConversationHistoryListLoading,
    getConversationBySessionId,
    getConversationHistoryList,
    deleteConversation,
    clearAllConversation,
    updateConversation,
    shareConversation,
  };
}

export default useConversationManage;
