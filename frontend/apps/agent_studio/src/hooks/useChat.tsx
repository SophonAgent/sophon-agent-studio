import { INIT_CHAT_MODEL_CONFIG, INIT_GROUPS } from '@/constant/chat';
import useMcpTool from '@/hooks/useMcpTool';
import {
  ChatCompletionRequestParams,
  ChatDisplayConfig,
  ConversationBaseItem,
  ConversationItem,
  MessageItem,
  RoleEnum,
  ToolItem,
} from '@/interface/chat';
import { FunctionDefinition, FunctionInfo } from '@/interface/functionCall';
import { createChatCompletion } from '@/services/chat';
import useConversationModel, { conversationModel } from '@/store/chat/conversationModel';
import useFunctionCallModel, { functionCallModel } from '@/store/chat/functionCallModel';
import useMessageGroupModel, { messageGroupModel } from '@/store/chat/messageGroupModel';
import useMessageModel, { messageModel } from '@/store/chat/messageModel';
import useModelConfigModel from '@/store/chat/modelConfigModel';
import useSystemPromptModel, { systemPromptModel } from '@/store/chat/systemPromptModel';
import { tranJsonToObject } from '@/utils/json';
import useQueryRouter from '@/utils/router';
import { getUuid } from '@/utils/uuid';
import { cloneDeep, isEqual } from 'lodash-es';

function useChat() {
  const queryRouter = useQueryRouter();

  const {
    currentConversation,
    __setCurrentConversation,
    __setAbortControllerMapByKey,
    getConversationList,
    stopAllRequest,
    saveConversation,
  } = useConversationModel();
  const { __setMessageGroups, __addMessageGroup, __updateMessageGroupDisplayConfig, __setIsSyncMap } =
    useMessageGroupModel();
  const {
    __setSelectedPromptMap,
    __setSelectedPromptMapByKey,
    __setShowVariableMap,
    __setShowVariableMapByKey,
    getPromptByVariableReplace,
  } = useSystemPromptModel();
  const { modelList, chatModelConfigMap, __setChatModelConfigMap, __setChatModelConfigMapByKey } =
    useModelConfigModel();
  const {
    __setFunctionCallMap,
    __setFunctionCallMapByKey,
    __setEnableFunctionCallMap,
    __setEnableFunctionCallMapByKey,
    callMcpTool,
  } = useFunctionCallModel();
  const {
    __setMessageListMapByKey,
    __setMessageListMap,
    __updateMessage,
    __setIsRunningMapByKey,
    updateMessageToolCall,
  } = useMessageModel();

  const { getMcpToolConfigList } = useMcpTool();

  const sendMessage = async (msgGroupKey: string, requestParams: ChatCompletionRequestParams) => {
    const { messages, modelConfig, stream, tools } = requestParams;
    const abortController = conversationModel.getState().abortControllerMap[msgGroupKey];
    const displayConfig = messageGroupModel
      .getState()
      .messageGroups.find(item => item.msgGroupKey === msgGroupKey)?.displayConfig;
    const isAutoRunMcpTool = displayConfig?.autoRunMcpTool;

    __setIsRunningMapByKey({ [msgGroupKey]: true });
    let message: MessageItem | undefined;
    for await (const value of createChatCompletion(
      { messages, modelConfig, stream, tools },
      abortController,
    )) {
      __updateMessage(msgGroupKey, value);
      message = value;
    }

    // 自动调用 mcp tool
    let isCallMcpToolSuccess = true;
    if (isAutoRunMcpTool && message?.tool_calls?.length) {
      for (const tc of message.tool_calls) {
        const { result, success } = await callMcpTool({ msgGroupKey, toolCall: tc });
        const toolCall = cloneDeep(tc);
        toolCall.function.response = result;
        message = updateMessageToolCall({ msgGroupKey, message, toolCall });
        isCallMcpToolSuccess = success;
      }
    }

    const aborted = abortController?.signal?.aborted;
    if (aborted) {
      return;
    }

    // 自动更新会话
    await saveConversation();

    // 更新 url sid
    const sid = new URLSearchParams(location.search).get('sid');
    if (!sid) {
      queryRouter.set('sid', currentConversation.sessionId);
      await getConversationList();
    }

    // 自动继续执行会话
    if (isAutoRunMcpTool && !aborted && isCallMcpToolSuccess && message?.tool_calls?.length) {
      const toolMessages: MessageItem[] = message.tool_calls.map(item => ({
        role: RoleEnum.TOOL,
        content: item.function.response || '',
        tool_call_id: item.id,
        name: item.function.name,
      }));
      handleBeforeSendToolMessage(toolMessages, msgGroupKey);
    } else {
      __setIsRunningMapByKey({ [msgGroupKey]: false });
    }
  };

  const handleBeforeSendToolMessage = async (queryMessage: MessageItem[], queryMsgGroupKey: string) => {
    const group = messageGroupModel
      .getState()
      .messageGroups.find(item => item.msgGroupKey === queryMsgGroupKey);

    if (!group) {
      return;
    }

    // 是 Tool Message
    const isToolMessage = queryMessage[0].role === RoleEnum.TOOL;
    const { msgGroupKey, displayConfig } = group;
    const { stream } = displayConfig;

    __setAbortControllerMapByKey(msgGroupKey, new AbortController());

    // messages
    const messages: MessageItem[] = [];
    // 处理 system prompt
    const systemPrompt = systemPromptModel.getState().selectedPromptMap[msgGroupKey];
    if (systemPrompt?.promptContent) {
      const content = getPromptByVariableReplace(systemPrompt.promptContent, systemPrompt.variables);
      messages.push({ role: RoleEnum.SYSTEM, content });
    }
    // 历史 messages
    // 同步获取 messageList
    const messageList = messageModel.getState().messageListMap[msgGroupKey] || [];
    let msgList = cloneDeep(messageList);
    // 是 Tool Message
    if (isToolMessage) {
      const index = messageList.findIndex(i =>
        i.tool_calls?.find(j => j.id === queryMessage[0].tool_call_id),
      );
      msgList = messageList.slice(0, index + 1);
      messages.push(...msgList);
    }
    const queryMsgList: MessageItem[] = queryMessage.map(item => ({ ...item, id: getUuid(5) }));
    msgList.push(...queryMsgList);
    __setMessageListMapByKey({ [msgGroupKey]: msgList });
    messages.push(...queryMessage);

    // tools
    const functionCallList: ToolItem[] =
      functionCallModel
        .getState()
        .functionCallMap[msgGroupKey]?.filter(item => item.enabled)
        ?.map(({ qualifiedName, description, parameters }) => ({
          type: 'function',
          function: {
            name: qualifiedName,
            description,
            parameters,
          },
        })) || [];
    const enableFunctionCall = functionCallModel.getState().enableFunctionCallMap[msgGroupKey];
    const tools = enableFunctionCall && functionCallList.length ? functionCallList : undefined;

    /**
     * --Messages Required
     * System message: content role
     * User message: content role
     * Assistant message: content role tool_calls
     * Tool message: content role tool_call_id name
     */
    const requestParams: ChatCompletionRequestParams = {
      messages: messages.map(({ role, content, tool_calls, tool_call_id, name }) => ({
        role,
        content,
        tool_calls,
        tool_call_id,
        name,
      })),
      modelConfig: chatModelConfigMap[msgGroupKey],
      stream,
      tools,
    };

    await sendMessage(msgGroupKey, requestParams);
  };

  const handleBeforeSendQueryMessage = (queryMessage: MessageItem, queryMsgGroupKey?: string) => {
    messageGroupModel.getState().messageGroups.forEach(async group => {
      // 新消息
      const isNewMessage = Boolean(!queryMessage.id);
      if (!isNewMessage && queryMsgGroupKey && queryMsgGroupKey !== group.msgGroupKey) {
        // 重新生成，只重新生成点击消息组的那一条
        return;
      }

      const { msgGroupKey, displayConfig } = group;
      const { stream, multiTurn } = displayConfig;

      __setAbortControllerMapByKey(msgGroupKey, new AbortController());

      // messages
      const messages: MessageItem[] = [];
      // 处理 system prompt
      const systemPrompt = systemPromptModel.getState().selectedPromptMap[msgGroupKey];
      if (systemPrompt?.promptContent) {
        const content = getPromptByVariableReplace(systemPrompt.promptContent, systemPrompt.variables);
        messages.push({ role: RoleEnum.SYSTEM, content });
      }
      // 历史 messages
      // 同步获取 messageList
      const messageList = messageModel.getState().messageListMap[msgGroupKey] || [];
      if (isNewMessage) {
        // 新消息
        const msgList = cloneDeep(messageList);
        // 多轮带上所有消息
        if (multiTurn) {
          messages.push(...msgList);
        }
        const userMessage = { ...queryMessage, id: getUuid(5) };
        msgList.push(userMessage);
        __setMessageListMapByKey({ [msgGroupKey]: msgList });
        messages.push(userMessage);
      } else {
        // 旧消息 重新运行，发送上一条
        const index = messageList.findIndex(i => i.id === queryMessage.id);
        const msgList = messageList.slice(0, index);
        __setMessageListMapByKey({ [msgGroupKey]: msgList });
        if (multiTurn) {
          // 多轮 上一条及之前的所有消息
          messages.push(...msgList);
        } else {
          // 单轮 上一条消息
          messages.push(messageList[index - 1]);
        }
      }

      // tools
      const functionCallList: ToolItem[] =
        functionCallModel
          .getState()
          .functionCallMap[msgGroupKey]?.filter(item => item.enabled)
          ?.map(({ qualifiedName, description, parameters }) => ({
            type: 'function',
            function: {
              name: qualifiedName,
              description,
              parameters,
            },
          })) || [];
      const enableFunctionCall = functionCallModel.getState().enableFunctionCallMap[msgGroupKey];
      const tools = enableFunctionCall && functionCallList.length ? functionCallList : undefined;

      /**
       * --Messages Required
       * System message: content role
       * User message: content role
       * Assistant message: content role tool_calls
       * Tool message: content role tool_call_id name
       */
      const requestParams: ChatCompletionRequestParams = {
        messages: messages.map(({ role, content, tool_calls, tool_call_id, name }) => ({
          role,
          content,
          tool_calls,
          tool_call_id,
          name,
        })),
        modelConfig: chatModelConfigMap[msgGroupKey],
        stream,
        tools,
      };

      await sendMessage(msgGroupKey, requestParams);
    });
  };

  const checkPromptExist = (promptUid?: string) => {
    if (!promptUid) return undefined;
    return systemPromptModel.getState().promptList.find(item => item.uid === promptUid);
  };

  const getPromptName = (promptUid?: string) => {
    const prompt = checkPromptExist(promptUid);
    return prompt?.name;
  };

  const getLatestFunctionCallList = async (
    functionCallList: FunctionDefinition[],
  ): Promise<FunctionDefinition[]> => {
    const newFunctionCallList: FunctionDefinition[] = [];
    for (const functionCall of functionCallList) {
      if (functionCall.functionType === 'custom') {
        newFunctionCallList.push(functionCall);
        continue;
      }
      const res = await getMcpToolConfigList(functionCall.mcpServer?.qualifiedName);
      const f = res.find(item => item.qualifiedName === functionCall.qualifiedName);
      if (!f) {
        continue;
      }
      const isMcpToolModified =
        !isEqual(f.description, functionCall.mcpToolBase?.description) ||
        !isEqual(tranJsonToObject(f.inputSchema), functionCall.mcpToolBase?.parameters);
      newFunctionCallList.push({ ...functionCall, isMcpToolModified });
    }
    return newFunctionCallList;
  };

  const onConversationChange = async (item: ConversationItem) => {
    // 切换对话时，取消所有请求
    stopAllRequest();

    const {
      id,
      name,
      sessionId,
      isShared,
      extra,
      promptUid,
      promptVersion,
      promptDynamicValues,
      promptContent,
      completeContent,
      modelArgs,
    } = item;
    __setCurrentConversation({ id, name, sessionId, isShared });

    // extra信息，前端用
    const extraInfo = tranJsonToObject(extra) || {};
    const compareGroups: ConversationBaseItem[] = extraInfo.compareGroups || [];
    const displayConfigs: ChatDisplayConfig[] = extraInfo.displayConfigs || [];
    const functionCalls: FunctionInfo[] = extraInfo.functionCalls || [];

    /**
     * 基础组
     */
    const msgGroupKey = 'basic';
    // 设置组
    __setMessageGroups(
      displayConfigs[0] ? [{ msgGroupKey, name: '对比1', displayConfig: displayConfigs[0] }] : INIT_GROUPS,
    );
    // 设置 System Prompt
    __setSelectedPromptMap({
      [msgGroupKey]: {
        uid: checkPromptExist(promptUid) ? promptUid : undefined,
        name: getPromptName(promptUid),
        version: checkPromptExist(promptUid) ? promptVersion : undefined,
        variables: promptDynamicValues,
        promptContent,
      },
    });
    // 设置 Variables 开关
    __setShowVariableMap({
      [msgGroupKey]: Boolean(Object.values(promptDynamicValues || {}).filter(Boolean).length),
    });
    // 设置 Functions 开关
    __setEnableFunctionCallMap({ [msgGroupKey]: functionCalls[0]?.enableAll || false });
    // 设置 Functions
    const newFunctionCallList = await getLatestFunctionCallList(functionCalls[0]?.functions || []);
    __setFunctionCallMap({ [msgGroupKey]: newFunctionCallList });
    // 设置模型参数
    const {
      id: model_config_id,
      modelName: model,
      defaultParams = '{}',
      modalities,
      supportStream,
    } = modelList[0] || {};
    const modelConfig = {
      ...INIT_CHAT_MODEL_CONFIG,
      model_config_id,
      model,
      modalities,
      ...tranJsonToObject(defaultParams),
    };
    if (supportStream === 0) {
      // 非流式模型，关闭流式
      __updateMessageGroupDisplayConfig(msgGroupKey, { stream: false });
    }
    __setChatModelConfigMap({ [msgGroupKey]: modelArgs || modelConfig });
    // 设置消息
    __setMessageListMap({ [msgGroupKey]: completeContent || [] });

    /**
     * 其他对比组
     */
    if (!compareGroups.length) {
      return;
    }
    compareGroups.forEach(async (item, index) => {
      // 设置组
      const group = cloneDeep(INIT_GROUPS[0]);
      if (displayConfigs[index + 1]) {
        group.displayConfig = displayConfigs[index + 1];
      }
      group.msgGroupKey = getUuid(5);
      group.name = `对比${index + 2}`;
      __addMessageGroup(group);
      // 设置 System Prompt
      __setSelectedPromptMapByKey({
        [group.msgGroupKey]: {
          uid: checkPromptExist(item.promptUid) ? item.promptUid : undefined,
          name: getPromptName(item.promptUid),
          version: checkPromptExist(item.promptUid) ? item.promptVersion : undefined,
          variables: item.promptDynamicValues,
          promptContent: item.promptContent,
        },
      });
      // 设置 Variables 开关
      __setShowVariableMapByKey({
        [group.msgGroupKey]: Boolean(Object.values(item.promptDynamicValues || {}).filter(Boolean).length),
      });
      // 设置 Functions 开关
      __setEnableFunctionCallMapByKey({ [group.msgGroupKey]: functionCalls[index + 1]?.enableAll || false });
      // 设置 Functions
      const newFunctionCallList = await getLatestFunctionCallList(functionCalls[index + 1]?.functions || []);
      __setFunctionCallMapByKey({ [group.msgGroupKey]: newFunctionCallList });
      // 设置模型参数
      if (supportStream === 0) {
        // 非流式模型，关闭流式
        __updateMessageGroupDisplayConfig(group.msgGroupKey, { stream: false });
      }
      __setChatModelConfigMapByKey({ [group.msgGroupKey]: item.modelArgs || modelConfig });
      // 设置消息
      __setMessageListMapByKey({ [group.msgGroupKey]: item.completeContent || [] });
    });

    // 设置同步
    __setIsSyncMap({ system: false, function: false });
  };

  return { handleBeforeSendQueryMessage, handleBeforeSendToolMessage, onConversationChange };
}

export default useChat;
