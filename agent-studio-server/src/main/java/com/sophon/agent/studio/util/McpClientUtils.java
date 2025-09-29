package com.sophon.agent.studio.util;

import com.sophon.agent.registry.util.McpServerUtils;
import io.modelcontextprotocol.client.transport.HttpClientSseClientTransport;
import org.apache.commons.lang3.StringUtils;

import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.time.Duration;

/**
 * @author: xingjun.hz@bytedance.com
 * @date: 2025-04-14 14:00
 * @Description:
 * @version: V1.0
 */
public class McpClientUtils {
    public static HttpClientSseClientTransport getHttpMcpClient(String baseUrl, String sseEndpoint) {
        HttpClient.Builder httpClientBuilder = HttpClient.newBuilder().version(HttpClient.Version.HTTP_1_1).connectTimeout(Duration.ofSeconds(300L));
        HttpRequest.Builder requestBuilder = HttpRequest.newBuilder()
                .header("Content-Type", "application/json");
//        String logId = McpServerUtils.g();
//        if(StringUtils.isNotBlank(logId)) {
//            requestBuilder.header("X-TT-LOGID", logId);
//        }
        HttpClientSseClientTransport transport = HttpClientSseClientTransport.builder(baseUrl)
                .clientBuilder(httpClientBuilder)
                .requestBuilder(requestBuilder)
                .sseEndpoint(sseEndpoint)
                .build();
        return transport;
    }
}
