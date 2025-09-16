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
  const { messageApi, modalApi } = useFeedback();
  const { onEnhance, enhancedPrompt, isRunning, onStopRequest } = useEnhancePrompt();

  const boxRef = useRef<HTMLDivElement>(null);
  const [isOpenPopover, setIsOpenPopoverPopover] = useState<boolean>(false);
  const [showConfirm, setShowConfirm] = useState<boolean>(true);

  const onClose = () => setIsOpenPopoverPopover(false);

  const onOptimize = async () => {
    if (!userPrompt) {
      messageApi.error('请输入原始Prompt!');
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
      content: '确认舍弃 AI 生成的内容吗？',
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
            <span className={cn('ml-2')}>结果生成中...</span>
          </div>
          <div className={cn('mt-6 flex justify-end')}>
            <Button type="primary" danger onClick={onStopRequest}>
              停止响应
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
              替换
            </Button>
            <Button onClick={onClose}>取消</Button>
          </div>
          <div className={cn('flex h-8 gap-2')}>
            <Tooltip title="重新生成">
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
      <Tooltip title="自动优化 prompt">
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
                  优化内容仅供参考，不代表平台立场
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
