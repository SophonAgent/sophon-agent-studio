package com.sophon.agent.studio.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.Date;
import java.util.Map;

@Data
@Schema(description = "MCP工具响应")
public class McpToolResponse {

    @Schema(description = "主键ID", example = "1")
    private Long id;

    @Schema(description = "工具唯一标识名", example = "brave-web-search")
    private String qualifiedName;

    @Schema(description = "展示名称", example = "Brave Web Search")
    private String displayName;

    @Schema(description = "所属服务器标识名", example = "brave-search")
    private String serverQualifiedName;

    @Schema(description = "工具功能描述", example = "使用Brave搜索引擎进行网页搜索")
    private String description;

    @Schema(description = "输入参数结构(JSON Schema)")
    private String inputSchema;

    @Schema(description = "注册代理类型", example = "http")
    private String proxyType;

    @Schema(description = "请求方法", example = "GET")
    private String requestMethod;

    @Schema(description = "请求地址", example = "https://api.search.brave.com/search")
    private String requestUrl;

    @Schema(description = "请求头信息列表(JSON)")
    private Map<String, String> requestHeaders;

    @Schema(description = "输入JSON转换配置(JSONata)")
    private String requestJson;

    @Schema(description = "响应JSON转换配置(JSONata)")
    private String responseJson;

    @Schema(description = "状态: 0正常, -1删除", example = "0")
    private Integer status;

    @Schema(description = "创建时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createTime;

    @Schema(description = "更新时间")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date modifyTime;

    @Schema(description = "创建用户", example = "admin")
    private String createUser;

    @Schema(description = "更新用户", example = "admin")
    private String modifyUser;
}