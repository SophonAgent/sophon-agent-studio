import { McpServerItem, McpServerItemCreateParams, McpServerItemUpdateParams } from '@/interface/mcpServer';
import request from './request';

export default {
  /**
   * 获取所有 MCP 服务器列表
   */
  async getMcpServerList() {
    return await request.get<McpServerItem[]>('/mcp-servers');
  },
  /**
   * 根据关键词和分类搜索 MCP 服务器
   */
  async getMcpServerListBySearch(keyword = '', category = '') {
    return await request.get<McpServerItem[]>(`/mcp-servers/search?keyword=${keyword}&category=${category}`);
  },
  /**
   * 根据 ID 获取 MCP 服务器详细信息
   */
  async getMcpServerById(id: McpServerItem['id']) {
    return await request.get<McpServerItem>(`/mcp-servers/${id}`);
  },
  /**
   * 创建 MCP 服务器
   */
  async createMcpServer(params: McpServerItemCreateParams) {
    return await request.post<McpServerItem>('/mcp-servers/createMcpServer', params);
  },
  /**
   * 更新 MCP 服务器
   */
  async updateMcpServer(params: McpServerItemUpdateParams) {
    return await request.put<McpServerItem>(`/mcp-servers/updateMcpServer/${params.id}`, params);
  },
  /**
   * 删除 MCP 服务器
   */
  async deleteMcpServer(id: McpServerItem['id']) {
    return await request.delete<boolean>(`/mcp-servers/deleteMcpServer/${id}`);
  },
};
