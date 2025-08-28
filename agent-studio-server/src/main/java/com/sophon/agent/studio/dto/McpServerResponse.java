package com.sophon.agent.studio.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.Date;

@Data
@Schema(description = "MCP服务器响应")
public class McpServerResponse {

    @Schema(description = "主键ID", example = "1")
    private Long id;

    @Schema(description = "MCP服务器类型", example = "sse")
    private String type;

    @Schema(description = "服务唯一标识名", example = "brave-search")
    private String qualifiedName;

    @Schema(description = "展示名称", example = "Brave Search")
    private String displayName;

    @Schema(description = "服务描述", example = "Brave Search是一个隐私保护的搜索引擎")
    private String description;

    @Schema(description = "所属分类", example = "search")
    private String category;

    @Schema(description = "MCP服务端点地址", example = "http://localhost:8080/brave-search/sse")
    private String endpointUrl;

    @Schema(description = "服务图标地址", example = "https://example.com/icons/brave.png")
    private String iconUrl;

    @Schema(description = "创建用户", example = "admin")
    private String createUser;

    @Schema(description = "创建时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createTime;

    @Schema(description = "更新时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date modifyTime;

    @Schema(description = "stdio模式下的安装命令", example = "npm install -g @modelcontextprotocol/server-brave-search")
    private String command;

    @Schema(description = "实现类型", example = "INNER")
    private String implementType;

    @Schema(description = "状态: 0正常, -1删除", example = "0")
    private Integer status;

    @Schema(description = "更新用户", example = "admin")
    private String modifyUser;

    @Schema(description = "mcp server上下文配置", example = "{}")
    private String contextConfig;
}