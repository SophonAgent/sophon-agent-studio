package com.sophon.agent.registry.exception;

/**
 * mcp 注册异常
 * @author: chun
 * @date: 2025/8/26
 * @Description:
 * @version: V1.0
 */
public class McpRegistryException extends RuntimeException {

    public McpRegistryException(String message) {
        super(message);
    }

    public McpRegistryException(String message, Throwable cause) {
        super(message, cause);
    }
}