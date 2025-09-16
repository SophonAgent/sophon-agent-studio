import { McpImplementType } from '@/interface/mcpServer';

export const McpImplementTypeTextMap = {
  [McpImplementType.INNER]: '平台原生',
  [McpImplementType.PROXY]: '接口代理',
  [McpImplementType.EXTERNAL]: '外部注册',
};
