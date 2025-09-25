import type { FC } from 'react';
import type { McpServerItem } from '@/interface/mcpServer';

import { memo, useEffect } from 'react';
import useMcpServer from '@/hooks/useMcpServer';
import { McpImplementType, McpServerType } from '@/interface/mcpServer';
import { Form, Input, Select } from 'antd';
import Modal from '@/lib/modal';
import { RequiredValidator } from '@/utils/validator';
import { McpImplementTypeTextMap } from '@/constant/mcpServer';
import { cn } from '@/utils/tw';
import Tooltip from '@/lib/tooltip';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { useTranslation } from 'react-i18next';

const { Item: FormItem } = Form;
const { TextArea } = Input;

interface McpServerEditModalProps {
  initialValues?: McpServerItem;
  onCancel: () => void;
  onSuccess: () => void;
}

const McpServerEditModal: FC<McpServerEditModalProps> = ({ initialValues, onCancel, onSuccess }) => {
  const { t } = useTranslation();

  const [form] = Form.useForm();

  const { isMcpServerSaveLoading, createMcpServer, updateMcpServer } = useMcpServer();

  const implementTypeField = Form.useWatch('implementType', form);

  useEffect(() => {
    if (initialValues?.id) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues]);

  const handleSubmit = async () => {
    const values = await form.validateFields();
    if (initialValues?.id) {
      await updateMcpServer({ id: initialValues.id, ...values });
    } else {
      await createMcpServer(values);
    }
    onSuccess();
  };

  return (
    <Modal
      open
      size="large"
      title={initialValues?.id ? t('MCP_2') : t('MCP_3')}
      onCancel={onCancel}
      onOk={handleSubmit}
      confirmLoading={isMcpServerSaveLoading}
    >
      <Form form={form} layout="vertical">
        <FormItem name="type" hidden initialValue={McpServerType.SSE}>
          <Input />
        </FormItem>

        <FormItem label={t('MCP_4')} name="displayName" required rules={RequiredValidator(t)}>
          <Input />
        </FormItem>
        <FormItem label={t('MCP_5')} name="description" required rules={RequiredValidator(t)}>
          <TextArea autoSize={{ minRows: 3, maxRows: 3 }} />
        </FormItem>
        <FormItem label={t('MCP_6')} name="category">
          <Input />
        </FormItem>
        <FormItem
          label={t('MCP_7')}
          name="implementType"
          required
          rules={RequiredValidator(t)}
          hidden={Boolean(initialValues?.id)}
        >
          <Select
            options={[
              {
                label: (
                  <div className={cn('flex items-center gap-1')}>
                    {McpImplementTypeTextMap(t)[McpImplementType.PROXY]}
                    <Tooltip title={t('MCP_8')}>
                      <InfoCircledIcon />
                    </Tooltip>
                  </div>
                ),
                value: McpImplementType.PROXY,
              },
              {
                label: (
                  <div className={cn('flex items-center gap-1')}>
                    {McpImplementTypeTextMap(t)[McpImplementType.EXTERNAL]}
                    <Tooltip title={t('MCP_9')}>
                      <InfoCircledIcon />
                    </Tooltip>
                  </div>
                ),
                value: McpImplementType.EXTERNAL,
              },
            ]}
          />
        </FormItem>
        {implementTypeField === McpImplementType.EXTERNAL ? (
          <FormItem label="Endpoint Url" name="endpointUrl" required rules={RequiredValidator(t)}>
            <Input />
          </FormItem>
        ) : null}
      </Form>
    </Modal>
  );
};

export default memo(McpServerEditModal);
