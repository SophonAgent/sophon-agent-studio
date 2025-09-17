import type { FC } from 'react';
import type { TableProps as AntdTableProps } from 'antd';

import { memo } from 'react';
import { Table as AntdTable, Button, Dropdown } from 'antd';
import { cn } from '@/utils/tw';
import { DotsHorizontalIcon } from '@radix-ui/react-icons';
import useFeedback from '@/context/feedbackContext';

export interface TableActionItem {
  key: string;
  label: string;
  danger?: boolean;
  hidden?: boolean | ((record: any) => boolean);
  inMore?: boolean;
  onClick?: (record: any) => void | Promise<void>;
  onConfirm?: (record: any) => void | Promise<void>;
}

export interface TableProps extends Omit<AntdTableProps, 'columns' | 'size'> {
  actionList?: TableActionItem[];
  actionWidth?: number;
  dataColumns?: AntdTableProps['columns'];
  size?: AntdTableProps['size'];
}

const Table: FC<TableProps> = ({
  actionList = [],
  actionWidth = 200,
  dataColumns = [],
  size = 'large',
  ...props
}) => {
  const btnStyle = { fontSize: 12, padding: 0, height: 22, fontWeight: 500 };
  const showActionColumn = actionList.length > 0;

  const { modalApi } = useFeedback();

  const handleActionClick = (action: TableActionItem, record: any) => {
    if (action.onConfirm) {
      modalApi.confirm({
        title: `确认${action.label}吗？`,
        centered: true,
        okButtonProps: { danger: true },
        onOk: () => action.onConfirm?.(record),
      });
    } else {
      action.onClick?.(record);
    }
  };

  const genActionButtons = (record: any) => {
    const visibleActions = actionList.filter(action => {
      const isHidden = typeof action.hidden === 'function' ? action.hidden(record) : action.hidden;
      return !isHidden;
    });

    const directActions = visibleActions.filter(action => !action.inMore);
    const moreActions = visibleActions.filter(action => action.inMore);

    const directButtons = directActions.map(action => (
      <Button
        key={action.key}
        type="link"
        danger={action.danger}
        onClick={() => handleActionClick(action, record)}
        style={btnStyle}
      >
        {action.label}
      </Button>
    ));

    const menuItems = moreActions.map(action => ({
      key: action.key,
      label: (
        <Button type="link" danger={action.danger} style={btnStyle}>
          {action.label}
        </Button>
      ),
      onClick: () => handleActionClick(action, record),
    }));

    return (
      <div className={cn('flex items-center gap-2')}>
        {directButtons}
        {moreActions.length ? (
          <Dropdown menu={{ items: menuItems }}>
            <div className={cn('flex w-[26px] items-center justify-center')}>
              <DotsHorizontalIcon className={cn('cursor-pointer')} color="#1677ff" />
            </div>
          </Dropdown>
        ) : null}
      </div>
    );
  };

  const actionColumns: AntdTableProps['columns'] = [
    {
      title: '操作',
      dataIndex: '__action',
      key: '__action',
      fixed: 'right',
      width: actionWidth,
      render: (value, record) => genActionButtons(record),
    },
  ];

  const columns: AntdTableProps['columns'] = showActionColumn
    ? [...dataColumns, ...actionColumns]
    : dataColumns;

  return <AntdTable bordered columns={columns} size={size} {...props} />;
};

export default memo(Table);
