package com.sophon.agent.studio.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

@Data
@Schema(description = "模型配置创建请求")
public class ModelConfigCreateRequest {
    
    @NotBlank(message = "模型名称不能为空")
    @Size(max = 128, message = "模型名称长度不能超过128字符")
    @Schema(description = "用户自定义名称", example = "GPT-4模型")
    private String name;
    
    @Size(max = 512, message = "模型描述长度不能超过512字符")
    @Schema(description = "模型描述", example = "OpenAI GPT-4 模型配置")
    private String description;
    
    @NotBlank(message = "模型URL不能为空")
    @Size(max = 1000, message = "模型URL长度不能超过1000字符")
    @Schema(description = "接入模型的基础地址", example = "https://api.openai.com/v1")
    private String modelUrl;
    
    @NotBlank(message = "模型密钥不能为空")
    @Size(max = 1000, message = "模型密钥长度不能超过1000字符")
    @Schema(description = "接入模型的API密钥", example = "sk-xxx")
    private String modelKey;
    
    @NotBlank(message = "模型名称不能为空")
    @Size(max = 1000, message = "模型名称长度不能超过1000字符")
    @Schema(description = "对应接入方模型名称", example = "gpt-4")
    private String modelName;
    
    @Schema(description = "模型配置其他扩展信息", example = "{\"provider\": \"openai\", \"type\": \"chat\"}")
    private String config;
    
    @Size(max = 1024, message = "模态支持长度不能超过1024字符")
    @Schema(description = "模态支持", example = "[\"text\",\"image\"]")
    private String modalities;
    
    @Schema(description = "模型最大输出token长度", example = "4096")
    private Integer maxCompletionTokenLimit;
    
    @Size(max = 256, message = "模型应用标签长度不能超过256字符")
    @Schema(description = "模型应用标签", example = "[\"chat\", \"completion\"]")
    private String modelAppTag;
    
    @Size(max = 512, message = "默认参数长度不能超过512字符")
    @Schema(description = "默认参数", example = "{\"temperature\": 0.7, \"max_tokens\": 1000}")
    private String defaultParams;
    
    @Schema(description = "是否支持stream", example = "1")
    private Integer supportStream;
    
    @Schema(description = "是否支持system指令", example = "1")
    private Integer supportSystem;
    
    @Schema(description = "是否兼容思维链标准协议", example = "0")
    private Integer supportReasoning;
    
    @Schema(description = "超时时间(秒)", example = "30")
    private Integer timeoutSeconds;
}