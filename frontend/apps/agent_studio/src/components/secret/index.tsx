import type { FC } from 'react';

import { memo, useState } from 'react';
import { cn } from '@/utils/tw';
import CopyButton from '@/components/copyButton';
import { Button } from 'antd';
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons';

interface SecretProps {
  value?: string;
  initVisible?: boolean;
  len?: number;
  copyable?: boolean;
}

const Secret: FC<SecretProps> = ({ value, initVisible = false, copyable = false, len = 13 }) => {
  const [visible, setVisible] = useState<boolean>(initVisible);

  return (
    <div className={cn('flex items-center')}>
      <div className={cn('whitespace-pre-line')}>{visible ? value : '*'.repeat(len)}</div>
      {copyable ? <CopyButton size="small" type="link" value={value} style={{ marginLeft: 4 }} /> : null}
      <Button
        icon={
          visible ? (
            <EyeOpenIcon className={cn('h-[13px] w-[13px]')} />
          ) : (
            <EyeClosedIcon className={cn('h-[13px] w-[13px]')} />
          )
        }
        type="link"
        size="small"
        onClick={() => setVisible(prev => !prev)}
      />
    </div>
  );
};

export default memo(Secret);
