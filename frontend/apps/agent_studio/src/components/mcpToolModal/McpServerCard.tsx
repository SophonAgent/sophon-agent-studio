import type { FC } from 'react';
import type { McpServerItem } from '@/interface/mcpServer';

import { memo } from 'react';
import { cn } from '@/utils/tw';
import Paragraph3Line from '@/components/paragraph3Line';
import { Switch } from 'antd';

interface McpServerCardProps {
  mcpServer: McpServerItem;
  checked: boolean;
  onChange: (checked: boolean, mcpServer: McpServerItem) => void;
}

const McpServerCard: FC<McpServerCardProps> = ({ mcpServer, checked, onChange }) => {
  return (
    <div className={cn('rounded-lg bg-background-tertiary p-[12px]')}>
      <div className={cn('mb-1 flex items-center justify-between')}>
        <Paragraph3Line value={mcpServer.displayName} rows={1} style={{ fontWeight: 500 }} />
        <Switch checked={checked} size="small" onChange={v => onChange(v, mcpServer)} />
      </div>
      <Paragraph3Line
        value={mcpServer.description}
        rows={1}
        style={{ fontSize: 12, color: 'var(--text-tertiary)' }}
      />
    </div>
  );
};

export default memo(McpServerCard);
