import { NAV_PATH_MAP } from '@/constant/nav';
import useFeedback from '@/context/feedbackContext';
import { PageInfo, ResourceClassify } from '@/interface/base';
import { PromptConfigEditParams, PromptDetailItem, PromptHistoryItem, PromptItem } from '@/interface/prompt';
import prompt from '@/services/prompt';
import { useState } from 'react';

function usePromptManage() {
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
      messageApi.error(`获取prompt列表失败：${err}`);
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
      messageApi.error(`获取prompt详情失败：${err}`);
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
      messageApi.error(`获取Prompt历史版本失败：${err}`);
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
        messageApi.success('还原Prompt成功');
      }
    } catch (err) {
      messageApi.error(`还原Prompt失败：${err}`);
    }
  };

  const createPromptConfig = async (params: PromptConfigEditParams) => {
    setIsPromptConfigSaveLoading(true);
    try {
      const res = await prompt.createPromptConfig(params);
      if (res?.data) {
        messageApi.success('创建Prompt成功');
      }
    } catch (err) {
      messageApi.error(`创建Prompt失败：${err}`);
    } finally {
      setIsPromptConfigSaveLoading(false);
    }
  };

  const updatePromptConfig = async (params: PromptConfigEditParams) => {
    setIsPromptConfigSaveLoading(true);
    try {
      const res = await prompt.updatePromptConfig(params);
      if (res?.data) {
        messageApi.success('更新Prompt成功');
      }
    } catch (err) {
      messageApi.error(`更新Prompt失败：${err}`);
    } finally {
      setIsPromptConfigSaveLoading(false);
    }
  };

  const deletePromptConfig = async (uid?: PromptItem['uid']) => {
    if (!uid) return;

    try {
      const res = await prompt.deletePrompt(uid);
      if (res?.data) {
        messageApi.success('删除Prompt成功');
      }
    } catch (err) {
      messageApi.error(`删除Prompt失败：${err}`);
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
