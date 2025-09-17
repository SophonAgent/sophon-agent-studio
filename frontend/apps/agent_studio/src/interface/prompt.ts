import { ResourceClassify } from './base';

/**
 * prompt 框架
 */
export const PromptFrameworkEnum = {
  COMMON: 'COMMON', // 无框架
  CRISPE: 'CRISPE',
  ICIO: 'ICIO',
  RASCEF: 'RASCEF',
} as const;
export type PromptFrameworkEnum = (typeof PromptFrameworkEnum)[keyof typeof PromptFrameworkEnum];

/**
 * prompt 列表项
 */
export interface PromptItem {
  createTime?: string;
  uid?: string;
  name?: string;
  description?: string;
  createUser?: string;
  classify?: ResourceClassify;
}

/**
 * prompt 详细信息
 */
export interface PromptDetailItem {
  id: number;
  createTime?: string;
  promptUid?: string; // Prompt ID
  promptContent?: string; // Prompt 内容
  contentPlaceholders?: string[]; // 内容变量
  createUser?: string;
  status?: 1 | 0; // 状态 1-生效 0-失效
  version?: number; // 版本
  comment?: string;
  framework?: PromptFrameworkEnum;
}

/**
 * prompt 配置版本信息
 */
export interface PromptConfigItem {
  baseConfig: PromptItem;
  detail: PromptDetailItem;
}

/**
 * prompt 历史记录
 */
export interface PromptHistoryItem {
  createTime: string;
  createUser: string;
  promptDetails: PromptDetailItem[];
  promptUid: string;
  status: 1 | 0; // 状态 1-生效，0-失效
  version: number; // 版本号
}

export interface PromptConfigEditParams {
  baseConfig: Omit<PromptItem, 'createTime' | 'createUser'>;
  detail: Pick<PromptDetailItem, 'promptContent' | 'contentPlaceholders' | 'comment' | 'framework'>;
}
