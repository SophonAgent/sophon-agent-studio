import type { FC } from 'react';

import { memo } from 'react';
import { Spin as AntdSpin, SpinProps } from 'antd';
import QuarterCircle from '@/components/quarterCircle';

const Spin: FC<SpinProps> = ({ ...props }) => {
  return <AntdSpin indicator={<QuarterCircle size={props.size} />} {...props} />;
};

export default memo(Spin);
