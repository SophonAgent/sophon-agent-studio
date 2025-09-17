import type { FC, ReactNode } from 'react';
import type { PromptDetailItem } from '@/interface/prompt';

import { memo } from 'react';
import Modal from '@/lib/modal';
import { cn } from '@/utils/tw';
import MonacoDiffEditor from '@/lib/monacoDiffEditor';
import PromptVariables from '@/components/promptVariables';

const DescriptionItem: FC<{ label: string; value: ReactNode }> = ({ label, value }) => {
  return (
    <div className={cn('flex gap-2')}>
      <div className={cn('flex-shrink-0 text-[13px] text-foreground-secondary')}>{label}</div>
      <div className={cn('overflow-hidden text-[13px] text-foreground-primary')}>{value}</div>
    </div>
  );
};

interface PromptDiffModalProps {
  originalPromptDetail?: PromptDetailItem;
  modifiedPromptDetail?: PromptDetailItem;
  onCancel: () => void;
}

const PromptDiffModal: FC<PromptDiffModalProps> = ({
  originalPromptDetail,
  modifiedPromptDetail,
  onCancel,
}) => {
  return (
    <Modal open title="版本对比" onCancel={onCancel} size="large" footer={null}>
      <div className={cn('mb-4 grid grid-cols-2 gap-3')}>
        <div className={cn('flex flex-col gap-2')}>
          <DescriptionItem label="版本:" value={`V${originalPromptDetail?.version}`} />
          <DescriptionItem
            label="变量占位符:"
            value={<PromptVariables value={originalPromptDetail?.contentPlaceholders} />}
          />
        </div>

        <div className={cn('flex flex-col gap-2')}>
          <DescriptionItem label="版本:" value={`V${modifiedPromptDetail?.version}`} />
          <DescriptionItem
            label="变量占位符:"
            value={<PromptVariables value={modifiedPromptDetail?.contentPlaceholders} />}
          />
        </div>
      </div>

      <MonacoDiffEditor
        className={cn('h-[400px]')}
        bordered
        language="plaintext"
        original={originalPromptDetail?.promptContent}
        modified={modifiedPromptDetail?.promptContent}
        isReadonly
      />
    </Modal>
  );
};

export default memo(PromptDiffModal);
