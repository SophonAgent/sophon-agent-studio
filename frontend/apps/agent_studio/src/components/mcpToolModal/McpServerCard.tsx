import type { FC } from 'react';
import type { McpServerItem } from '@/interface/mcpServer';

import { memo } from 'react';
import { cn } from '@/utils/tw';
import Paragraph3Line from '@/components/paragraph3Line';
import { Button, Switch } from 'antd';
import { OpenInNewWindowIcon } from '@radix-ui/react-icons';
import { NAV_PATH_MAP } from '@/constant/nav';

interface McpServerCardProps {
  mcpServer: McpServerItem;
  checked: boolean;
  onChange: (checked: boolean, mcpServer: McpServerItem) => void;
  isLoading?: boolean;
}

const McpServerCard: FC<McpServerCardProps> = ({ mcpServer, checked, onChange, isLoading }) => {
  return (
    <div className={cn('group/mcp rounded-lg bg-background-tertiary p-[12px]')}>
      <div className={cn('mb-1 flex items-center justify-between gap-3')}>
        <div className={cn('flex items-center gap-1 overflow-hidden')}>
          <Paragraph3Line value={mcpServer.displayName} rows={1} style={{ fontWeight: 500 }} />
          <div className={cn('invisible group-hover/mcp:visible')}>
            <Button
              type="link"
              icon={<OpenInNewWindowIcon />}
              style={{ width: 20, height: 20 }}
              onClick={() => {
                const url = `/paas#${NAV_PATH_MAP.MCP_TOOL}?id=${mcpServer.id}&tab=detail`;
                window.open(url, '_blank');
              }}
            />
          </div>
        </div>
        <Switch checked={checked} size="small" onChange={v => onChange(v, mcpServer)} loading={isLoading} />
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
