import type { JSONSchema7 } from 'json-schema';
import type { McpServerItem } from '@/interface/mcpServer';

export interface FunctionInfo {
  enableAll: boolean;
  functions: FunctionDefinition[];
}

export interface FunctionBase {
  description?: string;
  parameters?: JSONSchema7;
}

export interface FunctionDefinition extends FunctionBase {
  id: string;
  enabled: boolean;
  qualifiedName: string;
  displayName?: string; // 展示名称 仅 Mcp Server 为接口代理时生效，即 mcpServer.implementType === McpImplementType.PROXY
  functionType: 'custom' | 'mcp_tool';

  /**
   * functionType === 'mcp_tool'
   */
  mcpServer?: McpServerItem;
  mcpToolBase?: FunctionBase;
  isMcpToolModified?: boolean;
}
