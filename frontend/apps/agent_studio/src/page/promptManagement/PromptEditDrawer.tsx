import type { FC } from 'react';
import type { PromptConfigItem } from '@/interface/prompt';

import { memo, useEffect, useMemo } from 'react';
import Drawer from '@/lib/drawer';
import usePromptManage from '@/hooks/usePromptManage';
import { Form, Input, Skeleton } from 'antd';
import AccentBorderHeader from '@/components/accentBorderHeader';
import { cn } from '@/utils/tw';
import { AlphanumericWithDashesValidator, RequiredValidator } from '@/utils/validator';
import { ResourceClassify } from '@/interface/base';
import { PromptFrameworkEnum } from '@/interface/prompt';
import PromptEditor from '@/components/promptEditor';
import PromptVariables from '@/components/promptVariables';
import FrameworkRadio from '@/page/promptManagement/FrameworkRadio';
import { PROMPT_FRAMEWORK_MAP } from '@/constant/prompt';
import { getPromptContentPlaceholders } from '@/utils/prompt';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const [form] = Form.useForm();

  const { isPromptConfigSaveLoading, createPromptConfig, updatePromptConfig } = usePromptManage();

  const frameworkField = Form.useWatch(['detail', 'framework'], form);
  const promptContentField = Form.useWatch(['detail', 'promptContent'], form);

  const frameworkDescription = useMemo(
    () => (frameworkField ? PROMPT_FRAMEWORK_MAP(t)[frameworkField as PromptFrameworkEnum]?.description : ''),
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
      title={initialValues?.baseConfig?.uid ? t('PROMPT_25') : t('PROMPT_32')}
      autoFocus={false}
      size="large"
      onCancel={onCancel}
      onOk={handleSubmit}
      confirmLoading={isPromptConfigSaveLoading}
    >
      <Skeleton loading={isLoading} active>
        <Form form={form} labelCol={{ span: 7 }} wrapperCol={{ span: 17 }}>
          {/* -----基本信息----- */}
          <AccentBorderHeader title={t('TAG_9')} className={cn('mb-6 text-[16px]')} />
          <FormItem name={['baseConfig', 'classify']} initialValue={ResourceClassify.CUSTOMIZED} hidden>
            <Input />
          </FormItem>
          <FormItem label={t('PROMPT_5')} name={['baseConfig', 'name']} required rules={RequiredValidator(t)}>
            <Input />
          </FormItem>
          <FormItem label={t('PROMPT_7')} name={['baseConfig', 'description']}>
            <TextArea autoSize={{ minRows: 3, maxRows: 3 }} />
          </FormItem>
          <FormItem
            label="Prompt ID"
            name={['baseConfig', 'uid']}
            tooltip={t('PROMPT_8')}
            rules={AlphanumericWithDashesValidator(t)}
          >
            <Input placeholder={t('PLACEHOLDER_4')} disabled={Boolean(initialValues?.baseConfig?.uid)} />
          </FormItem>

          {/* -----Prompt 内容配置----- */}
          <AccentBorderHeader title={t('TAG_26')} className={cn('mb-6 mt-10 text-[16px]')} />
          <FormItem
            label={t('PROMPT_22')}
            name={['detail', 'framework']}
            required
            rules={RequiredValidator(t)}
            initialValue={PromptFrameworkEnum.COMMON}
            extra={
              frameworkDescription ? <div className={cn('text-[12px]')}>{frameworkDescription}</div> : null
            }
          >
            <FrameworkRadio
              onChange={v => {
                if (v) {
                  form.setFieldValue(['detail', 'promptContent'], PROMPT_FRAMEWORK_MAP(t)[v]?.template);
                }
              }}
              promptContent={promptContentField}
            />
          </FormItem>
          <FormItem
            label={t('PROMPT_23')}
            name={['detail', 'promptContent']}
            required
            rules={RequiredValidator(t)}
          >
            <PromptEditor promptFramework={frameworkField} initOptimize={initOptimize} />
          </FormItem>
          <FormItem label={t('PROMPT_30')} name={['detail', 'contentPlaceholders']}>
            <PromptVariables />
          </FormItem>
        </Form>
      </Skeleton>
    </Drawer>
  );
};

export default memo(PromptEditDrawer);
