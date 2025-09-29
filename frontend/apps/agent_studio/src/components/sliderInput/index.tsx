import type { SliderSingleProps } from 'antd';

import { cn } from '@/utils/tw';
import { InputNumber, Slider } from 'antd';
import type { FC, ReactNode } from 'react';

import { memo } from 'react';

interface SliderInputProps
  extends Omit<SliderSingleProps, 'min' | 'max' | 'step' | 'style' | 'marks' | 'value' | 'onChange'> {
  value?: number;
  onChange?: (value?: number | null) => void;
  min?: number;
  max?: number;
  step?: number;
  marks?: Record<string | number, ReactNode>;
}

const SliderInput: FC<SliderInputProps> = ({ value, onChange, min, max, step, marks = {}, ...props }) => {
  const showMarks = Object.keys(marks).length > 0;

  return (
    <div className={cn('relative')}>
      <Slider
        {...props}
        min={min}
        max={max}
        step={step}
        style={{ margin: showMarks ? '5px 10px 19px' : '5px 10px' }}
        marks={Object.entries(marks).reduce((acc: Record<string, ReactNode>, [key, val]) => {
          acc[key] = <span className={cn('text-[12px]')}>{val}</span>;
          return acc;
        }, {})}
        value={value}
        onChange={onChange}
      />
      <InputNumber
        min={min}
        max={max}
        step={step}
        style={{ width: 70, position: 'absolute', right: 0, top: -36, fontSize: 12 }}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default memo(SliderInput);
