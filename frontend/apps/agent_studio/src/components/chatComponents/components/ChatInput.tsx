import type { FC } from 'react';

import { memo, useMemo, useState } from 'react';
import { cn } from '@/utils/tw';
import { Button, Input } from 'antd';
import useMessageModel from '@/store/chat/messageModel';
import useConversationModel from '@/store/chat/conversationModel';
import { RoleEnum } from '@/interface/chat';
import useChat from '@/hooks/useChat';
import Tooltip from '@/lib/tooltip';
import useQueryRouter from '@/utils/router';

const { TextArea } = Input;

const ChatInput: FC = () => {
  const queryRouter = useQueryRouter();

  const { currentConversation, getConversationList, stopAllRequest, saveConversation } =
    useConversationModel();
  const { isRunningMap, addMessage } = useMessageModel();
  const { handleBeforeSendQueryMessage } = useChat();

  const [isComposing, setIsComposing] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>();
  const [inputRole, setInputRole] = useState<RoleEnum>(RoleEnum.USER);

  const isSomeChatRunning = useMemo(() => Object.values(isRunningMap).some(Boolean), [isRunningMap]);

  const handleSubmit = (txt?: string) => {
    if (isSomeChatRunning || !txt) return;

    setInputValue(undefined);
    handleBeforeSendQueryMessage({ role: inputRole, content: txt });
  };

  return (
    <div className={cn('flex items-center justify-center')}>
      <div
        className={cn(
          'w-full rounded-lg border border-solid border-default px-4 py-3',
          'mx-5 my-4',
          'max-w-[900px]',
        )}
      >
        <TextArea
          variant="borderless"
          placeholder="请输入你的问题，按shift+enter可换行"
          autoSize={{ minRows: 2, maxRows: 4 }}
          style={{ padding: 0, fontSize: 13 }}
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onCompositionStart={() => setIsComposing(true)}
          onCompositionEnd={() => setIsComposing(false)}
          onPressEnter={e => {
            const txt = (e.target as any)?.value;
            if (e.shiftKey) {
              setInputValue(txt);
              return;
            }
            if (isComposing) {
              return;
            }
            e.preventDefault();
            handleSubmit(txt);
          }}
        />

        <div className={cn('mt-3 flex items-center justify-between')}>
          <Tooltip title={`切换为 ${inputRole === RoleEnum.USER ? RoleEnum.ASSISTANT : RoleEnum.USER}`}>
            <Button
              size="small"
              style={{ textTransform: 'capitalize' }}
              onClick={() =>
                setInputRole(pre => (pre === RoleEnum.USER ? RoleEnum.ASSISTANT : RoleEnum.USER))
              }
            >
              {inputRole}
            </Button>
          </Tooltip>

          <div className={cn('flex items-center gap-3')}>
            <Button
              size="small"
              onClick={() => {
                if (inputValue) {
                  addMessage({ role: inputRole, content: inputValue });
                  setInputValue(undefined);
                }
              }}
              disabled={!inputValue}
            >
              添加消息
            </Button>

            {isSomeChatRunning ? (
              <Button
                size="small"
                type="primary"
                danger
                onClick={async () => {
                  stopAllRequest();
                  await saveConversation();
                  // 更新 url sid
                  const sid = new URLSearchParams(location.search).get('sid');
                  if (!sid) {
                    queryRouter.set('sid', currentConversation.sessionId);
                    await getConversationList();
                  }
                }}
              >
                Stop
              </Button>
            ) : (
              <Button
                size="small"
                type="primary"
                onClick={() => handleSubmit(inputValue)}
                disabled={!inputValue}
              >
                Run ↵
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(ChatInput);
