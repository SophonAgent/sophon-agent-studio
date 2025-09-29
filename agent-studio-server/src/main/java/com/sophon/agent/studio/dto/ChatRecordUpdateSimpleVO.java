package com.sophon.agent.studio.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.Date;

@Data
@Schema(description = "对话记录简单信息更新")
public class ChatRecordUpdateSimpleVO {

    @Schema(description = "id")
    private Long id;

    @Schema(description = "会话id", required = true)
    private String sessionId;

    @Schema(description = "用户id")
    private String userId;

    @Schema(description = "对话记录名称")
    private String name;

    @Schema(description= "是否被分享，0否1是")
    private int isShared;
}
