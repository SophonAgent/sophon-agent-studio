import { McpImplementType } from '@/interface/mcpServer';

export const McpImplementTypeTextMap = (t: any) => ({
  [McpImplementType.INNER]: t('MCP_10'),
  [McpImplementType.PROXY]: t('MCP_11'),
  [McpImplementType.EXTERNAL]: t('MCP_12'),
});
