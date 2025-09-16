import type { FC } from 'react';

import { memo, useEffect } from 'react';
import Modal from '@/lib/modal';
import JsonEditor from '@/components/jsonEditor';
import { cn } from '@/utils/tw';
import useMessageGroupModel from '@/store/chat/messageGroupModel';
import useModelConfigModel from '@/store/chat/modelConfigModel';
import { MessageItem, RoleEnum, ToolItem } from '@/interface/chat';
import useSystemPromptModel from '@/store/chat/systemPromptModel';
import useMessageModel from '@/store/chat/messageModel';
import useFunctionCallModel from '@/store/chat/functionCallModel';
import useConversationModel from '@/store/chat/conversationModel';
import { getUuid } from '@/utils/uuid';
import { tranJsonToObject } from '@/utils/json';
import { Form } from 'antd';
import { JsonValidator } from '@/utils/validator';
import { INIT_CHAT_MODEL_CONFIG, INIT_DISPLAY_CONFIG } from '@/constant/chat';
import { FunctionDefinition } from '@/interface/functionCall';
import { cloneDeep } from 'lodash-es';

const { Item: FormItem } = Form;

interface RequestModalProps {
  title: string;
  msgGroupKey: string;
  showCurrentRequest?: boolean;
  onCancel: () => void;
}

const RequestModal: FC<RequestModalProps> = ({ title, msgGroupKey, showCurrentRequest, onCancel }) => {
  const [form] = Form.useForm();

  const { __setCurrentConversation, stopAllRequest } = useConversationModel();
  const { messageGroups, __setMessageGroups } = useMessageGroupModel();
  const { chatModelConfigMap, modelList, __setChatModelConfigMap } = useModelConfigModel();
  const { selectedPromptMap, __setSelectedPromptMap, __setShowVariableMap } = useSystemPromptModel();
  const { messageListMap, __setMessageListMap } = useMessageModel();
  const { functionCallMap, enableFunctionCallMap, __setFunctionCallMap, __setEnableFunctionCallMap } =
    useFunctionCallModel();

  useEffect(() => {
    if (!showCurrentRequest) return;
    form.setFieldValue('request', JSON.stringify(tranRequest(), null, 2));
  }, [msgGroupKey, showCurrentRequest]);

  const tranRequest = () => {
    // stream
    const stream = messageGroups.find(item => item.msgGroupKey === msgGroupKey)?.displayConfig?.stream;
    // modelConfig
    const modelConfig = chatModelConfigMap[msgGroupKey] || {};
    // messages
    const messages: MessageItem[] = [];
    const prompt = selectedPromptMap[msgGroupKey]?.promptContent;
    if (prompt) {
      messages.push({ role: RoleEnum.SYSTEM, content: prompt });
    }
    let messageList = messageListMap[msgGroupKey] || [];
    messageList = messageList.map(({ role, content, name, tool_call_id, tool_calls }) => ({
      role,
      content,
      name,
      tool_call_id,
      tool_calls,
    }));
    if (messageList?.length) {
      messages.push(...messageList);
    }
    // tools
    const functionCallList: ToolItem[] = functionCallMap[msgGroupKey]
      ?.filter(item => item.enabled)
      ?.map(({ qualifiedName, description, parameters }) => ({
        type: 'function',
        function: {
          name: qualifiedName,
          description,
          parameters,
        },
      }));
    const enableFunctionCall = enableFunctionCallMap[msgGroupKey];
    const tools = enableFunctionCall && functionCallList.length ? functionCallList : undefined;

    const params = {
      cache: false,
      stream,
      ...modelConfig,
      messages,
      tools,
    };
    return params;
  };

  const handleSubmit = async () => {
    const { request } = await form.validateFields();
    if (!request) {
      onCancel();
      return;
    }

    stopAllRequest();
    __setCurrentConversation({ name: '新对话', sessionId: getUuid(8) });

    const parsed = tranJsonToObject(request);
    const { stream, messages = [], tools = [], ...modelConfig } = parsed;

    const msgGroupKey = 'basic';
    // 设置组
    const displayConfig = cloneDeep(INIT_DISPLAY_CONFIG);
    displayConfig.stream = stream;
    __setMessageGroups([{ msgGroupKey, name: '对比1', displayConfig }]);
    // 设置 System Prompt
    const promptContent = messages[0]?.role === RoleEnum.SYSTEM ? messages[0]?.content : '';
    __setSelectedPromptMap({ [msgGroupKey]: { promptContent } });
    // 设置 Variables 开关
    __setShowVariableMap({ [msgGroupKey]: false });
    // 设置 Functions 开关
    __setEnableFunctionCallMap({ [msgGroupKey]: Boolean(tools?.length) });
    // 设置 Functions
    const functionCallList: FunctionDefinition[] = tools.map((item: ToolItem) => ({
      id: getUuid(),
      enabled: true,
      qualifiedName: item.function?.name || '',
      description: item.function?.description,
      parameters: item.function?.parameters,
      functionType: 'custom',
    }));
    __setFunctionCallMap({ [msgGroupKey]: functionCallList });
    // 设置模型参数
    const model =
      modelList.find(item => item.modelName === modelConfig.model)?.modelName || modelList[0]?.modelName;
    __setChatModelConfigMap({ [msgGroupKey]: { ...INIT_CHAT_MODEL_CONFIG, ...modelConfig, model } });
    // 设置消息
    const toolMessageList = messages.filter((item: MessageItem) => item.role === RoleEnum.TOOL);
    const messageList = messages
      .filter((item: MessageItem) => item.role !== RoleEnum.SYSTEM)
      .map((item: MessageItem) => {
        const id = item.id || getUuid(5);
        const toolCallList = item.tool_calls?.map(tc => {
          const response = toolMessageList.find((f: MessageItem) => f.tool_call_id === tc?.id)?.content || '';
          return { ...tc, function: { ...tc?.function, response } };
        });
        return { ...item, id, tool_calls: toolCallList };
      });
    __setMessageListMap({ [msgGroupKey]: messageList });

    onCancel();
  };

  return (
    <Modal
      open
      title={title}
      size="large"
      onCancel={onCancel}
      onOk={handleSubmit}
      footer={showCurrentRequest ? null : undefined}
    >
      <Form form={form}>
        <FormItem name="request" rules={JsonValidator}>
          <JsonEditor
            className={cn('h-[600px]')}
            isReadonly={showCurrentRequest}
            placeholder={`{
  "model": "xxx",
  "messages": [
    {
      "role": "system",
      "content": "xxx"
    },
    {
      "role": "user",
      "content": "xxx"
    }
  ]
}`}
          />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default memo(RequestModal);
