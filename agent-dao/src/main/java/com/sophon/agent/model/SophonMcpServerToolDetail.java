package com.sophon.agent.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;

public class SophonMcpServerToolDetail {
    private Long id;

    private String qualifiedName;

    private String displayName;

    private String serverQualifiedName;

    private String description;

    private String inputSchema;

    private String proxyType;

    private String requestMethod;

    private String requestUrl;

    private String requestHeaders;

    private String requestJson;

    private String responseJson;

    private Integer status;

    private Date createTime;

    private Date modifyTime;

    private String createUser;

    private String modifyUser;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQualifiedName() {
        return qualifiedName;
    }

    public void setQualifiedName(String qualifiedName) {
        this.qualifiedName = qualifiedName == null ? null : qualifiedName.trim();
    }

    public String getDisplayName() {
        return displayName;
    }

    public void setDisplayName(String displayName) {
        this.displayName = displayName == null ? null : displayName.trim();
    }

    public String getServerQualifiedName() {
        return serverQualifiedName;
    }

    public void setServerQualifiedName(String serverQualifiedName) {
        this.serverQualifiedName = serverQualifiedName == null ? null : serverQualifiedName.trim();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    public String getInputSchema() {
        return inputSchema;
    }

    public void setInputSchema(String inputSchema) {
        this.inputSchema = inputSchema == null ? null : inputSchema.trim();
    }

    public String getProxyType() {
        return proxyType;
    }

    public void setProxyType(String proxyType) {
        this.proxyType = proxyType == null ? null : proxyType.trim();
    }

    public String getRequestMethod() {
        return requestMethod;
    }

    public void setRequestMethod(String requestMethod) {
        this.requestMethod = requestMethod == null ? null : requestMethod.trim();
    }

    public String getRequestUrl() {
        return requestUrl;
    }

    public void setRequestUrl(String requestUrl) {
        this.requestUrl = requestUrl == null ? null : requestUrl.trim();
    }

    public String getRequestHeaders() {
        return requestHeaders;
    }

    public void setRequestHeaders(String requestHeaders) {
        this.requestHeaders = requestHeaders == null ? null : requestHeaders.trim();
    }

    public String getRequestJson() {
        return requestJson;
    }

    public void setRequestJson(String requestJson) {
        this.requestJson = requestJson == null ? null : requestJson.trim();
    }

    public String getResponseJson() {
        return responseJson;
    }

    public void setResponseJson(String responseJson) {
        this.responseJson = responseJson == null ? null : responseJson.trim();
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public Date getModifyTime() {
        return modifyTime;
    }

    public void setModifyTime(Date modifyTime) {
        this.modifyTime = modifyTime;
    }

    public String getCreateUser() {
        return createUser;
    }

    public void setCreateUser(String createUser) {
        this.createUser = createUser == null ? null : createUser.trim();
    }

    public String getModifyUser() {
        return modifyUser;
    }

    public void setModifyUser(String modifyUser) {
        this.modifyUser = modifyUser == null ? null : modifyUser.trim();
    }

    public enum Column {
        id("id", "id", "INTEGER", false),
        qualifiedName("qualified_name", "qualifiedName", "VARCHAR", false),
        displayName("display_name", "displayName", "VARCHAR", false),
        serverQualifiedName("server_qualified_name", "serverQualifiedName", "VARCHAR", false),
        description("description", "description", "VARCHAR", false),
        inputSchema("input_schema", "inputSchema", "VARCHAR", false),
        proxyType("proxy_type", "proxyType", "VARCHAR", false),
        requestMethod("request_method", "requestMethod", "VARCHAR", false),
        requestUrl("request_url", "requestUrl", "VARCHAR", false),
        requestHeaders("request_headers", "requestHeaders", "VARCHAR", false),
        requestJson("request_json", "requestJson", "VARCHAR", false),
        responseJson("response_json", "responseJson", "VARCHAR", false),
        status("status", "status", "INTEGER", false),
        createTime("create_time", "createTime", "VARCHAR", false),
        modifyTime("modify_time", "modifyTime", "VARCHAR", false),
        createUser("create_user", "createUser", "VARCHAR", false),
        modifyUser("modify_user", "modifyUser", "VARCHAR", false);

        private static final String BEGINNING_DELIMITER = "\"";

        private static final String ENDING_DELIMITER = "\"";

        private final String column;

        private final boolean isColumnNameDelimited;

        private final String javaProperty;

        private final String jdbcType;

        public String value() {
            return this.column;
        }

        public String getValue() {
            return this.column;
        }

        public String getJavaProperty() {
            return this.javaProperty;
        }

        public String getJdbcType() {
            return this.jdbcType;
        }

        Column(String column, String javaProperty, String jdbcType, boolean isColumnNameDelimited) {
            this.column = column;
            this.javaProperty = javaProperty;
            this.jdbcType = jdbcType;
            this.isColumnNameDelimited = isColumnNameDelimited;
        }

        public String desc() {
            return this.getEscapedColumnName() + " DESC";
        }

        public String asc() {
            return this.getEscapedColumnName() + " ASC";
        }

        public static Column[] excludes(Column ... excludes) {
            ArrayList<Column> columns = new ArrayList<>(Arrays.asList(Column.values()));
            if (excludes != null && excludes.length > 0) {
                columns.removeAll(new ArrayList<>(Arrays.asList(excludes)));
            }
            return columns.toArray(new Column[]{});
        }

        public static Column[] all() {
            return Column.values();
        }

        public String getEscapedColumnName() {
            if (this.isColumnNameDelimited) {
                return new StringBuilder().append(BEGINNING_DELIMITER).append(this.column).append(ENDING_DELIMITER).toString();
            } else {
                return this.column;
            }
        }

        public String getAliasedEscapedColumnName() {
            return this.getEscapedColumnName();
        }
    }
}