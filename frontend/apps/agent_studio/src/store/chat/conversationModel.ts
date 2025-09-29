import type {
  ChatDisplayConfig,
  ChatModelConfig,
  ConversationItem,
  MsgGroupKeyType,
  SimpleConversationItem,
} from '@/interface/chat';
import type { FunctionInfo } from '@/interface/functionCall';

import chat from '@/services/chat';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { messageModel } from './messageModel';
import { systemPromptModel } from './systemPromptModel';
import { tranJsonToObject } from '@/utils/json';
import { messageGroupModel } from './messageGroupModel';
import { INIT_CHAT_MODEL_CONFIG, INIT_GROUPS } from '@/constant/chat';
import { functionCallModel } from './functionCallModel';
import { getUuid } from '@/utils/uuid';
import { modelConfigModel } from './modelConfigModel';
import useFeedback from '@/context/feedbackContext';
import { globalModel } from '@/store/globalModel';
import { useTranslation } from 'react-i18next';

interface ConversationModelState {
  /** state */
  conversationList: SimpleConversationItem[];
  isConversationListLoading: boolean;
  currentConversation: Pick<SimpleConversationItem, 'id' | 'name' | 'sessionId' | 'isShared'>;
  abortControllerMap: Record<MsgGroupKeyType, AbortController>;
  conversationCleanupTasks: Array<() => void>;

  /** actions */
  __setConversationList: (conversationHistoryList: SimpleConversationItem[]) => void;
  __setIsConversationListLoading: (isConversationHistoryLoading: boolean) => void;
  __setCurrentConversation: (
    conversation: Pick<SimpleConversationItem, 'id' | 'name' | 'sessionId' | 'isShared'>,
  ) => void;
  __updateCurrentConversation: (
    conversation: Partial<Pick<SimpleConversationItem, 'id' | 'name' | 'sessionId' | 'isShared'>>,
  ) => void;
  __setAbortControllerMapByKey: (msgGroupKey: string, abortController: AbortController) => void;
  __setConversationCleanupTasks: (conversationCleanupTasks: Array<() => void>) => void;
}

export const conversationModel = create<ConversationModelState>()(
  immer((set, get) => ({
    conversationList: [],
    isConversationListLoading: false,
    currentConversation: {},
    abortControllerMap: {},
    conversationCleanupTasks: [],

    __setConversationList: (conversationList: SimpleConversationItem[]) => {
      set(state => {
        state.conversationList = conversationList;
      });
    },

    __setIsConversationListLoading: (isConversationListLoading: boolean) => {
      set(state => {
        state.isConversationListLoading = isConversationListLoading;
      });
    },

    __setCurrentConversation: (
      conversation: Pick<SimpleConversationItem, 'id' | 'name' | 'sessionId' | 'isShared'>,
    ) => {
      set(state => {
        state.currentConversation = conversation;
      });
    },
    __updateCurrentConversation: (
      conversation: Partial<Pick<SimpleConversationItem, 'id' | 'name' | 'sessionId' | 'isShared'>>,
    ) => {
      set(state => {
        state.currentConversation = { ...state.currentConversation, ...conversation };
      });
    },

    __setAbortControllerMapByKey: (msgGroupKey: string, abortController: AbortController) => {
      set(state => {
        Object.assign(state.abortControllerMap, { [msgGroupKey]: abortController });
      });
    },

    __setConversationCleanupTasks: (conversationCleanupTasks: Array<() => void>) => {
      set(state => {
        state.conversationCleanupTasks = conversationCleanupTasks;
      });
    },
  })),
);

function useConversationModel() {
  const { t } = useTranslation();

  const {
    conversationList,
    isConversationListLoading,
    currentConversation,
    abortControllerMap,
    conversationCleanupTasks,
    __setConversationList,
    __setIsConversationListLoading,
    __setCurrentConversation,
    __updateCurrentConversation,
    __setAbortControllerMapByKey,
    __setConversationCleanupTasks,
  } = conversationModel();
  const { userId } = globalModel();
  const { __setMessageGroups, __updateMessageGroupDisplayConfig, __setIsSyncMap } = messageGroupModel();
  const { __setSelectedPromptMap, __setShowVariableMap } = systemPromptModel();
  const { modelList, __setChatModelConfigMap } = modelConfigModel();
  const { __setFunctionCallMap, __setEnableFunctionCallMap } = functionCallModel();
  const { __setMessageListMap, __setIsRunningMap, __setIsRunningMapByKey } = messageModel();

  const { messageApi } = useFeedback();

  const getConversationList = async (silent?: boolean) => {
    if (!userId) return;

    if (!silent) {
      __setIsConversationListLoading(true);
    }
    try {
      const res = await chat.getConversationList({ userId });
      __setConversationList(res?.data?.datas || []);
    } catch (err) {
      messageApi.error(t('MESSAGE_ERROR_2'));
      console.error(t('MESSAGE_ERROR_2'), ': ', err);
    } finally {
      if (!silent) {
        __setIsConversationListLoading(false);
      }
    }
  };

  const stopRequestByKey = (msgGroupKey: string) => {
    abortControllerMap[msgGroupKey]?.abort();
    __setIsRunningMapByKey({ [msgGroupKey]: false });
  };

  const stopAllRequest = () => {
    Object.values(abortControllerMap).forEach(item => item.abort());
    __setIsRunningMap({});
  };

  const getLastConversation = async (): Promise<ConversationItem | undefined> => {
    if (!userId) return undefined;

    try {
      const res = await chat.getConversationList({ userId, pageNum: 1, pageSize: 1 });
      const data = res?.data?.datas?.[0];
      if (!data?.sessionId) {
        return undefined;
      }

      const { data: conversation } = await chat.getConversationBySessionId(data.sessionId, userId);
      return conversation;
    } catch (err) {
      return undefined;
    }
  };

  const initConversation = async (p?: { keepCurrentCfg?: boolean; keepCurrentMsgs?: boolean }) => {
    const { keepCurrentCfg, keepCurrentMsgs } = p || {};

    // 新建对话时，取消所有请求
    stopAllRequest();

    const msgGroupKey = 'basic';
    __setCurrentConversation({ name: t('CHAT_10'), sessionId: getUuid(8) });

    // 保留当前配置
    if (!keepCurrentCfg) {
      // 设置组
      __setMessageGroups(INIT_GROUPS);
      // 设置 System Prompt
      __setSelectedPromptMap({ [msgGroupKey]: {} });
      // 设置 Variables 开关
      __setShowVariableMap({ [msgGroupKey]: false });
      // 设置 Functions 开关
      __setEnableFunctionCallMap({ [msgGroupKey]: false });
      // 设置 Functions
      __setFunctionCallMap({ [msgGroupKey]: [] });
      // 设置模型参数
      const lastConversation = await getLastConversation();
      const { id, modelName, defaultParams = '{}', modalities, supportStream } = modelList[0] || {};
      let modelConfig: ChatModelConfig;
      if (lastConversation) {
        // 对话过，用上一次对话的模型
        const { modelArgs = {} } = lastConversation;
        const model_config_id = (modelArgs as ChatModelConfig).model_config_id || id;
        const model = (modelArgs as ChatModelConfig).model || modelName;
        modelConfig = { ...INIT_CHAT_MODEL_CONFIG, ...modelArgs, model_config_id, model };
      } else {
        modelConfig = {
          ...INIT_CHAT_MODEL_CONFIG,
          model_config_id: id,
          model: modelName,
          modalities,
          ...tranJsonToObject(defaultParams),
        };
        if (supportStream === 0) {
          // 非流式模型，关闭流式
          __updateMessageGroupDisplayConfig(msgGroupKey, { stream: false });
        }
      }
      __setChatModelConfigMap({ [msgGroupKey]: modelConfig });
    }

    if (!keepCurrentMsgs) {
      // 设置消息
      __setMessageListMap({ [msgGroupKey]: [] });
    }

    // 设置同步
    __setIsSyncMap({ system: false, function: false });
  };

  const saveConversation = async (isShared?: boolean) => {
    const { sessionId, id, name } = currentConversation;

    const data: ConversationItem[] = [];
    const functionCalls: FunctionInfo[] = [];
    const displayConfigs: ChatDisplayConfig[] = [];
    messageGroupModel.getState().messageGroups.forEach(group => {
      const { msgGroupKey, displayConfig } = group;

      const systemPrompt = systemPromptModel.getState().selectedPromptMap[msgGroupKey] || {};
      const completeContent = messageModel.getState().messageListMap[msgGroupKey] || [];
      const modelArgs = modelConfigModel.getState().chatModelConfigMap[msgGroupKey] || {};
      data.push({
        promptContent: systemPrompt.promptContent,
        promptDynamicValues: systemPrompt.variables,
        promptUid: systemPrompt.uid,
        promptVersion: systemPrompt.version,
        modelArgs,
        completeContent,
      });

      displayConfigs.push(displayConfig);

      const functionCall: FunctionInfo = {
        enableAll: functionCallModel.getState().enableFunctionCallMap[msgGroupKey],
        functions: functionCallModel.getState().functionCallMap[msgGroupKey] || [],
      };
      functionCalls.push(functionCall);
    });

    const extra: Record<string, any> = {};
    // compareGroups
    if (data.length > 1) {
      extra.compareGroups = data.slice(1);
    }
    // displayConfigs
    if (displayConfigs.length) {
      extra.displayConfigs = displayConfigs;
    }
    // functionCalls
    if (functionCalls.length) {
      extra.functionCalls = functionCalls;
    }

    // name
    const newName = name === t('CHAT_10') ? data[0]?.completeContent?.[0]?.content?.slice(0, 32) : name;
    __updateCurrentConversation({ name: newName });

    const params: ConversationItem = {
      id,
      sessionId,
      userId,
      isShared: isShared ? 1 : currentConversation.isShared,
      name: newName,
      ...data[0],
      extra: Object.keys(extra).length > 0 ? JSON.stringify(extra) : undefined,
    };
    const res = await chat.saveConversation(params);
    if (res?.data) {
      __updateCurrentConversation({ id: res.data });
    }
  };

  const clearConversation = () => {
    __setCurrentConversation({});

    __setSelectedPromptMap({});
    __setShowVariableMap({});

    __setFunctionCallMap({});
    __setEnableFunctionCallMap({});

    __setMessageGroups(INIT_GROUPS);
    __setIsSyncMap({ system: false, function: false });

    __setMessageListMap({});
    __setChatModelConfigMap({});
  };

  const registerConversationCleanup = (fn: () => void) => {
    __setConversationCleanupTasks([...conversationModel.getState().conversationCleanupTasks, fn]);
    return () => {
      const tasks = conversationModel.getState().conversationCleanupTasks;
      const index = tasks.indexOf(fn);
      if (index > -1) {
        const newTasks = tasks.filter((_, i) => i !== index);
        __setConversationCleanupTasks(newTasks);
      }
    };
  };

  const cleanupAllConversationBackgroundTasks = () => {
    conversationModel.getState().conversationCleanupTasks.forEach(task => task());
    __setConversationCleanupTasks([]);
  };

  return {
    /** state */
    conversationList,
    isConversationListLoading,
    currentConversation,
    abortControllerMap,
    conversationCleanupTasks,

    /** actions */
    __setConversationList,
    __setIsConversationListLoading,
    __setCurrentConversation,
    __updateCurrentConversation,
    __setAbortControllerMapByKey,
    __setConversationCleanupTasks,

    getConversationList,
    stopRequestByKey,
    stopAllRequest,
    initConversation,
    saveConversation,
    clearConversation,
    registerConversationCleanup,
    cleanupAllConversationBackgroundTasks,
  };
}

export default useConversationModel;
