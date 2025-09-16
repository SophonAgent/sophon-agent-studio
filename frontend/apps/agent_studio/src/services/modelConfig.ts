import { ModelConfigItem, ModelConfigItemEditParams } from '@/interface/modelConfig';
import request from './request';

export default {
  /**
   * 获取模型配置列表
   */
  async getModelConfigList() {
    return await request.get<ModelConfigItem[]>('/model-configs');
  },
  /**
   * 根据 ID 获取模型配置详情
   */
  async getModelConfigById(id: ModelConfigItem['id']) {
    return await request.get<ModelConfigItem>(`/model-configs/${id}`);
  },
  /**
   * 创建模型配置
   */
  async createModelConfig(params: ModelConfigItemEditParams) {
    return await request.post<ModelConfigItem>('/model-configs/createModelConfig', params);
  },
  /**
   * 更新模型配置
   */
  async updateModelConfig(id: ModelConfigItem['id'], params: ModelConfigItemEditParams) {
    return await request.post<ModelConfigItem>(`/model-configs/updateModelConfig/${id}`, params);
  },
  /**
   * 删除模型配置
   */
  async deleteModelConfig(id: ModelConfigItem['id']) {
    return await request.post<boolean>(`/model-configs/deleteModelConfig/${id}`);
  },
};
