import type { FC } from 'react';
import type { McpToolConfigItem, McpToolConfigItemEditParams } from '@/interface/mcpTool';

import { Fragment, memo, useEffect } from 'react';
import { Form, Input, Radio } from 'antd';
import { McpToolProxyType, McpToolRequestMethodType } from '@/interface/mcpTool';
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
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

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
      title={initialValues?.id ? t('MCP_TOOL_6') : t('MCP_TOOL_5')}
      autoFocus={false}
      size="large"
      onCancel={onCancel}
      onOk={handleSubmit}
      confirmLoading={isMcpToolConfigSaveLoading}
    >
      <Form form={form} labelCol={{ span: 7 }} wrapperCol={{ span: 17 }}>
        <FormItem name="serverQualifiedName" hidden>
          <Input />
        </FormItem>

        {/* -----基本信息----- */}
        <AccentBorderHeader title={t('TAG_9')} className={cn('mb-6 text-[16px]')} />
        <FormItem label={t('MCP_TOOL_7')} name="displayName" required rules={RequiredValidator(t)}>
          <Input />
        </FormItem>
        <FormItem
          label={t('MCP_TOOL_8')}
          name="qualifiedName"
          required
          rules={[...RequiredValidator(t), ...LowerCasePathValidator(t)]}
          tooltip={t('MCP_TOOL_9')}
        >
          <Input />
        </FormItem>
        <FormItem
          label={t('TAG_6')}
          name="description"
          required
          rules={RequiredValidator(t)}
          tooltip={t('MCP_TOOL_10')}
        >
          <TextArea autoSize={{ minRows: 3, maxRows: 3 }} />
        </FormItem>
        <FormItem
          label="Input Schema"
          name="inputSchema"
          required
          rules={JsonSchemaValidator(t)}
          tooltip={t('MCP_TOOL_11')}
          initialValue={defaultInputSchema}
        >
          <JsonEditor />
        </FormItem>

        {/* -----工具能力配置----- */}
        <AccentBorderHeader title={t('TAG_10')} className={cn('mb-6 mt-10 text-[16px]')} />
        <FormItem
          label={t('TAG_11')}
          name="proxyType"
          required
          rules={RequiredValidator(t)}
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
            <FormItem label="URL" name="requestUrl" required rules={RequiredValidator(t)}>
              <Input />
            </FormItem>
            <FormItem
              label={t('TAG_12')}
              name="requestMethod"
              rules={RequiredValidator(t)}
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
          rules={JSONataValidator(t)}
          tooltip={t('MCP_TOOL_12')}
        >
          <JsonEditor />
        </FormItem>
        <FormItem
          label="Response Schema"
          name="responseJson"
          rules={JSONataValidator(t)}
          tooltip={t('MCP_TOOL_13')}
        >
          <JsonEditor />
        </FormItem>
      </Form>
    </Drawer>
  );
};

export default memo(McpToolEditDrawer);
