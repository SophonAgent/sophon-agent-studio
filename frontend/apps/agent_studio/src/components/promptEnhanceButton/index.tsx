import type { FC } from 'react';

import { Fragment, memo, useRef, useState } from 'react';
import { Button, Popover } from 'antd';
import { PromptFrameworkEnum } from '@/interface/prompt';
import { MagicWandIcon, ReloadIcon } from '@radix-ui/react-icons';
import useEnhancePrompt from '@/hooks/useEnhancePrompt';
import { cn } from '@/utils/tw';
import CopyButton from '../copyButton';
import Spin from '@/lib/spin';
import Tooltip from '@/lib/tooltip';
import useFeedback from '@/context/feedbackContext';
import { useTranslation } from 'react-i18next';

interface PromptEnhanceButtonProps {
  disabled?: boolean;
  userPrompt?: string;
  framework?: PromptFrameworkEnum;
  onChange?: (value?: string) => void;
}

const PromptEnhanceButton: FC<PromptEnhanceButtonProps> = ({
  disabled,
  userPrompt,
  framework = PromptFrameworkEnum.COMMON,
  onChange,
}) => {
  const { t } = useTranslation();

  const { messageApi, modalApi } = useFeedback();
  const { onEnhance, enhancedPrompt, isRunning, onStopRequest } = useEnhancePrompt();

  const boxRef = useRef<HTMLDivElement>(null);
  const [isOpenPopover, setIsOpenPopoverPopover] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(true);

  const onClose = () => setIsOpenPopoverPopover(false);

  const onOptimize = async () => {
    if (!userPrompt) {
      messageApi.error(t('PROMPT_14'));
      onClose();
      return;
    }
    setIsOpenPopoverPopover(true);
    await onEnhance({ userPrompt, framework });
  };

  const onLeave = () => {
    if (!showConfirm) return;

    setShowConfirm(false);
    modalApi.confirm({
      centered: true,
      zIndex: 1300,
      okButtonProps: { danger: true },
      content: t('MODAL_8'),
      onOk: () => {
        setShowConfirm(true);
        if (isRunning) {
          onStopRequest();
        }
        onClose();
      },
      onCancel: () => setShowConfirm(true),
    });
  };

  const renderButton = () => {
    if (isRunning) {
      return (
        <div>
          <div className={cn('flex items-center px-2 text-[13px] opacity-50')}>
            <Spin spinning size="small" />
            <span className={cn('ml-2')}>{t('CHAT_6')}</span>
          </div>
          <div className={cn('mt-6 flex justify-end')}>
            <Button type="primary" danger onClick={onStopRequest}>
              {t('CHAT_34')}
            </Button>
          </div>
        </div>
      );
    } else {
      return (
        <div className={cn('flex items-center justify-between')}>
          <div className={cn('flex items-center gap-4')}>
            <Button
              type="primary"
              onClick={() => {
                onClose();
                onChange?.(enhancedPrompt || '');
              }}
            >
              {t('BUTTON_17')}
            </Button>
            <Button onClick={onClose}>{t('BUTTON_19')}</Button>
          </div>
          <div className={cn('flex h-8 gap-2')}>
            <Tooltip title={t('BUTTON_4')}>
              <Button type="text" icon={<ReloadIcon />} onClick={onOptimize} />
            </Tooltip>
            <CopyButton value={enhancedPrompt} />
          </div>
        </div>
      );
    }
  };

  return (
    <Fragment>
      <Tooltip title={t('PROMPT_13')}>
        <Popover
          style={{ maxWidth: 620 }}
          placement="bottomLeft"
          color="#f9f9f9"
          trigger="click"
          arrow={false}
          content={
            <div className={cn('flex max-h-[450px] w-[450px] flex-col gap-4 px-2 py-3')}>
              {!enhancedPrompt ? null : (
                <div className={cn('flex-1 overflow-auto whitespace-pre-wrap')} ref={boxRef}>
                  {enhancedPrompt}
                </div>
              )}
              {renderButton()}
              {!enhancedPrompt ? null : (
                <div className={cn('flex justify-center text-[12px] text-foreground-secondary')}>
                  {t('CHAT_35')}
                </div>
              )}
            </div>
          }
          open={isOpenPopover}
          destroyOnHidden
          onOpenChange={v => {
            if (v) {
              setIsOpenPopoverPopover(true);
            } else {
              onLeave();
            }
          }}
        >
          <Button
            type="text"
            disabled={disabled}
            icon={<MagicWandIcon color="#2c57e7" />}
            onClick={onOptimize}
          />
        </Popover>
      </Tooltip>
    </Fragment>
  );
};

export default memo(PromptEnhanceButton);
