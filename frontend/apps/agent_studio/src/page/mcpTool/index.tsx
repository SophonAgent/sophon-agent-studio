import type { FC } from 'react';

import { memo, useEffect, useState } from 'react';
import PageHeader, { PageHeaderTitleItem } from '@/components/pageHeader';
import { NAV_PATH_MAP } from '@/constant/nav';
import useMcpServer from '@/hooks/useMcpServer';
import { cn } from '@/utils/tw';
import { Skeleton, Tabs, TabsProps } from 'antd';
import { useParams, useRouter } from 'next/navigation';
import HeaderDescription from './components/HeaderDescription';
import McpServerEditModal from '@/components/mcpServerEditModal';
import DetailPanel from './components/DetailPanel';
import ToolPanel from './components/ToolPanel';
import useMcpTool from '@/hooks/useMcpTool';
import useQueryRouter from '@/utils/router';
import McpToolInspector from '@/components/mcpToolInspector';
import { McpImplementType } from '@/interface/mcpServer';

enum McpToolTabKey {
  DETAIL = 'detail',
  TOOL = 'tool',
  INSPECTOR = 'inspector',
}

const McpTool: FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const queryRouter = useQueryRouter();

  const { currentMcpServer, isCurrentMcpServerLoading, getMcpServerById } = useMcpServer();
  const {
    mcpToolConfigList,
    isMcpToolConfigListLoading,
    mcpToolList,
    isMcpToolListLoading,
    getMcpToolConfigList,
    getMcpToolList,
  } = useMcpTool();

  const [showMcpServerEditModal, setShowMcpServerEditModal] = useState<boolean>(false);
  const [activeKey, setActiveKey] = useState<McpToolTabKey>(McpToolTabKey.DETAIL);

  useEffect(() => {
    const tab = queryRouter.get('tab');
    if (tab && Object.values(McpToolTabKey).includes(tab as McpToolTabKey)) {
      setActiveKey(tab as McpToolTabKey);
    } else {
      queryRouter.set('tab', McpToolTabKey.DETAIL);
      setActiveKey(McpToolTabKey.DETAIL);
    }
  }, []);

  useEffect(() => {
    if (Number(id)) {
      getMcpServerById(Number(id));
    }
  }, [id]);

  useEffect(() => {
    if (currentMcpServer?.qualifiedName) {
      getMcpToolConfigList(currentMcpServer.qualifiedName);
    }
    if (currentMcpServer?.endpointUrl) {
      getMcpToolList(currentMcpServer.endpointUrl);
    }
  }, [currentMcpServer]);

  const onRefresh = async () => {
    await getMcpToolConfigList(currentMcpServer?.qualifiedName);
    await getMcpToolList(currentMcpServer?.endpointUrl);
  };

  const onCloseModal = () => {
    setShowMcpServerEditModal(false);
  };

  const headerTitles: PageHeaderTitleItem[] = [
    {
      label: 'MCP Server',
      onClick: () => router.push(NAV_PATH_MAP.MCP),
    },
    { label: currentMcpServer?.displayName || '详情' },
  ];

  const tabItems: TabsProps['items'] = [
    {
      key: McpToolTabKey.DETAIL,
      label: '基础信息',
      children: <DetailPanel mcpServer={currentMcpServer} />,
      style: { height: '100%' },
    },
    ...(currentMcpServer?.implementType === McpImplementType.PROXY
      ? [
          {
            key: McpToolTabKey.TOOL,
            label: 'Tool',
            children: (
              <ToolPanel
                mcpServer={currentMcpServer}
                toolList={mcpToolConfigList}
                isLoading={isMcpToolConfigListLoading}
                onRefresh={onRefresh}
              />
            ),
            style: { height: '100%' },
          },
        ]
      : []),
    {
      key: McpToolTabKey.INSPECTOR,
      label: 'Inspector',
      children: (
        <McpToolInspector
          mcpServer={currentMcpServer}
          toolList={mcpToolList}
          isLoading={isMcpToolListLoading}
        />
      ),
      style: { height: '100%' },
    },
  ];

  return (
    <Skeleton loading={isCurrentMcpServerLoading} active>
      <div className={cn('flex h-full flex-col')}>
        <PageHeader title={headerTitles} />

        <HeaderDescription
          className={cn('mb-1 px-5')}
          mcpServer={currentMcpServer}
          onEditMcpServer={() => setShowMcpServerEditModal(true)}
        />

        <div className={cn('flex-1 overflow-hidden px-5 pb-4')}>
          <Tabs
            items={tabItems}
            activeKey={activeKey}
            onChange={v => {
              setActiveKey(v as McpToolTabKey);
              queryRouter.set('tab', v);
            }}
          />
        </div>

        {showMcpServerEditModal && (
          <McpServerEditModal
            initialValues={currentMcpServer}
            onCancel={onCloseModal}
            onSuccess={async () => {
              onCloseModal();
              currentMcpServer?.id && (await getMcpServerById(currentMcpServer.id));
            }}
          />
        )}
      </div>
    </Skeleton>
  );
};

export default memo(McpTool);
