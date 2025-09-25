import type { FC } from 'react';
import type { MenuProps } from 'antd';

import { memo } from 'react';
import { cn } from '@/utils/tw';
import useConversationModel from '@/store/chat/conversationModel';
import Paragraph3Line from '@/components/paragraph3Line';
import { Button, Dropdown } from 'antd';
import { CopyIcon, CounterClockwiseClockIcon, Pencil2Icon, Share1Icon } from '@radix-ui/react-icons';
import useGlobalModel from '@/store/globalModel';
import useQueryRouter from '@/utils/router';
import useConversationManage from '@/hooks/useConversationManage';
import { NAV_PATH_MAP } from '@/constant/nav';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface ChatHeaderProps {
  isSharePage?: boolean;
}

const ChatHeader: FC<ChatHeaderProps> = ({ isSharePage }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const queryRouter = useQueryRouter();

  const { __setShowConversationListModal } = useGlobalModel();
  const { currentConversation, initConversation, clearConversation, cleanupAllConversationBackgroundTasks } =
    useConversationModel();

  const { shareConversation } = useConversationManage();

  const dropdownItems: MenuProps['items'] = [
    {
      key: '1',
      label: t('BUTTON_7'),
      onClick: () => {
        if (isSharePage) {
          navigate(`${NAV_PATH_MAP.CHAT}?copyConfig=true`);
        } else {
          navigate(NAV_PATH_MAP.CHAT);
          initConversation({ keepCurrentCfg: true });
        }
      },
    },
    {
      key: '2',
      label: t('BUTTON_8'),
      onClick: () => {
        // 新建对话时，先取消上一个会话的后台任务
        cleanupAllConversationBackgroundTasks();
        clearConversation();
        navigate(NAV_PATH_MAP.CHAT);
        initConversation();
      },
    },
  ];

  const genHeaderTip = () => {
    if (isSharePage) {
      return <div className={cn('flex-shrink-0 text-[12px]')}>{t('CHAT_29')}</div>;
    }
    if (currentConversation.isShared === 1) {
      return <div className={cn('flex-shrink-0 text-[12px]')}>{t('CHAT_30')}</div>;
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
            {t('BUTTON_9')}
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
            {t('BUTTON_1')}
          </Button>
        )}

        <Dropdown menu={{ items: dropdownItems }}>
          <Button
            icon={<Pencil2Icon className={cn('h-[13px] w-[13px]')} />}
            variant="solid"
            color="default"
            style={{ fontSize: 13, height: 28 }}
          >
            {t('BUTTON_10')}
          </Button>
        </Dropdown>

        {isSharePage && (
          <Button
            icon={<CopyIcon className={cn('h-[13px] w-[13px]')} />}
            variant="solid"
            color="default"
            style={{ fontSize: 13, height: 28 }}
            onClick={() => navigate(`${NAV_PATH_MAP.CHAT}?copyChat=true`)}
          >
            {t('BUTTON_11')}
          </Button>
        )}
      </div>
    </div>
  );
};

export default memo(ChatHeader);
