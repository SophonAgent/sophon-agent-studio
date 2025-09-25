import type { ModelConfigItem, ModelConfigItemEditParams } from '@/interface/modelConfig';

import useFeedback from '@/context/feedbackContext';
import modelConfig from '@/services/modelConfig';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function useModelManagement() {
  const { t } = useTranslation();

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
      messageApi.error(t('MESSAGE_ERROR_18'));
      console.error(t('MESSAGE_ERROR_18'), ': ', err);
    } finally {
      setIsModelListLoading(false);
    }
  };

  const createModel = async (params: ModelConfigItemEditParams) => {
    setIsModelSaveLoading(true);
    try {
      const res = await modelConfig.createModelConfig(params);
      if (res?.data) {
        messageApi.success(t('MESSAGE_SUCCESS_8'));
      }
    } catch (err) {
      messageApi.error(t('MESSAGE_ERROR_19'));
      console.error(t('MESSAGE_ERROR_19'), ': ', err);
    } finally {
      setIsModelSaveLoading(false);
    }
  };

  const updateModel = async (id: ModelConfigItem['id'], params: ModelConfigItemEditParams) => {
    setIsModelSaveLoading(true);
    try {
      const res = await modelConfig.updateModelConfig(id, params);
      if (res?.data) {
        messageApi.success(t('MESSAGE_SUCCESS_9'));
      }
    } catch (err) {
      messageApi.error(t('MESSAGE_ERROR_20'));
      console.error(t('MESSAGE_ERROR_20'), ': ', err);
    } finally {
      setIsModelSaveLoading(false);
    }
  };

  const deleteModel = async (id: ModelConfigItem['id']) => {
    try {
      const res = await modelConfig.deleteModelConfig(id);
      if (res?.data) {
        messageApi.success(t('MESSAGE_SUCCESS_10'));
      }
    } catch (err) {
      messageApi.error(t('MESSAGE_ERROR_21'));
      console.error(t('MESSAGE_ERROR_21'), ': ', err);
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
