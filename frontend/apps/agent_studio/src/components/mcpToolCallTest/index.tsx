import type { FC } from 'react';
import type { McpToolCallParams, McpToolInfo, McpToolRunHistoryItem } from '@/interface/mcpTool';
import type { TabsProps } from 'antd';
import type { McpServerItem } from '@/interface/mcpServer';

import { Fragment, memo, useState } from 'react';
import { cn } from '@/utils/tw';
import { Button, Form, Input, InputNumber, Radio, Tabs } from 'antd';
import { isJSON } from '@/utils/json';
import JsonView from '@/components/jsonView';
import JSONbig from 'json-bigint';
import useMcpTool from '@/hooks/useMcpTool';
import useFeedback from '@/context/feedbackContext';
import DividingLine from '@/lib/dividingLine';
import ReactMarkdown from '@/components/reactMarkdown';
import CopyButton from '@/components/copyButton';

const { Item: FormItem } = Form;
const { TextArea } = Input;
const { Group: RadioGroup } = Radio;

interface McpToolCallTestProps {
  mcpServer?: McpServerItem;
  tool?: McpToolInfo;
  callbackToolRun?: (v: McpToolRunHistoryItem) => void;
}

const McpToolCallTest: FC<McpToolCallTestProps> = ({ mcpServer, tool, callbackToolRun }) => {
  const { inputSchema } = tool || {};

  const [form] = Form.useForm();

  const { messageApi } = useFeedback();
  const { isRunLoading, callMcpTool } = useMcpTool();

  const [isCallError, setIsCallError] = useState<boolean>(false);
  const [callResult, setCallResult] = useState<string>();

  const handleTest = async () => {
    const values = await form.validateFields();

    if (!mcpServer?.endpointUrl) {
      messageApi.error('缺失 endpointUrl');
      return;
    }
    if (!tool?.name) {
      messageApi.error('该工具缺失 name');
      return;
    }
    const params: McpToolCallParams = {
      endpointUrl: mcpServer.endpointUrl,
      toolName: tool.name,
      args: values,
    };
    const res = await callMcpTool(params);
    if (res?.data) {
      const { content } = res.data;
      if (content) {
        setIsCallError(false);
        setCallResult(content?.map(i => i?.text)?.join('\n'));
      } else {
        setIsCallError(true);
        setCallResult(JSON.stringify(res.data));
      }
    }

    callbackToolRun?.({
      title: `tools/call(${tool.name})`,
      responseJson: JSON.stringify(res),
      requestArgumentsJson: JSON.stringify(values),
    });
  };

  const genFormItem = (p: { label: string; name: string; config: any }) => {
    const { label, name, config } = p;

    let inner = <TextArea placeholder={`请输入${config?.description || ''}`} />;
    if (config.type === 'number' || config.type === 'integer') {
      inner = (
        <InputNumber
          placeholder={`请输入${config?.description || ''}`}
          max={config?.maximum === undefined ? Infinity : config?.maximum}
          min={config?.minimum === undefined ? -Infinity : config?.minimum}
        />
      );
    } else if (config.type === 'boolean') {
      inner = (
        <RadioGroup
          options={[
            { label: 'True', value: true },
            { label: 'False', value: false },
          ]}
        />
      );
    }

    const isRequired = inputSchema?.required?.includes(name);
    const isObjectOrArray = config.type === 'object' || config.type === 'array';
    let rules;
    if (isRequired) {
      if (isObjectOrArray) {
        rules = [
          {
            validator(_: any, value: any) {
              if (value !== undefined) {
                return Promise.resolve();
              }
              return Promise.reject(`${label}为必填项`);
            },
          },
        ];
      } else {
        rules = [{ required: isRequired, message: `${label}为必填项` }];
      }
    }

    return (
      <FormItem
        key={name}
        label={label}
        name={name}
        tooltip={{ title: <JsonView className={cn('text-[12px]')} value={config} />, color: 'white' }}
        rules={rules}
        required={isRequired}
        style={{ marginBottom: 12 }}
        initialValue={config.default}
        normalize={isObjectOrArray ? v => (isJSON(v) ? JSONbig.parse(v) : v) : undefined}
        getValueProps={
          isObjectOrArray ? v => ({ value: typeof v === 'string' ? v : JSONbig.stringify(v) }) : undefined
        }
      >
        {inner}
      </FormItem>
    );
  };

  const tabItems: TabsProps['items'] = [
    {
      key: 'text',
      label: '文本',
      children: (
        <pre
          className={cn(
            'max-h-[300px] overflow-auto whitespace-break-spaces break-all rounded-lg bg-background-elevated-secondary p-4 text-[12px]',
          )}
        >
          {callResult}
        </pre>
      ),
    },
    {
      key: 'markdown',
      label: 'Markdown',
      children: (
        <div className={cn('max-h-[300px] overflow-auto rounded-lg bg-background-elevated-secondary p-4')}>
          <ReactMarkdown content={callResult || ''} />
        </div>
      ),
    },
    {
      key: 'json',
      label: 'JSON',
      children: (
        <JsonView
          value={isJSON(callResult) ? callResult : `["非JSON格式输出"]`}
          className={cn('max-h-[300px] overflow-auto text-[12px]')}
        />
      ),
    },
  ];

  if (!inputSchema?.properties || !Object.keys(inputSchema.properties).length) {
    return null;
  }
  return (
    <Fragment>
      <Form form={form} layout="vertical">
        {Object.entries(inputSchema.properties).map(([key, config]) =>
          genFormItem({ label: key, name: key, config }),
        )}
      </Form>
      <Button onClick={handleTest} loading={isRunLoading} type="primary">
        Run
      </Button>

      {callResult ? (
        <div>
          <DividingLine className={cn('mb-3 mt-4 bg-[--border-light]')} />
          <div className={cn('text-[16px] font-medium')}>运行结果</div>
          {isCallError ? (
            <div>执行出错：{callResult}</div>
          ) : (
            <Tabs
              items={tabItems}
              size="small"
              tabBarExtraContent={{ right: <CopyButton value={callResult} /> }}
            />
          )}
        </div>
      ) : null}
    </Fragment>
  );
};

export default memo(McpToolCallTest);
