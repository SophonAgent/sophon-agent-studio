import type { McpServerItem } from '@/interface/mcpServer';
import type {
  McpToolCallParams,
  McpToolConfigItem,
  McpToolConfigItemEditParams,
  McpToolInfo,
} from '@/interface/mcpTool';

import useFeedback from '@/context/feedbackContext';
import mcpTool from '@/services/mcpTool';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

function useMcpTool() {
  const { t } = useTranslation();

  const { messageApi } = useFeedback();

  const [mcpToolConfigList, setMcpToolConfigList] = useState<McpToolConfigItem[]>([]);
  const [isMcpToolConfigListLoading, setIsMcpToolConfigListLoading] = useState<boolean>(false);

  const [isMcpToolConfigSaveLoading, setIsMcpToolConfigSaveLoading] = useState<boolean>(false);

  const [mcpToolList, setMcpToolList] = useState<McpToolInfo[]>([]);
  const [isMcpToolListLoading, setIsMcpToolListLoading] = useState<boolean>(false);

  const [isRunLoading, setIsRunLoading] = useState<boolean>(false);

  const getMcpToolConfigList = async (
    serverQualifiedName: McpServerItem['qualifiedName'],
    e?: {
      silent?: boolean;
      abortController?: AbortController;
    },
  ): Promise<McpToolConfigItem[]> => {
    const { silent, abortController } = e || {};
    if (!serverQualifiedName) return [];

    setIsMcpToolConfigListLoading(true);
    try {
      const res = await mcpTool.getMcpToolConfigListByServerQualifiedName(
        serverQualifiedName,
        abortController,
      );
      setMcpToolConfigList(res?.data || []);
      return res?.data || [];
    } catch (err) {
      if (err !== 'canceled' && !silent) {
        messageApi.error(t('MESSAGE_ERROR_12'));
      }
      console.error(t('MESSAGE_ERROR_12'), err);
      return [];
    } finally {
      setIsMcpToolConfigListLoading(false);
    }
  };

  const createMcpToolConfig = async (params: McpToolConfigItemEditParams) => {
    setIsMcpToolConfigSaveLoading(true);
    try {
      const res = await mcpTool.createMcpToolConfig(params);
      if (res?.data) {
        messageApi.success(t('MESSAGE_SUCCESS_4'));
      }
    } catch (err) {
      messageApi.error(t('MESSAGE_ERROR_13'));
      console.error(t('MESSAGE_ERROR_13'), err);
    } finally {
      setIsMcpToolConfigSaveLoading(false);
    }
  };

  const updateMcpToolConfig = async (id: McpServerItem['id'], params: McpToolConfigItemEditParams) => {
    setIsMcpToolConfigSaveLoading(true);
    try {
      const res = await mcpTool.updateMcpToolConfig(id, params);
      if (res?.data) {
        messageApi.success(t('MESSAGE_SUCCESS_5'));
      }
    } catch (err) {
      messageApi.error(t('MESSAGE_ERROR_14'));
      console.error(t('MESSAGE_ERROR_14'), err);
    } finally {
      setIsMcpToolConfigSaveLoading(false);
    }
  };

  const deleteMcpToolConfig = async (id: McpServerItem['id']) => {
    try {
      const res = await mcpTool.deleteMcpToolConfig(id);
      if (res?.data) {
        messageApi.success(t('MESSAGE_SUCCESS_6'));
      }
    } catch (err) {
      messageApi.error(t('MESSAGE_ERROR_15'));
      console.error(t('MESSAGE_ERROR_15'), err);
    }
  };

  const getMcpToolList = async (
    endpointUrl?: string,
    e?: {
      silent?: boolean;
      abortController?: AbortController;
    },
  ): Promise<McpToolInfo[]> => {
    const { silent, abortController } = e || {};
    if (!endpointUrl) return [];

    setIsMcpToolListLoading(true);
    try {
      const res = await mcpTool.getMcpToolListByUrl(endpointUrl, abortController);
      setMcpToolList(res?.data || []);
      return res?.data || [];
    } catch (err) {
      if (err !== 'canceled' && !silent) {
        messageApi.error(t('MESSAGE_ERROR_16'));
      }
      console.error(t('MESSAGE_ERROR_16'), err);
      return [];
    } finally {
      setIsMcpToolListLoading(false);
    }
  };

  const callMcpTool = async (params: McpToolCallParams) => {
    setIsRunLoading(true);
    try {
      const res = await mcpTool.callMcpTool(params);
      if (res?.data) {
        messageApi.success(t('MESSAGE_SUCCESS_7'));
      }
      return res;
    } catch (err) {
      messageApi.error(t('MESSAGE_ERROR_17'));
      console.error(t('MESSAGE_ERROR_17'), err);
      return undefined;
    } finally {
      setIsRunLoading(false);
    }
  };

  return {
    mcpToolConfigList,
    isMcpToolConfigListLoading,
    isMcpToolConfigSaveLoading,
    mcpToolList,
    isMcpToolListLoading,
    isRunLoading,
    getMcpToolConfigList,
    createMcpToolConfig,
    updateMcpToolConfig,
    deleteMcpToolConfig,
    getMcpToolList,
    callMcpTool,
  };
}

export default useMcpTool;
