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

const Nav: FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { __setShowConversationListModal } = useGlobalModel();
  const { conversationList, isConversationLoading, initConversation, clearConversation } =
    useConversationModel();

  const [isExpanded, setIsExpanded] = useState<boolean>(true);

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
              <Tooltip title="打开边栏" placement="right">
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
          <Tooltip title="关闭边栏">
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
            label={isExpanded ? '新对话' : ''}
            icon={<Pencil2Icon width={18} height={18} />}
            tip={isExpanded ? '' : '新对话'}
            onChange={() => {
              clearConversation();
              navigate(NAV_PATH_MAP.CHAT);
              initConversation();
            }}
          />
          <NavMenuItem
            label={isExpanded ? '搜索对话' : ''}
            icon={<MagnifyingGlassIcon width={20} height={20} />}
            tip={isExpanded ? '' : '搜索对话'}
            onChange={() => __setShowConversationListModal(true)}
          />
        </div>

        <div className={cn('pt-[20px]')}>
          {NAV_LIST.map(item => (
            <NavMenuItem
              key={item.path}
              label={isExpanded ? item.label : ''}
              icon={item.icon}
              tip={isExpanded ? '' : item.label}
              checked={pathname?.match(/^(\/[^/]+)/)?.[0] === item.path}
              onChange={() => navigate(item.path)}
            />
          ))}
        </div>

        {isExpanded && (
          <div className={cn('min-w-[247px] max-w-[247px] pb-2 pt-[20px]')}>
            <h2 className={cn('px-[10px] py-2 text-sm text-foreground-tertiary')}>对话历史</h2>
            <Skeleton loading={isConversationLoading} active>
              {conversationList.map(item => (
                <ConversationMenuItem key={item.sessionId} data={item} />
              ))}
            </Skeleton>
          </div>
        )}
      </div>

      {isExpanded && conversationList.length ? (
        <div className={cn('sticky bottom-0 px-[6px] pb-2')}>
          <div className={cn('mx-[10px] mb-2 h-[1px] border-t border-solid border-light')} />
          <NavMenuItem
            label="查看全部"
            icon={<DotsHorizontalIcon />}
            onChange={() => __setShowConversationListModal(true)}
          />
        </div>
      ) : null}
    </div>
  );
};

export default Nav;
