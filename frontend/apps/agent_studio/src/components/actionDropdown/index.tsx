import type { DropdownProps } from 'antd';
import type { FC, ReactNode } from 'react';

import { cn } from '@/utils/tw';
import { Dropdown } from 'antd';
import { memo } from 'react';

export interface DropdownMenuItem {
  key: string;
  label: ReactNode;
  icon?: ReactNode;
  danger?: boolean;
  onClick?: () => void | Promise<void>;
}

interface ActionDropdownProps extends Omit<DropdownProps, 'menu' | 'popupRender'> {
  actionList?: DropdownMenuItem[];
}

const ActionDropdown: FC<ActionDropdownProps> = ({ children, actionList = [], ...props }) => {
  const popupRender = () => {
    return (
      <div
        className={cn(
          'rounded-xl border border-solid border-heavy bg-background-elevated-primary px-[6px] py-2 shadow-lg',
        )}
      >
        {actionList.map(i => (
          <div
            key={i.key}
            className={cn(
              '__menu-item gap-[6px] pr-[14px]',
              i.danger
                ? 'text-foreground-status-error hover:bg-background-status-error'
                : 'text-foreground-primary',
            )}
            onClick={e => {
              e.stopPropagation();
              i.onClick?.();
            }}
          >
            {i.icon && <div className={cn('flex h-5 w-5 items-center justify-center')}>{i.icon}</div>}
            {i.label}
          </div>
        ))}
      </div>
    );
  };

  return (
    <Dropdown popupRender={popupRender} {...props}>
      {children}
    </Dropdown>
  );
};

export default memo(ActionDropdown);
