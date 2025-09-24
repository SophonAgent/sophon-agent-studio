import type { FC } from 'react';
import type { ModelConfigItem, ModelConfigItemEditParams } from '@/interface/modelConfig';

import { memo, useEffect } from 'react';
import Drawer from '@/lib/drawer';
import { Checkbox, Form, Input, InputNumber, Select, Switch } from 'antd';
import { RequiredValidator } from '@/utils/validator';
import AccentBorderHeader from '@/components/accentBorderHeader';
import { tranJsonToObject } from '@/utils/json';
import useModelManagement from '@/hooks/useModelManage';
import { cn } from '@/utils/tw';
import { MODEL_FAMILY_LIST } from '@/constant/model';
import { useTranslation } from 'react-i18next';

const { Item: FormItem } = Form;
const { TextArea } = Input;
const { Group: CheckboxGroup } = Checkbox;

interface ModelEditDrawerProps {
  initialValues?: ModelConfigItem;
  onCancel: () => void;
  onSuccess: () => void;
}

const ModelEditDrawer: FC<ModelEditDrawerProps> = ({ initialValues, onCancel, onSuccess }) => {
  const { t } = useTranslation();

  const [form] = Form.useForm();

  const { isModelSaveLoading, createModel, updateModel } = useModelManagement();

  const maxCompletionTokenLimitField = Form.useWatch('maxCompletionTokenLimit', form);

  useEffect(() => {
    if (initialValues?.id) {
      const { config, defaultParams, ...values } = initialValues;
      form.setFieldsValue({
        ...values,
        config: tranJsonToObject(config),
        defaultParams: tranJsonToObject(defaultParams),
      });
    }
  }, [initialValues]);

  const handleSubmit = async () => {
    const { config, defaultParams, ...values } = await form.validateFields();
    const { provider = 'other' } = config || {};
    const params: ModelConfigItemEditParams = {
      ...values,
      config: JSON.stringify({ ...config, provider }),
      defaultParams: JSON.stringify(defaultParams),
    };
    if (initialValues?.id) {
      await updateModel(initialValues.id, params);
    } else {
      await createModel(params);
    }
    onSuccess();
  };

  return (
    <Drawer
      open
      title={initialValues?.id ? t('MODEL_8') : t('MODEL_7')}
      autoFocus={false}
      size="large"
      onCancel={onCancel}
      onOk={handleSubmit}
      confirmLoading={isModelSaveLoading}
    >
      <Form form={form} labelCol={{ span: 7 }} wrapperCol={{ span: 17 }}>
        {/* -----基本信息----- */}
        <AccentBorderHeader title={t('TAG_9')} className={cn('mb-6 text-[16px]')} />
        <FormItem label={t('MODEL_3')} name="name" required rules={RequiredValidator(t)}>
          <Input />
        </FormItem>
        <FormItem label={t('MODEL_9')} name="description">
          <TextArea autoSize={{ minRows: 3, maxRows: 3 }} />
        </FormItem>
        <FormItem
          label={t('MODEL_10')}
          name="supportStream"
          valuePropName="checked"
          initialValue={1}
          normalize={v => (v ? 1 : 0)}
          getValueProps={v => ({ value: Boolean(v) })}
        >
          <Switch />
        </FormItem>
        <FormItem
          label={t('MODEL_11')}
          name="supportSystem"
          valuePropName="checked"
          initialValue={1}
          normalize={v => (v ? 1 : 0)}
          getValueProps={v => ({ value: Boolean(v) })}
        >
          <Switch />
        </FormItem>
        <FormItem
          label={t('MODEL_12')}
          name="supportReasoning"
          valuePropName="checked"
          normalize={v => (v ? 1 : 0)}
          getValueProps={v => ({ value: Boolean(v) })}
        >
          <Switch />
        </FormItem>
        <FormItem label={t('MODEL_13')} name="modalities">
          <CheckboxGroup
            options={[
              { label: t('TAG_13'), value: 'image' },
              { label: t('TAG_14'), value: 'audio' },
              { label: t('TAG_2'), value: 'text' },
            ]}
          />
        </FormItem>
        <FormItem label={t('MODEL_14')} name="maxCompletionTokenLimit">
          <InputNumber min={0} style={{ width: '100%' }} />
        </FormItem>
        <FormItem label={t('MODEL_15')} name="timeoutSeconds">
          <InputNumber min={1} max={600} step={1} suffix={t('TAG_15')} style={{ width: '100%' }} />
        </FormItem>

        {/* -----模型访问配置----- */}
        <AccentBorderHeader title={t('TAG_16')} className={cn('mb-6 mt-10 text-[16px]')} />
        <FormItem label={t('MODEL_16')} name="modelUrl" required rules={RequiredValidator(t)}>
          <Input />
        </FormItem>
        <FormItem label={t('MODEL_17')} name="modelKey" required rules={RequiredValidator(t)}>
          <Input />
        </FormItem>
        <FormItem label={t('MODEL_4')} name="modelName" required rules={RequiredValidator(t)}>
          <Input />
        </FormItem>
        <FormItem label={t('MODEL_5')} name={['config', 'provider']}>
          <Select options={MODEL_FAMILY_LIST} />
        </FormItem>

        {/* -----运行时默认参数----- */}
        <AccentBorderHeader title={t('MODEL_18')} className={cn('mb-6 mt-10 text-[16px]')} />
        <FormItem label="temperature" name={['defaultParams', 'temperature']} initialValue={0.7}>
          <InputNumber min={0} max={2} step={0.1} style={{ width: '100%' }} />
        </FormItem>
        <FormItem label="top_p" name={['defaultParams', 'top_p']} initialValue={1.0}>
          <InputNumber min={0} max={1} step={0.1} style={{ width: '100%' }} />
        </FormItem>
        <FormItem
          label="max_completion_tokens"
          name={['defaultParams', 'max_completion_tokens']}
          initialValue={1024}
        >
          <InputNumber min={0} max={maxCompletionTokenLimitField} step={1} style={{ width: '100%' }} />
        </FormItem>
        <FormItem label="frequency_penalty" name={['defaultParams', 'frequency_penalty']}>
          <InputNumber min={-2} max={2} step={0.1} style={{ width: '100%' }} />
        </FormItem>
        <FormItem label="presence_penalty" name={['defaultParams', 'presence_penalty']}>
          <InputNumber min={-2} max={2} step={0.1} style={{ width: '100%' }} />
        </FormItem>
      </Form>
    </Drawer>
  );
};

export default memo(ModelEditDrawer);
