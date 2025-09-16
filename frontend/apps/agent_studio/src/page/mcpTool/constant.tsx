import Paragraph3Line from '@/components/paragraph3Line';
import { TableProps } from '@/lib/table';

export const dataColumns: TableProps['dataColumns'] = [
  {
    title: '工具展示名',
    dataIndex: 'displayName',
    key: 'displayName',
    width: 180,
    fixed: 'left',
    render: value => <Paragraph3Line value={value} rows={2} />,
  },
  {
    title: '工具唯一标识名',
    dataIndex: 'qualifiedName',
    key: 'qualifiedName',
    width: 180,
    render: value => <Paragraph3Line value={value} rows={2} />,
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description',
    width: 180,
    render: value => <Paragraph3Line value={value} rows={2} />,
  },
  {
    title: '类型',
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
