import type { FC } from 'react';
import type { McpToolInfo, McpToolRunHistoryItem } from '@/interface/mcpTool';
import type { McpServerItem } from '@/interface/mcpServer';

import { memo, useEffect, useState } from 'react';
import { cn } from '@/utils/tw';
import Paragraph3Line from '@/components/paragraph3Line';
import DividingLine from '@/lib/dividingLine';
import McpToolCallTest from '@/components/mcpToolCallTest';
import RunHistoryPanel from '@/components/mcpToolInspector/RunHistoryPanel';
import { Empty, Skeleton } from 'antd';
import useQueryRouter from '@/utils/router';

interface McpToolInspectorProps {
  mcpServer?: McpServerItem;
  toolList: McpToolInfo[];
  isLoading: boolean;
}

const McpToolInspector: FC<McpToolInspectorProps> = ({ mcpServer, toolList, isLoading }) => {
  const queryRouter = useQueryRouter();

  const [selectedTool, setSelectedTool] = useState<McpToolInfo>();
  const [runHistory, setRunHistory] = useState<McpToolRunHistoryItem[]>([]);

  useEffect(() => {
    if (toolList.length) {
      setRunHistory([{ title: 'tools/list', responseJson: JSON.stringify({ tools: toolList }) }]);
      const name = queryRouter.get('name');
      const tool = toolList.find(item => item.name === name);
      if (name && tool) {
        setSelectedTool(tool);
        queryRouter.remove('name');
      } else {
        setSelectedTool(toolList[0]);
      }
    }
  }, [toolList.length]);

  return (
    <Skeleton active loading={isLoading}>
      {toolList.length ? (
        <div className={cn('flex h-full items-center gap-4')}>
          {/* 可执行工具列表 */}
          <div
            className={cn(
              '__hide-scrollbar flex h-full w-[300px] flex-col gap-3 overflow-auto rounded-lg bg-background-primary',
            )}
          >
            <div className={cn('text-[16px] font-medium')}>Tools</div>
            {toolList.map(item => (
              <div
                key={item.name}
                className={cn(
                  'cursor-pointer rounded-lg border border-solid bg-background-primary p-2',
                  'hover:shadow-md',
                  selectedTool?.name === item.name ? 'border-select' : 'border-default',
                )}
                onClick={() => setSelectedTool(item)}
              >
                <Paragraph3Line
                  value={item.name}
                  rows={1}
                  style={{ color: 'var(--text-primary)', marginBottom: 4 }}
                />
                <Paragraph3Line
                  value={item.description}
                  rows={1}
                  style={{ fontSize: 12, color: 'var(--text-tertiary)' }}
                />
              </div>
            ))}
          </div>

          <DividingLine className={cn('bg-[--border-light]')} layout="vertical" />

          {/* 执行测试面板 */}
          <div
            className={cn('__hide-scrollbar h-full flex-1 overflow-auto rounded-lg bg-background-primary')}
          >
            <Paragraph3Line
              value={selectedTool?.name}
              rows={1}
              style={{ color: 'var(--text-primary)', fontSize: 16, fontWeight: 500, marginBottom: 4 }}
            />
            <Paragraph3Line
              value={selectedTool?.description}
              rows={1}
              style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 8 }}
            />
            <McpToolCallTest
              mcpServer={mcpServer}
              tool={selectedTool}
              callbackToolRun={v => setRunHistory(prev => [v, ...prev])}
            />
          </div>

          <DividingLine className={cn('bg-[--border-light]')} layout="vertical" />

          {/* 执行记录 */}
          <div
            className={cn('__hide-scrollbar h-full w-[300px] overflow-auto rounded-lg bg-background-primary')}
          >
            <div className={cn('mb-3 text-[16px] font-medium')}>History</div>
            <RunHistoryPanel runHistory={runHistory} />
          </div>
        </div>
      ) : (
        <Empty />
      )}
    </Skeleton>
  );
};

export default memo(McpToolInspector);
