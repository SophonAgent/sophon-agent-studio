package com.sophon.agent.registry.proxy;

import com.alibaba.fastjson.JSON;
import com.api.jsonata4java.expressions.ParseException;
import com.sophon.agent.registry.dto.McpToolConfigDetailDTO;
import com.sophon.agent.registry.util.PlaceHolderDealUtil;
import com.sophon.agent.registry.util.McpServerUtils;
import io.modelcontextprotocol.server.McpSyncServerExchange;
import io.modelcontextprotocol.spec.McpSchema;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.function.BiFunction;

/**
 * 代理mcp工具执行类
 * @author: chun
 * @date: 2025/8/27
 * @Description:
 * @version: V1.0
 */
public abstract class DynamicProxyMcpToolExecute implements BiFunction<McpSyncServerExchange, Map<String, Object>, McpSchema.CallToolResult> {
    private static final Logger LOGGER = LoggerFactory.getLogger(DynamicProxyMcpToolExecute.class);
    protected McpToolConfigDetailDTO mcpToolConfigDetail;

    public DynamicProxyMcpToolExecute(McpToolConfigDetailDTO mcpToolConfigDetail) {
        this.mcpToolConfigDetail = mcpToolConfigDetail;
    }

    @Override
    public McpSchema.CallToolResult apply(McpSyncServerExchange mcpSyncServerExchange, Map<String, Object> arguments) {
        long startTime = System.currentTimeMillis();
        Object headerInfo = arguments.get("__header__");
        Object contextInfo = arguments.get("__context__");
        String argumentsString = JSON.toJSONString(arguments);
        String logId = McpServerUtils.setLogIdFromMcpHeader(headerInfo);

        String result = null;
        try {
            LOGGER.info("开始mcp代理请求, headerInfo:{} contextInfo:{} , 参数: {}", JSON.toJSONString(headerInfo), JSON.toJSONString(contextInfo), argumentsString);
            result = execute(arguments);
            LOGGER.info("结束mcp代理请求, 结果: {}, 耗时:{}", result, System.currentTimeMillis() - startTime);
            result = processResponseData(result);
        }  catch (Exception e) {
            LOGGER.error("http 代理执行错误: ", e);
            result = "执行错误, LOGID: " + logId + " " + e.getMessage();
        }
        // Tool implementation
        return new McpSchema.CallToolResult(List.of(new McpSchema.TextContent(result)), false);
    }

    /**
     * 执行工具
     * @param arguments
     * @return
     */
    abstract String execute(Map<String, Object> arguments) throws Exception;


    /**
     * 对结果进行后置格式转换
     * @param responseData
     * @return
     * @throws IOException
     * @throws ParseException
     */
    public String processResponseData(String responseData) throws IOException, ParseException {
        if(StringUtils.isNotBlank(mcpToolConfigDetail.getResponseJson())) {
            return PlaceHolderDealUtil.processWithJsonata(responseData, mcpToolConfigDetail.getResponseJson());
        }
        return responseData;
    }
}
