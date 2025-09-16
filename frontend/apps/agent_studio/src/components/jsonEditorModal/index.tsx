import type { FC } from 'react';

import { memo, useState } from 'react';
import Modal from '@/lib/modal';
import JsonEditor from '@/components/jsonEditor';

interface JsonEditorModalProps {
  title: string;
  initialValues?: string;
  isReadonly?: boolean;
  onCancel: () => void;
  onOk: (value: string) => void;
}

const JsonEditorModal: FC<JsonEditorModalProps> = ({ title, initialValues, isReadonly, onCancel, onOk }) => {
  const [value, setValue] = useState<string | undefined>(initialValues);

  return (
    <Modal
      open
      title={title}
      size="large"
      onCancel={onCancel}
      onOk={() => onOk(value || '')}
      footer={isReadonly ? null : undefined}
    >
      <JsonEditor value={value} onChange={setValue} isReadonly={isReadonly} />
    </Modal>
  );
};

export default memo(JsonEditorModal);
