package com.sophon.agent.studio.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "MCP工具信息")
public class McpToolInfo {
    
    @Schema(description = "工具名称", example = "get_weather")
    private String name;
    
    @Schema(description = "工具描述", example = "获取指定位置的天气信息")
    private String description;
    
    @Schema(description = "输入模式(JSON格式)", example = "{\"type\": \"object\", \"properties\": {\"location\": {\"type\": \"string\"}, \"unit\": {\"type\": \"string\", \"enum\": [\"celsius\", \"fahrenheit\"]}}}")
    private String inputSchema;
}