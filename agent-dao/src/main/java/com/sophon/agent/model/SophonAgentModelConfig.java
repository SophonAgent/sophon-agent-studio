package com.sophon.agent.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;

public class SophonAgentModelConfig {
    private Long id;

    private Date createTime;

    private Date modifyTime;

    private String name;

    private String description;

    private String modelUrl;

    private String modelKey;

    private String modelName;

    private String config;

    private Integer isDelete;

    private String modifyUser;

    private String createUser;

    private String modalities;

    private Integer maxCompletionTokenLimit;

    private String modelAppTag;

    private String defaultParams;

    private Integer supportStream;

    private Integer supportSystem;

    private Integer supportReasoning;

    private Integer timeoutSeconds;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }

    public String getModelUrl() {
        return modelUrl;
    }

    public void setModelUrl(String modelUrl) {
        this.modelUrl = modelUrl == null ? null : modelUrl.trim();
    }

    public String getModelKey() {
        return modelKey;
    }

    public void setModelKey(String modelKey) {
        this.modelKey = modelKey == null ? null : modelKey.trim();
    }

    public String getModelName() {
        return modelName;
    }

    public void setModelName(String modelName) {
        this.modelName = modelName == null ? null : modelName.trim();
    }

    public String getConfig() {
        return config;
    }

    public void setConfig(String config) {
        this.config = config == null ? null : config.trim();
    }

    public Integer getIsDelete() {
        return isDelete;
    }

    public void setIsDelete(Integer isDelete) {
        this.isDelete = isDelete;
    }

    public String getModifyUser() {
        return modifyUser;
    }

    public void setModifyUser(String modifyUser) {
        this.modifyUser = modifyUser == null ? null : modifyUser.trim();
    }

    public String getCreateUser() {
        return createUser;
    }

    public void setCreateUser(String createUser) {
        this.createUser = createUser == null ? null : createUser.trim();
    }

    public String getModalities() {
        return modalities;
    }

    public void setModalities(String modalities) {
        this.modalities = modalities == null ? null : modalities.trim();
    }

    public Integer getMaxCompletionTokenLimit() {
        return maxCompletionTokenLimit;
    }

    public void setMaxCompletionTokenLimit(Integer maxCompletionTokenLimit) {
        this.maxCompletionTokenLimit = maxCompletionTokenLimit;
    }

    public String getModelAppTag() {
        return modelAppTag;
    }

    public void setModelAppTag(String modelAppTag) {
        this.modelAppTag = modelAppTag == null ? null : modelAppTag.trim();
    }

    public String getDefaultParams() {
        return defaultParams;
    }

    public void setDefaultParams(String defaultParams) {
        this.defaultParams = defaultParams == null ? null : defaultParams.trim();
    }

    public Integer getSupportStream() {
        return supportStream;
    }

    public void setSupportStream(Integer supportStream) {
        this.supportStream = supportStream;
    }

    public Integer getSupportSystem() {
        return supportSystem;
    }

    public void setSupportSystem(Integer supportSystem) {
        this.supportSystem = supportSystem;
    }

    public Integer getSupportReasoning() {
        return supportReasoning;
    }

    public void setSupportReasoning(Integer supportReasoning) {
        this.supportReasoning = supportReasoning;
    }

    public Integer getTimeoutSeconds() {
        return timeoutSeconds;
    }

    public void setTimeoutSeconds(Integer timeoutSeconds) {
        this.timeoutSeconds = timeoutSeconds;
    }

    public enum Column {
        id("id", "id", "INTEGER", false),
        createTime("create_time", "createTime", "VARCHAR", false),
        modifyTime("modify_time", "modifyTime", "VARCHAR", false),
        name("name", "name", "VARCHAR", false),
        description("description", "description", "VARCHAR", false),
        modelUrl("model_url", "modelUrl", "VARCHAR", false),
        modelKey("model_key", "modelKey", "VARCHAR", false),
        modelName("model_name", "modelName", "VARCHAR", false),
        config("config", "config", "VARCHAR", false),
        isDelete("is_delete", "isDelete", "INTEGER", false),
        modifyUser("modify_user", "modifyUser", "VARCHAR", false),
        createUser("create_user", "createUser", "VARCHAR", false),
        modalities("modalities", "modalities", "VARCHAR", false),
        maxCompletionTokenLimit("max_completion_token_limit", "maxCompletionTokenLimit", "INTEGER", false),
        modelAppTag("model_app_tag", "modelAppTag", "VARCHAR", false),
        defaultParams("default_params", "defaultParams", "VARCHAR", false),
        supportStream("support_stream", "supportStream", "INTEGER", false),
        supportSystem("support_system", "supportSystem", "INTEGER", false),
        supportReasoning("support_reasoning", "supportReasoning", "INTEGER", false),
        timeoutSeconds("timeout_seconds", "timeoutSeconds", "INTEGER", false);

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