package com.sophon.agent.registry.util;

import com.alibaba.fastjson.JSON;
import com.api.jsonata4java.Expression;
import com.api.jsonata4java.expressions.ParseException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 占位符处理工具类
 * @author: chun
 * @date: 2025/8/27
 * @Description:
 * @version: V1.0
 */
public class PlaceHolderDealUtil {
    private static final Logger LOGGER = LoggerFactory.getLogger(PlaceHolderDealUtil.class);

    /**
     * 使用 JSONata 处理 JSON 数据
     * @param data
     * @param jsonataExpression jsondata schema信息
     * @return
     */
    public static String processWithJsonata(String data, String jsonataExpression) throws IOException, ParseException {
        Object dealData = JSON.parse(data);

        // 将 Map 转换为 JSON
        ObjectMapper mapper = new ObjectMapper();
        JsonNode jsonNode = mapper.valueToTree(dealData);

        // 解析并评估 JSONata 表达式
        Expression expr = Expression.jsonata(jsonataExpression);
        JsonNode result = expr.evaluate(jsonNode);

        // 判断结果类型
        if (result.isTextual()) {
            // 如果结果是文本节点 (JSONata 表达式已生成字符串)
            // 直接返回其文本内容，不进行额外的JSON序列化
            return result.asText();
        } else {
            // 其他情况 (如对象、数组、数字、布尔值)，则正常序列化为JSON字符串
            return mapper.writeValueAsString(result);
        }
    }


    /**
     * 替换header中的占位符
     * @param headers
     * @param arguments
     * @return
     */
    public static Map<String, String> replaceHeaderPlaceholders(Map<String, String> headers, Map<String, Object> arguments) {
        Map<String, String> result = new HashMap<>();

        for (Map.Entry<String, String> entry : headers.entrySet()) {
            String key = replacePlaceholders(entry.getKey(), arguments);
            String value = replacePlaceholders(entry.getValue(), arguments);
            result.put(key, value);
        }

        return result;
    }

    /**
     * 替换字符串中的占位符 ${path.to.value} 为 arguments 中对应的值
     * @param template
     * @param arguments
     * @return
     */
    public static String replacePlaceholders(String template, Map<String, Object> arguments) {
        if (template == null || template.isEmpty()) {
            return template;
        }

        Pattern pattern = Pattern.compile("\\$\\{([^}:]+)(:([^}]*))?\\}");
        Matcher matcher = pattern.matcher(template);

        StringBuffer result = new StringBuffer();

        int queryIndex = template.indexOf('?');
        int fragmentIndex = template.indexOf('#');
        if (fragmentIndex == -1) fragmentIndex = template.length();

        while (matcher.find()) {
            String key = matcher.group(1);
            String defaultValue = matcher.group(3);
            Object value = getValueFromPath(key, arguments);
            String replacement = (value != null) ? value.toString() : (defaultValue != null ? defaultValue : "");

            // 判断是否在参数部分
            int placeholderPos = matcher.start();
            boolean inQuery = queryIndex != -1 && placeholderPos > queryIndex && placeholderPos < fragmentIndex;
            if (inQuery) {
                replacement = URLEncoder.encode(replacement, StandardCharsets.UTF_8);
            }
            matcher.appendReplacement(result, Matcher.quoteReplacement(replacement));
        }
        matcher.appendTail(result);

        return result.toString();
    }

    /**
     * 根据路径从嵌套的Map中获取值
     * 例如: "user.address.city" 将从 arguments 中获取 arguments.get("user").get("address").get("city")
     */
    private static Object getValueFromPath(String path, Map<String, Object> arguments) {
        if (path == null || path.isEmpty() || arguments == null) {
            return null;
        }

        String[] parts = path.split("\\.");
        Object current = arguments;

        for (String part : parts) {
            if (current instanceof Map) {
                Map<String, Object> map = (Map<String, Object>) current;
                current = map.get(part);
                if (current == null) {
                    return null; // 路径中的某一部分不存在
                }
            } else if (current instanceof List && part.matches("\\d+")) {
                // 处理数组索引
                int index = Integer.parseInt(part);
                List<?> list = (List<?>) current;
                if (index >= 0 && index < list.size()) {
                    current = list.get(index);
                } else {
                    return null; // 索引越界
                }
            } else {
                return null; // 当前对象既不是Map也不是List，无法继续遍历
            }
        }

        return current;
    }
}
