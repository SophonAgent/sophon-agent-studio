import type { FC } from 'react';
import type { ModalProps as AntdModalProps } from 'antd';

import { memo } from 'react';
import { Modal as AntdModal } from 'antd';

interface ModalProps extends Omit<AntdModalProps, 'centered' | 'width'> {
  size?: 'large';
  width?: AntdModalProps['width'];
}

const Modal: FC<ModalProps> = ({ size, width, ...props }) => {
  return (
    <AntdModal
      centered
      width={width || (size === 'large' ? 736 : undefined)}
      styles={{ header: { marginBottom: 24 } }}
      {...props}
    />
  );
};

export default memo(Modal);
