package com.sophon.agent.studio.service.mcp;

import io.modelcontextprotocol.spec.McpSchema;

import java.util.List;
import java.util.Map;

/**
 * @author wudunhua
 * @createDate 2025/5/27 16:47
 */
public interface McpClientWrapper {

    List<McpSchema.Tool> toolList(String endpointUrl);

    McpSchema.CallToolResult toolCall(String endpointUrl, String toolName, Map<String, Object> args);
}
