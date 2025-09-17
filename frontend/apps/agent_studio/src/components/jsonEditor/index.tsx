import type { FC } from 'react';
import type { EditorProps } from '@monaco-editor/react';

import { memo } from 'react';
import MonacoEditor from '@/lib/monacoEditor';
import { cn } from '@/utils/tw';
import CopyButton from '@/components/copyButton';
import { Button, Input } from 'antd';
import { CodeIcon } from '@radix-ui/react-icons';
import Tooltip from '@/lib/tooltip';
import { isJSON } from '@/utils/json';

const { TextArea } = Input;

interface JsonEditorProps {
  className?: string;
  value?: string;
  onChange?: (value?: string) => void;
  options?: EditorProps['options'];
  isReadonly?: boolean;
  placeholder?: string;
}

const JsonEditor: FC<JsonEditorProps> = ({
  className,
  value,
  onChange,
  options,
  isReadonly,
  placeholder,
}) => {
  const handleEditorChange = (v?: string) => {
    onChange?.(v);
  };

  const onFormat = () => {
    if (value && isJSON(value)) {
      const newValue = JSON.stringify(JSON.parse(value), null, 2);
      onChange?.(newValue);
    }
  };

  return (
    <div
      className={cn(
        'h-[260px] w-full overflow-hidden rounded-md border border-solid border-default text-[13px]',
        className,
      )}
    >
      <div
        className={cn(
          'flex h-[32px] items-center justify-end gap-3 overflow-hidden rounded-t-md bg-background-tertiary px-3 py-1 text-foreground-primary',
        )}
      >
        <Tooltip title="格式化">
          <Button type="text" icon={<CodeIcon />} size="small" onClick={() => onFormat()} />
        </Tooltip>
        <CopyButton value={value} size="small" />
      </div>
      {placeholder && !value ? (
        <TextArea
          style={{ resize: 'none', height: 'calc(100% - 32px)' }}
          variant="borderless"
          placeholder={placeholder}
          value={value}
          onChange={e => handleEditorChange(e.target.value)}
        />
      ) : (
        <MonacoEditor
          language="json"
          value={value}
          onChange={handleEditorChange}
          options={options}
          isReadonly={isReadonly}
        />
      )}
    </div>
  );
};

export default memo(JsonEditor);
