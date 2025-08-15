package com.sophon.agent.studio.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.Date;


@Data
@Schema(description = "模型配置响应")
public class ModelConfigResponse {
    
    @Schema(description = "主键ID", example = "1")
    private Long id;
    
    @Schema(description = "创建时间", example = "2024-01-01 12:00:00")
    private Date createTime;
    
    @Schema(description = "修改时间", example = "2024-01-01 12:00:00")
    private Date modifyTime;
    
    @Schema(description = "用户自定义名称", example = "GPT-4模型")
    private String name;
    
    @Schema(description = "模型描述", example = "OpenAI GPT-4 模型配置")
    private String description;
    
    @Schema(description = "接入模型的基础地址", example = "https://api.openai.com/v1")
    private String modelUrl;
    
    @Schema(description = "接入模型的API密钥", example = "sk-***")
    private String modelKey;
    
    @Schema(description = "对应接入方模型名称", example = "gpt-4")
    private String modelName;
    
    @Schema(description = "模型配置其他扩展信息")
    private String config;
    
    @Schema(description = "修改人", example = "admin")
    private String modifyUser;
    
    @Schema(description = "创建人", example = "admin")
    private String createUser;
    
    @Schema(description = "模态支持", example = "text,image")
    private String modalities;
    
    @Schema(description = "模型最大输出token长度", example = "4096")
    private Integer maxCompletionTokenLimit;
    
    @Schema(description = "模型应用标签", example = "[\"chat\", \"completion\"]")
    private String modelAppTag;
    
    @Schema(description = "默认参数", example = "{\"temperature\": 0.7}")
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