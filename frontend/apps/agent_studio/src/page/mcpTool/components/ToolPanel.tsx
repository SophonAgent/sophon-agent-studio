import type { FC } from 'react';
import type { McpToolConfigItem } from '@/interface/mcpTool';
import type { PageHeaderFilterItem } from '@/components/pageHeader';
import type { TableActionItem } from '@/lib/table';
import type { McpServerItem } from '@/interface/mcpServer';

import { memo, useMemo, useState } from 'react';
import { McpToolProxyType } from '@/interface/mcpTool';
import { cn } from '@/utils/tw';
import PageHeader from '@/components/pageHeader';
import Table from '@/lib/table';
import { cloneDeep } from 'lodash-es';
import { dataColumns } from '../constant';
import McpToolEditDrawer from './McpToolEditDrawer';
import useMcpTool from '@/hooks/useMcpTool';
import { useTranslation } from 'react-i18next';
import { NAV_PATH_MAP } from '@/constant/nav';
import useQueryRouter from '@/utils/router';

interface ToolPanelProps {
  mcpServer?: McpServerItem;
  toolList: McpToolConfigItem[];
  isLoading: boolean;
  onRefresh: () => void;
}

const ToolPanel: FC<ToolPanelProps> = ({ mcpServer, toolList, isLoading, onRefresh }) => {
  const { t } = useTranslation();
  const queryRouter = useQueryRouter();

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
      placeholder: t('TAG_5'),
      value: filterRecord.displayName,
      onChange: e => setFilterRecord(prev => ({ ...prev, displayName: e.target.value })),
    },
    {
      key: 'qualifiedName',
      type: 'input',
      placeholder: t('TAG_23'),
      value: filterRecord.qualifiedName,
      onChange: e => setFilterRecord(prev => ({ ...prev, qualifiedName: e.target.value })),
    },
    {
      key: 'proxyType',
      type: 'select',
      placeholder: t('TAG_11'),
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
      label: t('BUTTON_5'),
      onClick: (record: McpToolConfigItem) => {
        setCurrentMcpToolConfig(record);
        setShowMcpToolEditDrawer(true);
      },
    },
    {
      key: 'copy',
      label: t('BUTTON_13'),
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
      key: 'debug',
      label: t('BUTTON_31'),
      onClick: (record: McpToolConfigItem) => {
        const url = `/paas#${NAV_PATH_MAP.MCP_TOOL}?id=${queryRouter.get('id')}&tab=debug&name=${record.qualifiedName}`;
        window.open(url, '_blank');
      },
    },
    {
      key: 'delete',
      label: t('BUTTON_3'),
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
        actionLabel={t('MCP_TOOL_5')}
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
          dataColumns={dataColumns(t)}
          actionList={actionList}
          actionWidth={200}
          loading={isLoading}
          scroll={{ x: (dataColumns(t) as any[]).length * 180 }}
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
