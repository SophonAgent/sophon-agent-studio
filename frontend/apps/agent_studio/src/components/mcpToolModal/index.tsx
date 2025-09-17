import type { FC } from 'react';
import type { FunctionBase, FunctionDefinition } from '@/interface/functionCall';
import type { McpServerItem } from '@/interface/mcpServer';
import type { McpToolConfigItem } from '@/interface/mcpTool';

import { memo, useEffect, useMemo, useState } from 'react';
import Modal from '@/lib/modal';
import useMcpServer from '@/hooks/useMcpServer';
import { Input, Skeleton } from 'antd';
import { cn } from '@/utils/tw';
import McpServerCard from './McpServerCard';
import DividingLine from '@/lib/dividingLine';
import useMcpTool from '@/hooks/useMcpTool';
import { getUuid } from '@/utils/uuid';
import { tranJsonToObject } from '@/utils/json';
import McpToolCard from './McpToolCard';
import useFeedback from '@/context/feedbackContext';
import { uniqBy } from 'lodash-es';

interface McpToolModalProps {
  initialValues?: FunctionDefinition[];
  onCancel: () => void;
  onOk: (values: FunctionDefinition[]) => void;
}

const McpToolModal: FC<McpToolModalProps> = ({ initialValues = [], onCancel, onOk }) => {
  const { mcpServerList, isMcpServerListLoading, getMcpServerList } = useMcpServer();
  const { isMcpToolConfigListLoading, getMcpToolConfigList } = useMcpTool();

  const { messageApi } = useFeedback();

  const [mcpServerKeyword, setMcpServerKeyword] = useState<string>();
  const [selectedMcpIds, setSelectedMcpIds] = useState<number[]>([]);

  const [toolKeyword, setToolKeyword] = useState<string>();
  const [selectedTools, setSelectedTools] = useState<FunctionDefinition[]>([]);

  const filteredMcpServerList = useMemo(() => {
    if (!mcpServerKeyword) {
      return mcpServerList;
    }
    return mcpServerList.filter(item =>
      item.displayName?.toLowerCase()?.includes(mcpServerKeyword.toLowerCase()),
    );
  }, [mcpServerKeyword, mcpServerList]);

  const filteredSelectedTools = useMemo(() => {
    if (!toolKeyword) {
      return selectedTools;
    }
    return selectedTools.filter(item =>
      item.qualifiedName?.toLowerCase().includes(toolKeyword.toLowerCase()),
    );
  }, [toolKeyword, selectedTools]);

  useEffect(() => {
    getMcpServerList();
  }, []);

  useEffect(() => {
    if (initialValues.length) {
      setSelectedTools(initialValues);
      setSelectedMcpIds(
        initialValues.map(item => item.mcpServer?.id).filter(f => f !== undefined) as number[],
      );
    }
  }, [initialValues]);

  const handleSubmit = () => {
    const isDuplicate = selectedTools.length !== uniqBy(selectedTools, 'qualifiedName').length;
    if (isDuplicate) {
      messageApi.error('当前选择的Tools的唯一标识有重复，请先移除');
      return;
    }
    onOk(selectedTools);
  };

  const tranMcpTool = (item: McpToolConfigItem, mcpServer: McpServerItem): FunctionDefinition => {
    const mcpToolBase: FunctionBase = {
      description: item.description,
      parameters: tranJsonToObject(item.inputSchema),
    };
    return {
      id: getUuid(),
      enabled: true,
      qualifiedName: item.qualifiedName || '',
      description: item.description,
      parameters: tranJsonToObject(item.inputSchema),
      displayName: item.displayName,
      functionType: 'mcp_tool',
      mcpServer,
      mcpToolBase,
    };
  };

  const onEnableMcpServer = async (checked: boolean, mcpServer: McpServerItem) => {
    if (isMcpToolConfigListLoading) return;

    if (checked) {
      const res = await getMcpToolConfigList(mcpServer.qualifiedName);
      if (res.length) {
        setSelectedMcpIds(prev => [...prev, mcpServer.id]);
        setSelectedTools(prev => [...prev, ...res.map(item => tranMcpTool(item, mcpServer))]);
      } else {
        messageApi.warning('该MCP服务下没有可用的工具');
      }
    } else {
      setSelectedMcpIds(prev => prev.filter(i => i !== mcpServer.id));
      setSelectedTools(prev => prev.filter(i => i.mcpServer?.id !== mcpServer.id));
    }
  };

  const onRemoveTool = (id: string) => {
    const newMcpTools = selectedTools.filter(t => t.id !== id);
    setSelectedTools(newMcpTools);
    setSelectedMcpIds(newMcpTools.map(m => m.mcpServer?.id).filter(f => f !== undefined) as number[]);
  };

  return (
    <Modal open title="MCP Tool" size="large" onCancel={onCancel} onOk={handleSubmit}>
      <Skeleton loading={isMcpServerListLoading} active>
        <div className={cn('flex h-[560px] gap-2 text-foreground-primary')}>
          <div className={cn('flex h-full w-[250px] flex-col overflow-hidden')}>
            <div className={cn('flex items-center gap-2')}>
              <span className={cn('text-[14px] font-medium')}>MCP</span>
              <Input
                placeholder="输入MCP名称筛选"
                allowClear
                value={mcpServerKeyword}
                onChange={e => setMcpServerKeyword(e.target.value)}
                style={{ width: 200 }}
              />
            </div>

            <div className={cn('mt-2 flex flex-1 flex-col gap-2 overflow-y-auto px-1')}>
              {filteredMcpServerList.map(item => {
                const checked = Boolean(item.id && selectedMcpIds.includes(item.id));
                return (
                  <McpServerCard
                    key={item.id}
                    mcpServer={item}
                    checked={checked}
                    onChange={onEnableMcpServer}
                  />
                );
              })}
            </div>
          </div>

          <DividingLine layout="vertical" />

          <div className={cn('flex h-full flex-1 flex-col overflow-hidden')}>
            <div className={cn('flex items-center gap-2')}>
              <span className={cn('text-[14px] font-medium')}>Tools</span>
              <Input
                placeholder="输入Tool名称筛选"
                allowClear
                value={toolKeyword}
                onChange={e => setToolKeyword(e.target.value)}
                style={{ width: 200 }}
              />
            </div>

            <div className={cn('mt-2 flex flex-1 flex-col gap-2 overflow-y-auto px-1')}>
              <Skeleton loading={isMcpToolConfigListLoading} active>
                {filteredSelectedTools.map(item => (
                  <McpToolCard key={item.id} tool={item} onRemove={onRemoveTool} />
                ))}
              </Skeleton>
            </div>
          </div>
        </div>
      </Skeleton>
    </Modal>
  );
};

export default memo(McpToolModal);
