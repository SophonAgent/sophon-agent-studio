package com.sophon.agent.studio.service.mcp;

import com.alibaba.fastjson.JSON;
import com.sophon.agent.studio.exception.BusinessException;
import com.sophon.agent.studio.util.McpClientUtils;
import io.modelcontextprotocol.client.McpClient;
import io.modelcontextprotocol.client.McpSyncClient;
import io.modelcontextprotocol.client.transport.HttpClientSseClientTransport;
import io.modelcontextprotocol.spec.McpSchema;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.net.MalformedURLException;
import java.net.URL;
import java.time.Duration;
import java.util.List;
import java.util.Map;

/**
 * @author: xingjun.hz@bytedance.com
 * @date: 2025-03-28 18:00
 * @Description:
 * @version: V1.0
 */
@Service
@Slf4j
public class DefaultMcpClientWrapper implements McpClientWrapper{

    @Override
    public List<McpSchema.Tool> toolList(String endpointUrl) {
        try {
            HttpClientSseClientTransport transport = McpClientUtils.getHttpMcpClient(getSseHost(endpointUrl), getSsePath(endpointUrl));
            McpSyncClient client = McpClient.sync(transport).requestTimeout(Duration.ofMinutes(1)).build();
            client.initialize();
            McpSchema.ListToolsResult toolsList = client.listTools();
            log.info("tool list = " + toolsList);
            client.closeGracefully();
            return toolsList.tools();
        } catch (Exception e) {
            log.error("tool list error", e);
            throw new BusinessException(e.getMessage());
        }
    }

    @Override
    public McpSchema.CallToolResult toolCall(String endpointUrl, String toolName, Map<String, Object> args) {
        HttpClientSseClientTransport transport = McpClientUtils.getHttpMcpClient(getSseHost(endpointUrl), getSsePath(endpointUrl));
        McpSyncClient client = McpClient.sync(transport).requestTimeout(Duration.ofMinutes(10)).build();

        client.initialize();
        McpSchema.ListToolsResult toolsList = client.listTools();
        log.info("step1 tool list = " + toolsList);

        McpSchema.CallToolResult result = client.callTool(new McpSchema.CallToolRequest(toolName, args));
        log.info("step2 tool call result Content = " + JSON.toJSONString(result));
        client.closeGracefully();
        return result;
    }

    private String getSseHost(String endpointUrl) {
        try {
            URL url = new URL(endpointUrl);
            return url.getProtocol() + "://" + url.getHost() + (url.getPort() != -1 ? ":" + url.getPort() : "");
        } catch (MalformedURLException e) {
            log.error("endpointUrl:{},非法" , endpointUrl);
            throw new BusinessException("endpointUrl非法: " + endpointUrl);
        }
    }

    private String getSsePath(String endpointUrl) {
        try {
            URL url = new URL(endpointUrl);
            return url.getPath();
        } catch (MalformedURLException e) {
            log.error("endpointUrl:{},非法" , endpointUrl);
            throw new BusinessException("endpointUrl非法: " + endpointUrl);
        }
    }
}
