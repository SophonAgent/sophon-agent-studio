package com.sophon.agent.studio.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@Schema(description = "OpenAI兼容的聊天完成请求")
public class ChatCompletionRequest {
    
    @Schema(description = "指定的模型配置ID", example = "1", required = true)
    @JsonProperty("model_config_id")
    private Long modelConfigId;
    
    @Schema(description = "模型名称，如果model_config_id未提供时使用", example = "gpt-4")
    private String model;
    
    @Schema(description = "消息列表", required = true)
    private List<Message> messages;
    
    @Schema(description = "温度参数，控制随机性", example = "0.7")
    private Double temperature;
    
    @Schema(description = "top_p参数，控制多样性", example = "0.9")
    @JsonProperty("top_p")
    private Double topP;


    @Schema(description = "top_k，选择预测值最大的k个token进行采样，取值范围0-1000，0表示不生效", example = "0")
    @JsonProperty("top_k")
    private Double topK;
    
    @Schema(description = "最大token数量", example = "2048")
    @JsonProperty("max_completions_tokens")
    private Integer maxCompletionsTokens;
    
    @Schema(description = "是否流式响应", example = "false")
    private Boolean stream = false;
    
    @Schema(description = "停止词列表")
    private List<String> stop;
    
    @Schema(description = "存在惩罚", example = "0.0")
    @JsonProperty("presence_penalty")
    private Double presencePenalty;
    
    @Schema(description = "频率惩罚", example = "0.0")
    @JsonProperty("frequency_penalty")
    private Double frequencyPenalty;
    
    @Schema(description = "用户标识")
    private String user;
    
    @Schema(description = "工具列表")
    private List<Tool> tools;
    
    @Schema(description = "工具选择策略")
    @JsonProperty("tool_choice")
    private Object toolChoice;
    
    @Schema(description = "响应格式")
    @JsonProperty("response_format")
    private ResponseFormat responseFormat;
    
    @Schema(description = "种子值，用于可重现输出")
    private Integer seed;
    
    @Data
    @Schema(description = "消息对象")
    public static class Message {
        @Schema(description = "角色：system, user, assistant, tool", example = "user")
        private String role;
        
        @Schema(description = "消息内容", example = "你好")
        private String content;
        
        @Schema(description = "工具调用列表")
        @JsonProperty("tool_calls")
        private List<ToolCall> toolCalls;
        
        @Schema(description = "工具调用ID")
        @JsonProperty("tool_call_id")
        private String toolCallId;
        
        @Schema(description = "消息名称")
        private String name;
    }
    
    @Data
    @Schema(description = "工具调用对象")
    public static class ToolCall {
        @Schema(description = "工具调用ID")
        private String id;
        
        @Schema(description = "工具类型", example = "function")
        private String type;
        
        @Schema(description = "函数调用")
        private FunctionCall function;
    }
    
    @Data
    @Schema(description = "函数调用对象")
    public static class FunctionCall {
        @Schema(description = "函数名称")
        private String name;
        
        @Schema(description = "函数参数")
        private Map<String, Object> arguments;
    }
    
    @Data
    @Schema(description = "工具对象")
    public static class Tool {
        @Schema(description = "工具类型", example = "function")
        private String type;
        
        @Schema(description = "函数定义")
        private Function function;
    }
    
    @Data
    @Schema(description = "函数定义")
    public static class Function {
        @Schema(description = "函数名称")
        private String name;
        
        @Schema(description = "函数描述")
        private String description;
        
        @Schema(description = "函数参数")
        private Map<String, Object> parameters;
    }
    
    @Data
    @Schema(description = "响应格式")
    public static class ResponseFormat {
        @Schema(description = "响应类型", example = "text")
        private String type;
        
        @Schema(description = "JSON模式")
        @JsonProperty("json_schema")
        private Map<String, Object> jsonSchema;
    }
}