import type { JSONSchema7 } from 'json-schema';

export enum McpToolProxyType {
  HTTP = 'HTTP',
  RPC = 'RPC',
}

export enum McpToolRequestMethodType {
  GET = 'get',
  POST = 'post',
}

/** Tool 配置项 */
export interface McpToolConfigItem {
  id: number;
  qualifiedName?: string; // 工具唯一标识名
  displayName?: string; // 展示名称
  serverQualifiedName?: string; // 所属服务器标识名
  description?: string; // 工具功能描述
  inputSchema?: string; // 输入参数结构
  proxyType?: McpToolProxyType; // 注册代理类型
  requestMethod?: McpToolRequestMethodType; // 请求方法
  requestUrl?: string; // 请求地址
  requestHeaders?: Record<string, any>; // 请求头信息列表
  requestJson?: string; // 输入 JSON 转换配置
  responseJson?: string; // 响应 JSON 转换配置
  status?: number; // 状态 0-正常 -1-删除
  createTime?: string;
  modifyTime?: string;
  createUser?: string;
  modifyUser?: string;
}

export type McpToolConfigItemEditParams = Omit<
  McpToolConfigItem,
  'id' | 'status' | 'createTime' | 'modifyTime' | 'createUser' | 'modifyUser'
>;

export interface McpToolCallParams {
  endpointUrl: string;
  toolName: string;
  args: Record<string, any>;
}

export interface McpToolCallResult {
  content: { type: 'text' | 'image' | 'resource'; text: string }[];
  isError?: boolean;
}

/** 可执行 Tool */
export interface McpToolInfo {
  name: string;
  description: string;
  inputSchema: JSONSchema7;
}

export interface McpToolRunHistoryItem {
  title: string;
  requestArgumentsJson?: string;
  responseJson?: string;
}
