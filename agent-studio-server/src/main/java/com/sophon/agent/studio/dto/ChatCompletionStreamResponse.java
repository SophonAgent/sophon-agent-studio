package com.sophon.agent.studio.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

@Data
@Schema(description = "OpenAI兼容的聊天完成流式响应")
public class ChatCompletionStreamResponse {
    
    @Schema(description = "响应ID")
    private String id;
    
    @Schema(description = "对象类型", example = "chat.completion.chunk")
    private String object;
    
    @Schema(description = "创建时间戳")
    @JsonProperty("created")
    private Long createdAt;
    
    @Schema(description = "模型名称")
    private String model;
    
    @Schema(description = "选择列表")
    private List<Choice> choices;
    
    @Schema(description = "系统指纹")
    @JsonProperty("system_fingerprint")
    private String systemFingerprint;
    
    @Data
    @Schema(description = "流式选择对象")
    public static class Choice {
        @Schema(description = "选择索引")
        private Integer index;
        
        @Schema(description = "增量消息对象")
        private Delta delta;
        
        @Schema(description = "完成原因")
        @JsonProperty("finish_reason")
        private String finishReason;
        
        @Schema(description = "日志概率信息")
        @JsonProperty("logprobs")
        private ChatCompletionResponse.LogProbs logProbs;
    }
    
    @Data
    @Schema(description = "增量消息对象")
    public static class Delta {
        @Schema(description = "角色")
        private String role;
        
        @Schema(description = "增量内容")
        private String content;
        
        @Schema(description = "工具调用列表")
        @JsonProperty("tool_calls")
        private List<ChatCompletionResponse.ToolCall> toolCalls;
    }
}