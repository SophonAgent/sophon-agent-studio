package com.sophon.agent.studio.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.Map;

@Data
@Schema(description = "MCP工具调用请求")
public class McpToolCallRequest {
    
    @Schema(description = "MCP服务器端点URL", example = "http://localhost:3000/sse", required = true)
    private String endpointUrl;
    
    @Schema(description = "工具名称", example = "get_weather", required = true)
    private String toolName;
    
    @Schema(description = "工具参数", example = "{\"location\": \"Beijing\", \"unit\": \"celsius\"}")
    private Map<String, Object> args;
}