package com.sophon.agent.studio.dto.prompt;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

/**
 * @author wudunhua
 * @createDate 2023/6/25 10:54
 */
@Schema(description = "添加prompt配置信息")
@Getter
@Setter
public class PromptConfigRequestDTO {

    @Schema(description = "基础信息")
    private PromptConfigVO baseConfig;

    @Schema(description =  "关联版本信息")
    private PromptConfigDetailVO detail;

}
