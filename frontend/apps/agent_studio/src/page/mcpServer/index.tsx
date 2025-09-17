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

const McpServer: FC = () => {
  const navigate = useNavigate();

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
  }, []);

  const onCloseModal = () => {
    setCurrentMcpServer(undefined);
    setShowMcpServerEditModal(false);
  };

  const headerFilterList: PageHeaderFilterItem[] = [
    {
      key: 'displayName',
      type: 'input',
      placeholder: 'MCP Server 展示名',
      value: filterRecord.displayName,
      onChange: e => setFilterRecord(prev => ({ ...prev, displayName: e.target.value })),
    },
    {
      key: 'category',
      type: 'input',
      placeholder: '分类',
      value: filterRecord.category,
      onChange: e => setFilterRecord(prev => ({ ...prev, category: e.target.value })),
    },
    {
      key: 'implementType',
      type: 'select',
      placeholder: '来源',
      options: Object.entries(McpImplementTypeTextMap).map(([key, value]) => ({
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
      label: '详情',
      onClick: (record: McpServerItem) => {
        const url = `${NAV_PATH_MAP.MCP_TOOL}?id=${record.id}`;
        navigate(url);
      },
    },
    {
      key: 'edit',
      label: '编辑',
      onClick: (record: McpServerItem) => {
        setCurrentMcpServer(record);
        setShowMcpServerEditModal(true);
      },
    },
    {
      key: 'delete',
      label: '删除',
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
        actionLabel="接入 MCP Server"
        onActionClick={() => setShowMcpServerEditModal(true)}
      />

      <div className={cn('flex-1 overflow-auto px-5')}>
        <Table
          rowKey="id"
          tableLayout="fixed"
          dataSource={filteredMcpServerList}
          dataColumns={dataColumns}
          actionList={actionList}
          actionWidth={120}
          loading={isMcpServerListLoading}
          scroll={{ x: dataColumns ? dataColumns.length * 180 : undefined }}
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
