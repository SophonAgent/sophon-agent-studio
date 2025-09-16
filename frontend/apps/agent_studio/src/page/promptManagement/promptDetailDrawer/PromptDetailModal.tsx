import type { FC } from 'react';

import { memo } from 'react';
import PromptEditor from '@/components/promptEditor';
import PromptVariables from '@/components/promptVariables';
import { PromptDetailItem } from '@/interface/prompt';
import Modal from '@/lib/modal';
import { cn } from '@/utils/tw';

interface PromptDetailModalProps {
  promptDetail?: PromptDetailItem;
  onCancel: () => void;
}

const PromptDetailModal: FC<PromptDetailModalProps> = ({ promptDetail, onCancel }) => {
  return (
    <Modal open title="Prompt 内容" onCancel={onCancel} size="large" footer={null}>
      <PromptEditor isReadonly value={promptDetail?.promptContent} />

      <div className={cn('mt-4 flex gap-2')}>
        <div className={cn('flex-shrink-0 text-[12px] text-foreground-secondary')}>已识别到变量占位符:</div>
        <PromptVariables value={promptDetail?.contentPlaceholders} />
      </div>
    </Modal>
  );
};

export default memo(PromptDetailModal);
