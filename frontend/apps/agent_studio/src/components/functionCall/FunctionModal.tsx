import type { FC } from 'react';
import type { JSONSchema7 } from 'json-schema';
import type { FunctionDefinition } from '@/interface/functionCall';

import { memo, useEffect, useMemo } from 'react';
import { cn } from '@/utils/tw';
import { Button, Form, Input } from 'antd';
import { JsonSchemaValidator, RequiredValidator } from '@/utils/validator';
import JsonEditor from '../jsonEditor';
import { tranJsonToObject } from '@/utils/json';
import { DEFAULT_PARAMETER } from '@/constant/functionCall';
import { getUuid } from '@/utils/uuid';
import useFeedback from '@/context/feedbackContext';
import Modal from '@/lib/modal';

const { Item: FormItem } = Form;
const { TextArea } = Input;

interface FunctionModalProps {
  isReadonly?: boolean;
  /**
   * 如果为空，表示新建
   */
  functionDefinition?: FunctionDefinition;
  onCreate: (functionDefinition: FunctionDefinition) => void;
  onUpdate: (functionDefinition: FunctionDefinition) => void;
  onDelete: (id: FunctionDefinition['id']) => void;
  onCancel: () => void;
}

const FunctionModal: FC<FunctionModalProps> = ({
  isReadonly,
  functionDefinition,
  onCreate,
  onUpdate,
  onDelete,
  onCancel,
}) => {
  const [form] = Form.useForm();

  const { messageApi } = useFeedback();

  const isMcpTool = useMemo(() => functionDefinition?.functionType === 'mcp_tool', [functionDefinition]);

  useEffect(() => {
    if (functionDefinition) {
      const { qualifiedName, description, parameters } = functionDefinition;
      form.setFieldsValue({
        qualifiedName,
        description,
        parameters: parameters ? JSON.stringify(parameters, null, 2) : '',
      });
    } else {
      form.setFieldsValue({
        qualifiedName: '',
        description: '',
        parameters: JSON.stringify(DEFAULT_PARAMETER, null, 2),
      });
    }
  }, [functionDefinition]);

  const handleSubmit = async () => {
    const { qualifiedName, description, parameters } = await form.validateFields();
    try {
      if (functionDefinition) {
        // 更新
        const newFunctionDefinition = { ...functionDefinition, qualifiedName, description };
        newFunctionDefinition.parameters = tranJsonToObject(parameters) as JSONSchema7;
        onUpdate(newFunctionDefinition);
      } else {
        // 创建
        onCreate({
          id: getUuid(),
          enabled: true,
          functionType: 'custom',
          qualifiedName,
          description,
          parameters: tranJsonToObject(parameters) as JSONSchema7,
        });
      }
    } catch (e) {
      messageApi.error('Parameters not valid');
    }
  };

  const genFooter = () => {
    if (isReadonly) return null;

    if (functionDefinition) {
      return (
        <div className={cn('flex items-center justify-end gap-2')}>
          <Button type="primary" danger onClick={() => onDelete(functionDefinition.id)}>
            Delete
          </Button>
          <Button type="primary" onClick={handleSubmit}>
            Update
          </Button>
        </div>
      );
    }
    return (
      <div className={cn('flex flex-none items-center justify-end gap-2')}>
        <Button type="primary" onClick={handleSubmit}>
          Create
        </Button>
      </div>
    );
  };

  return (
    <Modal open title="Function" size="large" onCancel={onCancel} footer={genFooter()}>
      <Form form={form} layout="vertical">
        <FormItem
          label="Name"
          name="qualifiedName"
          tooltip="The name of the function to be called."
          required
          rules={RequiredValidator}
        >
          <Input disabled={isMcpTool || isReadonly} />
        </FormItem>
        <FormItem
          label="Description"
          name="description"
          tooltip="A description of what the function does, used by the model to choose when and how to call the function."
          required
          rules={RequiredValidator}
        >
          <TextArea autoSize={{ minRows: 3, maxRows: 3 }} disabled={isReadonly} />
        </FormItem>
        <FormItem
          label="Parameters"
          name="parameters"
          tooltip="The parameters the functions accepts, described as a JSON Schema object."
          required
          rules={JsonSchemaValidator}
        >
          <JsonEditor isReadonly={isReadonly} />
        </FormItem>
      </Form>
    </Modal>
  );
};

export default memo(FunctionModal);
