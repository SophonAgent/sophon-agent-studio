import type { MessageItem, MsgGroupKeyType, ToolCallItem } from '@/interface/chat';

import { RoleEnum } from '@/interface/chat';
import { getUuid } from '@/utils/uuid';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { messageGroupModel } from './messageGroupModel';
import { cloneDeep } from 'lodash-es';

interface MessageModelState {
  /** state */
  messageListMap: Record<MsgGroupKeyType, MessageItem[]>;
  isRunningMap: Record<MsgGroupKeyType, boolean>;

  /** action */
  __setMessageListMap: (messageListMap: Record<MsgGroupKeyType, MessageItem[]>) => void;
  __setMessageListMapByKey: (messageListMap: Record<MsgGroupKeyType, MessageItem[]>) => void;
  __updateMessage: (msgGroupKey: string, message: MessageItem) => void;
  __removeMessage: (msgGroupKey: string, message: MessageItem) => void;
  __setIsRunningMap: (isRunningMap: Record<MsgGroupKeyType, boolean>) => void;
  __setIsRunningMapByKey: (isRunningMap: Record<MsgGroupKeyType, boolean>) => void;
}

export const messageModel = create<MessageModelState>()(
  immer((set, get) => ({
    messageListMap: {},
    isRunningMap: {},

    __setMessageListMap: (messageListMap: Record<MsgGroupKeyType, MessageItem[]>) => {
      set(state => {
        state.messageListMap = messageListMap;
      });
    },
    __setMessageListMapByKey: (messageListMap: Record<MsgGroupKeyType, MessageItem[]>) => {
      set(state => {
        Object.assign(state.messageListMap, messageListMap);
      });
    },
    __updateMessage: (msgGroupKey: string, message: MessageItem) => {
      set(state => {
        const list = state.messageListMap[msgGroupKey] || [];
        const index = list.findIndex(i => i.id === message.id);
        if (index !== -1) {
          list[index] = message;
        } else {
          list.push(message);
        }
      });
    },
    __removeMessage: (msgGroupKey: string, message: MessageItem) => {
      set(state => {
        const messageList = state.messageListMap[msgGroupKey] || [];
        const index = messageList.findIndex(i => i.id === message.id);
        if (index === -1) {
          return;
        }
        let list = cloneDeep(messageList);
        list = list.filter(i => i.id !== message.id);
        // 移除 Tool Message
        for (let i = index + 1; i < messageList.length; i++) {
          const msg = messageList[i];
          if (msg.role === RoleEnum.TOOL) {
            list = list.filter(f => f.id !== msg.id);
          } else {
            break;
          }
        }
        Object.assign(state.messageListMap, { [msgGroupKey]: list });
      });
    },

    __setIsRunningMap: (isRunningMap: Record<MsgGroupKeyType, boolean>) => {
      set(state => {
        state.isRunningMap = isRunningMap;
      });
    },
    __setIsRunningMapByKey: (isRunningMap: Record<MsgGroupKeyType, boolean>) => {
      set(state => {
        Object.assign(state.isRunningMap, isRunningMap);
      });
    },
  })),
);

function useMessageModel() {
  const {
    messageListMap,
    isRunningMap,
    __setMessageListMap,
    __setMessageListMapByKey,
    __updateMessage,
    __removeMessage,
    __setIsRunningMap,
    __setIsRunningMapByKey,
  } = messageModel();
  const { messageGroups } = messageGroupModel();

  const addMessage = (message: MessageItem, msgGroupKey?: string) => {
    const msg: MessageItem = {
      ...message,
      id: getUuid(5),
    };
    if (msgGroupKey) {
      const list = cloneDeep(messageListMap[msgGroupKey] || []);
      list.push(msg);
      __setMessageListMapByKey({ [msgGroupKey]: list });
    } else {
      messageGroups.forEach(group => {
        const list = cloneDeep(messageListMap[group.msgGroupKey] || []);
        list.push(msg);
        __setMessageListMapByKey({ [group.msgGroupKey]: list });
      });
    }
  };

  const clearMessages = (msgGroupKey?: string) => {
    if (msgGroupKey) {
      __setMessageListMapByKey({ [msgGroupKey]: [] });
    } else {
      __setMessageListMap({});
    }
  };

  const updateMessageToolCall = (p: {
    msgGroupKey: string;
    message: MessageItem;
    toolCall: ToolCallItem;
  }): MessageItem => {
    const { msgGroupKey, message, toolCall } = p;
    const toolCallList = cloneDeep(message.tool_calls || []);
    const index = toolCallList.findIndex(i => i.id === toolCall.id);
    if (index !== -1) {
      toolCallList[index] = toolCall;
    }
    const newMessage = { ...message, tool_calls: toolCallList.length ? toolCallList : undefined };
    __updateMessage(msgGroupKey, newMessage);
    return newMessage;
  };

  return {
    /** state */
    messageListMap,
    isRunningMap,

    /** action */
    __setMessageListMap,
    __setMessageListMapByKey,
    __updateMessage,
    __removeMessage,
    __setIsRunningMap,
    __setIsRunningMapByKey,

    addMessage,
    clearMessages,
    updateMessageToolCall,
  };
}

export default useMessageModel;
