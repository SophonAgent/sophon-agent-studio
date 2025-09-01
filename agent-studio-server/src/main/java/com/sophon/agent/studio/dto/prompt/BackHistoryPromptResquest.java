package com.sophon.agent.studio.dto.prompt;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

/**
 * @author wudunhua
 * @createDate 2023/8/21 20:43
 */
@Schema(description = "回滚prompt模型请求体")
@Getter
@Setter
public class BackHistoryPromptResquest {

    @Schema(description =  "场景标识",required = true)
    private String uid;

    @Schema(description =  "版本",required = true)
    private int version;

}
