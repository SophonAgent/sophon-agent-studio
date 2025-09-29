package com.sophon.agent.registry.proxy;

import com.sophon.agent.registry.dto.McpToolConfigDetailDTO;
import com.sophon.agent.registry.exception.McpRegistryException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

/**
 * 代理mcp工具执行工厂
 * @author: chun
 * @date: 2025/8/27
 * @Description:
 * @version: V1.0
 */
@Component
public class ProxyMcpToolExecuteFactory {
    private static final Logger LOGGER = LoggerFactory.getLogger(ProxyMcpToolExecuteFactory.class);

    public DynamicProxyMcpToolExecute createProxyMcpToolExecute(McpToolConfigDetailDTO mcpToolConfigDetail) {
        switch (mcpToolConfigDetail.getProxyType()){
            case HTTP:
                return new HttpProxyMcpToolExecute(mcpToolConfigDetail);
            case RPC:
                LOGGER.error("暂不支持RPC代理");
                throw new McpRegistryException("暂不支持RPC代理");
            default:
                return null;
        }
    }
}
