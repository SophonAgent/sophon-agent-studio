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

function useMcpServer() {
  const navigate = useNavigate();

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
      messageApi.error(`获取MCP服务器列表失败：${err}`);
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
      messageApi.error(`获取MCP服务器详情失败：${err}`);
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
        messageApi.success('创建MCP服务器成功');
      }
    } catch (err) {
      messageApi.error(`创建MCP服务器失败：${err}`);
    } finally {
      setIsMcpServerSaveLoading(false);
    }
  };

  const updateMcpServer = async (params: McpServerItemUpdateParams) => {
    setIsMcpServerSaveLoading(true);
    try {
      const res = await mcpServer.updateMcpServer(params);
      if (res?.data) {
        messageApi.success('更新MCP服务器成功');
      }
    } catch (err) {
      messageApi.error(`更新MCP服务器失败：${err}`);
    } finally {
      setIsMcpServerSaveLoading(false);
    }
  };

  const deleteMcpServer = async (id: McpServerItem['id']) => {
    try {
      const res = await mcpServer.deleteMcpServer(id);
      if (res?.data) {
        messageApi.success('删除MCP服务器成功');
      }
    } catch (err) {
      messageApi.error(`删除MCP服务器失败：${err}`);
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
