export enum McpServerType {
  SSE = 'sse',
  STDIO = 'stdio', // 暂无
}

export enum McpImplementType {
  INNER = 'INNER',
  PROXY = 'PROXY',
  EXTERNAL = 'EXTERNAL',
}

export interface McpServerItem {
  id: number;
  type?: McpServerType; // MCP 服务器类型
  qualifiedName?: string; // 服务唯一标识名
  displayName?: string; // 展示名称
  description?: string; // 服务描述
  category?: string; // 所属分类
  endpointUrl?: string; // MCP服务端点地址
  iconUrl?: string; // 服务图标地址
  createUser?: string;
  createTime?: string;
  modifyUser?: string;
  modifyTime?: string;
  command?: string; // stdio 模式下的安装命令
  implementType?: McpImplementType; // 实现类型
  status?: number; // 状态 0-正常 -1-删除
  contextConfig?: string; // 上下文配置 --json {}
}

export type McpServerItemCreateParams = Omit<
  McpServerItem,
  'id' | 'qualifiedName' | 'status' | 'createUser' | 'createTime' | 'modifyUser' | 'modifyTime'
>;

export type McpServerItemUpdateParams = Omit<
  McpServerItem,
  'type' | 'qualifiedName' | 'status' | 'createUser' | 'createTime' | 'modifyUser' | 'modifyTime'
>;
