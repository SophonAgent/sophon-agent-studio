import type { JSONSchema7 } from 'json-schema';

export type MsgGroupKeyType = string;

export const RoleEnum = {
  SYSTEM: 'system',
  USER: 'user',
  ASSISTANT: 'assistant',
  TOOL: 'tool',
  ERROR: 'error',
} as const;
export type RoleEnum = (typeof RoleEnum)[keyof typeof RoleEnum];

export interface ConversationListRequestParams {
  userId: string;
  sessionId?: string;
  keywords?: string;
  pageSize?: number;
  pageNum?: number;
}

export interface ConversationBaseItem {
  completeContent?: MessageItem[]; // 完整对话内容
  modelArgs?: ChatModelConfig;
  promptContent?: string;
  promptDynamicValues?: Record<string, string>; // Prompt动态替换值
  promptUid?: string;
  promptVersion?: number;
}

export interface ConversationItem extends ConversationBaseItem {
  id?: number;
  createTime?: string;
  modifyTime?: string;
  sessionId?: string;
  userId?: string;
  isShared?: 0 | 1; // 0-未分享，1-已分享
  name?: string;

  /**
   * extra 前端用
   * compareGroups: ConversationBaseItem[] 其他对比组信息
   * displayConfigs: ChatDisplayConfig[]，显示配置
   * functionCalls: FunctionInfo[]，函数调用信息
   */
  extra?: string;
}

export type SimpleConversationItem = Pick<
  ConversationItem,
  'id' | 'sessionId' | 'userId' | 'createTime' | 'modifyTime' | 'name' | 'isShared'
>;

export type UpdateConversationRequestParams = Pick<
  ConversationItem,
  'id' | 'sessionId' | 'userId' | 'name' | 'isShared'
>;

export interface MessageItem {
  id?: string;
  logId?: string;
  role: RoleEnum;
  content: string;
  reasoningContent?: string; // 推理过程
  // img?: string; // 用户可以输入图片提问
  costTime?: number; // 耗时
  /**
   * 消耗token
   */
  completion_tokens?: number; // 大模型回答所使用 token
  prompt_tokens?: number; // prompt token
  total_tokens?: number; // total token
  /**
   * function call
   */
  tool_calls?: ToolCallItem[]; // functions
  name?: string; // tool name
  tool_call_id?: string; // tool call id
}

/**
 * 模型配置
 */
export interface ChatModelConfig {
  model?: string;
  frequency_penalty?: number;
  max_completion_tokens?: number;
  modalities?: string[];
  presence_penalty?: number;
  seed?: number;
  stop?: string[];
  temperature?: number;
  top_p?: number;
  tool_choice?: 'none' | 'auto' | 'required' | Record<string, any>;
  /** 对话用 */
  model_config_id: number;
}

/**
 * 对话组，至多 3 个
 */
export interface MessageGroup {
  msgGroupKey: string;
  name: string;
  displayConfig: ChatDisplayConfig;
}

/**
 * 对话组显示配置
 */
export interface ChatDisplayConfig {
  stream: boolean; // 流式传输
  markdown: boolean; // Markdown 渲染
  multiTurn: boolean; // 多轮对话
  autoRunMcpTool: boolean; // 自动运行 Mcp Tool
  multiToolOutput?: boolean; // 多行工具输出
}

/**
 * 对话用到的 system prompt
 */
export interface SystemPrompt {
  uid?: string;
  name?: string;
  version?: number; // 版本
  variables?: Record<string, string>;
  promptContent?: string; // 输入框中原始的 prompt
}

/**
 * 对话用到的工具
 */
export interface ToolItem {
  type: 'function';
  function: {
    name: string;
    description?: string;
    parameters?: JSONSchema7;
  };
}

/**
 * 工具回调项
 */
export interface ToolCallItem {
  id: string;
  index: number;
  type: string;
  function: {
    name: string;
    arguments: string;
    response?: string;
  };
}

export interface ChatCompletionRequestParams {
  messages: MessageItem[];
  modelConfig: ChatModelConfig;
  stream: boolean;
  tools?: ToolItem[];
}
