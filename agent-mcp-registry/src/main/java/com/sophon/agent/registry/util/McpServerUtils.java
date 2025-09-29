package com.sophon.agent.registry.util;

import java.util.LinkedHashMap;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @author: chun
 * @date: 2025-03-31 14:50
 * @Description:
 * @version: V1.0
 */
public class McpServerUtils {

    public static String setLogIdFromMcpHeader(Object sophonMcpHeader) {
        String logId = null;
        if(sophonMcpHeader != null) {
            if(((LinkedHashMap) sophonMcpHeader).get("log_id") != null) {
                logId = (String) ((LinkedHashMap) sophonMcpHeader).get("log_id");
            } else {
                logId = "";
            }

        }
        return logId;
    }

    public static String getQualifiedNameByMessagePath(String uri) {
        String regex = "/sophon/mcp/(.*)/message";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(uri);

        // 检查是否匹配
        if (matcher.find()) {
            // 提取匹配的内容
            return matcher.group(1);

        }
        return null;
    }

    public static String getQualifiedNameBySSEPath(String uri) {
        String regex = "/sophon/mcp/(.*)/sse";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(uri);

        // 检查是否匹配
        if (matcher.find()) {
            // 提取匹配的内容
            return matcher.group(1);

        }
        return null;
    }
}
