import type { FC } from 'react';

import { memo } from 'react';
import { cn } from '@/utils/tw';
import useConversationModel from '@/store/chat/conversationModel';
import Paragraph3Line from '@/components/paragraph3Line';
import { Button, Dropdown, MenuProps } from 'antd';
import { CopyIcon, CounterClockwiseClockIcon, Pencil2Icon, Share1Icon } from '@radix-ui/react-icons';
import useGlobalModel from '@/store/globalModel';
import useQueryRouter from '@/utils/router';
import useConversationManage from '@/hooks/useConversationManage';
import { useRouter } from 'next/navigation';
import { NAV_PATH_MAP } from '@/constant/nav';

interface ChatHeaderProps {
  isSharePage?: boolean;
}

const ChatHeader: FC<ChatHeaderProps> = ({ isSharePage }) => {
  const router = useRouter();
  const queryRouter = useQueryRouter();

  const { __setShowConversationListModal } = useGlobalModel();
  const { currentConversation, initConversation, clearConversation } = useConversationModel();

  const { shareConversation } = useConversationManage();

  const dropdownItems: MenuProps['items'] = [
    {
      key: '1',
      label: '保留配置',
      onClick: () => {
        if (isSharePage) {
          router.push(`${NAV_PATH_MAP.CHAT}?copyConfig=true`);
        } else {
          router.push(NAV_PATH_MAP.CHAT);
          initConversation({ keepCurrentCfg: true });
        }
      },
    },
    {
      key: '2',
      label: '清空配置',
      onClick: () => {
        clearConversation();
        router.push(NAV_PATH_MAP.CHAT);
        initConversation();
      },
    },
  ];

  const genHeaderTip = () => {
    if (isSharePage) {
      return <div className={cn('flex-shrink-0 text-[12px]')}>来自他人分享</div>;
    }
    if (currentConversation.isShared === 1) {
      return <div className={cn('flex-shrink-0 text-[12px]')}>⚠️当前会话已分享，请注意保密</div>;
    }
    return null;
  };

  return (
    <div
      className={cn(
        'flex h-[52px] flex-shrink-0 items-center justify-between gap-3 border-b border-solid border-default px-5',
      )}
    >
      <Paragraph3Line value={currentConversation.name} rows={1} style={{ fontWeight: 500, fontSize: 16 }} />

      <div className={cn('flex items-center gap-3')}>
        {genHeaderTip()}

        {isSharePage ? null : (
          <Button
            icon={<CounterClockwiseClockIcon className={cn('h-[13px] w-[13px]')} />}
            variant="solid"
            color="default"
            style={{ fontSize: 13, height: 28 }}
            onClick={() => __setShowConversationListModal(true)}
          >
            历史
          </Button>
        )}

        {isSharePage ? null : (
          <Button
            icon={<Share1Icon className={cn('h-[13px] w-[13px]')} />}
            variant="solid"
            color="default"
            style={{ fontSize: 13, height: 28 }}
            disabled={Boolean(!queryRouter.get('sid'))}
            onClick={() => shareConversation(currentConversation)}
          >
            分享
          </Button>
        )}

        <Dropdown menu={{ items: dropdownItems }}>
          <Button
            icon={<Pencil2Icon className={cn('h-[13px] w-[13px]')} />}
            variant="solid"
            color="default"
            style={{ fontSize: 13, height: 28 }}
          >
            新对话
          </Button>
        </Dropdown>

        {isSharePage && (
          <Button
            icon={<CopyIcon className={cn('h-[13px] w-[13px]')} />}
            variant="solid"
            color="default"
            style={{ fontSize: 13, height: 28 }}
            onClick={() => router.push(`${NAV_PATH_MAP.CHAT}?copyChat=true`)}
          >
            复制对话
          </Button>
        )}
      </div>
    </div>
  );
};

export default memo(ChatHeader);
