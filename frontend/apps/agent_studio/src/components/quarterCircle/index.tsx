import type { FC } from 'react';

import { cn } from '@/utils/tw';
import './index.css';

interface QuarterCircleProps {
  size?: 'small' | 'default' | 'large';
}

const QuarterCircle: FC<QuarterCircleProps> = ({ size }) => {
  return (
    <div
      className={cn(
        'quarter-circle',
        { 'quarter-circle-small': size === 'small' },
        { 'quarter-circle-large': size === 'large' },
      )}
    />
  );
};

export default QuarterCircle;
