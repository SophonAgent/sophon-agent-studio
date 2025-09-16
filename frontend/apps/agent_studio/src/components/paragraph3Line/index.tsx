import type { CSSProperties, FC } from 'react';

import { memo } from 'react';
import { Typography } from 'antd';
import { cn } from '@/utils/tw';
import { isJSON } from '@/utils/json';
import JsonView from '../jsonView';

const { Paragraph } = Typography;

interface Paragraph3Line {
  value?: string;
  rows?: number;
  style?: CSSProperties;
  copyable?: boolean;
  onClick?: () => void;
  isReadonly?: boolean;
}

const Paragraph3Line: FC<Paragraph3Line> = ({
  value,
  rows = 3,
  style = {},
  copyable,
  onClick,
  isReadonly,
}) => {
  return (
    <Paragraph
      ellipsis={{
        rows,
        tooltip: {
          title: isJSON(value) ? (
            <JsonView className={cn('max-h-[600px] overflow-auto text-[12px]')} value={value} copyable />
          ) : (
            <div className={cn('text-[12px] text-foreground-primary')}>{value}</div>
          ),
          color: 'var(--bg-primary)',
        },
      }}
      style={{
        margin: 0,
        fontSize: 13,
        color: isReadonly ? '#00000040' : onClick ? '#1677ff' : 'var(--text-primary)',
        cursor: onClick && !isReadonly ? 'pointer' : undefined,
        ...style,
      }}
      copyable={copyable}
      onClick={() => !isReadonly && onClick?.()}
    >
      {value}
    </Paragraph>
  );
};

export default memo(Paragraph3Line);
