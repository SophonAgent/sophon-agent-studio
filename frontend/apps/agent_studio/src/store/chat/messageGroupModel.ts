import type { ChatDisplayConfig, MessageGroup, MsgGroupKeyType, SystemPrompt } from '@/interface/chat';
import type { FunctionDefinition } from '@/interface/functionCall';

import { INIT_CHAT_MODEL_CONFIG, INIT_DISPLAY_CONFIG, INIT_GROUPS } from '@/constant/chat';
import { functionCallModel } from '@/store/chat/functionCallModel';
import { messageModel } from '@/store/chat/messageModel';
import { modelConfigModel } from '@/store/chat/modelConfigModel';
import { systemPromptModel } from '@/store/chat/systemPromptModel';
import { getUuid } from '@/utils/uuid';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

type SyncType = 'system' | 'function';

interface MessageGroupModelState {
  /** state */
  messageGroups: MessageGroup[];
  isSyncMap: Record<SyncType, boolean>;

  /** actions */
  __setMessageGroups: (messageGroups: MessageGroup[]) => void;
  __addMessageGroup: (messageGroup: MessageGroup) => void;
  __removeMessageGroup: (msgGroupKey: string) => void;
  __updateMessageGroupDisplayConfig: (msgGroupKey: string, displayConfig: Partial<ChatDisplayConfig>) => void;
  __setIsSyncMap: (isSyncMap: Record<SyncType, boolean>) => void;
}

export const messageGroupModel = create<MessageGroupModelState>()(
  immer((set, get) => ({
    messageGroups: INIT_GROUPS,
    isSyncMap: { system: false, function: false },

    __setMessageGroups: (messageGroups: MessageGroup[]) => {
      set(state => {
        state.messageGroups = messageGroups;
      });
    },
    __addMessageGroup: (messageGroup: MessageGroup) => {
      set(state => {
        if (state.messageGroups.length < 3) {
          state.messageGroups.push(messageGroup);
        }
      });
    },
    __removeMessageGroup: (msgGroupKey: string) => {
      set(state => {
        if (state.messageGroups.length > 1) {
          state.messageGroups = state.messageGroups.filter(
            (item: MessageGroup) => item.msgGroupKey !== msgGroupKey,
          );
        }
      });
    },
    __updateMessageGroupDisplayConfig: (msgGroupKey: string, displayConfig: Partial<ChatDisplayConfig>) => {
      set(state => {
        const index = state.messageGroups.findIndex((item: MessageGroup) => item.msgGroupKey === msgGroupKey);
        if (index !== -1) {
          Object.assign(state.messageGroups[index].displayConfig, displayConfig);
        }
      });
    },

    __setIsSyncMap: (isSyncMap: Record<SyncType, boolean>) => {
      set(state => {
        state.isSyncMap = isSyncMap;
      });
    },
  })),
);

function useMessageGroupModel() {
  const {
    messageGroups,
    isSyncMap,
    __setMessageGroups,
    __addMessageGroup,
    __removeMessageGroup,
    __updateMessageGroupDisplayConfig,
    __setIsSyncMap,
  } = messageGroupModel();
  const {
    selectedPromptMap,
    showVariableMap,
    __setSelectedPromptMap,
    __setSelectedPromptMapByKey,
    __setShowVariableMap,
    __setShowVariableMapByKey,
  } = systemPromptModel();
  const {
    functionCallMap,
    enableFunctionCallMap,
    __setFunctionCallMap,
    __setFunctionCallMapByKey,
    __setEnableFunctionCallMap,
    __setEnableFunctionCallMapByKey,
  } = functionCallModel();
  const { chatModelConfigMap, __setChatModelConfigMapByKey } = modelConfigModel();
  const { messageListMap, __setMessageListMapByKey } = messageModel();

  const addCompareMessageGroup = (msgGroupKey: string) => {
    if (messageGroups.length < 1 || messageGroups.length > 2) {
      return;
    }
    const newMsgGroupKey = getUuid(5);

    // 对比组 tool 栏
    const currentDisplayConfig = messageGroups.find(i => i.msgGroupKey === msgGroupKey)?.displayConfig;
    const newDisplayConfig = currentDisplayConfig || INIT_DISPLAY_CONFIG;
    /** 添加组 */
    __addMessageGroup({
      msgGroupKey: newMsgGroupKey,
      displayConfig: newDisplayConfig,
    });
    /** 添加 System Prompt */
    __setSelectedPromptMapByKey({ [newMsgGroupKey]: selectedPromptMap[msgGroupKey] || {} });
    /** 控制 Variable 开关 */
    __setShowVariableMapByKey({ [newMsgGroupKey]: showVariableMap[msgGroupKey] || false });
    /** 控制 Function 开关 */
    __setEnableFunctionCallMapByKey({ [newMsgGroupKey]: enableFunctionCallMap[msgGroupKey] || false });
    /** 添加functions */
    __setFunctionCallMapByKey({ [newMsgGroupKey]: functionCallMap[msgGroupKey] || [] });
    /** 添加模型配置 */
    __setChatModelConfigMapByKey({
      [newMsgGroupKey]: chatModelConfigMap[msgGroupKey] || INIT_CHAT_MODEL_CONFIG,
    });
    /** 添加消息 */
    __setMessageListMapByKey({ [newMsgGroupKey]: messageListMap[msgGroupKey] || [] });
  };

  const syncAllMessageGroups = (msgGroupKey: string, type: SyncType, checked: boolean) => {
    __setIsSyncMap({ ...isSyncMap, [type]: checked });
    if (!checked) return;

    if (type === 'system') {
      // system prompt
      const newSelectedPromptMap: Record<MsgGroupKeyType, SystemPrompt> = Object.fromEntries(
        messageGroups.map(i => [i.msgGroupKey, selectedPromptMap[msgGroupKey] || {}]),
      );
      __setSelectedPromptMap(newSelectedPromptMap);

      // variable
      const newShowVariableMap: Record<MsgGroupKeyType, boolean> = Object.fromEntries(
        messageGroups.map(i => [i.msgGroupKey, showVariableMap[msgGroupKey] || false]),
      );
      __setShowVariableMap(newShowVariableMap);
    } else if (type === 'function') {
      // function call
      const newFunctionCallMap: Record<MsgGroupKeyType, FunctionDefinition[]> = Object.fromEntries(
        messageGroups.map(i => [i.msgGroupKey, functionCallMap[msgGroupKey] || []]),
      );
      __setFunctionCallMap(newFunctionCallMap);

      // function enable
      const newEnableFunctionCallMap: Record<MsgGroupKeyType, boolean> = Object.fromEntries(
        messageGroups.map(i => [i.msgGroupKey, enableFunctionCallMap[msgGroupKey] || false]),
      );
      __setEnableFunctionCallMap(newEnableFunctionCallMap);
    }
  };

  return {
    /** state */
    messageGroups,
    isSyncMap,

    /** computed */
    isCompareMode: messageGroups.length > 1,
    is2Groups: messageGroups.length === 2,
    is3Groups: messageGroups.length === 3,

    /** actions */
    __setMessageGroups,
    __addMessageGroup,
    __removeMessageGroup,
    __updateMessageGroupDisplayConfig,
    __setIsSyncMap,

    addCompareMessageGroup,
    syncAllMessageGroups,
  };
}

export default useMessageGroupModel;
