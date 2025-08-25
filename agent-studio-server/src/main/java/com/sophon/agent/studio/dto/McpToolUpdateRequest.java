package com.sophon.agent.studio.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Size;
import lombok.Data;

import java.util.Map;

@Data
@Schema(description = "MCP工具更新请求")
public class McpToolUpdateRequest {

    @Schema(description = "工具唯一标识名", example = "brave-web-search")
    @Size(max = 256, message = "工具标识名长度不能超过256字符")
    private String qualifiedName;

    @Schema(description = "展示名称", example = "Brave Web Search")
    @Size(max = 255, message = "展示名称长度不能超过255字符")
    private String displayName;

    @Schema(description = "所属服务器标识名", example = "brave-search")
    @Size(max = 256, message = "服务器标识名长度不能超过256字符")
    private String serverQualifiedName;

    @Schema(description = "工具功能描述", example = "使用Brave搜索引擎进行网页搜索")
    private String description;

    @Schema(description = "输入参数结构(JSON Schema)")
    private String inputSchema;

    @Schema(description = "注册代理类型", example = "http")
    @Size(max = 256, message = "代理类型长度不能超过256字符")
    private String proxyType;

    @Schema(description = "请求方法", example = "GET")
    @Size(max = 256, message = "请求方法长度不能超过256字符")
    private String requestMethod;

    @Schema(description = "请求地址", example = "https://api.search.brave.com/search")
    @Size(max = 2048, message = "请求地址长度不能超过2048字符")
    private String requestUrl;

    @Schema(description = "请求头信息列表(JSON)")
    private Map<String, String> requestHeaders;

    @Schema(description = "输入JSON转换配置(JSONata)")
    private String requestJson;

    @Schema(description = "响应JSON转换配置(JSONata)")
    private String responseJson;

    @Schema(description = "更新用户", example = "admin")
    @Size(max = 255, message = "更新用户长度不能超过255字符")
    private String modifyUser;
}