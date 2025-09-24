import type { FC } from 'react';
import type { FunctionDefinition } from '@/interface/functionCall';

import { memo } from 'react';
import { Button, Switch, Tag } from 'antd';
import { cn } from '@/utils/tw';
import { InfoCircledIcon, MinusCircledIcon } from '@radix-ui/react-icons';
import Paragraph3Line from '../paragraph3Line';
import Tooltip from '@/lib/tooltip';
import useFeedback from '@/context/feedbackContext';
import { useTranslation } from 'react-i18next';

interface FunctionCardProps {
  isReadonly?: boolean;
  functionDefinition: FunctionDefinition;
  onEnabledChange: (enabled: boolean) => void;
  onOpen: () => void;
  onDelete: (id: FunctionDefinition['id']) => void;
  onDiff: () => void;
}

const FunctionCard: FC<FunctionCardProps> = ({
  isReadonly,
  functionDefinition,
  onEnabledChange,
  onOpen,
  onDelete,
  onDiff,
}) => {
  const { t } = useTranslation();

  const { modalApi } = useFeedback();

  const isMcpTool = Boolean(functionDefinition.functionType === 'mcp_tool');
  const isMcpToolModified = Boolean(functionDefinition.isMcpToolModified);
  const functionName = functionDefinition.displayName
    ? `${functionDefinition.qualifiedName}（${functionDefinition.displayName}）`
    : functionDefinition.qualifiedName;

  return (
    <div
      className={cn(
        'flex cursor-pointer items-center justify-between gap-3 border-b border-solid border-default pl-2',
      )}
      onClick={onOpen}
    >
      <div className={cn('flex flex-1 items-center gap-1 overflow-hidden')}>
        <Tooltip title={functionDefinition.description}>
          <InfoCircledIcon className={cn('flex-shrink-0 cursor-help')} />
        </Tooltip>
        {isMcpToolModified && !isReadonly && (
          <Tooltip title={t('MCP_TOOL_1')}>
            <Tag
              className="cursor-pointer"
              color="green"
              onClick={e => {
                e.stopPropagation();
                onDiff();
              }}
            >
              {t('TAG_1')}
            </Tag>
          </Tooltip>
        )}
        {isMcpTool && (
          <Tooltip title={`${t('MCP_1')}: ${functionDefinition.mcpServer?.displayName}`}>
            <Tag bordered={false} color="blue" style={{ margin: 0 }}>
              MCP
            </Tag>
          </Tooltip>
        )}
        <Paragraph3Line value={functionName} rows={1} style={{ fontSize: 12 }} />
      </div>

      <div className={cn('flex items-center gap-1')}>
        <Switch
          size="small"
          value={functionDefinition.enabled}
          disabled={isReadonly}
          onChange={(v, e) => {
            e.stopPropagation();
            onEnabledChange(v);
          }}
        />
        <Button
          type="link"
          icon={<MinusCircledIcon />}
          disabled={isReadonly}
          danger
          style={{ padding: 0 }}
          onClick={e => {
            e.stopPropagation();
            modalApi.confirm({
              title: t('MODAL_1'),
              centered: true,
              content: t('MODAL_2'),
              okButtonProps: { danger: true },
              onOk: () => onDelete(functionDefinition.id),
            });
          }}
        />
      </div>
    </div>
  );
};

export default memo(FunctionCard);
