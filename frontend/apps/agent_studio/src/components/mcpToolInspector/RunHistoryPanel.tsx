import type { FC } from 'react';

import { memo } from 'react';
import { McpToolRunHistoryItem } from '@/interface/mcpTool';
import { Collapse } from 'antd';
import { cn } from '@/utils/tw';
import JsonView from '@/components/jsonView';

interface RunHistoryPanelProps {
  runHistory: McpToolRunHistoryItem[];
}

const RunHistoryPanel: FC<RunHistoryPanelProps> = ({ runHistory }) => {
  const genCollapseContent = (item: McpToolRunHistoryItem) => {
    return (
      <div className={cn('flex flex-col gap-2')}>
        {item.requestArgumentsJson ? (
          <div>
            <div className={cn('mb-[6px] text-[12px] font-medium text-[#000fff]')}>Request Arguments</div>
            <JsonView className={cn('text-[12px]')} value={item.requestArgumentsJson} copyable />
          </div>
        ) : null}

        {item.responseJson ? (
          <div>
            <div className={cn('mb-[6px] text-[12px] font-medium text-[#008000]')}>Response</div>
            <JsonView
              className={cn('max-h-[300px] overflow-auto text-[12px]')}
              value={item.responseJson}
              copyable
            />
          </div>
        ) : null}
      </div>
    );
  };

  return (
    <Collapse
      size="small"
      items={runHistory.map((item, index) => ({
        key: index,
        label: item.title,
        children: genCollapseContent(item),
      }))}
    />
  );
};

export default memo(RunHistoryPanel);
