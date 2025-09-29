import type { FC } from 'react';

import { memo, useMemo } from 'react';
import { cn } from '@/utils/tw';
import SystemPromptPanel from './components/SystemPromptPanel';
import { Splitter } from 'antd';
import FunctionPanel from './components/FunctionPanel';
import Toolbar from './components/Toolbar';
import ChatInput from './components/ChatInput';
import MessagePanel from './components/MessagePanel';
import useMessageGroupModel from '@/store/chat/messageGroupModel';

const { Panel } = Splitter;

interface NormalChatProps {
  isReadonly?: boolean;
}

const NormalChat: FC<NormalChatProps> = ({ isReadonly }) => {
  const { messageGroups } = useMessageGroupModel();

  const msgGroupKey = useMemo(() => messageGroups[0].msgGroupKey, [messageGroups]);

  return (
    <div className={cn('flex h-full')}>
      <Splitter
        layout="vertical"
        style={{
          height: '100%',
          width: 350,
          borderRight: '1px solid var(--border-default)',
        }}
      >
        <Panel defaultSize="70%" min="10%" max="90%">
          <div className={cn('h-full px-5 py-4')}>
            <SystemPromptPanel msgGroupKey={msgGroupKey} isReadonly={isReadonly} />
          </div>
        </Panel>

        <Panel>
          <div className={cn('h-full overflow-hidden px-5 py-4')}>
            <FunctionPanel msgGroupKey={msgGroupKey} isReadonly={isReadonly} />
          </div>
        </Panel>
      </Splitter>

      <div className={cn('flex flex-1 flex-col overflow-hidden')}>
        <Toolbar msgGroupKey={msgGroupKey} isReadonly={isReadonly} />
        <MessagePanel
          className={cn('flex-1', isReadonly ? 'mb-4' : '')}
          msgGroupKey={msgGroupKey}
          isReadonly={isReadonly}
        />
        {isReadonly ? null : <ChatInput />}
      </div>
    </div>
  );
};

export default memo(NormalChat);
