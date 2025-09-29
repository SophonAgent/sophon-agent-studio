import type { TableProps } from '@/lib/table';

import Paragraph3Line from '@/components/paragraph3Line';
import { PROMPT_FRAMEWORK_MAP } from '@/constant/prompt';
import { PromptFrameworkEnum } from '@/interface/prompt';
import { cn } from '@/utils/tw';
import { Tag } from 'antd';

export const dataColumns = (t: any): TableProps['dataColumns'] => [
  {
    title: 'Version',
    dataIndex: 'version',
    key: 'version',
    width: 170,
    fixed: 'left',
    render: (value, record) => {
      const version = `V${value}`;
      if (record.status === 1) {
        return (
          <div>
            <span className={cn('mr-2')}>{version}</span>
            <Tag color="green">{t('TAG_17')}</Tag>
          </div>
        );
      } else {
        return version;
      }
    },
  },
  {
    title: 'Prompt',
    dataIndex: 'promptContent',
    key: 'promptContent',
    width: 220,
    render: (value, record) => (
      <Paragraph3Line value={record.promptDetails[0]?.promptContent} rows={3} copyable />
    ),
  },
  {
    title: t('PROMPT_22'),
    dataIndex: 'framework',
    key: 'framework',
    width: 110,
    render: (value, record) =>
      record.promptDetails[0]?.framework
        ? PROMPT_FRAMEWORK_MAP(t)[record.promptDetails[0]?.framework as PromptFrameworkEnum]?.label
        : null,
  },
  {
    title: 'Variables',
    dataIndex: 'contentPlaceholders',
    key: 'contentPlaceholders',
    width: 220,
    render: (value, record) => {
      const contentPlaceholders = record.promptDetails[0]?.contentPlaceholders;
      if (!contentPlaceholders?.length) return null;

      return (
        <div className={cn('flex flex-wrap gap-1')}>
          {contentPlaceholders.map((item: string) => (
            <Tag key={item} style={{ overflow: 'hidden' }}>
              <Paragraph3Line value={item} rows={1} />
            </Tag>
          ))}
        </div>
      );
    },
  },
  {
    title: t('TAG_7'),
    dataIndex: 'createTime',
    key: 'createTime',
    width: 180,
  },
];
