import type { FC } from 'react';

import { memo, useMemo } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { isJSON } from '@/utils/json';
import { cn } from '@/utils/tw';
import CopyButton from '../copyButton';

interface JsonViewProps {
  className?: string;
  value?: any;
  copyable?: boolean;
}

const JsonView: FC<JsonViewProps> = ({ className, value, copyable }) => {
  const text = useMemo(() => {
    if (isJSON(value)) {
      return JSON.stringify(JSON.parse(value), null, 2);
    } else {
      return JSON.stringify(value, null, 2);
    }
  }, [value]);

  return (
    <div className={cn('relative overflow-hidden rounded-[10px] bg-[#fafafa]', className)}>
      <SyntaxHighlighter
        language="json"
        style={oneLight}
        customStyle={{ margin: 0 }}
        className={cn('h-full min-h-[120px]')}
      >
        {text}
      </SyntaxHighlighter>
      {copyable ? (
        <div className={cn('absolute right-[10px] top-[10px]')}>
          <CopyButton value={text} size="small" style={{ background: 'transparent' }} />
        </div>
      ) : null}
    </div>
  );
};

export default memo(JsonView);
