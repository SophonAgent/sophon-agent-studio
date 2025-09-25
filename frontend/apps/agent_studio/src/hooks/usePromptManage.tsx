import type { PageInfo } from '@/interface/base';
import type {
  PromptConfigEditParams,
  PromptDetailItem,
  PromptHistoryItem,
  PromptItem,
} from '@/interface/prompt';

import { NAV_PATH_MAP } from '@/constant/nav';
import useFeedback from '@/context/feedbackContext';
import { ResourceClassify } from '@/interface/base';
import prompt from '@/services/prompt';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function usePromptManage() {
  const { t } = useTranslation();

  const { messageApi } = useFeedback();

  const [promptList, setPromptList] = useState<PromptItem[]>([]);
  const [isPromptListLoading, setIsPromptListLoading] = useState<boolean>(false);

  const [isPromptDetailLoading, setIsPromptDetailLoading] = useState<boolean>(false);

  const [promptHistoryList, setPromptHistoryList] = useState<PromptHistoryItem[]>([]);
  const [isPromptHistoryLoading, setIsPromptHistoryLoading] = useState<boolean>(false);

  const [isPromptConfigSaveLoading, setIsPromptConfigSaveLoading] = useState<boolean>(false);

  const getPromptList = async () => {
    setIsPromptListLoading(true);
    try {
      const res = await prompt.getPromptList();
      setPromptList(res?.data || []);
    } catch (err) {
      messageApi.error(t('MESSAGE_ERROR_22'));
      console.error(t('MESSAGE_ERROR_22'), ': ', err);
    } finally {
      setIsPromptListLoading(false);
    }
  };

  const getPromptDetail = async (uid?: PromptItem['uid']): Promise<PromptDetailItem | undefined> => {
    if (!uid) return undefined;

    setIsPromptDetailLoading(true);
    try {
      const res = await prompt.getPromptDetail(uid);
      return res?.data?.[0];
    } catch (err) {
      messageApi.error(t('MESSAGE_ERROR_23'));
      console.error(t('MESSAGE_ERROR_23'), ': ', err);
      return undefined;
    } finally {
      setIsPromptDetailLoading(false);
    }
  };

  const getPromptHistoryList = async (params: {
    pageNum?: number;
    pageSize?: number;
    uid?: string;
  }): Promise<
    | {
        classify?: ResourceClassify;
        historyVOS?: PromptHistoryItem[];
        pageInfo?: PageInfo;
      }
    | undefined
  > => {
    const { pageNum = 1, pageSize = 9999, uid } = params;
    if (!uid) return undefined;

    setIsPromptHistoryLoading(true);
    try {
      const res = await prompt.getPromptHistoryList({ pageNum, pageSize, uid });
      setPromptHistoryList(res?.data?.historyVOS || []);
      return res?.data;
    } catch (err) {
      messageApi.error(t('MESSAGE_ERROR_24'));
      console.error(t('MESSAGE_ERROR_24'), ': ', err);
      return undefined;
    } finally {
      setIsPromptHistoryLoading(false);
    }
  };

  const rollbackPromptVersion = async (uid?: string, version?: number) => {
    if (!uid || !version) return;

    try {
      const res = await prompt.rollbackPromptVersion(uid, version);
      if (res?.data) {
        messageApi.success(t('MESSAGE_SUCCESS_11'));
      }
    } catch (err) {
      messageApi.error(t('MESSAGE_ERROR_25'));
      console.error(t('MESSAGE_ERROR_25'), ': ', err);
    }
  };

  const createPromptConfig = async (params: PromptConfigEditParams) => {
    setIsPromptConfigSaveLoading(true);
    try {
      const res = await prompt.createPromptConfig(params);
      if (res?.data) {
        messageApi.success(t('MESSAGE_SUCCESS_12'));
      }
    } catch (err) {
      messageApi.error(t('MESSAGE_ERROR_26'));
      console.error(t('MESSAGE_ERROR_26'), ': ', err);
    } finally {
      setIsPromptConfigSaveLoading(false);
    }
  };

  const updatePromptConfig = async (params: PromptConfigEditParams) => {
    setIsPromptConfigSaveLoading(true);
    try {
      const res = await prompt.updatePromptConfig(params);
      if (res?.data) {
        messageApi.success(t('MESSAGE_SUCCESS_13'));
      }
    } catch (err) {
      messageApi.error(t('MESSAGE_ERROR_27'));
      console.error(t('MESSAGE_ERROR_27'), ': ', err);
    } finally {
      setIsPromptConfigSaveLoading(false);
    }
  };

  const deletePromptConfig = async (uid?: PromptItem['uid']) => {
    if (!uid) return;

    try {
      const res = await prompt.deletePrompt(uid);
      if (res?.data) {
        messageApi.success(t('MESSAGE_SUCCESS_14'));
      }
    } catch (err) {
      messageApi.error(t('MESSAGE_ERROR_28'));
      console.error(t('MESSAGE_ERROR_28'), ': ', err);
    }
  };

  const openChatDebug = (uid?: string) => {
    if (!uid) {
      return;
    }
    const url = `${NAV_PATH_MAP.CHAT}?uid=${uid}`;
    window.open(url, '_blank');
  };

  return {
    promptList,
    isPromptListLoading,
    isPromptDetailLoading,
    promptHistoryList,
    isPromptHistoryLoading,
    isPromptConfigSaveLoading,
    getPromptList,
    getPromptDetail,
    getPromptHistoryList,
    rollbackPromptVersion,
    createPromptConfig,
    updatePromptConfig,
    deletePromptConfig,
    openChatDebug,
  };
}

export default usePromptManage;
