import type { FC } from 'react';
import type { PaginationProps } from 'antd';
import type { ConversationListRequestParams, SimpleConversationItem } from '@/interface/chat';
import type { TableActionItem, TableProps } from '@/lib/table';

import { memo, useCallback, useEffect, useState } from 'react';
import Modal from '@/lib/modal';
import useConversationManage from '@/hooks/useConversationManage';
import { Button, Input } from 'antd';
import { cn } from '@/utils/tw';
import { debounce } from 'lodash-es';
import Table from '@/lib/table';
import Paragraph3Line from '@/components/paragraph3Line';
import { NAV_PATH_MAP } from '@/constant/nav';
import useConversationModel from '@/store/chat/conversationModel';
import { Pencil1Icon } from '@radix-ui/react-icons';
import Tooltip from '@/lib/tooltip';
import useFeedback from '@/context/feedbackContext';
import useChat from '@/hooks/useChat';
import useGlobalModel from '@/store/globalModel';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface ConversationListModalProps {
  onCancel: () => void;
}

const ConversationListModal: FC<ConversationListModalProps> = ({ onCancel }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { userId } = useGlobalModel();
  const { currentConversation, getConversationList, cleanupAllConversationBackgroundTasks } =
    useConversationModel();
  const { onConversationChange } = useChat();

  const { modalApi } = useFeedback();
  const {
    conversationHistoryList,
    isConversationHistoryListLoading,
    getConversationBySessionId,
    getConversationHistoryList,
    deleteConversation,
    clearAllConversation,
    updateConversation,
    shareConversation,
  } = useConversationManage();

  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
    size: 'default',
  });
  const [filterRecord, setFilterRecord] = useState<{ keywords?: string; sessionId?: string }>({});
  const [isInEditing, setIsInEditing] = useState<Record<string, boolean>>({});

  const onDebounceSearch = useCallback(
    debounce((key, val) => {
      setPagination({ ...pagination, current: 1 });
      setFilterRecord({ ...filterRecord, [key]: val });
    }, 800),
    [filterRecord, pagination],
  );

  useEffect(() => {
    if (!userId) return;

    getHistoryList();
  }, [userId, JSON.stringify(filterRecord)]);

  const getHistoryList = async (num?: number, size?: number) => {
    const pageNum = num || pagination.current;
    const pageSize = size || pagination.pageSize;
    const params: ConversationListRequestParams = { ...filterRecord, pageNum, pageSize, userId };
    const res = await getConversationHistoryList(params);
    setPagination(prev => ({
      ...prev,
      current: pageNum || 1,
      pageSize: pageSize || 10,
      total: res?.pageInfo?.total || 0,
    }));
  };

  const onEditName = async (item: SimpleConversationItem) => {
    const res = await updateConversation(item);
    if (res) {
      await getHistoryList();
      await getConversationList();
    }
    setIsInEditing({});
  };

  const onRefresh = () => {
    getHistoryList();
    getConversationList();
  };

  const dataColumns: TableProps['dataColumns'] = [
    {
      title: t('CHAT_32'),
      dataIndex: 'name',
      key: 'name',
      render: (value, record: SimpleConversationItem) => {
        if (record.sessionId && isInEditing[record.sessionId]) {
          return (
            <Input
              variant="borderless"
              defaultValue={record.name}
              placeholder="Please input"
              style={{ padding: 0, fontSize: 13 }}
              maxLength={32}
              autoFocus
              onBlur={e => {
                const name = e.target.value;
                onEditName({ ...record, name });
              }}
              onPressEnter={e => {
                const name = (e.target as any)?.value;
                onEditName({ ...record, name });
              }}
            />
          );
        }
        return (
          <div className={cn('flex items-center gap-2')}>
            <Paragraph3Line
              value={value}
              rows={1}
              onClick={() => {
                if (currentConversation.sessionId === record.sessionId) {
                  onCancel();
                  return;
                }
                // 切换会话时，先取消上一个会话的后台任务
                cleanupAllConversationBackgroundTasks();
                navigate(`${NAV_PATH_MAP.CHAT}?sid=${record.sessionId}`);
                getConversationBySessionId(record.sessionId).then(res => {
                  if (res) {
                    onConversationChange(res);
                  }
                });
                onCancel();
              }}
            />
            <Tooltip title={t('BUTTON_2')}>
              <Button
                type="link"
                icon={<Pencil1Icon className={cn('h-[13px] w-[13px]')} />}
                size="small"
                onClick={() => {
                  if (record.sessionId) {
                    setIsInEditing({ [record.sessionId]: true });
                  }
                }}
              />
            </Tooltip>
          </div>
        );
      },
    },
    {
      title: 'Session ID',
      dataIndex: 'sessionId',
      key: 'sessionId',
      width: 120,
      render: value => <Paragraph3Line value={value} rows={1} copyable />,
    },
    {
      title: t('CHAT_33'),
      dataIndex: 'modifyTime',
      key: 'modifyTime',
      width: 180,
    },
  ];

  const actionList: TableActionItem[] = [
    {
      key: 'share',
      label: t('BUTTON_1'),
      onClick: (record: SimpleConversationItem) => shareConversation(record),
    },
    {
      key: 'delete',
      label: t('BUTTON_3'),
      danger: true,
      onClick: async (record: SimpleConversationItem) => {
        await deleteConversation(record);
        onRefresh();
      },
    },
  ];

  const footer = (
    <div>
      <Button
        type="primary"
        danger
        onClick={() => {
          modalApi.confirm({
            title: t('MODAL_6'),
            centered: true,
            content: t('MODAL_7'),
            okButtonProps: { danger: true },
            onOk: async () => {
              await clearAllConversation();
              onRefresh();
              onCancel();
            },
          });
        }}
      >
        {t('BUTTON_12')}
      </Button>
    </div>
  );

  return (
    <Modal open title={t('NAV_6')} onCancel={onCancel} size="large" footer={footer}>
      <div className={cn('mb-4 flex items-center gap-3')}>
        <Input
          allowClear
          placeholder={t('PLACEHOLDER_5')}
          onChange={e => onDebounceSearch('keywords', e.target.value)}
        />
        <Input
          allowClear
          placeholder={t('PLACEHOLDER_6')}
          onChange={e => onDebounceSearch('sessionId', e.target.value)}
        />
      </div>
      <Table
        rowKey="id"
        tableLayout="fixed"
        dataSource={conversationHistoryList}
        dataColumns={dataColumns}
        actionList={actionList}
        actionWidth={80}
        bordered={false}
        size="middle"
        loading={isConversationHistoryListLoading}
        scroll={{ y: 490 }}
        pagination={pagination}
        onChange={({ current, pageSize }) => {
          getHistoryList(current, pageSize);
        }}
      />
    </Modal>
  );
};

export default memo(ConversationListModal);
