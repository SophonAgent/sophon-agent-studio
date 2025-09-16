import type { FC } from 'react';

import { memo } from 'react';
import { cn } from '@/utils/tw';

interface DividingLineProps {
  className?: string;
  layout?: 'vertical' | 'horizontal';
}

const DividingLine: FC<DividingLineProps> = ({ className, layout = 'horizontal' }) => {
  return (
    <div
      className={cn(
        'bg-background-secondary',
        layout === 'horizontal' ? 'h-[1px] w-full' : 'h-[calc(100%-8px)] w-[1px]',
        className,
      )}
    />
  );
};

export default memo(DividingLine);
