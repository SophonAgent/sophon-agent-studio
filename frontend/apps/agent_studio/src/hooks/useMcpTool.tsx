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

function useMcpTool() {
  const { messageApi } = useFeedback();

  const [mcpToolConfigList, setMcpToolConfigList] = useState<McpToolConfigItem[]>([]);
  const [isMcpToolConfigListLoading, setIsMcpToolConfigListLoading] = useState<boolean>(false);

  const [isMcpToolConfigSaveLoading, setIsMcpToolConfigSaveLoading] = useState<boolean>(false);

  const [mcpToolList, setMcpToolList] = useState<McpToolInfo[]>([]);
  const [isMcpToolListLoading, setIsMcpToolListLoading] = useState<boolean>(false);

  const [isRunLoading, setIsRunLoading] = useState<boolean>(false);

  const getMcpToolConfigList = async (
    serverQualifiedName: McpServerItem['qualifiedName'],
  ): Promise<McpToolConfigItem[]> => {
    if (!serverQualifiedName) return [];
    setIsMcpToolConfigListLoading(true);
    try {
      const res = await mcpTool.getMcpToolConfigListByServerQualifiedName(serverQualifiedName);
      setMcpToolConfigList(res?.data || []);
      return res?.data || [];
    } catch (err) {
      messageApi.error(`获取MCP工具列表失败：${err}`);
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
        messageApi.success('创建MCP工具成功');
      }
    } catch (err) {
      messageApi.error(`创建MCP工具失败：${err}`);
    } finally {
      setIsMcpToolConfigSaveLoading(false);
    }
  };

  const updateMcpToolConfig = async (id: McpServerItem['id'], params: McpToolConfigItemEditParams) => {
    setIsMcpToolConfigSaveLoading(true);
    try {
      const res = await mcpTool.updateMcpToolConfig(id, params);
      if (res?.data) {
        messageApi.success('更新MCP工具成功');
      }
    } catch (err) {
      messageApi.error(`更新MCP工具失败：${err}`);
    } finally {
      setIsMcpToolConfigSaveLoading(false);
    }
  };

  const deleteMcpToolConfig = async (id: McpServerItem['id']) => {
    try {
      const res = await mcpTool.deleteMcpToolConfig(id);
      if (res?.data) {
        messageApi.success('删除MCP工具成功');
      }
    } catch (err) {
      messageApi.error(`删除MCP工具失败：${err}`);
    }
  };

  const getMcpToolList = async (endpointUrl?: string) => {
    if (!endpointUrl) return;
    setIsMcpToolListLoading(true);
    try {
      const res = await mcpTool.getMcpToolListByUrl(endpointUrl);
      setMcpToolList(res?.data || []);
    } catch (err) {
      console.error('获取可执行工具列表失败：', err);
    } finally {
      setIsMcpToolListLoading(false);
    }
  };

  const callMcpTool = async (params: McpToolCallParams) => {
    setIsRunLoading(true);
    try {
      const res = await mcpTool.callMcpTool(params);
      if (res?.data) {
        messageApi.success('执行MCP工具成功');
      }
      return res;
    } catch (err) {
      messageApi.error(`执行MCP工具失败：${err}`);
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
