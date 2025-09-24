import type { FC } from 'react';
import type { SystemPrompt } from '@/interface/chat';
import type { PromptConfigEditParams, PromptHistoryItem } from '@/interface/prompt';

import { memo, useEffect, useMemo } from 'react';
import Modal from '@/lib/modal';
import usePromptManage from '@/hooks/usePromptManage';
import { Form, Input, Radio } from 'antd';
import { RequiredValidator } from '@/utils/validator';
import { ResourceClassify } from '@/interface/base';
import useFeedback from '@/context/feedbackContext';
import { useTranslation } from 'react-i18next';

const { Item: FormItem } = Form;
const { Group: RadioGroup } = Radio;
const { TextArea } = Input;

interface PromptEditModalProps {
  initialValues?: SystemPrompt;
  promptHistoryList: PromptHistoryItem[];
  onCancel: () => void;
  onSuccess: (isInit?: boolean) => void;
}

const PromptEditModal: FC<PromptEditModalProps> = ({
  initialValues,
  promptHistoryList,
  onCancel,
  onSuccess,
}) => {
  const { t } = useTranslation();

  const [form] = Form.useForm();

  const { messageApi } = useFeedback();
  const { isPromptConfigSaveLoading, createPromptConfig, updatePromptConfig } = usePromptManage();

  const originalPromptContent = useMemo(() => {
    if (!initialValues?.uid || !initialValues?.version) return undefined;
    return promptHistoryList.find(
      item => item.promptUid === initialValues.uid && item.version === initialValues.version,
    )?.promptDetails?.[0]?.promptContent;
  }, [initialValues, promptHistoryList]);

  useEffect(() => {
    const { uid, name } = initialValues || {};
    form.setFieldsValue({
      mode: initialValues?.uid ? 'update' : 'create',
      baseConfig: { name, uid },
    });
  }, [initialValues]);

  const handleSubmit = async () => {
    const { mode, baseConfig, comment } = await form.validateFields();
    const params: PromptConfigEditParams = {
      baseConfig,
      detail: {
        comment,
        promptContent: initialValues?.promptContent,
        contentPlaceholders: Object.keys(initialValues?.variables || {}),
      },
    };
    if (mode === 'update') {
      if (
        initialValues?.name === baseConfig?.name &&
        initialValues?.promptContent === originalPromptContent
      ) {
        messageApi.warning(t('MESSAGE_1'));
        return;
      }
      await updatePromptConfig(params);
      onSuccess();
    } else {
      await createPromptConfig(params);
      onSuccess(true);
    }
  };

  return (
    <Modal
      open
      title={t('PROMPT_1')}
      size="large"
      onCancel={onCancel}
      onOk={handleSubmit}
      confirmLoading={isPromptConfigSaveLoading}
    >
      <Form form={form} layout="vertical">
        <FormItem name={['baseConfig', 'classify']} initialValue={ResourceClassify.CUSTOMIZED} hidden>
          <Input />
        </FormItem>
        <FormItem label={t('PROMPT_2')} name="mode" required rules={RequiredValidator(t)}>
          <RadioGroup
            options={[
              ...(initialValues?.uid ? [{ label: t('PROMPT_3'), value: 'update' }] : []),
              { label: t('PROMPT_4'), value: 'create' },
            ]}
            onChange={e => {
              form.setFieldValue(
                ['baseConfig', 'uid'],
                e.target.value === 'update' ? initialValues?.uid : undefined,
              );
            }}
          />
        </FormItem>
        <FormItem label={t('PROMPT_5')} name={['baseConfig', 'name']} required rules={RequiredValidator(t)}>
          <Input />
        </FormItem>
        <FormItem noStyle shouldUpdate={(prev, curr) => prev.mode !== curr.mode}>
          {({ getFieldValue }) => {
            return getFieldValue('mode') === 'update' ? (
              <FormItem label={t('PROMPT_6')} name="comment">
                <TextArea autoSize={{ minRows: 3, maxRows: 3 }} />
              </FormItem>
            ) : (
              <FormItem label={t('PROMPT_7')} name={['baseConfig', 'description']}>
                <TextArea autoSize={{ minRows: 3, maxRows: 3 }} />
              </FormItem>
            );
          }}
        </FormItem>
        <FormItem noStyle shouldUpdate={(prev, curr) => prev.mode !== curr.mode}>
          {({ getFieldValue }) => (
            <FormItem label="Prompt ID" name={['baseConfig', 'uid']} tooltip={t('PROMPT_8')}>
              <Input placeholder={t('PLACEHOLDER_4')} disabled={getFieldValue('mode') === 'update'} />
            </FormItem>
          )}
        </FormItem>
      </Form>
    </Modal>
  );
};

export default memo(PromptEditModal);
