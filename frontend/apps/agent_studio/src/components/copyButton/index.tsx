import type { FC } from 'react';

import { memo, useEffect, useRef, useState } from 'react';
import copyToClipboard from 'copy-to-clipboard';
import { Button, ButtonProps } from 'antd';
import { CheckCircledIcon, CopyIcon } from '@radix-ui/react-icons';
import Tooltip from '@/lib/tooltip';
import { cn } from '@/utils/tw';

interface CopyButtonProps extends Omit<ButtonProps, 'icon' | 'onClick'> {
  value?: string;
}

const CopyButton: FC<CopyButtonProps> = ({ value = '', type = 'text', ...props }) => {
  const copyTips: string[] = ['复制', '已复制'];
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const copyTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (copyTimer.current) {
        clearTimeout(copyTimer.current);
        copyTimer.current = null;
      }
    };
  }, []);

  const onCopy = () => {
    if (isCopied) return;

    copyToClipboard(value, { format: 'text/plain' });
    setIsCopied(true);
    copyTimer.current = setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <Tooltip title={isCopied ? copyTips[1] : copyTips[0]}>
      <Button
        {...props}
        type={type}
        icon={
          isCopied ? (
            <CheckCircledIcon color="green" className={cn({ 'h-[13px] w-[13px]': props.size === 'small' })} />
          ) : (
            <CopyIcon className={cn({ 'h-[13px] w-[13px]': props.size === 'small' })} />
          )
        }
        onClick={onCopy}
      />
    </Tooltip>
  );
};

export default memo(CopyButton);
