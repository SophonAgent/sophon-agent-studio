package com.sophon.agent.studio.dto.prompt;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

/**
 * @author wudunhua
 * @createDate 2024/12/4 10:53
 */
@Data
public class PromptGenerateRequest {

    @Schema(description = "用户原始pompt", required = true)
    private String userPrompt;

    @Schema(description =  "prompt生成框架")
    private PromptGenerateFrameworkEnum framework;
    @Schema(description = "是否流式")
    private boolean stream = true;

}
