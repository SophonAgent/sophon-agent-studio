import type { FC } from 'react';

import { memo, useMemo, useState } from 'react';
import { cn } from '@/utils/tw';
import { EnterFullScreenIcon } from '@radix-ui/react-icons';
import { Checkbox, Empty, Input } from 'antd';
import Modal from '@/lib/modal';
import { useTranslation } from 'react-i18next';

const { TextArea } = Input;

interface VariableInputProps {
  variables?: Record<string, string>;
  onVariableChange: (key: string, value: string) => void;
  replace: boolean;
  onReplaceChange: (replace: boolean) => void;
  isReadonly?: boolean;
}

const VariableModal: FC<VariableInputProps & { onCancel: () => void }> = ({
  variables = {},
  onVariableChange,
  replace,
  onReplaceChange,
  onCancel,
  isReadonly,
}) => {
  const { t } = useTranslation();

  const variableList = useMemo(() => Object.entries(variables), [variables]);

  const genVariables = () => {
    if (!variableList.length) {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={<span className={cn('text-[13px]')}>{t('CHAT_28')}</span>}
        />
      );
    }
    return (
      <div className={cn('flex flex-col gap-[6px] px-3 py-2')}>
        {variableList.map(item => {
          const [key, value] = item;
          return (
            <div key={key} className={cn('grid grid-cols-2 items-center gap-[6px]')}>
              <TextArea value={key} autoSize={{ minRows: 6 }} style={{ fontSize: 13 }} disabled />
              <TextArea
                value={value}
                autoSize={{ minRows: 6, maxRows: 6 }}
                placeholder="Please input"
                onChange={e => onVariableChange(key, e.target.value || '')}
                style={{ fontSize: 13 }}
                disabled={isReadonly}
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Modal open title="Edit Variables" onCancel={onCancel} footer={null} size="large">
      <div className={cn('overflow-hidden rounded-lg border border-solid border-default text-[13px]')}>
        <div className={cn('grid h-[28px] grid-cols-2 items-center gap-1 bg-background-tertiary px-3')}>
          <span>Variable</span>
          <span>Value</span>
        </div>

        <div className={cn('__hide-scrollbar max-h-[400px] overflow-y-auto')}>{genVariables()}</div>

        {variableList.length ? (
          <div className={cn('flex h-[28px] items-center bg-background-tertiary px-3')}>
            <Checkbox
              style={{ fontSize: 12 }}
              checked={replace}
              onChange={e => onReplaceChange(e.target.checked)}
            >
              {t('PROMPT_9')}
            </Checkbox>
          </div>
        ) : null}
      </div>
    </Modal>
  );
};

const VariableInput: FC<VariableInputProps> = props => {
  const { variables = {}, onVariableChange, replace, onReplaceChange, isReadonly } = props;

  const { t } = useTranslation();

  const [showEditModal, setShowEditModal] = useState<boolean>(false);

  const variableList = useMemo(() => Object.entries(variables), [variables]);

  const genVariables = () => {
    if (!variableList.length) {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={<span className={cn('text-[13px]')}>{t('CHAT_28')}</span>}
        />
      );
    }
    return (
      <div className={cn('flex flex-col gap-[6px] px-3 py-2')}>
        {variableList.map(item => {
          const [key, value] = item;
          return (
            <div key={key} className={cn('grid grid-cols-2 items-center gap-[6px]')}>
              <Input value={key} style={{ fontSize: 13 }} disabled />
              <Input
                value={value}
                placeholder="Please input"
                onChange={e => onVariableChange(key, e.target.value || '')}
                style={{ fontSize: 13 }}
                disabled={isReadonly}
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div
      className={cn(
        'flex-shrink-0 overflow-hidden rounded-lg border border-solid border-default text-[13px]',
      )}
    >
      <div
        className={cn('relative grid h-[28px] grid-cols-2 items-center gap-1 bg-background-tertiary px-3')}
      >
        <span>Variable</span>
        <span>Value</span>
        <EnterFullScreenIcon
          className={cn('absolute right-3 top-[7px] cursor-pointer')}
          width={14}
          height={14}
          onClick={() => setShowEditModal(true)}
        />
      </div>

      <div className={cn('__hide-scrollbar max-h-[180px] overflow-y-auto')}>{genVariables()}</div>

      {variableList.length ? (
        <div className={cn('flex h-[28px] items-center bg-background-tertiary px-3')}>
          <Checkbox
            style={{ fontSize: 12 }}
            checked={replace}
            onChange={e => onReplaceChange(e.target.checked)}
          >
            {t('PROMPT_9')}
          </Checkbox>
        </div>
      ) : null}

      {showEditModal && <VariableModal onCancel={() => setShowEditModal(false)} {...props} />}
    </div>
  );
};

export default memo(VariableInput);
