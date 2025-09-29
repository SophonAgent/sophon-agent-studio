package com.sophon.agent.studio.dto.prompt;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;


@Schema(description = "prompt历史版本查询请求体")
@Getter
@Setter
public class PromptHistoryQueryResquest {

    @Schema(description =  "场景标识",required = true)
    private String uid;

    @Schema(description =  "当前页",required = true)
    private Integer pageNum;

    @Schema(description =  "页数",required = true)
    private Integer pageSize;

}
