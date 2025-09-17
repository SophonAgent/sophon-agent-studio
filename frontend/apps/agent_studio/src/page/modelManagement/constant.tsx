import type { TableProps } from '@/lib/table';

import Paragraph3Line from '@/components/paragraph3Line';
import { tranJsonToObject } from '@/utils/json';

export const dataColumns: TableProps['dataColumns'] = [
  {
    title: '模型展示名',
    dataIndex: 'name',
    key: 'name',
    width: 180,
    fixed: 'left',
    render: value => <Paragraph3Line value={value} rows={1} />,
  },
  {
    title: '模型名称',
    dataIndex: 'modelName',
    key: 'modelName',
    width: 180,
    render: value => <Paragraph3Line value={value} rows={1} />,
  },
  {
    title: '模型家族',
    dataIndex: 'config',
    key: 'config',
    width: 180,
    render: value => {
      const { provider } = tranJsonToObject(value);
      return <Paragraph3Line value={provider} rows={1} />;
    },
  },
  {
    title: '描述',
    dataIndex: 'description',
    key: 'description',
    width: 180,
    render: value => <Paragraph3Line value={value} rows={1} />,
  },
  {
    title: 'Max Token',
    dataIndex: 'maxCompletionTokenLimit',
    key: 'maxCompletionTokenLimit',
    width: 180,
    render: value => (value ? <div>输出：{value}</div> : null),
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
