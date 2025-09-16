import type { FC } from 'react';

import { memo, useEffect } from 'react';
import useMcpServer from '@/hooks/useMcpServer';
import { McpImplementType, McpServerItem, McpServerType } from '@/interface/mcpServer';
import { Form, Input, Select } from 'antd';
import Modal from '@/lib/modal';
import { RequiredValidator } from '@/utils/validator';
import { McpImplementTypeTextMap } from '@/constant/mcpServer';
import { cn } from '@/utils/tw';
import Tooltip from '@/lib/tooltip';
import { InfoCircledIcon } from '@radix-ui/react-icons';

const { Item: FormItem } = Form;
const { TextArea } = Input;

interface McpServerEditModalProps {
  initialValues?: McpServerItem;
  onCancel: () => void;
  onSuccess: () => void;
}

const McpServerEditModal: FC<McpServerEditModalProps> = ({ initialValues, onCancel, onSuccess }) => {
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
      title={initialValues?.id ? '编辑 MCP Server' : '新建 MCP Server'}
      onCancel={onCancel}
      onOk={handleSubmit}
      confirmLoading={isMcpServerSaveLoading}
    >
      <Form form={form} layout="vertical">
        <FormItem name="type" hidden initialValue={McpServerType.SSE}>
          <Input />
        </FormItem>

        <FormItem label="MCP Server 展示名称" name="displayName" required rules={RequiredValidator}>
          <Input />
        </FormItem>
        <FormItem label="MCP Server 描述" name="description" required rules={RequiredValidator}>
          <TextArea autoSize={{ minRows: 3, maxRows: 3 }} />
        </FormItem>
        <FormItem label="所属分类" name="category">
          <Input />
        </FormItem>
        <FormItem
          label="服务来源"
          name="implementType"
          required
          rules={RequiredValidator}
          hidden={Boolean(initialValues?.id)}
        >
          <Select
            options={[
              {
                label: (
                  <div className={cn('flex items-center gap-1')}>
                    {McpImplementTypeTextMap[McpImplementType.PROXY]}
                    <Tooltip title="将 OpenAPI 接口发布成 MCP Server">
                      <InfoCircledIcon />
                    </Tooltip>
                  </div>
                ),
                value: McpImplementType.PROXY,
              },
              {
                label: (
                  <div className={cn('flex items-center gap-1')}>
                    {McpImplementTypeTextMap[McpImplementType.EXTERNAL]}
                    <Tooltip title="注册登记已有 MCP Server">
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
          <FormItem label="Endpoint Url" name="endpointUrl" required rules={RequiredValidator}>
            <Input />
          </FormItem>
        ) : null}
      </Form>
    </Modal>
  );
};

export default memo(McpServerEditModal);
