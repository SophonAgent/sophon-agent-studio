import { PageInfo, ResourceClassify } from '@/interface/base';
import request from './request';
import {
  PromptConfigEditParams,
  PromptDetailItem,
  PromptFrameworkEnum,
  PromptHistoryItem,
  PromptItem,
} from '@/interface/prompt';

export default {
  /**
   * prompt 配置列表
   */
  async getPromptList() {
    return await request.get<PromptItem[]>('/prompt-configs');
  },
  /**
   * 工具 uid 查询 prompt detail
   */
  async getPromptDetail(uid: PromptItem['uid']) {
    return await request.get<PromptDetailItem[]>(`/prompt-configs/${uid}`);
  },
  /**
   * prompt 历史版本列表
   */
  async getPromptHistoryList(params: { pageNum?: number; pageSize?: number; uid: string }) {
    const { pageNum = 1, pageSize = 10, uid } = params;
    return await request.get<{
      classify?: ResourceClassify;
      historyVOS?: PromptHistoryItem[];
      pageInfo?: PageInfo;
    }>(`/prompt-configs/history/${uid}?pageNum=${pageNum}&pageSize=${pageSize}`);
  },
  /**
   * 还原历史 prompt 版本
   */
  async rollbackPromptVersion(uid: string, version: number) {
    return await request.post<boolean>(`/prompt-configs/rollback/${uid}?version=${version}`);
  },
  /**
   * 根据用户输入生成 prompt 模板
   */
  async generatePromptTemplate(
    params: { userPrompt?: string; framework?: PromptFrameworkEnum },
    controller?: AbortController,
  ) {
    return await request.post<{ finalPrompt: string; modelConfigId: number }>(
      '/prompt-configs/generatePromptTemplate',
      params,
      { signal: controller?.signal },
    );
  },
  /**
   * 创建 prompt config
   */
  async createPromptConfig(params: PromptConfigEditParams) {
    return request.post<boolean>('/prompt-configs/createPromptConfig', params);
  },
  /**
   * 更新 prompt config
   */
  async updatePromptConfig(params: PromptConfigEditParams) {
    return request.put<boolean>('/prompt-configs/updatePromptConfig', params);
  },
  /**
   * 删除 prompt
   */
  async deletePrompt(uid: PromptItem['uid']) {
    return await request.delete<boolean>(`/prompt-configs/deletePromptConfig/${uid}`);
  },
};
