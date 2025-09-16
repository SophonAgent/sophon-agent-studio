import type { FC } from 'react';

import { memo, useState } from 'react';
import Drawer from '@/lib/drawer';
import { cn } from '@/utils/tw';
import { Button, Tabs, TabsProps } from 'antd';
import { PromptConfigItem } from '@/interface/prompt';
import Paragraph3Line from '@/components/paragraph3Line';
import Secret from '@/components/secret';
import CurrentVersionPanel from './CurrentVersionPanel';
import HistoryVersionPanel from './HistoryVersionPanel';

interface PromptDetailDrawerProps {
  promptConfig?: PromptConfigItem;
  tab: 'current' | 'history';
  onCancel: () => void;
  onDelete: () => void;
  onDebug: () => void;
  onEdit: (initOptimize: boolean) => void;
  onRefresh: () => void;
}

const PromptDetailDrawer: FC<PromptDetailDrawerProps> = ({
  promptConfig,
  tab,
  onCancel,
  onDelete,
  onDebug,
  onEdit,
  onRefresh,
}) => {
  const drawerStyles: any = {
    body: {
      padding: '0 0 16px',
      display: 'flex',
      flexDirection: 'column',
    },
  };

  const [activeKey, setActiveKey] = useState<'current' | 'history'>(tab);

  const descriptionItemList = [
    {
      label: '描述',
      value: (
        <Paragraph3Line value={promptConfig?.baseConfig?.description} rows={1} style={{ fontSize: 12 }} />
      ),
    },
    {
      label: 'Prompt ID',
      value: <Secret value={promptConfig?.baseConfig?.uid} copyable />,
    },
    {
      label: '创建时间',
      value: promptConfig?.baseConfig?.createTime,
    },
  ];

  const tabItems: TabsProps['items'] = [
    {
      key: 'current',
      label: `当前版本 V${promptConfig?.detail?.version}`,
      children: <CurrentVersionPanel promptDetail={promptConfig?.detail} onEdit={onEdit} />,
      style: { height: '100%', padding: '0 24px', overflow: 'auto' },
    },
    {
      key: 'history',
      label: '历史版本',
      children: <HistoryVersionPanel promptDetail={promptConfig?.detail} onRefresh={onRefresh} />,
      style: { height: '100%', padding: '0 24px', overflow: 'auto' },
    },
  ];

  const footer = (
    <div className={cn('flex items-center justify-end gap-2 p-2')}>
      <Button danger onClick={onDelete}>
        删除
      </Button>
      <Button type="primary" onClick={onDebug}>
        对话调试
      </Button>
    </div>
  );

  return (
    <Drawer
      open
      title="Prompt 详情"
      autoFocus={false}
      size="large"
      onCancel={onCancel}
      footer={footer}
      mask={false}
      styles={drawerStyles}
    >
      <div className={cn('flex flex-col gap-2 px-6 pb-2 pt-4')}>
        <Paragraph3Line
          value={promptConfig?.baseConfig?.name}
          rows={1}
          style={{ fontWeight: 600, fontSize: 16 }}
        />
        <div className={cn('flex flex-wrap gap-x-8 gap-y-2')}>
          {descriptionItemList.map(item => (
            <div key={item.label} className={cn('flex items-center gap-2 overflow-hidden')}>
              <div className={cn('flex-shrink-0 text-[12px] text-foreground-secondary')}>{item.label}</div>
              <div className={cn('overflow-hidden text-[12px] font-medium text-foreground-primary')}>
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      <Tabs
        items={tabItems}
        activeKey={activeKey}
        size="small"
        tabBarStyle={{ padding: '0 24px' }}
        onChange={v => setActiveKey(v as 'current' | 'history')}
      />
    </Drawer>
  );
};

export default memo(PromptDetailDrawer);
