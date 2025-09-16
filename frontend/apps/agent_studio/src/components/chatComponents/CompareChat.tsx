import type { FC } from 'react';

import { memo } from 'react';
import { cn } from '@/utils/tw';
import useMessageGroupModel from '@/store/chat/messageGroupModel';
import ChatInput from './components/ChatInput';
import MessagePanel from './components/MessagePanel';
import Toolbar from './components/Toolbar';
import SystemPromptPanel from './components/SystemPromptPanel';
import FunctionPanel from './components/FunctionPanel';

interface CompareChatProps {
  isReadonly?: boolean;
}

const CompareChat: FC<CompareChatProps> = ({ isReadonly }) => {
  const { messageGroups } = useMessageGroupModel();

  return (
    <div className={cn('flex h-full flex-col')}>
      <div className={cn('flex flex-1 overflow-hidden')}>
        {messageGroups.map((group, index) => {
          const { msgGroupKey } = group;
          return (
            <div
              key={msgGroupKey}
              className={cn(
                'flex flex-col overflow-hidden',
                messageGroups.length === 2 ? 'w-1/2' : 'w-1/3',
                index === messageGroups.length - 1 ? '' : 'border-r border-solid border-default',
              )}
            >
              <div className={cn('border-b border-solid border-default')}>
                <Toolbar msgGroupKey={msgGroupKey} isReadonly={isReadonly} />
              </div>
              <div className={cn('border-b border-solid border-default')}>
                <SystemPromptPanel msgGroupKey={msgGroupKey} isReadonly={isReadonly} />
              </div>
              <div className={cn('border-b border-solid border-default')}>
                <FunctionPanel msgGroupKey={msgGroupKey} isReadonly={isReadonly} />
              </div>
              <MessagePanel
                className={cn('mt-4 flex-1', isReadonly ? 'mb-4' : '')}
                msgGroupKey={msgGroupKey}
                isReadonly={isReadonly}
              />
            </div>
          );
        })}
      </div>

      {isReadonly ? null : <ChatInput />}
    </div>
  );
};

export default memo(CompareChat);
