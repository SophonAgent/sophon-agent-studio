import type { TableProps } from '@/lib/table';

import Paragraph3Line from '@/components/paragraph3Line';
import { McpImplementTypeTextMap } from '@/constant/mcpServer';
import { McpImplementType } from '@/interface/mcpServer';

export const dataColumns = (t: any): TableProps['dataColumns'] => [
  {
    title: t('TAG_5'),
    dataIndex: 'displayName',
    key: 'displayName',
    width: 180,
    fixed: 'left',
    render: value => <Paragraph3Line value={value} rows={1} />,
  },
  {
    title: t('TAG_6'),
    dataIndex: 'description',
    key: 'description',
    width: 180,
    render: value => <Paragraph3Line value={value} rows={1} />,
  },
  {
    title: 'Endpoint Url',
    dataIndex: 'endpointUrl',
    key: 'endpointUrl',
    width: 250,
    render: value => <Paragraph3Line value={value} rows={1} copyable />,
  },
  {
    title: t('MCP_6'),
    dataIndex: 'category',
    key: 'category',
    width: 110,
    render: value => <Paragraph3Line value={value} rows={1} />,
  },
  {
    title: t('TAG_22'),
    dataIndex: 'implementType',
    key: 'implementType',
    width: 180,
    render: (value?: McpImplementType) => (value ? McpImplementTypeTextMap(t)[value] : ''),
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
