import type { FC } from 'react';
import type { RadioChangeEvent } from 'antd';

import { memo } from 'react';
import { Radio } from 'antd';
import { PROMPT_FRAMEWORK_LIST } from '@/constant/prompt';
import { PromptFrameworkEnum } from '@/interface/prompt';
import useFeedback from '@/context/feedbackContext';

const { Group: RadioGroup } = Radio;

interface FrameworkRadioProps {
  value?: PromptFrameworkEnum;
  onChange?: (value?: PromptFrameworkEnum) => void;
  promptContent?: string;
}

const FrameworkRadio: FC<FrameworkRadioProps> = ({ value, onChange, promptContent }) => {
  const { modalApi } = useFeedback();

  const handleFrameworkChange = (e: RadioChangeEvent) => {
    const v = e.target.value;
    if (!promptContent) {
      onChange?.(v);
    } else {
      modalApi.confirm({
        title: '切换模版框架',
        centered: true,
        content: '切换框架将清空当前 prompt 内容，是否切换？',
        okButtonProps: { danger: true },
        onOk: () => onChange?.(v),
      });
    }
  };

  return <RadioGroup options={PROMPT_FRAMEWORK_LIST} value={value} onChange={handleFrameworkChange} />;
};

export default memo(FrameworkRadio);
