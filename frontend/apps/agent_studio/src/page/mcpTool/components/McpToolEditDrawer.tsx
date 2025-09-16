import type { FC } from 'react';

import { Fragment, memo, useEffect } from 'react';
import { Form, Input, Radio } from 'antd';
import {
  McpToolConfigItem,
  McpToolConfigItemEditParams,
  McpToolProxyType,
  McpToolRequestMethodType,
} from '@/interface/mcpTool';
import useMcpTool from '@/hooks/useMcpTool';
import Drawer from '@/lib/drawer';
import {
  JSONataValidator,
  JsonSchemaValidator,
  LowerCasePathValidator,
  RequiredValidator,
} from '@/utils/validator';
import AccentBorderHeader from '@/components/accentBorderHeader';
import JsonEditor from '@/components/jsonEditor';
import RequestHeaderFormList from '@/components/requestHeaderFormList';
import { arrayToObject, objectToArray } from '@/utils/json';
import { cloneDeep } from 'lodash-es';
import { cn } from '@/utils/tw';

const { Item: FormItem } = Form;
const { TextArea } = Input;
const { Group: RadioGroup } = Radio;

const defaultInputSchema = `{
  "type": "object",
  "properties": {
    "key1": {
      "type": "string",
      "description": ""
    }
  },
  "required": [
    "key1"
  ]
}`;

interface McpToolEditDrawerProps {
  initialValues?: Partial<McpToolConfigItem>;
  onCancel: () => void;
  onSuccess: () => void;
}

const McpToolEditDrawer: FC<McpToolEditDrawerProps> = ({ initialValues, onCancel, onSuccess }) => {
  const [form] = Form.useForm();

  const { isMcpToolConfigSaveLoading, createMcpToolConfig, updateMcpToolConfig } = useMcpTool();

  const proxyTypeField = Form.useWatch('proxyType', form);

  useEffect(() => {
    if (initialValues) {
      const initVals = cloneDeep(initialValues);
      if (initialValues.requestHeaders) {
        initVals.requestHeaders = objectToArray(initialValues.requestHeaders);
      }
      form.setFieldsValue(initVals);
    }
  }, [initialValues]);

  const handleSubmit = async () => {
    const { requestHeaders, ...values } = await form.validateFields();
    const params: McpToolConfigItemEditParams = {
      ...values,
      requestHeaders: requestHeaders?.length ? arrayToObject(requestHeaders) : undefined,
    };
    if (initialValues?.id) {
      await updateMcpToolConfig(initialValues.id, params);
    } else {
      await createMcpToolConfig(params);
    }
    onSuccess();
  };

  return (
    <Drawer
      open
      title={initialValues?.id ? '编辑工具' : '新建工具'}
      autoFocus={false}
      size="large"
      onCancel={onCancel}
      onOk={handleSubmit}
      confirmLoading={isMcpToolConfigSaveLoading}
    >
      <Form form={form} labelCol={{ span: 6 }} wrapperCol={{ span: 18 }}>
        <FormItem name="serverQualifiedName" hidden>
          <Input />
        </FormItem>

        {/* -----基本信息----- */}
        <AccentBorderHeader title="基本信息" className={cn('mb-6 text-[16px]')} />
        <FormItem label="工具展示名称" name="displayName" required rules={RequiredValidator}>
          <Input />
        </FormItem>
        <FormItem
          label="工具唯一标识名"
          name="qualifiedName"
          required
          rules={[...RequiredValidator, ...LowerCasePathValidator]}
          tooltip="AI Agent（大模型）调用 MCP Server Tool 的唯一标识"
        >
          <Input />
        </FormItem>
        <FormItem
          label="模型描述"
          name="description"
          required
          rules={RequiredValidator}
          tooltip="帮助AI Agent（大模型）理解 MCP Server Tool的功能，是用于决定使用当前tool的重要依据"
        >
          <TextArea autoSize={{ minRows: 3, maxRows: 3 }} />
        </FormItem>
        <FormItem
          label="Input Schema"
          name="inputSchema"
          required
          rules={JsonSchemaValidator}
          tooltip="AI Agent 思考后调用 MCP Server Tool 的输入参数，使用 JSON Schema 描述"
          initialValue={defaultInputSchema}
        >
          <JsonEditor />
        </FormItem>

        {/* -----工具能力配置----- */}
        <AccentBorderHeader title="工具能力配置" className={cn('mb-6 mt-10 text-[16px]')} />
        <FormItem
          label="类型"
          name="proxyType"
          required
          rules={RequiredValidator}
          initialValue={McpToolProxyType.HTTP}
        >
          <RadioGroup
            options={[
              { label: McpToolProxyType.HTTP, value: McpToolProxyType.HTTP },
              { label: McpToolProxyType.RPC, value: McpToolProxyType.RPC, disabled: true },
            ]}
          />
        </FormItem>
        {proxyTypeField === McpToolProxyType.HTTP && (
          <Fragment>
            <FormItem label="URL" name="requestUrl" required rules={RequiredValidator}>
              <Input />
            </FormItem>
            <FormItem
              label="请求方式"
              name="requestMethod"
              rules={RequiredValidator}
              required
              initialValue={McpToolRequestMethodType.GET}
            >
              <RadioGroup
                options={Object.entries(McpToolRequestMethodType).map(([key, value]) => ({
                  label: key,
                  value,
                }))}
              />
            </FormItem>
          </Fragment>
        )}
        <FormItem label="Headers">
          <RequestHeaderFormList
            name="requestHeaders"
            initialValue={[{ key: 'content-type', value: 'application/json' }]}
          />
        </FormItem>
        <FormItem
          label="Request Schema"
          name="requestJson"
          rules={JSONataValidator}
          tooltip="JSONata 格式，用于在 POST 请求下替换 Request Body"
        >
          <JsonEditor />
        </FormItem>
        <FormItem
          label="Response Schema"
          name="responseJson"
          rules={JSONataValidator}
          tooltip="JSONata 格式，用于描述 Response 的裁剪、重命名等"
        >
          <JsonEditor />
        </FormItem>
      </Form>
    </Drawer>
  );
};

export default memo(McpToolEditDrawer);
