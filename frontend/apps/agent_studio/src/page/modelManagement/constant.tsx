import type { TableProps } from '@/lib/table';

import Paragraph3Line from '@/components/paragraph3Line';
import { tranJsonToObject } from '@/utils/json';
import { MODEL_FAMILY_MAP } from '@/constant/model';

export const dataColumns = (t: any): TableProps['dataColumns'] => [
  {
    title: t('TAG_18'),
    dataIndex: 'name',
    key: 'name',
    width: 180,
    fixed: 'left',
    render: value => <Paragraph3Line value={value} rows={1} />,
  },
  {
    title: t('TAG_19'),
    dataIndex: 'modelName',
    key: 'modelName',
    width: 180,
    render: value => <Paragraph3Line value={value} rows={1} />,
  },
  {
    title: t('TAG_20'),
    dataIndex: 'config',
    key: 'config',
    width: 180,
    render: value => {
      const { provider } = tranJsonToObject(value);
      const family = provider ? MODEL_FAMILY_MAP[provider] : '';
      return <Paragraph3Line value={family} rows={1} />;
    },
  },
  {
    title: t('TAG_6'),
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
    render: value =>
      value ? (
        <div>
          {t('TAG_21')}: {value}
        </div>
      ) : null,
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
