import type {
  McpServerItem,
  McpServerItemCreateParams,
  McpServerItemUpdateParams,
} from '@/interface/mcpServer';

import { NAV_PATH_MAP } from '@/constant/nav';
import useFeedback from '@/context/feedbackContext';
import mcpServer from '@/services/mcpServer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function useMcpServer() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { messageApi } = useFeedback();

  const [mcpServerList, setMcpServerList] = useState<McpServerItem[]>([]);
  const [isMcpServerListLoading, setIsMcpServerListLoading] = useState<boolean>(false);

  const [currentMcpServer, setCurrentMcpServer] = useState<McpServerItem>();
  const [isCurrentMcpServerLoading, setIsCurrentMcpServerLoading] = useState<boolean>(false);

  const [isMcpServerSaveLoading, setIsMcpServerSaveLoading] = useState<boolean>(false);

  const getMcpServerList = async () => {
    setIsMcpServerListLoading(true);
    try {
      const res = await mcpServer.getMcpServerList();
      setMcpServerList(res?.data || []);
    } catch (err) {
      messageApi.error(t('MESSAGE_ERROR_7'));
      console.error(t('MESSAGE_ERROR_7'), ': ', err);
    } finally {
      setIsMcpServerListLoading(false);
    }
  };

  const getMcpServerById = async (id: McpServerItem['id']) => {
    setIsCurrentMcpServerLoading(true);
    try {
      const res = await mcpServer.getMcpServerById(id);
      if (res?.data) {
        setCurrentMcpServer(res.data);
      }
    } catch (err) {
      messageApi.error(t('MESSAGE_ERROR_8'));
      console.error(t('MESSAGE_ERROR_8'), ': ', err);
      navigate(NAV_PATH_MAP.MCP);
    } finally {
      setIsCurrentMcpServerLoading(false);
    }
  };

  const createMcpServer = async (params: McpServerItemCreateParams) => {
    setIsMcpServerSaveLoading(true);
    try {
      const res = await mcpServer.createMcpServer(params);
      if (res?.data) {
        messageApi.success(t('MESSAGE_SUCCESS_1'));
      }
    } catch (err) {
      messageApi.error(t('MESSAGE_ERROR_9'));
      console.error(t('MESSAGE_ERROR_9'), ': ', err);
    } finally {
      setIsMcpServerSaveLoading(false);
    }
  };

  const updateMcpServer = async (params: McpServerItemUpdateParams) => {
    setIsMcpServerSaveLoading(true);
    try {
      const res = await mcpServer.updateMcpServer(params);
      if (res?.data) {
        messageApi.success(t('MESSAGE_SUCCESS_2'));
      }
    } catch (err) {
      messageApi.error(t('MESSAGE_ERROR_10'));
      console.error(t('MESSAGE_ERROR_10'), ': ', err);
    } finally {
      setIsMcpServerSaveLoading(false);
    }
  };

  const deleteMcpServer = async (id: McpServerItem['id']) => {
    try {
      const res = await mcpServer.deleteMcpServer(id);
      if (res?.data) {
        messageApi.success(t('MESSAGE_SUCCESS_3'));
      }
    } catch (err) {
      messageApi.error(t('MESSAGE_ERROR_11'));
      console.error(t('MESSAGE_ERROR_11'), ': ', err);
    }
  };

  return {
    mcpServerList,
    isMcpServerListLoading,
    currentMcpServer,
    isCurrentMcpServerLoading,
    isMcpServerSaveLoading,
    getMcpServerList,
    getMcpServerById,
    createMcpServer,
    updateMcpServer,
    deleteMcpServer,
  };
}

export default useMcpServer;
