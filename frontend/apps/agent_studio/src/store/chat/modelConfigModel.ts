import type { ChatModelConfig, MsgGroupKeyType } from '@/interface/chat';
import type { ModelConfigItem } from '@/interface/modelConfig';

import useFeedback from '@/context/feedbackContext';
import modelConfig from '@/services/modelConfig';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { useTranslation } from 'react-i18next';

interface ModelConfigState {
  /** state */
  chatModelConfigMap: Record<MsgGroupKeyType, ChatModelConfig>;
  modelList: ModelConfigItem[];

  /** actions */
  __setChatModelConfigMap: (chatModelConfigMap: Record<MsgGroupKeyType, ChatModelConfig>) => void;
  __setChatModelConfigMapByKey: (chatModelConfigMap: Record<MsgGroupKeyType, ChatModelConfig>) => void;
  __updateChatModelConfig: (msgGroupKey: string, modelConfig: Partial<ChatModelConfig>) => void;
  __setModelList: (modelList: ModelConfigItem[]) => void;
}

export const modelConfigModel = create<ModelConfigState>()(
  immer((set, get) => ({
    chatModelConfigMap: {},
    modelList: [],

    __setChatModelConfigMap: (chatModelConfigMap: Record<MsgGroupKeyType, ChatModelConfig>) => {
      set(state => {
        state.chatModelConfigMap = chatModelConfigMap;
      });
    },
    __setChatModelConfigMapByKey: (chatModelConfigMap: Record<MsgGroupKeyType, ChatModelConfig>) => {
      set(state => {
        Object.assign(state.chatModelConfigMap, chatModelConfigMap);
      });
    },
    __updateChatModelConfig: (msgGroupKey: string, modelConfig: Partial<ChatModelConfig>) => {
      set(state => {
        const obj = state.chatModelConfigMap[msgGroupKey];
        if (obj) {
          Object.assign(obj, modelConfig);
        } else {
          Object.assign(state.chatModelConfigMap, { [msgGroupKey]: modelConfig });
        }
      });
    },

    __setModelList: (modelList: ModelConfigItem[]) => {
      set(state => {
        state.modelList = modelList;
      });
    },
  })),
);

function useModelConfigModel() {
  const { t } = useTranslation();

  const {
    chatModelConfigMap,
    modelList,
    __setChatModelConfigMap,
    __setChatModelConfigMapByKey,
    __updateChatModelConfig,
    __setModelList,
  } = modelConfigModel();

  const { messageApi } = useFeedback();

  const getModelList = async () => {
    try {
      const res = await modelConfig.getModelConfigList();
      __setModelList(res?.data || []);
    } catch (err) {
      messageApi.error(t('MESSAGE_ERROR_18'));
      console.error(t('MESSAGE_ERROR_18'), ': ', err);
    }
  };

  return {
    /** state */
    chatModelConfigMap,
    modelList,

    /** actions */
    __setChatModelConfigMap,
    __setChatModelConfigMapByKey,
    __updateChatModelConfig,
    __setModelList,

    getModelList,
  };
}

export default useModelConfigModel;
