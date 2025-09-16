import type { FC, ReactNode } from 'react';

import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { MessageItem, RoleEnum } from '@/interface/chat';
import { cn } from '@/utils/tw';
import UserIcon from '@/icons/userIcon';
import RobotIcon from '@/icons/robotIcon';
import ToolIcon from '@/icons/toolIcon';
import ErrorIcon from '@/icons/errorIcon';
import { Button } from 'antd';
import useMessageModel from '@/store/chat/messageModel';
import TokenIcon from '@/icons/tokenIcon';
import {
  ClockIcon,
  DotsHorizontalIcon,
  MinusCircledIcon,
  Pencil1Icon,
  ReloadIcon,
} from '@radix-ui/react-icons';
import Tooltip from '@/lib/tooltip';
import CopyButton from '@/components/copyButton';
import useChat from '@/hooks/useChat';

interface MessageToolProps {
  msgGroupKey: string;
  messageItem: MessageItem;
  onEdit: () => void;
  isReadonly?: boolean;
}

const MessageTool: FC<MessageToolProps> = ({ msgGroupKey, messageItem, onEdit, isReadonly }) => {
  const btnStyle = { height: 22, width: 22, color: 'var(--text-secondary)' };

  const { isRunningMap, __updateMessage, __removeMessage } = useMessageModel();
  const { handleBeforeSendQueryMessage } = useChat();

  const boxRef = useRef<HTMLDivElement>(null);
  const [collapseBtns, setCollapseBtns] = useState<boolean>(false);

  const isRunning = useMemo(() => isRunningMap[msgGroupKey], [msgGroupKey, isRunningMap]);
  const isRoleDisabled = useMemo(
    () =>
      [RoleEnum.ERROR, RoleEnum.TOOL].includes(messageItem.role) ||
      Boolean(messageItem.tool_calls?.length) ||
      isReadonly,
    [messageItem],
  );

  const canRefresh = useMemo(
    () => [RoleEnum.ASSISTANT, RoleEnum.ERROR].includes(messageItem.role) && !isRunning && !isReadonly,
    [messageItem.role, isRunning],
  );
  const canEdit = useMemo(
    () => [RoleEnum.USER, RoleEnum.ASSISTANT].includes(messageItem.role) && !isRunning && !isReadonly,
    [isRunning],
  );
  const canRemove = useMemo(() => !isRunning && !isReadonly, [isRunning]);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        if (!isReadonly && width <= 123) {
          setCollapseBtns(true);
        } else {
          setCollapseBtns(false);
        }
      }
    });
    resizeObserver.observe(box);
    return () => {
      resizeObserver.unobserve(box);
    };
  }, [isReadonly]);

  const iconMap: Partial<Record<RoleEnum, ReactNode>> = {
    [RoleEnum.USER]: <UserIcon className={cn('h-[12px] w-[12px] text-[#27B56E]')} />,
    [RoleEnum.ASSISTANT]: <RobotIcon className={cn('h-[12px] w-[12px] text-[#4169E1]')} />,
    [RoleEnum.TOOL]: <ToolIcon className={cn('h-[12px] w-[12px] text-[#FF8C00]')} />,
    [RoleEnum.ERROR]: <ErrorIcon className={cn('h-[12px] w-[12px] text-[#DC143C]')} />,
  };

  const roleTooltipMap: Partial<Record<RoleEnum, string>> = {
    [RoleEnum.USER]: '切换为 Assistant',
    [RoleEnum.ASSISTANT]: '切换为 User',
  };

  const tokenTooltipContent = (
    <div>
      <div>Usage:</div>
      <div>Completion tokens: {messageItem.completion_tokens}</div>
      {messageItem.prompt_tokens ? <div>Prompt tokens: {messageItem.prompt_tokens}</div> : null}
      {messageItem.total_tokens ? <div>Total tokens: {messageItem.total_tokens}</div> : null}
    </div>
  );

  const genActions = () => {
    return (
      <div className={cn('flex items-center gap-1')}>
        {/* 重新生成 */}
        {canRefresh ? (
          <Tooltip title="重新生成">
            <Button
              icon={<ReloadIcon className={cn('h-[13px] w-[13px]')} />}
              type="link"
              style={btnStyle}
              onClick={() => handleBeforeSendQueryMessage(messageItem, msgGroupKey)}
            />
          </Tooltip>
        ) : null}

        {/* 复制 */}
        <CopyButton type="link" style={btnStyle} value={messageItem.content} size="small" />

        {/* 编辑 */}
        {canEdit ? (
          <Tooltip title="编辑">
            <Button
              icon={<Pencil1Icon className={cn('h-[13px] w-[13px]')} />}
              type="link"
              style={btnStyle}
              onClick={() => onEdit()}
            />
          </Tooltip>
        ) : null}

        {/* 删除 */}
        {canRemove ? (
          <Tooltip title="删除">
            <Button
              icon={<MinusCircledIcon className={cn('h-[13px] w-[13px]')} />}
              type="link"
              style={btnStyle}
              onClick={() => __removeMessage(msgGroupKey, messageItem)}
            />
          </Tooltip>
        ) : null}
      </div>
    );
  };

  return (
    <div className={cn('flex items-center justify-between gap-2')}>
      <div className={cn('flex items-center gap-2')}>
        <Tooltip title={isRoleDisabled ? '' : roleTooltipMap[messageItem.role]}>
          <Button
            style={{
              textTransform: 'capitalize',
              height: 22,
              padding: '0 8px',
              fontWeight: 600,
              border: 'none',
              boxShadow: 'none',
              background: 'var(--bg-elevated-secondary)',
            }}
            disabled={isRoleDisabled}
            onClick={() =>
              __updateMessage(msgGroupKey, {
                ...messageItem,
                role: messageItem.role === RoleEnum.USER ? RoleEnum.ASSISTANT : RoleEnum.USER,
              })
            }
          >
            <div className={cn('flex items-center gap-2')}>
              <div>{iconMap[messageItem.role]}</div>
              <div className={cn('text-[12px] text-foreground-primary')}>{messageItem.role}</div>
            </div>
          </Button>
        </Tooltip>

        {!isRunning && messageItem.completion_tokens ? (
          <Tooltip title={tokenTooltipContent}>
            <div className={cn('flex items-center gap-[2px] text-[12px] text-foreground-tertiary')}>
              <TokenIcon className={cn('h-[12px] w-[12px]')} />
              {messageItem.completion_tokens}
            </div>
          </Tooltip>
        ) : null}

        {!isRunning && messageItem.costTime ? (
          <div className={cn('flex items-center gap-[2px] text-[12px] text-foreground-tertiary')}>
            <ClockIcon className={cn('h-[12px] w-[12px]')} />
            {(messageItem.costTime / 1000).toFixed(2)}s
          </div>
        ) : null}
      </div>

      <div className={cn('hidden flex-1 justify-end', 'group-hover/msg:flex')} ref={boxRef}>
        {collapseBtns ? (
          <Tooltip title={genActions()} color="#fff">
            <Button
              icon={<DotsHorizontalIcon className={cn('h-[13px] w-[13px]')} />}
              type="link"
              style={btnStyle}
            />
          </Tooltip>
        ) : (
          genActions()
        )}
      </div>
    </div>
  );
};

export default memo(MessageTool);
