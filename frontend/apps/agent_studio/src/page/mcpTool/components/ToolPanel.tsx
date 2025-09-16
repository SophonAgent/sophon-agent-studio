import type { FC } from 'react';

import { memo, useMemo, useState } from 'react';
import { McpToolConfigItem, McpToolProxyType } from '@/interface/mcpTool';
import { cn } from '@/utils/tw';
import PageHeader, { PageHeaderFilterItem } from '@/components/pageHeader';
import Table, { TableActionItem } from '@/lib/table';
import { cloneDeep } from 'lodash-es';
import { dataColumns } from '../constant';
import McpToolEditDrawer from './McpToolEditDrawer';
import { McpServerItem } from '@/interface/mcpServer';
import useMcpTool from '@/hooks/useMcpTool';

interface ToolPanelProps {
  mcpServer?: McpServerItem;
  toolList: McpToolConfigItem[];
  isLoading: boolean;
  onRefresh: () => void;
}

const ToolPanel: FC<ToolPanelProps> = ({ mcpServer, toolList, isLoading, onRefresh }) => {
  const { deleteMcpToolConfig } = useMcpTool();

  const [filterRecord, setFilterRecord] = useState<{
    displayName?: string;
    qualifiedName?: string;
    proxyType?: string;
  }>({});
  const [showMcpToolEditDrawer, setShowMcpToolEditDrawer] = useState<boolean>(false);
  const [currentMcpToolConfig, setCurrentMcpToolConfig] = useState<Partial<McpToolConfigItem>>();

  const filteredMcpServerList = useMemo(() => {
    const { displayName, qualifiedName, proxyType } = filterRecord;
    let list = cloneDeep(toolList);
    if (displayName) {
      list = list.filter(item => item.displayName?.toLowerCase()?.includes(displayName.toLowerCase()));
    }
    if (qualifiedName) {
      list = list.filter(item => item.qualifiedName?.toLowerCase()?.includes(qualifiedName.toLowerCase()));
    }
    if (proxyType) {
      list = list.filter(item => item.proxyType === proxyType);
    }
    return list;
  }, [toolList, JSON.stringify(filterRecord)]);

  const onCloseDrawer = () => {
    setCurrentMcpToolConfig(undefined);
    setShowMcpToolEditDrawer(false);
  };

  const headerFilterList: PageHeaderFilterItem[] = [
    {
      key: 'displayName',
      type: 'input',
      placeholder: '工具展示名',
      value: filterRecord.displayName,
      onChange: e => setFilterRecord(prev => ({ ...prev, displayName: e.target.value })),
    },
    {
      key: 'qualifiedName',
      type: 'input',
      placeholder: '工具唯一标识名',
      value: filterRecord.qualifiedName,
      onChange: e => setFilterRecord(prev => ({ ...prev, qualifiedName: e.target.value })),
    },
    {
      key: 'proxyType',
      type: 'select',
      placeholder: '类型',
      options: Object.entries(McpToolProxyType).map(([key, value]) => ({
        label: key,
        value,
      })),
      value: filterRecord.proxyType,
      onChange: v => setFilterRecord(prev => ({ ...prev, proxyType: v })),
    },
  ];

  const actionList: TableActionItem[] = [
    {
      key: 'edit',
      label: '编辑',
      onClick: (record: McpToolConfigItem) => {
        setCurrentMcpToolConfig(record);
        setShowMcpToolEditDrawer(true);
      },
    },
    {
      key: 'copy',
      label: '复制',
      onClick: (record: McpToolConfigItem) => {
        const { displayName, qualifiedName } = record;
        setCurrentMcpToolConfig({
          ...record,
          id: undefined,
          displayName: `${displayName}_copy`,
          qualifiedName: `${qualifiedName}_copy`,
        });
        setShowMcpToolEditDrawer(true);
      },
    },
    {
      key: 'delete',
      label: '删除',
      danger: true,
      onConfirm: async (record: McpToolConfigItem) => {
        await deleteMcpToolConfig(record.id);
        onRefresh();
      },
    },
  ];

  return (
    <div className={cn('flex h-full flex-col')}>
      <PageHeader
        className={cn('mb-4 px-0')}
        filterList={headerFilterList}
        actionLabel="新建工具"
        onActionClick={() => {
          setCurrentMcpToolConfig({ serverQualifiedName: mcpServer?.qualifiedName });
          setShowMcpToolEditDrawer(true);
        }}
      />

      <div className={cn('__hide-scrollbar flex-1 overflow-auto')}>
        <Table
          rowKey="id"
          tableLayout="fixed"
          dataSource={filteredMcpServerList}
          dataColumns={dataColumns}
          actionList={actionList}
          actionWidth={120}
          loading={isLoading}
          scroll={{ x: dataColumns ? dataColumns.length * 180 : undefined }}
          pagination={{ hideOnSinglePage: true, showSizeChanger: true }}
        />
      </div>

      {showMcpToolEditDrawer && (
        <McpToolEditDrawer
          initialValues={currentMcpToolConfig}
          onCancel={onCloseDrawer}
          onSuccess={() => {
            onCloseDrawer();
            onRefresh();
          }}
        />
      )}
    </div>
  );
};

export default memo(ToolPanel);
