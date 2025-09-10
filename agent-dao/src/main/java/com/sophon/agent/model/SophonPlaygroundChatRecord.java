package com.sophon.agent.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;

public class SophonPlaygroundChatRecord {
    private Long id;

    private Date createTime;

    private Date modifyTime;

    private String userId;

    private String sessionId;

    private String modelArgs;

    private String completeContent;

    private String promptUid;

    private String promptContent;

    private String promptDynamicValues;

    private String name;

    private Integer isShared;

    private String extra;

    private Integer promptVersion;

    private String chatId;

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

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId == null ? null : userId.trim();
    }

    public String getSessionId() {
        return sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId == null ? null : sessionId.trim();
    }

    public String getModelArgs() {
        return modelArgs;
    }

    public void setModelArgs(String modelArgs) {
        this.modelArgs = modelArgs == null ? null : modelArgs.trim();
    }

    public String getCompleteContent() {
        return completeContent;
    }

    public void setCompleteContent(String completeContent) {
        this.completeContent = completeContent == null ? null : completeContent.trim();
    }

    public String getPromptUid() {
        return promptUid;
    }

    public void setPromptUid(String promptUid) {
        this.promptUid = promptUid == null ? null : promptUid.trim();
    }

    public String getPromptContent() {
        return promptContent;
    }

    public void setPromptContent(String promptContent) {
        this.promptContent = promptContent == null ? null : promptContent.trim();
    }

    public String getPromptDynamicValues() {
        return promptDynamicValues;
    }

    public void setPromptDynamicValues(String promptDynamicValues) {
        this.promptDynamicValues = promptDynamicValues == null ? null : promptDynamicValues.trim();
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    public Integer getIsShared() {
        return isShared;
    }

    public void setIsShared(Integer isShared) {
        this.isShared = isShared;
    }

    public String getExtra() {
        return extra;
    }

    public void setExtra(String extra) {
        this.extra = extra == null ? null : extra.trim();
    }

    public Integer getPromptVersion() {
        return promptVersion;
    }

    public void setPromptVersion(Integer promptVersion) {
        this.promptVersion = promptVersion;
    }

    public String getChatId() {
        return chatId;
    }

    public void setChatId(String chatId) {
        this.chatId = chatId == null ? null : chatId.trim();
    }

    public enum Column {
        id("id", "id", "INTEGER", false),
        createTime("create_time", "createTime", "VARCHAR", false),
        modifyTime("modify_time", "modifyTime", "VARCHAR", false),
        userId("user_id", "userId", "VARCHAR", false),
        sessionId("session_id", "sessionId", "VARCHAR", false),
        modelArgs("model_args", "modelArgs", "VARCHAR", false),
        completeContent("complete_content", "completeContent", "VARCHAR", false),
        promptUid("prompt_uid", "promptUid", "VARCHAR", false),
        promptContent("prompt_content", "promptContent", "VARCHAR", false),
        promptDynamicValues("prompt_dynamic_values", "promptDynamicValues", "VARCHAR", false),
        name("name", "name", "VARCHAR", false),
        isShared("is_shared", "isShared", "INTEGER", false),
        extra("extra", "extra", "VARCHAR", false),
        promptVersion("prompt_version", "promptVersion", "INTEGER", false),
        chatId("chat_id", "chatId", "VARCHAR", false);

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