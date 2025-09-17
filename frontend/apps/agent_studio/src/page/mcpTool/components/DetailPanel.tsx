import type { FC } from 'react';
import type { McpServerItem } from '@/interface/mcpServer';

import { memo, useMemo } from 'react';
import AccentBorderHeader from '@/components/accentBorderHeader';
import CopyButton from '@/components/copyButton';
import { cn } from '@/utils/tw';
import JsonView from '@/components/jsonView';

interface DetailPanelProps {
  mcpServer?: McpServerItem;
}

const DetailPanel: FC<DetailPanelProps> = ({ mcpServer }) => {
  const mcpServerKeyInfo = useMemo(
    () => ({
      mcpServers: { [mcpServer?.qualifiedName || '']: { url: mcpServer?.endpointUrl } },
    }),
    [mcpServer],
  );

  return (
    <div className={cn('flex h-full flex-col gap-3 text-[13px] text-foreground-primary')}>
      <AccentBorderHeader title="Endpoint Url" />
      <div className={cn('flex items-center gap-1')}>
        <span className={cn('font-medium')}>{mcpServer?.endpointUrl}</span>
        <CopyButton value={mcpServer?.endpointUrl} size="small" />
      </div>
      <JsonView value={mcpServerKeyInfo} copyable />
    </div>
  );
};

export default memo(DetailPanel);
