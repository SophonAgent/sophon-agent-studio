import type { FC } from 'react';
import type { RadioChangeEvent } from 'antd';

import { memo } from 'react';
import { Radio } from 'antd';
import { PROMPT_FRAMEWORK_LIST } from '@/constant/prompt';
import { PromptFrameworkEnum } from '@/interface/prompt';
import useFeedback from '@/context/feedbackContext';
import { useTranslation } from 'react-i18next';

const { Group: RadioGroup } = Radio;

interface FrameworkRadioProps {
  value?: PromptFrameworkEnum;
  onChange?: (value?: PromptFrameworkEnum) => void;
  promptContent?: string;
}

const FrameworkRadio: FC<FrameworkRadioProps> = ({ value, onChange, promptContent }) => {
  const { t } = useTranslation();

  const { modalApi } = useFeedback();

  const handleFrameworkChange = (e: RadioChangeEvent) => {
    const v = e.target.value;
    if (!promptContent) {
      onChange?.(v);
    } else {
      modalApi.confirm({
        title: t('MODAL_10'),
        centered: true,
        content: t('MODAL_11'),
        okButtonProps: { danger: true },
        onOk: () => onChange?.(v),
      });
    }
  };

  return <RadioGroup options={PROMPT_FRAMEWORK_LIST(t)} value={value} onChange={handleFrameworkChange} />;
};

export default memo(FrameworkRadio);
