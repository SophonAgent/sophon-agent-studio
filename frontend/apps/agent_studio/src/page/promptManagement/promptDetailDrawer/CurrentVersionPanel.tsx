import type { FC } from 'react';
import type { PromptDetailItem } from '@/interface/prompt';

import { memo } from 'react';
import { cn } from '@/utils/tw';
import { Button } from 'antd';
import PromptEditor from '@/components/promptEditor';
import PromptVariables from '@/components/promptVariables';
import { useTranslation } from 'react-i18next';

interface CurrentVersionPanelProps {
  promptDetail?: PromptDetailItem;
  onEdit?: (initOptimize: boolean) => void;
}

const CurrentVersionPanel: FC<CurrentVersionPanelProps> = ({ promptDetail, onEdit }) => {
  const { t } = useTranslation();

  return (
    <div className={cn('flex h-full flex-col gap-4')}>
      <div className={cn('flex items-center justify-between gap-2')}>
        <div className={cn('flex-shrink-0 text-[12px] text-foreground-secondary')}>{t('PROMPT_23')}:</div>
        <div className={cn('flex items-center gap-3')}>
          <Button size="small" onClick={() => onEdit?.(true)}>
            {t('PROMPT_24')}
          </Button>
          <Button size="small" onClick={() => onEdit?.(false)}>
            {t('PROMPT_25')}
          </Button>
        </div>
      </div>

      <PromptEditor
        promptFramework={promptDetail?.framework}
        isReadonly
        value={promptDetail?.promptContent}
      />

      <div className={cn('flex gap-2')}>
        <div className={cn('flex-shrink-0 text-[12px] text-foreground-secondary')}>{t('PROMPT_26')}:</div>
        <PromptVariables value={promptDetail?.contentPlaceholders} />
      </div>
    </div>
  );
};

export default memo(CurrentVersionPanel);
