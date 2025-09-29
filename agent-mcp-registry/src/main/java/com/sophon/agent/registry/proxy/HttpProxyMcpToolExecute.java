package com.sophon.agent.registry.proxy;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import com.api.jsonata4java.expressions.ParseException;
import com.sophon.agent.registry.dto.McpToolConfigDetailDTO;
import com.sophon.agent.registry.util.OkHttpClientUtil;
import com.sophon.agent.registry.util.PlaceHolderDealUtil;
import okhttp3.MediaType;
import okhttp3.Request;
import okhttp3.RequestBody;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

/**
 * mcp工具http代理实现
 * @author: chun
 * @date: 2025/8/27
 * @Description:
 * @version: V1.0
 */
public class HttpProxyMcpToolExecute extends DynamicProxyMcpToolExecute{
    private static final Logger LOGGER = LoggerFactory.getLogger(HttpProxyMcpToolExecute.class);

    public HttpProxyMcpToolExecute(McpToolConfigDetailDTO mcpToolConfigDetail) {
        super(mcpToolConfigDetail);
    }

    @Override
    String execute(Map<String, Object> arguments) throws IOException, ParseException {

        // 1. 转换请求参数
        Request request =  convertRequest(arguments);
        // 2. 执行
        String response = OkHttpClientUtil.call(request);

        return response;
    }

    private Request convertRequest(Map<String, Object> arguments) throws IOException, ParseException {
        Request.Builder builder = new Request.Builder();
        // 1. 替换URL中的占位符
        String url = PlaceHolderDealUtil.replacePlaceholders(mcpToolConfigDetail.getRequestUrl(), arguments);
        builder.url(url);
        // 2. 替换Header中的占位符
        Map<String, String> headers = new HashMap<>();
        if(StringUtils.isNotBlank(mcpToolConfigDetail.getRequestHeaders())) {
            headers = JSON.parseObject(mcpToolConfigDetail.getRequestHeaders(), new TypeReference<>() {});
            headers = PlaceHolderDealUtil.replaceHeaderPlaceholders(headers, arguments);
        }
        for(Map.Entry<String, String> entry : headers.entrySet()){
            builder.addHeader(entry.getKey(), entry.getValue());
        }
        // 设置请求方式
        if(mcpToolConfigDetail.getRequestMethod().equalsIgnoreCase("GET")) {
            return builder.build();
        }

        String processedBody = JSON.toJSONString(arguments);;
        if(StringUtils.isNotBlank(mcpToolConfigDetail.getRequestJson())) {
            processedBody = PlaceHolderDealUtil.processWithJsonata(JSON.toJSONString(arguments), mcpToolConfigDetail.getRequestJson());
        }
        builder.method("POST", RequestBody.create(MediaType.parse("application/json"), processedBody));

        return builder.build();
    }

}
