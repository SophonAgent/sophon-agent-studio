package com.sophon.agent.studio.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
@Schema(description = "MCP服务器创建请求")
public class McpServerCreateRequest {

    @Schema(description = "MCP服务器类型", example = "sse", defaultValue = "sse")
    @NotBlank(message = "服务器类型不能为空")
    private String type = "sse";

    @Schema(description = "服务唯一标识名", example = "brave-search", required = true)
    @NotBlank(message = "服务标识名不能为空")
    @Size(max = 255, message = "服务标识名长度不能超过255字符")
    private String qualifiedName;

    @Schema(description = "展示名称", example = "Brave Search", required = true)
    @NotBlank(message = "展示名称不能为空")
    @Size(max = 255, message = "展示名称长度不能超过255字符")
    private String displayName;

    @Schema(description = "服务描述", example = "Brave Search是一个隐私保护的搜索引擎")
    @Size(max = 1024, message = "服务描述长度不能超过1024字符")
    private String description;

    @Schema(description = "所属分类", example = "search")
    @Size(max = 256, message = "分类长度不能超过256字符")
    private String category = "";

    @Schema(description = "MCP服务端点地址", example = "http://localhost:8080/brave-search/sse")
    private String endpointUrl;

    @Schema(description = "服务图标地址", example = "https://example.com/icons/brave.png")
    @Size(max = 255, message = "图标地址长度不能超过255字符")
    private String iconUrl = "";

    @Schema(description = "stdio模式下的安装命令", example = "npm install -g @modelcontextprotocol/server-brave-search")
    @Size(max = 255, message = "安装命令长度不能超过255字符")
    private String command = "";

    @Schema(description = "实现类型", example = "INNER", defaultValue = "INNER")
    @Size(max = 256, message = "实现类型长度不能超过256字符")
    private String implementType = "INNER";

    @Schema(description = "mcp server上下文配置", example = "{}")
    private String contextConfig = "";

}