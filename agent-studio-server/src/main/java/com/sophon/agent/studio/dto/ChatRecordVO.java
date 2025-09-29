package com.sophon.agent.studio.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Data
@Schema(description = "MCP服务器创建请求")
public class ChatRecordVO {

    @Schema(description = "id")
    private Long id;

    @Schema(description = "会话id", required = true)
    private String sessionId;

    @Schema(description = "用户id")
    private String userId;

    @Schema(description = "promptUid")
    private String promptUid;

    @Schema(description = "promptVersion")
    private Integer promptVersion;

    @Schema(description = "promptContent")
    private String promptContent;

    @Schema(description = "prompt动态替换值")
    private Map<String, Object> promptDynamicValues;

    @Schema(description = "创建时间")
    private Date createTime;

    @Schema(description = "最后修改时间")
    private Date modifyTime;

    @Schema(description = "模型参数")
    private Map<String, Object> modelArgs;

    @Schema(description = "完整对话内容")
    private List<Object> completeContent;

    @Schema(description = "对话记录名称")
    private String name;

    @Schema(description = "其他信息")
    private String extra;

    @Schema(description= "是否被分享，0否1是")
    private int isShared;

    @Schema(description= "对话id")
    private String chatId;
}
