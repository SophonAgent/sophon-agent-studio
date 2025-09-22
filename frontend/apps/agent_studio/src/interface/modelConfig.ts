export interface ModelConfigItem {
  id: number;
  createTime?: string;
  modifyTime?: string;
  name?: string; // 用户自定义名称
  description?: string;
  modelUrl?: string; // 接入模型的基础地址
  modelKey?: string; // 接入模型的 API 密钥
  modelName?: string; // 对应接入方模型名称
  config?: string; // 模型配置其它扩展信息 --json {}
  modifyUser?: string;
  createUser?: string;
  modalities?: string[]; // 模型支持的模态，如 ["text", "image"]
  maxCompletionTokenLimit?: number; // 模型最大输出 token 长度
  defaultParams?: string; // 默认参数 --json {}
  supportStream?: 0 | 1; // 是否支持流式 1-支持 0-不支持
  supportSystem?: 0 | 1; // 是否支持系统消息 1-支持 0-不支持
  supportReasoning?: 0 | 1; // 是否支持推理 1-支持 0-不支持
  timeoutSeconds?: number; // 超时时间
}

export type ModelConfigItemEditParams = Omit<
  ModelConfigItem,
  'id' | 'createTime' | 'modifyTime' | 'modifyUser' | 'createUser'
>;
