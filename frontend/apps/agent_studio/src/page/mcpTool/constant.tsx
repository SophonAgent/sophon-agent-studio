import type { TableProps } from '@/lib/table';

import Paragraph3Line from '@/components/paragraph3Line';

export const dataColumns = (t: any): TableProps['dataColumns'] => [
  {
    title: t('TAG_5'),
    dataIndex: 'displayName',
    key: 'displayName',
    width: 180,
    fixed: 'left',
    render: value => <Paragraph3Line value={value} rows={2} />,
  },
  {
    title: t('TAG_23'),
    dataIndex: 'qualifiedName',
    key: 'qualifiedName',
    width: 180,
    render: value => <Paragraph3Line value={value} rows={2} />,
  },
  {
    title: t('TAG_6'),
    dataIndex: 'description',
    key: 'description',
    width: 180,
    render: value => <Paragraph3Line value={value} rows={2} />,
  },
  {
    title: t('TAG_11'),
    dataIndex: 'proxyType',
    key: 'proxyType',
    width: 110,
  },
  {
    title: 'Input Schema',
    dataIndex: 'inputSchema',
    key: 'inputSchema',
    width: 250,
    render: value => <Paragraph3Line value={value} rows={2} copyable />,
  },
  {
    title: t('TAG_7'),
    dataIndex: 'createTime',
    key: 'createTime',
    width: 180,
  },
  {
    title: t('TAG_8'),
    dataIndex: 'modifyTime',
    key: 'modifyTime',
    width: 180,
  },
];
