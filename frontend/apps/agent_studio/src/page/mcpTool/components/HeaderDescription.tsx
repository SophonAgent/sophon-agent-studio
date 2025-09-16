import type { FC, ReactNode } from 'react';

import { memo } from 'react';
import Paragraph3Line from '@/components/paragraph3Line';
import { McpImplementTypeTextMap } from '@/constant/mcpServer';
import { McpServerItem } from '@/interface/mcpServer';
import Tooltip from '@/lib/tooltip';
import { cn } from '@/utils/tw';
import { Pencil1Icon } from '@radix-ui/react-icons';
import { Button, Tag } from 'antd';
import DividingLine from '@/lib/dividingLine';

const DescriptionItem: FC<{ label: string; value: ReactNode }> = ({ label, value }) => (
  <div className={cn('flex h-6 items-center')}>
    <div className={cn('flex-shrink-0 text-[12px] text-foreground-secondary')}>{label}</div>
    {value}
  </div>
);

interface HeaderDescriptionProps {
  className?: string;
  mcpServer?: McpServerItem;
  onEditMcpServer: () => void;
}

const HeaderDescription: FC<HeaderDescriptionProps> = ({ className, mcpServer, onEditMcpServer }) => {
  const secondDescriptionList = [
    {
      label: '来源：',
      value: mcpServer?.implementType ? (
        <Tag color="blue">{McpImplementTypeTextMap[mcpServer.implementType]}</Tag>
      ) : (
        ''
      ),
    },
    {
      label: '分类：',
      value: mcpServer?.category ? <Tag color="green">{mcpServer?.category}</Tag> : '',
    },
    {
      label: '创建时间：',
      value: mcpServer?.createTime,
    },
  ].filter(f => Boolean(f.value));

  return (
    <div className={cn('flex flex-col gap-3 text-[13px]', className)}>
      <div className={cn('flex h-6 items-center gap-3')}>
        <div className={cn('font-bold')}>{mcpServer?.displayName}</div>
        <Tooltip title="编辑">
          <Button type="text" size="small" icon={<Pencil1Icon />} onClick={onEditMcpServer} />
        </Tooltip>
        <DividingLine layout="vertical" />
        <Tag color="blue">{mcpServer?.type}</Tag>
      </div>

      <div className={cn('flex items-center gap-3')}>
        {secondDescriptionList.map((item, index) => (
          <div key={item.label} className={cn('flex h-6 items-center gap-3')}>
            <DescriptionItem label={item.label} value={item.value} />
            {index < secondDescriptionList.length - 1 && <DividingLine layout="vertical" />}
          </div>
        ))}
      </div>

      <DescriptionItem
        label="描述："
        value={<Paragraph3Line value={mcpServer?.description} rows={1} style={{ fontSize: 12 }} />}
      />
    </div>
  );
};

export default memo(HeaderDescription);
