import type { FC } from 'react';
import type { PromptDetailItem } from '@/interface/prompt';

import { memo } from 'react';
import PromptEditor from '@/components/promptEditor';
import PromptVariables from '@/components/promptVariables';
import Modal from '@/lib/modal';
import { cn } from '@/utils/tw';
import { useTranslation } from 'react-i18next';

interface PromptDetailModalProps {
  promptDetail?: PromptDetailItem;
  onCancel: () => void;
}

const PromptDetailModal: FC<PromptDetailModalProps> = ({ promptDetail, onCancel }) => {
  const { t } = useTranslation();

  return (
    <Modal open title={t('PROMPT_23')} onCancel={onCancel} size="large" footer={null}>
      <PromptEditor isReadonly value={promptDetail?.promptContent} />

      <div className={cn('mt-4 flex gap-2')}>
        <div className={cn('flex-shrink-0 text-[12px] text-foreground-secondary')}>{t('PROMPT_26')}:</div>
        <PromptVariables value={promptDetail?.contentPlaceholders} />
      </div>
    </Modal>
  );
};

export default memo(PromptDetailModal);
