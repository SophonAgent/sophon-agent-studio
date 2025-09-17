import type { TableProps } from '@/lib/table';

import Paragraph3Line from '@/components/paragraph3Line';
import { McpImplementTypeTextMap } from '@/constant/mcpServer';
import { McpImplementType } from '@/interface/mcpServer';

export const dataColumns: TableProps['dataColumns'] = [
  {
    title: 'MCP Server 展示名',
    dataIndex: 'displayName',
    key: 'displayName',
    width: 180,
    fixed: 'left',
    render: value => <Paragraph3Line value={value} rows={1} />,
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description',
    width: 180,
    render: value => <Paragraph3Line value={value} rows={1} />,
  },
  {
    title: 'Endpoint Url',
    dataIndex: 'endpointUrl',
    key: 'endpointUrl',
    width: 320,
    render: value => <Paragraph3Line value={value} rows={1} copyable />,
  },
  {
    title: '分类',
    dataIndex: 'category',
    key: 'category',
    width: 110,
    render: value => <Paragraph3Line value={value} rows={1} />,
  },
  {
    title: '来源',
    dataIndex: 'implementType',
    key: 'implementType',
    width: 110,
    render: (value?: McpImplementType) => (value ? McpImplementTypeTextMap[value] : ''),
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 180,
  },
  {
    title: '更新时间',
    dataIndex: 'modifyTime',
    key: 'modifyTime',
    width: 180,
  },
];
