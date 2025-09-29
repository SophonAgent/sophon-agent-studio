package com.sophon.agent.studio.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Schema(description = "对话查询")
@Data
public class ChatRecordListQueryDTO {

    @Schema(description = "页码", required = true)
    private Integer pageNum = 1;

    @Schema(description = "行数", required = true)
    private Integer pageSize = 10;

    @Schema(description = "查询关键字, 为空则查询所有")
    private String keywords;

    @Schema(description = "sessionId")
    private String sessionId;
    @Schema(description = "查询用户")
    String userId;
}
