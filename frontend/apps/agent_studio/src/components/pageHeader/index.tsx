import type { FC } from 'react';

import { memo } from 'react';
import { cn } from '@/utils/tw';
import { Button, Input, Select } from 'antd';
import { PlusIcon } from '@radix-ui/react-icons';

export interface PageHeaderTitleItem {
  label: string;
  onClick?: () => void;
}

export interface PageHeaderFilterItem {
  key: string;
  type: 'input' | 'select';
  placeholder?: string;
  options?: { label: string; value: string }[];
  value?: string;
  onChange?: (e: any) => void;
}

interface PageHeaderProps {
  title?: PageHeaderTitleItem[];
  className?: string;
  filterList?: PageHeaderFilterItem[];
  actionLabel?: string;
  onActionClick?: () => void;
}

const PageHeader: FC<PageHeaderProps> = ({
  title,
  className,
  filterList = [],
  actionLabel,
  onActionClick,
}) => {
  const genFilterItem = (item: PageHeaderFilterItem) => {
    if (item.type === 'select') {
      return (
        <Select
          key={item.key}
          placeholder={item.placeholder}
          allowClear
          showSearch
          options={item.options}
          value={item.value}
          onChange={item.onChange}
          style={{ width: 200 }}
          filterOption={(inputValue, option) => {
            return option?.label?.toLowerCase()?.includes(inputValue.toLowerCase()) ?? false;
          }}
        />
      );
    }
    return (
      <Input
        key={item.key}
        placeholder={item.placeholder}
        allowClear
        value={item.value}
        onChange={item.onChange}
        style={{ width: 200 }}
      />
    );
  };

  return (
    <div className={cn('px-5', className)}>
      {title?.length ? (
        <div className={cn('flex h-[52px] items-center gap-3')}>
          {title.map((item, index) => (
            <div
              key={index}
              className={cn(
                'flex items-center',
                title.length - 1 === index
                  ? 'font-medium text-foreground-primary'
                  : 'text-foreground-tertiary',
              )}
            >
              <span className={cn(item.onClick ? 'cursor-pointer' : '')} onClick={item.onClick}>
                {item.label}
              </span>
              {title.length - 1 !== index ? (
                <span className={cn('ml-3 mt-[-1px] text-[14px] text-foreground-tertiary')}>/</span>
              ) : null}
            </div>
          ))}
        </div>
      ) : null}

      <div className={cn('flex items-center justify-between')}>
        <div className={cn('flex items-center gap-3')}>{filterList.map(item => genFilterItem(item))}</div>

        {actionLabel ? (
          <Button type="primary" icon={<PlusIcon />} onClick={onActionClick}>
            {actionLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );
};

export default memo(PageHeader);
