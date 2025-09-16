import type { FC } from 'react';

import { memo, useMemo, useState } from 'react';
import { MessageItem, RoleEnum } from '@/interface/chat';
import { cn } from '@/utils/tw';
import { Collapse, Input } from 'antd';
import { TriangleDownIcon, TriangleRightIcon } from '@radix-ui/react-icons';
import MessageTool from './MessageTool';
import useMessageGroupModel from '@/store/chat/messageGroupModel';
import ReactMarkdown from '@/components/reactMarkdown';
import useMessageModel from '@/store/chat/messageModel';
import FunctionInvoker from './FunctionInvoker';

const { TextArea } = Input;

interface MessageProps {
  msgGroupKey: string;
  messageItem: MessageItem;
  isReadonly?: boolean;
}

const Message: FC<MessageProps> = ({ msgGroupKey, messageItem, isReadonly }) => {
  const styles = {
    header: {
      fontSize: 13,
      color: 'var(--text-primary)',
      fontWeight: 500,
      alignItems: 'center',
      padding: '8px 12px',
    },
    body: {
      fontSize: 13,
    },
  };

  const { messageGroups } = useMessageGroupModel();
  const { __updateMessage } = useMessageModel();

  const [activeKey, setActiveKey] = useState<string[]>(['reasoningContent']);
  const [isInEditing, setIsInEditing] = useState<boolean>(false);

  const displayConfig = useMemo(
    () => messageGroups.find(item => item.msgGroupKey === msgGroupKey)?.displayConfig,
    [messageGroups, msgGroupKey],
  );
  const isMarkdown = useMemo(() => displayConfig?.markdown, [displayConfig]);

  const genContent = (content: string) => {
    if (isMarkdown && messageItem.role !== RoleEnum.USER) {
      return <ReactMarkdown content={content} />;
    }
    return <div className={cn('whitespace-pre-wrap break-words text-[13px] leading-[24px]')}>{content}</div>;
  };

  if (messageItem.role === RoleEnum.TOOL) {
    return null;
  }
  return (
    <div
      className={cn(
        'group/msg flex min-h-[76px] flex-col gap-2 overflow-hidden rounded-lg border border-solid border-transparent px-[15px] py-[10px] text-[13px] text-foreground-primary',
        'hover:bg-background-elevated-secondary',
        isInEditing ? 'border-select' : '',
      )}
    >
      <MessageTool
        msgGroupKey={msgGroupKey}
        messageItem={messageItem}
        onEdit={() => {
          setActiveKey([]);
          setIsInEditing(true);
        }}
        isReadonly={isReadonly}
      />

      {/* 思考过程 */}
      {messageItem.reasoningContent ? (
        <Collapse
          activeKey={activeKey}
          expandIcon={({ isActive }) =>
            isActive ? (
              <TriangleDownIcon width={16} height={16} />
            ) : (
              <TriangleRightIcon width={16} height={16} />
            )
          }
          onChange={setActiveKey}
          size="small"
          items={[
            {
              key: 'reasoningContent',
              label: '思考过程',
              children: genContent(messageItem.reasoningContent),
              styles,
            },
          ]}
        />
      ) : null}

      {/* 内容 */}
      {isInEditing ? (
        <TextArea
          variant="borderless"
          autoFocus
          defaultValue={messageItem.content}
          style={{ padding: 0, fontSize: 13 }}
          autoSize={{ minRows: 8, maxRows: 8 }}
          onBlur={e => {
            setIsInEditing(false);
            const content = e.target.value;
            __updateMessage(msgGroupKey, { ...messageItem, content });
          }}
        />
      ) : (
        genContent(messageItem.content)
      )}

      {/* 工具调用 */}
      {messageItem.tool_calls?.length ? (
        <FunctionInvoker msgGroupKey={msgGroupKey} messageItem={messageItem} isReadonly={isReadonly} />
      ) : null}
    </div>
  );
};

export default memo(Message);
