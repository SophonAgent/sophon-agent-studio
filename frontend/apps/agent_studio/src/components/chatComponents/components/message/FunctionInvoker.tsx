import type { FC } from 'react';
import type { MessageItem, ToolCallItem } from '@/interface/chat';

import { memo, useMemo, useState } from 'react';
import { RoleEnum } from '@/interface/chat';
import { cn } from '@/utils/tw';
import Tooltip from '@/lib/tooltip';
import { Button, Input, Typography } from 'antd';
import useMessageModel from '@/store/chat/messageModel';
import useMessageGroupModel from '@/store/chat/messageGroupModel';
import { EyeOpenIcon, Pencil1Icon, RocketIcon } from '@radix-ui/react-icons';
import JsonEditor from '@/components/jsonEditor';
import JsonEditorModal from '@/components/jsonEditorModal';
import { cloneDeep } from 'lodash-es';
import { isJSON } from '@/utils/json';
import useChat from '@/hooks/useChat';
import useFunctionCallModel from '@/store/chat/functionCallModel';
import useConversationModel from '@/store/chat/conversationModel';

interface FunctionInvokerProps {
  msgGroupKey: string;
  messageItem: MessageItem;
  isReadonly?: boolean;
}

const FunctionInvoker: FC<FunctionInvokerProps> = ({ msgGroupKey, messageItem, isReadonly }) => {
  const { __setAbortControllerMapByKey } = useConversationModel();
  const { messageGroups } = useMessageGroupModel();
  const { isRunningMap, __setIsRunningMapByKey, updateMessageToolCall } = useMessageModel();
  const { functionCallMap, callMcpTool } = useFunctionCallModel();
  const { handleBeforeSendToolMessage } = useChat();

  const [showEditModal, setShowEditModal] = useState<boolean>(false);
  const [selectedToolCall, setSelectedToolCall] = useState<ToolCallItem>();

  const toolCallList = useMemo(() => messageItem.tool_calls || [], [messageItem]);

  const isRunning = useMemo(() => isRunningMap[msgGroupKey], [isRunningMap, msgGroupKey]);

  const displayConfig = useMemo(
    () => messageGroups.find(item => item.msgGroupKey === msgGroupKey)?.displayConfig,
    [messageGroups, msgGroupKey],
  );
  const isMultiToolOutput = useMemo(() => displayConfig?.multiToolOutput, [displayConfig]);
  const isMultiTurn = useMemo(() => displayConfig?.multiTurn, [displayConfig]);

  const functionCallList = useMemo(() => functionCallMap[msgGroupKey] || [], [functionCallMap, msgGroupKey]);

  const btnTip = useMemo(() => {
    if (isRunning) {
      return '';
    }
    if (isMultiTurn) {
      return 'Run to this message';
    } else {
      return 'Please switch to multi-round dialogue first';
    }
  }, [isMultiTurn, isRunning]);

  const isMcpTool = (item: ToolCallItem) =>
    functionCallList.map(item => item.qualifiedName).includes(item.function.name);

  const handleCallMcpTool = async (item: ToolCallItem) => {
    // 清空 output
    const toolCall1 = cloneDeep(item);
    toolCall1.function.response = '';
    updateMessageToolCall({
      msgGroupKey,
      message: messageItem,
      toolCall: toolCall1,
    });

    // 调用 mcp tool，生成 output
    __setAbortControllerMapByKey(msgGroupKey, new AbortController());
    __setIsRunningMapByKey({ [msgGroupKey]: true });
    const { result } = await callMcpTool({ msgGroupKey, toolCall: item });
    const toolCall2 = cloneDeep(item);
    toolCall2.function.response = result;
    updateMessageToolCall({
      msgGroupKey,
      message: messageItem,
      toolCall: toolCall2,
    });
    __setIsRunningMapByKey({ [msgGroupKey]: false });
  };

  const handleRun = () => {
    if (!isMultiTurn || isRunning) return;

    const toolMessages: MessageItem[] = toolCallList.map(item => ({
      role: RoleEnum.TOOL,
      content: item.function.response || '',
      tool_call_id: item.id,
      name: item.function.name,
    }));
    handleBeforeSendToolMessage(toolMessages, msgGroupKey);
  };

  const onEditArguments = (v: ToolCallItem['function']['arguments']) => {
    if (selectedToolCall) {
      const toolCall = cloneDeep(selectedToolCall);
      toolCall.function.arguments = isJSON(v) ? JSON.stringify(JSON.parse(v)) : v;
      updateMessageToolCall({
        msgGroupKey,
        message: messageItem,
        toolCall,
      });
    }
    onCloseModal();
  };

  const onEditOutput = (item: ToolCallItem, v?: ToolCallItem['function']['response']) => {
    const toolCall = cloneDeep(item);
    toolCall.function.response = v;
    updateMessageToolCall({
      msgGroupKey,
      message: messageItem,
      toolCall,
    });
  };

  const onCloseModal = () => {
    setShowEditModal(false);
    setSelectedToolCall(undefined);
  };

  const genToolCallHeader = (item: ToolCallItem) => {
    return (
      <div className={cn('flex items-center text-[12px]')}>
        <span className={cn('font-medium')}>
          {item.function.name}
          <span>(</span>
        </span>
        <div className={cn('flex flex-1 items-center overflow-hidden')}>
          <Typography.Paragraph
            style={{
              margin: '0 4px',
              overflow: 'hidden',
              fontWeight: 300,
              fontSize: 12,
              color: 'var(--text-primary)',
            }}
          >
            {item.function.arguments}
          </Typography.Paragraph>
          <div className={cn('flex items-center gap-1')}>
            <Tooltip title={isReadonly ? 'View' : 'Edit'}>
              <Button
                type="link"
                size="small"
                icon={
                  isReadonly ? (
                    <EyeOpenIcon className={cn('h-[12px] w-[12px]')} />
                  ) : (
                    <Pencil1Icon className={cn('h-[12px] w-[12px]')} />
                  )
                }
                onClick={() => {
                  const toolCall = cloneDeep(item);
                  if (isJSON(toolCall.function.arguments)) {
                    toolCall.function.arguments = JSON.stringify(
                      JSON.parse(toolCall.function.arguments),
                      null,
                      2,
                    );
                  }
                  setSelectedToolCall(toolCall);
                  setShowEditModal(true);
                }}
                disabled={isRunning}
              />
            </Tooltip>
            <span className={cn('font-medium')}>)</span>
          </div>
        </div>
      </div>
    );
  };

  const genToolCallContent = (item: ToolCallItem) => {
    return (
      <div className={cn('mt-2 flex items-center gap-1 text-[12px]')}>
        {isMcpTool(item) && !isReadonly ? (
          <Tooltip title="Call MCP Tool">
            <Button
              type="link"
              icon={<RocketIcon />}
              onClick={() => handleCallMcpTool(item)}
              disabled={isRunning}
            />
          </Tooltip>
        ) : null}
        <div className={cn('font-medium')}>output:</div>
        {isMultiToolOutput ? (
          <JsonEditor
            value={item.function.response ?? ''}
            onChange={v => onEditOutput(item, v)}
            isReadonly={isRunning || isReadonly}
          />
        ) : (
          <Input
            placeholder="Submit output e.g. {success: true}"
            variant="underlined"
            value={item.function.response ?? ''}
            style={{ background: 'transparent', fontSize: 12 }}
            onChange={e => onEditOutput(item, e.target.value)}
            disabled={isRunning || isReadonly}
          />
        )}
      </div>
    );
  };

  return (
    <div className={cn('mt-2 flex flex-col gap-2 border-t border-solid border-default pt-2')}>
      {/* 函数调用列表 */}
      {toolCallList.map(item => (
        <div key={item.id}>
          {genToolCallHeader(item)}
          {genToolCallContent(item)}
        </div>
      ))}

      {isReadonly ? null : (
        <div className={cn('flex justify-end')}>
          <Tooltip title={btnTip}>
            <Button size="small" type="primary" onClick={handleRun} disabled={!isMultiTurn || isRunning}>
              Run ↵
            </Button>
          </Tooltip>
        </div>
      )}

      {showEditModal && (
        <JsonEditorModal
          title={isReadonly ? 'View Tool Arguments' : 'Edit Tool Arguments'}
          onCancel={onCloseModal}
          initialValues={selectedToolCall?.function?.arguments}
          onOk={onEditArguments}
          isReadonly={isReadonly}
        />
      )}
    </div>
  );
};

export default memo(FunctionInvoker);
