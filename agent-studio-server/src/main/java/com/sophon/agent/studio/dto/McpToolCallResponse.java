package com.sophon.agent.studio.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

@Data
@Schema(description = "MCP工具调用响应")
public class McpToolCallResponse {
    
    @Schema(description = "工具调用结果内容列表")
    private List<McpToolCallContent> content;
    
    @Schema(description = "是否调用成功", example = "true")
    private Boolean isError;
    
    @Data
    @Schema(description = "工具调用内容")
    public static class McpToolCallContent {
        
        @Schema(description = "内容类型", example = "text")
        private String type;
        
        @Schema(description = "内容文本", example = "查询结果：北京今天晴天，温度25°C")
        private String text;
        
        @Schema(description = "内容资源URI", example = "")
        private String resource;
    }
}