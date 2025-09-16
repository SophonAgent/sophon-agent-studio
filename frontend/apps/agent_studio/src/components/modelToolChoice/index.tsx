import type { FC } from 'react';

import { memo, useEffect, useState } from 'react';
import { isObject } from 'lodash-es';
import { cn } from '@/utils/tw';
import { Input, Select } from 'antd';

const FUNCTION_TOOL_CHOICE_CONFIG: ToolChoiceType = {
  type: 'function',
  function: {
    name: '',
  },
};

type ToolChoiceType = string | { type: 'function'; function: { name: string } };

interface ModelToolChoiceProps {
  value?: ToolChoiceType;
  onChange?: (value?: ToolChoiceType) => void;
}

const ModelToolChoice: FC<ModelToolChoiceProps> = ({ value, onChange }) => {
  const [type, setType] = useState<'mode' | 'function'>();
  const [choice, setChoice] = useState<'none' | 'auto' | 'required' | string>();

  useEffect(() => {
    if (isObject(value)) {
      setType('function');
      setChoice(value.function.name);
    } else {
      setType('mode');
      setChoice(value);
    }
  }, [value]);

  const onClear = () => {
    setChoice(undefined);
    onChange?.(undefined);
  };

  const genChoice = () => {
    if (type === 'mode') {
      return (
        <Select
          options={[
            { label: 'none', value: 'none' },
            { label: 'auto', value: 'auto' },
            { label: 'required', value: 'required' },
          ]}
          value={choice}
          onChange={v => {
            setChoice(v);
            onChange?.(v);
          }}
        />
      );
    } else if (type === 'function') {
      return (
        <Input
          value={choice}
          onChange={e => {
            const v = e.target.value;
            setChoice(v);
            onChange?.({
              type: 'function',
              function: { name: v },
            });
          }}
          placeholder="The name of the function to call."
        />
      );
    }
    return null;
  };

  return (
    <div className={cn('flex flex-col gap-2')}>
      <Select
        options={[
          { label: 'Tool choice mode', value: 'mode' },
          { label: 'Function tool choice', value: 'function' },
        ]}
        value={type}
        onChange={v => {
          setType(v);
          if (v === 'function') {
            setChoice(FUNCTION_TOOL_CHOICE_CONFIG.function.name);
            onChange?.(FUNCTION_TOOL_CHOICE_CONFIG);
          } else {
            onClear();
          }
        }}
        allowClear
        onClear={onClear}
      />

      {genChoice()}
    </div>
  );
};

export default memo(ModelToolChoice);
