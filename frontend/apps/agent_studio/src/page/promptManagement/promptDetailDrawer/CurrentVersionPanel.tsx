import type { FC } from 'react';
import type { PromptDetailItem } from '@/interface/prompt';

import { memo } from 'react';
import { cn } from '@/utils/tw';
import { Button } from 'antd';
import PromptEditor from '@/components/promptEditor';
import PromptVariables from '@/components/promptVariables';

interface CurrentVersionPanelProps {
  promptDetail?: PromptDetailItem;
  onEdit?: (initOptimize: boolean) => void;
}

const CurrentVersionPanel: FC<CurrentVersionPanelProps> = ({ promptDetail, onEdit }) => {
  return (
    <div className={cn('flex h-full flex-col gap-4')}>
      <div className={cn('flex items-center justify-between gap-2')}>
        <div className={cn('flex-shrink-0 text-[12px] text-foreground-secondary')}>Prompt 内容:</div>
        <div className={cn('flex items-center gap-3')}>
          <Button size="small" onClick={() => onEdit?.(true)}>
            优化 Prompt
          </Button>
          <Button size="small" onClick={() => onEdit?.(false)}>
            编辑 Prompt
          </Button>
        </div>
      </div>

      <PromptEditor
        promptFramework={promptDetail?.framework}
        isReadonly
        value={promptDetail?.promptContent}
      />

      <div className={cn('flex gap-2')}>
        <div className={cn('flex-shrink-0 text-[12px] text-foreground-secondary')}>已识别到变量占位符:</div>
        <PromptVariables value={promptDetail?.contentPlaceholders} />
      </div>
    </div>
  );
};

export default memo(CurrentVersionPanel);
