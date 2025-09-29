package com.sophon.agent.model;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;

public class SophonPromptConfigDetail {
    private Long id;

    private Date createTime;

    private Date modifyTime;

    private String promptUid;

    private String promptContent;

    private String contentPlaceholder;

    private Integer status;

    private Integer version;

    private String createUser;

    private String comment;

    private String framework;

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

    public String getContentPlaceholder() {
        return contentPlaceholder;
    }

    public void setContentPlaceholder(String contentPlaceholder) {
        this.contentPlaceholder = contentPlaceholder == null ? null : contentPlaceholder.trim();
    }

    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }

    public Integer getVersion() {
        return version;
    }

    public void setVersion(Integer version) {
        this.version = version;
    }

    public String getCreateUser() {
        return createUser;
    }

    public void setCreateUser(String createUser) {
        this.createUser = createUser == null ? null : createUser.trim();
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment == null ? null : comment.trim();
    }

    public String getFramework() {
        return framework;
    }

    public void setFramework(String framework) {
        this.framework = framework == null ? null : framework.trim();
    }

    public enum Column {
        id("id", "id", "INTEGER", false),
        createTime("create_time", "createTime", "VARCHAR", false),
        modifyTime("modify_time", "modifyTime", "VARCHAR", false),
        promptUid("prompt_uid", "promptUid", "VARCHAR", false),
        promptContent("prompt_content", "promptContent", "VARCHAR", false),
        contentPlaceholder("content_placeholder", "contentPlaceholder", "VARCHAR", false),
        status("status", "status", "INTEGER", false),
        version("version", "version", "INTEGER", false),
        createUser("create_user", "createUser", "VARCHAR", false),
        comment("comment", "comment", "VARCHAR", false),
        framework("framework", "framework", "VARCHAR", false);

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