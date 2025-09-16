import type { FC } from 'react';

import { memo } from 'react';
import { cn } from '@/utils/tw';
import { Tag } from 'antd';
import Paragraph3Line from '@/components/paragraph3Line';

interface PromptVariablesProps {
  value?: string[];
  onChange?: (value?: string[]) => void;
}

const PromptVariables: FC<PromptVariablesProps> = ({ value, onChange }) => {
  return (
    <div className={cn('flex flex-wrap gap-1')}>
      {value?.filter(Boolean)?.map(i => (
        <Tag key={i} className={cn('overflow-hidden')}>
          <Paragraph3Line value={i} rows={1} />
        </Tag>
      ))}
    </div>
  );
};

export default memo(PromptVariables);
