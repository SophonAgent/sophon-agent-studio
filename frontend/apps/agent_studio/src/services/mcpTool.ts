import request, { MCP_TOOL_BASE_URL } from './request';
import {
  McpToolCallParams,
  McpToolCallResult,
  McpToolConfigItem,
  McpToolConfigItemEditParams,
  McpToolInfo,
} from '@/interface/mcpTool';

export default {
  /**
   * 根据 MCP 唯一标识获取 指定 MCP 服务器下的 Tool 列表
   */
  async getMcpToolConfigListByServerQualifiedName(serverQualifiedName: string) {
    return await request.get<McpToolConfigItem[]>(`/mcp-tools/getMcpServerToolDetail/${serverQualifiedName}`);
  },
  /**
   * 根据 ID 获取 MCP Tool
   */
  async getMcpToolConfigById(id: McpToolConfigItem['id']) {
    return await request.get<McpToolConfigItem>(`/mcp-tools/${id}`);
  },
  /**
   * 创建 MCP Tool
   */
  async createMcpToolConfig(params: McpToolConfigItemEditParams) {
    return await request.post<McpToolConfigItem>('/mcp-tools/createToolDetail', params);
  },
  /**
   * 更新 MCP Tool
   */
  async updateMcpToolConfig(id: McpToolConfigItem['id'], params: McpToolConfigItemEditParams) {
    return await request.put<McpToolConfigItem>(`/mcp-tools/updateToolDetail/${id}`, params);
  },
  /**
   * 删除 MCP Tool
   */
  async deleteMcpToolConfig(id: McpToolConfigItem['id']) {
    return await request.delete<boolean>(`/mcp-tools/${id}`);
  },

  /**
   * 根据 MCP 服务器端点 URL 获取所有可用 Tool 列表
   */
  async getMcpToolListByUrl(endpointUrl: string) {
    return await request.post<McpToolInfo[]>(
      `/toolList?endpointUrl=${encodeURIComponent(endpointUrl)}`,
      undefined,
      {
        baseURL: MCP_TOOL_BASE_URL,
      },
    );
  },
  /**
   * 调用 MCP Tool 并返回执行结果
   */
  async callMcpTool(params: McpToolCallParams, abortController?: AbortController) {
    return await request.post<McpToolCallResult>('/toolCall', params, {
      baseURL: MCP_TOOL_BASE_URL,
      signal: abortController?.signal,
    });
  },
};
