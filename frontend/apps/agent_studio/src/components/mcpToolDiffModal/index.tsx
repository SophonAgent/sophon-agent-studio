import type { FC } from 'react';
import type { JSONSchema7 } from 'json-schema';
import type { FunctionBase, FunctionDefinition } from '@/interface/functionCall';
import type { McpToolConfigItem } from '@/interface/mcpTool';

import { memo, useEffect, useState } from 'react';
import Modal from '@/lib/modal';
import useMcpTool from '@/hooks/useMcpTool';
import { cn } from '@/utils/tw';
import AccentBorderHeader from '@/components/accentBorderHeader';
import { Button, Form, Input } from 'antd';
import MonacoDiffEditor from '@/lib/monacoDiffEditor';
import { JsonSchemaValidator, RequiredValidator } from '@/utils/validator';
import JsonEditor from '@/components/jsonEditor';
import { tranJsonToObject } from '@/utils/json';
import { useTranslation } from 'react-i18next';

const { Item: FormItem } = Form;
const { TextArea } = Input;

interface McpToolDiffModalProps {
  functionDefinition?: FunctionDefinition;
  onCancel: () => void;
  onSuccess: (value: FunctionDefinition) => void;
}

const McpToolDiffModal: FC<McpToolDiffModalProps> = ({ functionDefinition, onCancel, onSuccess }) => {
  const { t } = useTranslation();

  const [form] = Form.useForm();

  const { getMcpToolConfigList } = useMcpTool();

  const [mcpToolConfig, setMcpToolConfig] = useState<McpToolConfigItem>();

  const serverQualifiedName = functionDefinition?.mcpServer?.qualifiedName;

  useEffect(() => {
    if (serverQualifiedName) {
      getMcpToolConfigList(serverQualifiedName).then(res => {
        const f = res.find(item => item.qualifiedName === functionDefinition.qualifiedName);
        setMcpToolConfig(f);
      });
    }
  }, [serverQualifiedName]);

  useEffect(() => {
    if (functionDefinition) {
      const { qualifiedName, description, parameters } = functionDefinition;
      form.setFieldsValue({
        qualifiedName,
        description,
        parameters: parameters ? JSON.stringify(parameters, null, 2) : '',
      });
    }
  }, [functionDefinition]);

  const handleSubmit = async () => {
    if (!functionDefinition) return;

    const { description, parameters } = await form.validateFields();
    const mcpToolBase: FunctionBase = {
      description,
      parameters: tranJsonToObject(parameters) as JSONSchema7,
    };
    const newFunctionDefinition: FunctionDefinition = {
      ...functionDefinition,
      ...mcpToolBase,
      mcpToolBase,
      isMcpToolModified: false,
    };
    onSuccess(newFunctionDefinition);
  };

  const onUpdateChange = () => {
    const { description, inputSchema } = mcpToolConfig || {};
    form.setFieldsValue({
      description,
      parameters: JSON.stringify(tranJsonToObject(inputSchema), null, 2),
    });
  };

  return (
    <Modal open title="MCP Tool Function Diff" size="large" onCancel={onCancel} onOk={handleSubmit}>
      <div className={cn('mb-6 grid grid-cols-3 gap-6')}>
        <AccentBorderHeader title={t('FUNCTION_1')} className={cn('leading-[24px]')} />
        <AccentBorderHeader title={t('FUNCTION_2')} className={cn('leading-[24px]')} />
        <div className={cn('flex justify-between')}>
          <AccentBorderHeader title={t('FUNCTION_3')} className={cn('leading-[24px]')} />
          <Button type="link" size="small" onClick={onUpdateChange}>
            {t('BUTTON_16')}
          </Button>
        </div>
      </div>

      <Form form={form} layout="vertical">
        <FormItem label="Name" tooltip="The name of the function to be called.">
          <div className={cn('grid grid-cols-3 gap-6')}>
            <div className={cn('col-span-2')}>
              <MonacoDiffEditor
                className={cn('h-[32px]')}
                language="plaintext"
                original={functionDefinition?.qualifiedName}
                modified={functionDefinition?.qualifiedName}
                bordered
                isReadonly
              />
            </div>
            <FormItem name="qualifiedName" required rules={RequiredValidator(t)} noStyle>
              <Input disabled className={cn('col-span-1')} />
            </FormItem>
          </div>
        </FormItem>
        <FormItem
          label="Description"
          tooltip="A description of what the function does, used by the model to choose when and how to call the function."
        >
          <div className={cn('grid grid-cols-3 gap-6')}>
            <div className={cn('col-span-2')}>
              <MonacoDiffEditor
                className={cn('h-[76px]')}
                language="plaintext"
                original={functionDefinition?.mcpToolBase?.description}
                modified={mcpToolConfig?.description}
                bordered
                isReadonly
              />
            </div>
            <FormItem name="description" required rules={RequiredValidator(t)} noStyle>
              <TextArea autoSize={{ minRows: 3, maxRows: 3 }} />
            </FormItem>
          </div>
        </FormItem>
        <FormItem
          label="Parameters"
          tooltip="The parameters the functions accepts, described as a JSON Schema object."
        >
          <div className={cn('grid grid-cols-3 gap-6')}>
            <div className={cn('col-span-2')}>
              <MonacoDiffEditor
                className={cn('h-[260px]')}
                language="plaintext"
                original={JSON.stringify(functionDefinition?.mcpToolBase?.parameters, null, 2)}
                modified={JSON.stringify(tranJsonToObject(mcpToolConfig?.inputSchema), null, 2)}
                bordered
                isReadonly
              />
            </div>
            <FormItem name="parameters" required rules={JsonSchemaValidator(t)} noStyle>
              <JsonEditor />
            </FormItem>
          </div>
        </FormItem>
      </Form>
    </Modal>
  );
};

export default memo(McpToolDiffModal);
