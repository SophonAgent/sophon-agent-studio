import useFeedback from '@/context/feedbackContext';
import { ModelConfigItem, ModelConfigItemEditParams } from '@/interface/modelConfig';
import modelConfig from '@/services/modelConfig';
import { useState } from 'react';

function useModelManagement() {
  const { messageApi } = useFeedback();

  const [modelList, setModelList] = useState<ModelConfigItem[]>([]);
  const [isModelListLoading, setIsModelListLoading] = useState<boolean>(false);

  const [isModelSaveLoading, setIsModelSaveLoading] = useState<boolean>(false);

  const getModelList = async () => {
    setIsModelListLoading(true);
    try {
      const res = await modelConfig.getModelConfigList();
      setModelList(res?.data || []);
    } catch (err) {
      messageApi.error(`获取模型列表失败：${err}`);
    } finally {
      setIsModelListLoading(false);
    }
  };

  const createModel = async (params: ModelConfigItemEditParams) => {
    setIsModelSaveLoading(true);
    try {
      const res = await modelConfig.createModelConfig(params);
      if (res?.data) {
        messageApi.success('创建模型成功');
      }
    } catch (err) {
      messageApi.error(`创建模型失败：${err}`);
    } finally {
      setIsModelSaveLoading(false);
    }
  };

  const updateModel = async (id: ModelConfigItem['id'], params: ModelConfigItemEditParams) => {
    setIsModelSaveLoading(true);
    try {
      const res = await modelConfig.updateModelConfig(id, params);
      if (res?.data) {
        messageApi.success('更新模型成功');
      }
    } catch (err) {
      messageApi.error(`更新模型失败：${err}`);
    } finally {
      setIsModelSaveLoading(false);
    }
  };

  const deleteModel = async (id: ModelConfigItem['id']) => {
    try {
      const res = await modelConfig.deleteModelConfig(id);
      if (res?.data) {
        messageApi.success('删除模型成功');
      }
    } catch (err) {
      messageApi.error(`删除模型失败：${err}`);
    }
  };

  return {
    modelList,
    isModelListLoading,
    isModelSaveLoading,
    getModelList,
    createModel,
    updateModel,
    deleteModel,
  };
}

export default useModelManagement;
