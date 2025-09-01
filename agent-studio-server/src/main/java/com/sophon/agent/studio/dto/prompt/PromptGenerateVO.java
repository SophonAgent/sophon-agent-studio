package com.sophon.agent.studio.dto.prompt;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;


@Schema(description = "prompt优化提示信息")
@Data
public class PromptGenerateVO {

    /**
     * 最终的sys prompt
     */
    @Schema(description = "最终的sys prompt")
    private String finalPrompt;


    /**
     * 用于生成的模型id
     */
    @Schema(description = "用于生成的模型id")
    private long modelConfigId;

}
