import type { FC } from 'react';

import { memo, useMemo, useState } from 'react';
import ActionDropdown, { DropdownMenuItem } from '../actionDropdown';
import { DotsHorizontalIcon, Pencil1Icon, Share1Icon } from '@radix-ui/react-icons';
import Paragraph3Line from '../paragraph3Line';
import { Input } from 'antd';
import { cn } from '@/utils/tw';
import { SimpleConversationItem } from '@/interface/chat';
import DeleteIcon from '@/icons/deleteIcon';
import useConversationModel from '@/store/chat/conversationModel';
import { usePathname, useRouter } from 'next/navigation';
import { NAV_PATH_MAP } from '@/constant/nav';
import useFeedback from '@/context/feedbackContext';
import useConversationManage from '@/hooks/useConversationManage';
import useChat from '@/hooks/useChat';

interface ConversationMenuItemProps {
  data: SimpleConversationItem;
  className?: string;
}

const ConversationMenuItem: FC<ConversationMenuItemProps> = ({ data, className }) => {
  const router = useRouter();
  const pathname = usePathname();

  const { currentConversation, __updateCurrentConversation, getConversationList } = useConversationModel();
  const { onConversationChange } = useChat();

  const { modalApi } = useFeedback();
  const { getConversationBySessionId, deleteConversation, updateConversation, shareConversation } =
    useConversationManage();

  const [isInEditing, setIsInEditing] = useState<boolean>(false);

  const checked = useMemo(
    () => pathname === NAV_PATH_MAP.CHAT && currentConversation?.sessionId === data.sessionId,
    [pathname, currentConversation, data],
  );

  const actionList: DropdownMenuItem[] = [
    {
      key: 'share',
      label: '分享',
      icon: <Share1Icon width={16} height={16} />,
      onClick: () => shareConversation(data),
    },
    {
      key: 'rename',
      label: '重命名',
      icon: <Pencil1Icon width={16} height={16} />,
      onClick: () => setIsInEditing(true),
    },
    {
      key: 'delete',
      label: '删除',
      icon: <DeleteIcon className={cn('h-[18px] w-[18px]')} />,
      danger: true,
      onClick: () => {
        modalApi.confirm({
          title: '确认删除吗？',
          centered: true,
          content: '删除后不可恢复，请谨慎操作',
          okButtonProps: { danger: true },
          onOk: async () => {
            await deleteConversation(data);
            await getConversationList(true);
          },
        });
      },
    },
  ];

  const onChange = () => {
    router.push(`${NAV_PATH_MAP.CHAT}?sid=${data.sessionId}`);
    getConversationBySessionId(data.sessionId).then(res => {
      if (res) {
        onConversationChange(res);
      }
    });
  };

  const onEditName = async (name: string) => {
    const res = await updateConversation({ ...data, name });
    if (res) {
      if (currentConversation.sessionId === data.sessionId) {
        __updateCurrentConversation({ name });
      }
      await getConversationList();
    }
    setIsInEditing(false);
  };

  return (
    <div
      className={cn(
        '__menu-item h-[36px] justify-between gap-3 text-sm',
        'group/navItem',
        checked ? 'bg-[--menu-item-active]' : '',
        className,
      )}
      onClick={onChange}
    >
      {isInEditing ? (
        <Input
          variant="borderless"
          defaultValue={data.name}
          placeholder="Please input"
          style={{ padding: 0 }}
          maxLength={32}
          autoFocus
          onBlur={e => onEditName(e.target.value)}
          onPressEnter={e => onEditName((e.target as any)?.value)}
        />
      ) : (
        <div className={cn('flex items-center gap-[6px] overflow-hidden')}>
          <Paragraph3Line value={data.name} rows={1} style={{ color: 'var(--text-primary)', fontSize: 14 }} />
        </div>
      )}
      <ActionDropdown actionList={actionList}>
        <DotsHorizontalIcon className={cn('invisible flex-shrink-0 group-hover/navItem:visible')} />
      </ActionDropdown>
    </div>
  );
};

export default memo(ConversationMenuItem);
