import type { FC } from 'react';

import { memo } from 'react';
import { Tooltip as AntdTooltip, TooltipProps } from 'antd';

const Tooltip: FC<TooltipProps> = ({ ...props }) => {
  return <AntdTooltip styles={{ body: { fontSize: 12 } }} {...props} />;
};

export default memo(Tooltip);
