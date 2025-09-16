import type { FC } from 'react';

import { memo, useEffect, useMemo } from 'react';
import Drawer from '@/lib/drawer';
import usePromptManage from '@/hooks/usePromptManage';
import { Form, Input, Skeleton } from 'antd';
import AccentBorderHeader from '@/components/accentBorderHeader';
import { cn } from '@/utils/tw';
import { AlphanumericWithDashesValidator, RequiredValidator } from '@/utils/validator';
import { ResourceClassify } from '@/interface/base';
import { PromptConfigItem, PromptFrameworkEnum } from '@/interface/prompt';
import PromptEditor from '@/components/promptEditor';
import PromptVariables from '@/components/promptVariables';
import FrameworkRadio from '@/page/promptManagement/FrameworkRadio';
import { PROMPT_FRAMEWORK_MAP } from '@/constant/prompt';
import { getPromptContentPlaceholders } from '@/utils/prompt';

const { Item: FormItem } = Form;
const { TextArea } = Input;

interface PromptEditDrawerProps {
  initialValues?: PromptConfigItem;
  isLoading: boolean;
  onCancel: () => void;
  onSuccess: () => void;
  initOptimize?: boolean;
}

const PromptEditDrawer: FC<PromptEditDrawerProps> = ({
  initialValues,
  isLoading,
  onCancel,
  onSuccess,
  initOptimize,
}) => {
  const [form] = Form.useForm();

  const { isPromptConfigSaveLoading, createPromptConfig, updatePromptConfig } = usePromptManage();

  const frameworkField = Form.useWatch(['detail', 'framework'], form);
  const promptContentField = Form.useWatch(['detail', 'promptContent'], form);

  const frameworkDescription = useMemo(
    () => (frameworkField ? PROMPT_FRAMEWORK_MAP[frameworkField as PromptFrameworkEnum]?.description : ''),
    [frameworkField],
  );

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  useEffect(() => {
    const contentPlaceholders = getPromptContentPlaceholders(promptContentField);
    form.setFieldValue(['detail', 'contentPlaceholders'], contentPlaceholders);
  }, [promptContentField]);

  const handleSubmit = async () => {
    const values = await form.validateFields();
    if (initialValues?.baseConfig?.uid) {
      await updatePromptConfig(values);
    } else {
      await createPromptConfig(values);
    }
    onSuccess();
  };

  return (
    <Drawer
      open
      title={initialValues?.baseConfig?.uid ? '编辑 Prompt' : '新建 Prompt'}
      autoFocus={false}
      size="large"
      onCancel={onCancel}
      onOk={handleSubmit}
      confirmLoading={isPromptConfigSaveLoading}
    >
      <Skeleton loading={isLoading} active>
        <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
          {/* -----基本信息----- */}
          <AccentBorderHeader title="基本信息" className={cn('mb-6 text-[16px]')} />
          <FormItem name={['baseConfig', 'classify']} initialValue={ResourceClassify.CUSTOMIZED} hidden>
            <Input />
          </FormItem>
          <FormItem label="Prompt 名称" name={['baseConfig', 'name']} required rules={RequiredValidator}>
            <Input />
          </FormItem>
          <FormItem label="Prompt 描述" name={['baseConfig', 'description']}>
            <TextArea autoSize={{ minRows: 3, maxRows: 3 }} />
          </FormItem>
          <FormItem
            label="Prompt ID"
            name={['baseConfig', 'uid']}
            tooltip="Prompt唯一标识，通过此标识引用Prompt；不填写则由系统默认生成"
            rules={AlphanumericWithDashesValidator}
          >
            <Input
              placeholder="自定义 Prompt ID, 不填写则由系统默认生成"
              disabled={Boolean(initialValues?.baseConfig?.uid)}
            />
          </FormItem>

          {/* -----Prompt 内容配置----- */}
          <AccentBorderHeader title="Prompt 内容配置" className={cn('mb-6 mt-10 text-[16px]')} />
          <FormItem
            label="模版框架"
            name={['detail', 'framework']}
            required
            rules={RequiredValidator}
            initialValue={PromptFrameworkEnum.COMMON}
            extra={
              frameworkDescription ? <div className={cn('text-[12px]')}>{frameworkDescription}</div> : null
            }
          >
            <FrameworkRadio
              onChange={v => {
                if (v) {
                  form.setFieldValue(['detail', 'promptContent'], PROMPT_FRAMEWORK_MAP[v]?.template);
                }
              }}
              promptContent={promptContentField}
            />
          </FormItem>
          <FormItem label="Prompt 内容" name={['detail', 'promptContent']} required rules={RequiredValidator}>
            <PromptEditor promptFramework={frameworkField} initOptimize={initOptimize} />
          </FormItem>
          <FormItem label="已识别到变量占位符" name={['detail', 'contentPlaceholders']}>
            <PromptVariables />
          </FormItem>
        </Form>
      </Skeleton>
    </Drawer>
  );
};

export default memo(PromptEditDrawer);
