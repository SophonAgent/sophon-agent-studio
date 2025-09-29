package com.sophon.agent.registry.dto;

import com.sophon.agent.model.SophonMcpServerToolDetail;
import com.sophon.agent.registry.constant.McpToolProxyTypeEnum;
import lombok.Data;

/**
 * mcp工具配置详情
 * @author: chun
 * @date: 2025/8/27
 * @Description:
 * @version: V1.0
 */
@Data
public class McpToolConfigDetailDTO {

    private String qualifiedName;

    private String displayName;

    private String serverQualifiedName;

    private String description;

    private String inputSchema;

    private McpToolProxyTypeEnum proxyType;

    private String requestMethod;

    private String requestUrl;

    private String requestHeaders;

    private String requestJson;

    private String responseJson;

    public McpToolConfigDetailDTO() {
    }

    public McpToolConfigDetailDTO(SophonMcpServerToolDetail sophonMcpServerToolDetail) {
        this.qualifiedName = sophonMcpServerToolDetail.getQualifiedName();
        this.displayName = sophonMcpServerToolDetail.getDisplayName();
        this.serverQualifiedName = sophonMcpServerToolDetail.getServerQualifiedName();
        this.description = sophonMcpServerToolDetail.getDescription();
        this.inputSchema = sophonMcpServerToolDetail.getInputSchema();
        this.proxyType = McpToolProxyTypeEnum.valueOf(sophonMcpServerToolDetail.getProxyType());
        this.requestMethod = sophonMcpServerToolDetail.getRequestMethod();
        this.requestUrl = sophonMcpServerToolDetail.getRequestUrl();
        this.requestHeaders = sophonMcpServerToolDetail.getRequestHeaders();
        this.requestJson = sophonMcpServerToolDetail.getRequestJson();
        this.responseJson = sophonMcpServerToolDetail.getResponseJson();
    }
}
