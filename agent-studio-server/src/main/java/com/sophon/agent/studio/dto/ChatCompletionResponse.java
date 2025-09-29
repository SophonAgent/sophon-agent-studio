package com.sophon.agent.studio.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@Schema(description = "OpenAI兼容的聊天完成响应")
public class ChatCompletionResponse {
    
    @Schema(description = "响应ID")
    private String id;
    
    @Schema(description = "对象类型", example = "chat.completion")
    private String object;
    
    @Schema(description = "创建时间戳")
    @JsonProperty("created")
    private Long createdAt;
    
    @Schema(description = "模型名称")
    private String model;
    
    @Schema(description = "选择列表")
    private List<Choice> choices;
    
    @Schema(description = "使用情况统计")
    private Usage usage;
    
    @Schema(description = "系统指纹")
    @JsonProperty("system_fingerprint")
    private String systemFingerprint;
    
    @Data
    @Schema(description = "选择对象")
    public static class Choice {
        @Schema(description = "选择索引")
        private Integer index;
        
        @Schema(description = "消息对象")
        private Message message;
        
        @Schema(description = "完成原因")
        @JsonProperty("finish_reason")
        private String finishReason;
        
        @Schema(description = "日志概率信息")
        @JsonProperty("logprobs")
        private LogProbs logProbs;
    }
    
    @Data
    @Schema(description = "消息对象")
    public static class Message {
        @Schema(description = "角色")
        private String role;
        
        @Schema(description = "内容")
        private String content;
        
        @Schema(description = "工具调用列表")
        @JsonProperty("tool_calls")
        private List<ToolCall> toolCalls;
    }
    
    @Data
    @Schema(description = "工具调用对象")
    public static class ToolCall {
        @Schema(description = "工具调用ID")
        private String id;
        
        @Schema(description = "工具类型")
        private String type;
        
        @Schema(description = "函数调用")
        @JsonProperty("function")
        private FunctionCall function;
    }
    
    @Data
    @Schema(description = "函数调用对象")
    public static class FunctionCall {
        @Schema(description = "函数名称")
        private String name;
        
        @Schema(description = "函数参数")
        private String arguments;
    }
    
    @Data
    @Schema(description = "日志概率信息")
    public static class LogProbs {
        @Schema(description = "内容token的概率列表")
        private List<TokenProb> content;
    }
    
    @Data
    @Schema(description = "Token概率对象")
    public static class TokenProb {
        @Schema(description = "token")
        private String token;
        
        @Schema(description = "对数概率")
        @JsonProperty("logprob")
        private Double logProb;
        
        @Schema(description = "字节列表")
        private List<Integer> bytes;
        
        @Schema(description = "top_logprobs")
        private Map<String, Double> topLogProbs;
    }
    
    @Data
    @Schema(description = "使用情况统计")
    public static class Usage {
        @Schema(description = "提示token数量")
        @JsonProperty("prompt_tokens")
        private Integer promptTokens;
        
        @Schema(description = "完成token数量")
        @JsonProperty("completion_tokens")
        private Integer completionTokens;
        
        @Schema(description = "总token数量")
        @JsonProperty("total_tokens")
        private Integer totalTokens;
        
        @Schema(description = "提示token详细信息")
        @JsonProperty("prompt_tokens_details")
        private TokenDetails promptTokensDetails;
        
        @Schema(description = "完成token详细信息")
        @JsonProperty("completion_tokens_details")
        private TokenDetails completionTokensDetails;
    }
    
    @Data
    @Schema(description = "Token详细信息")
    public static class TokenDetails {
        @Schema(description = "音频token数量")
        @JsonProperty("audio_tokens")
        private Integer audioTokens;
        
        @Schema(description = "缓存token数量")
        @JsonProperty("cached_tokens")
        private Integer cachedTokens;
        
        @Schema(description = "推理token数量（思维链）")
        @JsonProperty("reasoning_tokens")
        private Integer reasoningTokens;
    }
}