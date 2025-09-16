import type { FC } from 'react';

import { memo, useEffect } from 'react';
import Drawer from '@/lib/drawer';
import { Checkbox, Form, Input, InputNumber, Select, Switch } from 'antd';
import { RequiredValidator } from '@/utils/validator';
import AccentBorderHeader from '@/components/accentBorderHeader';
import { ModelConfigItem, ModelConfigItemEditParams } from '@/interface/modelConfig';
import { tranJsonToArray, tranJsonToObject } from '@/utils/json';
import useModelManagement from '@/hooks/useModelManage';
import { cn } from '@/utils/tw';

const { Item: FormItem } = Form;
const { TextArea } = Input;
const { Group: CheckboxGroup } = Checkbox;

interface ModelEditDrawerProps {
  initialValues?: ModelConfigItem;
  onCancel: () => void;
  onSuccess: () => void;
}

const ModelEditDrawer: FC<ModelEditDrawerProps> = ({ initialValues, onCancel, onSuccess }) => {
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
    const { provider = '自定义' } = config || {};
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
      title={initialValues?.id ? '编辑模型' : '新建模型'}
      autoFocus={false}
      size="large"
      onCancel={onCancel}
      onOk={handleSubmit}
      confirmLoading={isModelSaveLoading}
    >
      <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
        {/* -----基本信息----- */}
        <AccentBorderHeader title="基本信息" className={cn('mb-6 text-[16px]')} />
        <FormItem label="模型展示名称" name="name" required rules={RequiredValidator}>
          <Input />
        </FormItem>
        <FormItem label="模型描述" name="description">
          <TextArea autoSize={{ minRows: 3, maxRows: 3 }} />
        </FormItem>
        <FormItem
          label="使用场景标签"
          name="modelAppTag"
          normalize={v => JSON.stringify(v)}
          getValueProps={v => ({ value: tranJsonToArray(v) })}
        >
          <Select mode="tags" allowClear showSearch />
        </FormItem>
        <FormItem
          label="支持流式输出"
          name="supportStream"
          valuePropName="checked"
          initialValue={1}
          normalize={v => (v ? 1 : 0)}
          getValueProps={v => ({ value: Boolean(v) })}
        >
          <Switch />
        </FormItem>
        <FormItem
          label="支持 System Prompt"
          name="supportSystem"
          valuePropName="checked"
          initialValue={1}
          normalize={v => (v ? 1 : 0)}
          getValueProps={v => ({ value: Boolean(v) })}
        >
          <Switch />
        </FormItem>
        <FormItem
          label="支持推理"
          name="supportReasoning"
          valuePropName="checked"
          normalize={v => (v ? 1 : 0)}
          getValueProps={v => ({ value: Boolean(v) })}
        >
          <Switch />
        </FormItem>
        <FormItem label="多模态输入支持" name="modalities">
          <CheckboxGroup
            options={[
              { label: '图片', value: 'image' },
              { label: '音频', value: 'audio' },
              { label: '文本', value: 'text' },
            ]}
          />
        </FormItem>
        <FormItem label="最大输出 Token 长度" name="maxCompletionTokenLimit">
          <InputNumber min={0} style={{ width: '100%' }} />
        </FormItem>
        <FormItem label="模型非流式超时时间" name="timeoutSeconds">
          <InputNumber min={1} max={600} step={1} suffix="秒" style={{ width: '100%' }} />
        </FormItem>

        {/* -----模型访问配置----- */}
        <AccentBorderHeader title="模型访问配置" className={cn('mb-6 mt-10 text-[16px]')} />
        <FormItem label="API 访问地址" name="modelUrl" required rules={RequiredValidator}>
          <Input />
        </FormItem>
        <FormItem label="授权信息 API Key" name="modelKey" required rules={RequiredValidator}>
          <Input />
        </FormItem>
        <FormItem label="模型名称" name="modelName" required rules={RequiredValidator}>
          <Input />
        </FormItem>
        <FormItem label="模型家族" name={['config', 'provider']}>
          <Input />
        </FormItem>

        {/* -----运行时默认参数----- */}
        <AccentBorderHeader title="运行时默认参数" className={cn('mb-6 mt-10 text-[16px]')} />
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
