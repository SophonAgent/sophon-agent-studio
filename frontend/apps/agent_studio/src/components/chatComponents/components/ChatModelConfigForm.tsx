import type { FC } from 'react';

import { memo, useEffect, useMemo } from 'react';
import { Form, InputNumber, Select } from 'antd';
import SliderInput from '@/components/sliderInput';
import { CHAT_MODEL_CONFIG_TOOLTIP_CONTENT } from '@/constant/chat';
import useModelConfigModel from '@/store/chat/modelConfigModel';
import ModelToolChoice from '@/components/modelToolChoice';
import { useTranslation } from 'react-i18next';

const { Item: FormItem } = Form;

interface ChatModelConfigFormProps {
  msgGroupKey: string;
  isReadonly?: boolean;
}

const ChatModelConfigForm: FC<ChatModelConfigFormProps> = ({ msgGroupKey, isReadonly }) => {
  const { t } = useTranslation();

  const [form] = Form.useForm();

  const { chatModelConfigMap, modelList, __updateChatModelConfig } = useModelConfigModel();

  const modelConfig = useMemo(() => chatModelConfigMap[msgGroupKey], [chatModelConfigMap, msgGroupKey]);
  const model = useMemo(
    () => modelList.find(item => item.modelName === modelConfig?.model),
    [modelList, modelConfig?.model],
  );

  useEffect(() => {
    form.setFieldsValue(modelConfig);
  }, [modelConfig]);

  const maxCompletionTokenLimit = useMemo(
    () => model?.maxCompletionTokenLimit || 4096,
    [model?.maxCompletionTokenLimit],
  );

  const maxCompletionTokenMarks = useMemo(() => {
    if (maxCompletionTokenLimit < 4096) {
      return {
        [maxCompletionTokenLimit]: Math.floor(maxCompletionTokenLimit / 1000) + 'k',
      };
    }
    const arr = [maxCompletionTokenLimit / 4, maxCompletionTokenLimit / 2, maxCompletionTokenLimit];
    return arr.reduce((obj: Record<number, string>, cur) => {
      obj[cur] = Math.floor(cur / 1000) + 'k';
      return obj;
    }, {});
  }, [maxCompletionTokenLimit]);

  return (
    <Form
      form={form}
      layout="vertical"
      size="small"
      onValuesChange={changedValues => __updateChatModelConfig(msgGroupKey, changedValues)}
      disabled={isReadonly}
    >
      <FormItem
        label="temperature"
        name="temperature"
        tooltip={CHAT_MODEL_CONFIG_TOOLTIP_CONTENT.temperature}
        style={{ marginBottom: 8 }}
      >
        <SliderInput min={0} max={2} step={0.1} marks={{ 0.2: 'stable', 0.8: 'creative' }} />
      </FormItem>
      <FormItem
        label="top_p"
        name="top_p"
        tooltip={CHAT_MODEL_CONFIG_TOOLTIP_CONTENT.top_p}
        style={{ marginBottom: 8 }}
      >
        <SliderInput min={0} max={1} step={0.1} />
      </FormItem>
      <FormItem
        label="max_completion_tokens"
        name="max_completion_tokens"
        tooltip={CHAT_MODEL_CONFIG_TOOLTIP_CONTENT.max_completion_tokens}
        style={{ marginBottom: 8 }}
      >
        <SliderInput min={0} max={maxCompletionTokenLimit} step={1} marks={maxCompletionTokenMarks} />
      </FormItem>
      <FormItem
        label="frequency_penalty"
        name="frequency_penalty"
        tooltip={CHAT_MODEL_CONFIG_TOOLTIP_CONTENT.frequency_penalty}
        style={{ marginBottom: 8 }}
      >
        <SliderInput min={-2} max={2} step={0.1} />
      </FormItem>
      <FormItem
        label="presence_penalty"
        name="presence_penalty"
        tooltip={CHAT_MODEL_CONFIG_TOOLTIP_CONTENT.presence_penalty}
        style={{ marginBottom: 8 }}
      >
        <SliderInput min={-2} max={2} step={0.1} />
      </FormItem>
      <FormItem
        label="stop"
        name="stop"
        tooltip={CHAT_MODEL_CONFIG_TOOLTIP_CONTENT.stop}
        style={{ marginBottom: 8 }}
      >
        <Select mode="tags" placeholder={t('PLACEHOLDER_2')} />
      </FormItem>
      <FormItem
        label="seed"
        name="seed"
        tooltip={CHAT_MODEL_CONFIG_TOOLTIP_CONTENT.seed}
        style={{ marginBottom: 8 }}
      >
        <InputNumber min={1} style={{ width: '100%' }} />
      </FormItem>
      <FormItem
        label="reasoning_effort"
        name="reasoning_effort"
        tooltip={CHAT_MODEL_CONFIG_TOOLTIP_CONTENT.reasoning_effort}
        style={{ marginBottom: 8 }}
      >
        <Select
          options={[
            { label: 'minimal', value: 'minimal' },
            { label: 'low', value: 'low' },
            { label: 'medium', value: 'medium' },
            { label: 'high', value: 'high' },
          ]}
          allowClear
        />
      </FormItem>
      <FormItem
        label="tool_choice"
        name="tool_choice"
        tooltip={CHAT_MODEL_CONFIG_TOOLTIP_CONTENT.tool_choice}
      >
        <ModelToolChoice />
      </FormItem>
    </Form>
  );
};

export default memo(ChatModelConfigForm);
