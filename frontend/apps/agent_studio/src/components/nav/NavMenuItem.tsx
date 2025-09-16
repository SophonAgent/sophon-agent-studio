import type { FC, ReactNode } from 'react';

import { memo } from 'react';
import Paragraph3Line from '../paragraph3Line';
import { cn } from '@/utils/tw';
import Tooltip from '@/lib/tooltip';

interface NavMenuItemProps {
  label?: string;
  icon?: ReactNode;
  checked?: boolean;
  onChange?: () => void;
  className?: string;
  tip?: ReactNode;
}

const NavMenuItem: FC<NavMenuItemProps> = ({ checked, icon, label, onChange, className, tip }) => {
  return (
    <Tooltip title={tip} placement="right">
      <div
        className={cn(
          '__menu-item h-[36px] justify-between gap-3 text-sm',
          checked ? 'bg-[--menu-item-active]' : '',
          className,
        )}
        onClick={e => {
          e.stopPropagation();
          onChange?.();
        }}
      >
        <div className={cn('flex items-center gap-[6px] overflow-hidden')}>
          {icon && <div className={cn('flex h-5 w-5 flex-shrink-0 items-center justify-center')}>{icon}</div>}
          <Paragraph3Line value={label} rows={1} style={{ color: 'var(--text-primary)', fontSize: 14 }} />
        </div>
      </div>
    </Tooltip>
  );
};

export default memo(NavMenuItem);
