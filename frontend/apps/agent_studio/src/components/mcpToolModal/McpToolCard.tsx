import type { FC } from 'react';
import type { FunctionDefinition } from '@/interface/functionCall';

import { memo, useMemo } from 'react';
import { Button } from 'antd';
import { Cross2Icon } from '@radix-ui/react-icons';
import { cn } from '@/utils/tw';
import Paragraph3Line from '@/components/paragraph3Line';
import { useTranslation } from 'react-i18next';

interface McpToolCardProps {
  tool: FunctionDefinition;
  onRemove: (id: string) => void;
}

const McpToolCard: FC<McpToolCardProps> = ({ tool, onRemove }) => {
  const { t } = useTranslation();

  const toolName = useMemo(() => {
    let name = tool.qualifiedName;
    if (tool.displayName) {
      name += `（${tool.displayName}）`;
    }
    return name;
  }, [tool]);

  return (
    <div
      className={cn(
        'flex items-center justify-between gap-3 rounded-lg px-[10px] py-[6px] hover:bg-background-tertiary',
      )}
    >
      <div className={cn('flex-1 overflow-hidden')}>
        <Paragraph3Line value={toolName} rows={1} style={{ fontWeight: 500 }} />
        <Paragraph3Line
          value={tool.description}
          rows={1}
          style={{ fontSize: 12, color: 'var(--text-tertiary)' }}
        />
        <div className={cn('flex items-center gap-2 text-[12px] text-foreground-tertiary')}>
          <span className={cn('flex-shrink-0')}>{t('MCP_1')}: </span>
          <Paragraph3Line
            value={tool.mcpServer?.displayName}
            rows={1}
            style={{ fontSize: 12, color: 'var(--text-tertiary)' }}
          />
        </div>
      </div>

      <Button
        type="text"
        icon={<Cross2Icon />}
        style={{ background: 'transparent', color: '#b3b7c1' }}
        onClick={() => onRemove(tool.id)}
      />
    </div>
  );
};

export default memo(McpToolCard);
