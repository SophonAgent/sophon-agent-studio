import type { FC } from 'react';

import { memo, useEffect, useMemo, useRef, useState } from 'react';
import Spin from '@/lib/spin';
import useMessageModel from '@/store/chat/messageModel';
import { cn } from '@/utils/tw';
import Message from './message';
import { Button } from 'antd';
import { ArrowDownIcon } from '@radix-ui/react-icons';

interface MessagePanelProps {
  className?: string;
  msgGroupKey: string;
  isReadonly?: boolean;
}

const MessagePanel: FC<MessagePanelProps> = ({ className, msgGroupKey, isReadonly }) => {
  const { messageListMap, isRunningMap } = useMessageModel();

  const boxRef = useRef<HTMLDivElement>(null);
  const [isAutoScroll, setIsAutoScroll] = useState<boolean>(true);

  const messageList = useMemo(() => messageListMap[msgGroupKey] || [], [messageListMap, msgGroupKey]);
  const isRunning = useMemo(() => isRunningMap[msgGroupKey], [isRunningMap, msgGroupKey]);

  const handleScroll = () => {
    const box = boxRef.current;
    if (!box) return;

    const { scrollTop, scrollHeight, offsetHeight } = box;
    // 是否在底部
    const isNearBottom = scrollHeight - scrollTop - offsetHeight < 1;
    setIsAutoScroll(isNearBottom);
  };

  useEffect(() => {
    const box = boxRef.current;
    if (!box) {
      return;
    }
    box.addEventListener('scroll', handleScroll);
    return () => {
      box.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    if (isAutoScroll) {
      box.scrollTop = box.scrollHeight;
    }
  }, [isRunning, JSON.stringify(messageList)]);

  const scrollToBottom = () => {
    const box = boxRef.current;
    if (!box) return;
    box.scrollTop = box.scrollHeight;
    setIsAutoScroll(true);
  };

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <div
        className={cn('__stable-scrollbar h-full overflow-hidden hover:overflow-auto')}
        ref={boxRef}
        style={{ scrollBehavior: 'smooth' }}
      >
        <div className={cn('flex flex-col gap-2 px-5')}>
          {messageList.map(item => (
            <Message key={item.id} msgGroupKey={msgGroupKey} messageItem={item} isReadonly={isReadonly} />
          ))}
          {isRunning ? (
            <div className={cn('flex items-center gap-2 px-[15px] text-[13px] text-foreground-tertiary')}>
              <Spin size="small" />
              <span>结果生成中...</span>
            </div>
          ) : null}
        </div>

        {!isAutoScroll && (
          <div className={cn('absolute bottom-1 left-[50%]')}>
            <Button shape="circle" icon={<ArrowDownIcon />} onClick={scrollToBottom} />
          </div>
        )}
      </div>
    </div>
  );
};

export default memo(MessagePanel);
