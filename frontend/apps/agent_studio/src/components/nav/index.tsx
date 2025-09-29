import type { FC } from 'react';

import Logo from '@/icons/logo';
import { cn } from '@/utils/tw';
import { useEffect, useState } from 'react';
import { Button, Skeleton } from 'antd';
import {
  DotsHorizontalIcon,
  MagnifyingGlassIcon,
  Pencil2Icon,
  PinLeftIcon,
  PinRightIcon,
} from '@radix-ui/react-icons';
import NavMenuItem from './NavMenuItem';
import useConversationModel from '@/store/chat/conversationModel';
import ConversationMenuItem from './ConversationMenuItem';
import Tooltip from '@/lib/tooltip';
import { NAV_LIST, NAV_PATH_MAP } from '@/constant/nav';
import useGlobalModel from '@/store/globalModel';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import ChineseLngIcon from '@/icons/chineseLngIcon';
import EnglishLngIcon from '@/icons/englishLngIcon';
import useQueryRouter from '@/utils/router';

const Nav: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
  const queryRouter = useQueryRouter();

  const { __setShowConversationListModal } = useGlobalModel();
  const {
    conversationList,
    isConversationListLoading,
    __updateCurrentConversation,
    initConversation,
    clearConversation,
    cleanupAllConversationBackgroundTasks,
  } = useConversationModel();

  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const isEnglishLng = i18n.language === 'en';

  const handleResize = () => {
    if (window.innerWidth <= 1280) {
      setIsExpanded(false);
    } else {
      setIsExpanded(true);
    }
  };

  useEffect(() => {
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div
      className={cn(
        'flex h-full flex-col border-r border-solid border-light bg-background-elevated-secondary',
        'flex-shrink-0 overflow-hidden transition-all duration-300 ease-in-out',
        isExpanded ? 'w-[260px]' : 'w-[52px] cursor-e-resize',
      )}
      onClick={() => !isExpanded && setIsExpanded(true)}
    >
      <div className={cn('flex h-[52px] flex-shrink-0 items-center justify-between px-[8px]')}>
        <div className={cn('group/logo')}>
          <div
            className={cn(
              'flex h-[36px] w-[36px] items-center justify-center',
              isExpanded ? '' : 'group-hover/logo:hidden',
            )}
          >
            <Logo className={cn('text-foreground-primary')} />
          </div>
          {!isExpanded && (
            <div className={cn('hidden group-hover/logo:flex')}>
              <Tooltip title={t('NAV_8')} placement="right">
                <Button
                  type="text"
                  style={{ height: 36, width: 36, cursor: 'e-resize' }}
                  icon={<PinRightIcon />}
                  onClick={e => {
                    e.stopPropagation();
                    setIsExpanded(true);
                  }}
                />
              </Tooltip>
            </div>
          )}
        </div>

        {isExpanded && (
          <Tooltip title={t('NAV_9')}>
            <Button
              type="text"
              style={{ height: 36, width: 36, cursor: 'w-resize' }}
              icon={<PinLeftIcon />}
              onClick={e => {
                e.stopPropagation();
                setIsExpanded(false);
              }}
            />
          </Tooltip>
        )}
      </div>

      <div className={cn('overflow-y-auto overflow-x-hidden px-[6px]')}>
        <div className={cn('pt-2')}>
          <NavMenuItem
            label={isExpanded ? t('NAV_1') : ''}
            icon={<Pencil2Icon width={18} height={18} />}
            tip={isExpanded ? '' : t('NAV_1')}
            onChange={() => {
              // 新建对话时，先取消上一个会话的后台任务
              cleanupAllConversationBackgroundTasks();
              clearConversation();
              navigate(NAV_PATH_MAP.CHAT);
              initConversation();
            }}
          />
          <NavMenuItem
            label={isExpanded ? t('NAV_2') : ''}
            icon={<MagnifyingGlassIcon width={20} height={20} />}
            tip={isExpanded ? '' : t('NAV_2')}
            onChange={() => __setShowConversationListModal(true)}
          />
        </div>

        <div className={cn('pt-[20px]')}>
          {NAV_LIST(t).map(item => (
            <NavMenuItem
              key={item.path}
              label={isExpanded ? item.label : ''}
              icon={item.icon}
              tip={isExpanded ? '' : item.label}
              checked={pathname?.match(/^(\/[^/]+)/)?.[0] === item.path}
              onChange={() => {
                clearConversation();
                navigate(item.path);
              }}
            />
          ))}
        </div>

        {isExpanded && (
          <div className={cn('min-w-[247px] max-w-[247px] pb-2 pt-[20px]')}>
            <h2 className={cn('px-[10px] py-2 text-sm text-foreground-tertiary')}>{t('NAV_6')}</h2>
            <Skeleton loading={isConversationListLoading} active>
              {conversationList.map(item => (
                <ConversationMenuItem key={item.sessionId} data={item} />
              ))}
            </Skeleton>
          </div>
        )}
      </div>

      <div className={cn('sticky bottom-0 flex flex-1 flex-col justify-between px-[6px] pb-2')}>
        {isExpanded && conversationList.length ? (
          <div>
            <div className={cn('mx-[10px] mb-2 h-[1px] border-t border-solid border-light')} />
            <NavMenuItem
              label={t('NAV_7')}
              icon={<DotsHorizontalIcon />}
              onChange={() => __setShowConversationListModal(true)}
            />
          </div>
        ) : (
          <div />
        )}

        <Tooltip title={isEnglishLng ? 'English / 中文' : '中文 / English'} placement="right">
          <Button
            type="text"
            style={{ height: 36, width: 39 }}
            icon={isEnglishLng ? <EnglishLngIcon className="mt-1" /> : <ChineseLngIcon className="mt-1" />}
            onClick={e => {
              e.stopPropagation();
              i18n.changeLanguage(isEnglishLng ? 'zh' : 'en');
              if (!queryRouter.get('sid')) {
                __updateCurrentConversation({ name: t('CHAT_10') });
              }
            }}
          />
        </Tooltip>
      </div>
    </div>
  );
};

export default Nav;
