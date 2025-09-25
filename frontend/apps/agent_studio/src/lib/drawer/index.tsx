import type { FC } from 'react';
import type { DrawerProps as AntdDrawerProps } from 'antd';

import { memo } from 'react';
import { Drawer as AntdDrawer, Button } from 'antd';
import { Cross1Icon } from '@radix-ui/react-icons';
import { cn } from '@/utils/tw';
import { useTranslation } from 'react-i18next';

interface DrawerProps extends Omit<AntdDrawerProps, 'size' | 'onClose'> {
  size?: AntdDrawerProps['size'];
  onCancel?: () => void;
  onOk?: () => void;
  confirmLoading?: boolean;
}

const Drawer: FC<DrawerProps> = ({ size = 'large', onCancel, onOk, confirmLoading, ...props }) => {
  const { t } = useTranslation();

  const footer = (
    <div className={cn('flex items-center justify-end gap-2 p-2')}>
      <Button onClick={onCancel}>{t('BUTTON_19')}</Button>
      <Button type="primary" onClick={onOk} loading={confirmLoading}>
        {t('BUTTON_24')}
      </Button>
    </div>
  );

  return (
    <AntdDrawer
      size={size}
      closeIcon={null}
      extra={<Button type="text" icon={<Cross1Icon />} onClick={onCancel} />}
      footer={footer}
      onClose={onCancel}
      {...props}
    />
  );
};

export default memo(Drawer);
