package com.sophon.agent.studio.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

import java.util.Map;

@Schema(description = "MCP工具创建请求")
public class McpToolCreateRequest {

    @Schema(description = "工具唯一标识名", example = "brave-web-search", required = true)
    @NotBlank(message = "工具标识名不能为空")
    @Size(max = 256, message = "工具标识名长度不能超过256字符")
    private String qualifiedName;

    @Schema(description = "展示名称", example = "Brave Web Search", required = true)
    @NotBlank(message = "展示名称不能为空")
    @Size(max = 255, message = "展示名称长度不能超过255字符")
    private String displayName;

    @Schema(description = "所属服务器标识名", example = "brave-search", required = true)
    @NotBlank(message = "服务器标识名不能为空")
    @Size(max = 256, message = "服务器标识名长度不能超过256字符")
    private String serverQualifiedName;

    @Schema(description = "工具功能描述", example = "使用Brave搜索引擎进行网页搜索")
    private String description;

    @Schema(description = "输入参数结构(JSON Schema)", example = "{\"type\":\"object\",\"properties\":{\"query\":{\"type\":\"string\"}}}")
    private String inputSchema;

    @Schema(description = "注册代理类型", example = "http")
    @Size(max = 256, message = "代理类型长度不能超过256字符")
    private String proxyType = "";

    @Schema(description = "请求方法", example = "GET")
    @Size(max = 256, message = "请求方法长度不能超过256字符")
    private String requestMethod = "";

    @Schema(description = "请求地址", example = "https://api.search.brave.com/search")
    @Size(max = 2048, message = "请求地址长度不能超过2048字符")
    private String requestUrl = "";

    @Schema(description = "请求头信息列表", example = "{\"key1\":\"11\"}")
    private Map<String, String> requestHeaders;

    @Schema(description = "输入JSON转换配置(JSONata)", example = "{}")
    private String requestJson;

    @Schema(description = "响应JSON转换配置(JSONata)", example = "{}")
    private String responseJson;

    @Schema(description = "创建用户", example = "admin")
    @Size(max = 255, message = "创建用户长度不能超过255字符")
    private String createUser = "system";

    // Getters and Setters
    public String getQualifiedName() {
        return qualifiedName;
    }

    public void setQualifiedName(String qualifiedName) {
        this.qualifiedName = qualifiedName;
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }

    public String getServerQualifiedName() {
        return serverQualifiedName;
    }

    public void setServerQualifiedName(String serverQualifiedName) {
        this.serverQualifiedName = serverQualifiedName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getInputSchema() {
        return inputSchema;
    }

    public void setInputSchema(String inputSchema) {
        this.inputSchema = inputSchema;
    }

    public String getProxyType() {
        return proxyType;
    }

    public void setProxyType(String proxyType) {
        this.proxyType = proxyType;
    }

    public String getRequestMethod() {
        return requestMethod;
    }

    public void setRequestMethod(String requestMethod) {
        this.requestMethod = requestMethod;
    }

    public String getRequestUrl() {
        return requestUrl;
    }

    public void setRequestUrl(String requestUrl) {
        this.requestUrl = requestUrl;
    }

    public Map<String, String> getRequestHeaders() {
        return requestHeaders;
    }

    public void setRequestHeaders(Map<String, String> requestHeaders) {
        this.requestHeaders = requestHeaders;
    }

    public String getRequestJson() {
        return requestJson;
    }

    public void setRequestJson(String requestJson) {
        this.requestJson = requestJson;
    }

    public String getResponseJson() {
        return responseJson;
    }

    public void setResponseJson(String responseJson) {
        this.responseJson = responseJson;
    }

    public String getCreateUser() {
        return createUser;
    }

    public void setCreateUser(String createUser) {
        this.createUser = createUser;
    }
}