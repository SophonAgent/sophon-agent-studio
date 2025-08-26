package com.sophon.agent.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;

public class SophonMcpServer {
    private Long id;

    private String type;

    private String qualifiedName;

    private String displayName;

    private String description;

    private String category;

    private String endpointUrl;

    private String iconUrl;

    private String createdUser;

    private Date createTime;

    private Date modifyTime;

    private String command;

    private String implementType;

    private Integer status;

    private String modifyUser;

    private String contextConfig;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type == null ? null : type.trim();
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category == null ? null : category.trim();
    }

    public String getEndpointUrl() {
        return endpointUrl;
    }

    public void setEndpointUrl(String endpointUrl) {
        this.endpointUrl = endpointUrl == null ? null : endpointUrl.trim();
    }

    public String getIconUrl() {
        return iconUrl;
    }

    public void setIconUrl(String iconUrl) {
        this.iconUrl = iconUrl == null ? null : iconUrl.trim();
    }

    public String getCreatedUser() {
        return createdUser;
    }

    public void setCreatedUser(String createdUser) {
        this.createdUser = createdUser == null ? null : createdUser.trim();
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

    public String getCommand() {
        return command;
    }

    public void setCommand(String command) {
        this.command = command == null ? null : command.trim();
    }

    public String getImplementType() {
        return implementType;
    }

    public void setImplementType(String implementType) {
        this.implementType = implementType == null ? null : implementType.trim();
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public String getModifyUser() {
        return modifyUser;
    }

    public void setModifyUser(String modifyUser) {
        this.modifyUser = modifyUser == null ? null : modifyUser.trim();
    }

    public String getContextConfig() {
        return contextConfig;
    }

    public void setContextConfig(String contextConfig) {
        this.contextConfig = contextConfig == null ? null : contextConfig.trim();
    }

    public enum Column {
        id("id", "id", "INTEGER", false),
        type("type", "type", "VARCHAR", false),
        qualifiedName("qualified_name", "qualifiedName", "VARCHAR", false),
        displayName("display_name", "displayName", "VARCHAR", false),
        description("description", "description", "VARCHAR", false),
        category("category", "category", "VARCHAR", false),
        endpointUrl("endpoint_url", "endpointUrl", "VARCHAR", false),
        iconUrl("icon_url", "iconUrl", "VARCHAR", false),
        createdUser("created_user", "createdUser", "VARCHAR", false),
        createTime("create_time", "createTime", "VARCHAR", false),
        modifyTime("modify_time", "modifyTime", "VARCHAR", false),
        command("command", "command", "VARCHAR", false),
        implementType("implement_type", "implementType", "VARCHAR", false),
        status("status", "status", "INTEGER", false),
        modifyUser("modify_user", "modifyUser", "VARCHAR", false),
        contextConfig("context_config", "contextConfig", "VARCHAR", false);

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