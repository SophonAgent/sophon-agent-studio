package com.sophon.agent.studio.dto.prompt;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

/**
 * prompt配置信息
 * @author: chun
 * @date: 2025/8/27
 * @Description:
 * @version: V1.0
 */
@Schema(description = "prompt配置信息")
@Getter
@Setter
public class PromptConfigVO {

    @Schema(description = "创建时间")
    private Date createTime;

    @Schema(description = "场景标识")
    private String uid;

    @Schema(description = "场景名称")
    private String name;

    @Schema(description = "场景描述")
    private String description;

    @Schema(description = "创建用户")
    private String createUser;

    @Schema(description = "分类，区分system、customized")
    private String classify;

}
