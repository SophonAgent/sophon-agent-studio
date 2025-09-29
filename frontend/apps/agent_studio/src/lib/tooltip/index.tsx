import type { FC } from 'react';
import type { TooltipProps } from 'antd';

import { memo } from 'react';
import { Tooltip as AntdTooltip } from 'antd';

const Tooltip: FC<TooltipProps> = ({ ...props }) => {
  return <AntdTooltip styles={{ body: { fontSize: 12 } }} {...props} />;
};

export default memo(Tooltip);
