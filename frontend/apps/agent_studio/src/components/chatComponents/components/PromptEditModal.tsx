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
        messageApi.warning('没有任何修改，保存无效');
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
      title="保存 Prompt"
      size="large"
      onCancel={onCancel}
      onOk={handleSubmit}
      confirmLoading={isPromptConfigSaveLoading}
    >
      <Form form={form} layout="vertical">
        <FormItem name={['baseConfig', 'classify']} initialValue={ResourceClassify.CUSTOMIZED} hidden>
          <Input />
        </FormItem>
        <FormItem label="保存方式" name="mode" required rules={RequiredValidator}>
          <RadioGroup
            options={[
              ...(initialValues?.uid ? [{ label: '更新当前 Prompt', value: 'update' }] : []),
              { label: '另存为新 Prompt', value: 'create' },
            ]}
            onChange={e => {
              form.setFieldValue(
                ['baseConfig', 'uid'],
                e.target.value === 'update' ? initialValues?.uid : undefined,
              );
            }}
          />
        </FormItem>
        <FormItem label="Prompt 名称" name={['baseConfig', 'name']} required rules={RequiredValidator}>
          <Input />
        </FormItem>
        <FormItem noStyle shouldUpdate={(prev, curr) => prev.mode !== curr.mode}>
          {({ getFieldValue }) => {
            return getFieldValue('mode') === 'update' ? (
              <FormItem label="更新说明" name="comment">
                <TextArea autoSize={{ minRows: 3, maxRows: 3 }} />
              </FormItem>
            ) : (
              <FormItem label="Prompt 描述" name={['baseConfig', 'description']}>
                <TextArea autoSize={{ minRows: 3, maxRows: 3 }} />
              </FormItem>
            );
          }}
        </FormItem>
        <FormItem noStyle shouldUpdate={(prev, curr) => prev.mode !== curr.mode}>
          {({ getFieldValue }) => (
            <FormItem
              label="Prompt ID"
              name={['baseConfig', 'uid']}
              tooltip="Prompt唯一标识，通过此标识引用Prompt；不填写则由系统默认生成"
            >
              <Input
                placeholder="自定义 Prompt ID, 不填写则由系统默认生成"
                disabled={getFieldValue('mode') === 'update'}
              />
            </FormItem>
          )}
        </FormItem>
      </Form>
    </Modal>
  );
};

export default memo(PromptEditModal);
