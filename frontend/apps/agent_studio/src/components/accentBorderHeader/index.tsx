import type { FC } from 'react';

import { memo } from 'react';
import { cn } from '@/utils/tw';

interface AccentBorderHeaderProps {
  title: string;
  className?: string;
}

const AccentBorderHeader: FC<AccentBorderHeaderProps> = ({ title, className }) => {
  return (
    <div
      className={cn(
        'border-l-[2px] border-solid border-[#1677ff] px-2 text-sm font-medium text-foreground-primary',
        className,
      )}
    >
      {title}
    </div>
  );
};

export default memo(AccentBorderHeader);
