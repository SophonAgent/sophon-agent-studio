package com.sophon.agent.studio.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Data
@Schema(description = "对话记录简单信息")
public class ChatRecordSimpleVO {

    @Schema(description = "id")
    private Long id;

    @Schema(description = "会话id", required = true)
    private String sessionId;

    @Schema(description = "用户id")
    private String userId;

    @Schema(description = "创建时间")
    private Date createTime;

    @Schema(description = "最后修改时间")
    private Date modifyTime;

    @Schema(description = "对话记录名称")
    private String name;

    @Schema(description = "其他信息")
    private String extra;

    @Schema(description= "是否被分享，0否1是")
    private int isShared;

    @Schema(description= "对话id")
    private String chatId;
}
