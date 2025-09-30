import type { FC } from 'react';
import type { PageHeaderFilterItem } from '@/components/pageHeader';
import type { TableActionItem } from '@/lib/table';
import type { McpServerItem } from '@/interface/mcpServer';

import { memo, useEffect, useMemo, useState } from 'react';
import PageHeader from '@/components/pageHeader';
import Table from '@/lib/table';
import { McpImplementTypeTextMap } from '@/constant/mcpServer';
import useMcpServer from '@/hooks/useMcpServer';
import { McpImplementType } from '@/interface/mcpServer';
import { cn } from '@/utils/tw';
import { dataColumns } from './constant';
import { cloneDeep } from 'lodash-es';
import McpServerEditModal from '@/components/mcpServerEditModal';
import { NAV_PATH_MAP } from '@/constant/nav';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useQueryRouter from '@/utils/router';

const McpServer: FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const queryRouter = useQueryRouter();

  const { mcpServerList, isMcpServerListLoading, getMcpServerList, deleteMcpServer } = useMcpServer();

  const [filterRecord, setFilterRecord] = useState<{
    displayName?: string;
    category?: string;
    implementType?: McpImplementType;
  }>({});
  const [showMcpServerEditModal, setShowMcpServerEditModal] = useState<boolean>(false);
  const [currentMcpServer, setCurrentMcpServer] = useState<McpServerItem>();

  const filteredMcpServerList = useMemo(() => {
    const { displayName, category, implementType } = filterRecord;
    let list = cloneDeep(mcpServerList);
    if (displayName) {
      list = list.filter(item => item.displayName?.toLowerCase()?.includes(displayName.toLowerCase()));
    }
    if (category) {
      list = list.filter(item => item.category?.toLowerCase()?.includes(category.toLowerCase()));
    }
    if (implementType) {
      list = list.filter(item => item.implementType === implementType);
    }
    return list;
  }, [mcpServerList, JSON.stringify(filterRecord)]);

  useEffect(() => {
    getMcpServerList();
    const type = queryRouter.get('type');
    if (type === 'create') {
      setShowMcpServerEditModal(true);
      queryRouter.remove('type');
    }
  }, []);

  const onCloseModal = () => {
    setCurrentMcpServer(undefined);
    setShowMcpServerEditModal(false);
  };

  const headerFilterList: PageHeaderFilterItem[] = [
    {
      key: 'displayName',
      type: 'input',
      placeholder: t('TAG_5'),
      value: filterRecord.displayName,
      onChange: e => setFilterRecord(prev => ({ ...prev, displayName: e.target.value })),
    },
    {
      key: 'category',
      type: 'input',
      placeholder: t('MCP_6'),
      value: filterRecord.category,
      onChange: e => setFilterRecord(prev => ({ ...prev, category: e.target.value })),
    },
    {
      key: 'implementType',
      type: 'select',
      placeholder: t('TAG_22'),
      options: Object.entries(McpImplementTypeTextMap(t)).map(([key, value]) => ({
        label: value,
        value: key,
      })),
      value: filterRecord.implementType,
      onChange: v => setFilterRecord(prev => ({ ...prev, implementType: v })),
    },
  ];

  const actionList: TableActionItem[] = [
    {
      key: 'detail',
      label: t('BUTTON_25'),
      onClick: (record: McpServerItem) => {
        const url = `${NAV_PATH_MAP.MCP_TOOL}?id=${record.id}`;
        navigate(url);
      },
    },
    {
      key: 'edit',
      label: t('BUTTON_5'),
      onClick: (record: McpServerItem) => {
        setCurrentMcpServer(record);
        setShowMcpServerEditModal(true);
      },
    },
    {
      key: 'delete',
      label: t('BUTTON_3'),
      danger: true,
      onConfirm: async (record: McpServerItem) => {
        await deleteMcpServer(record.id);
        await getMcpServerList();
      },
    },
  ];

  return (
    <div className={cn('flex h-full flex-col pb-4')}>
      <PageHeader
        className={cn('mb-4')}
        title={[{ label: 'MCP Server' }]}
        filterList={headerFilterList}
        actionLabel={t('MCP_3')}
        onActionClick={() => setShowMcpServerEditModal(true)}
      />

      <div className={cn('flex-1 overflow-auto px-5')}>
        <Table
          rowKey="id"
          tableLayout="fixed"
          dataSource={filteredMcpServerList}
          dataColumns={dataColumns(t)}
          actionList={actionList}
          actionWidth={150}
          loading={isMcpServerListLoading}
          scroll={{ x: (dataColumns(t) as any[]).length * 180 }}
          pagination={{ hideOnSinglePage: true, showSizeChanger: true }}
        />
      </div>

      {showMcpServerEditModal && (
        <McpServerEditModal
          initialValues={currentMcpServer}
          onCancel={onCloseModal}
          onSuccess={async () => {
            onCloseModal();
            await getMcpServerList();
          }}
        />
      )}
    </div>
  );
};

export default memo(McpServer);
