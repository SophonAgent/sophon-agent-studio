package com.sophon.agent.studio.dto.prompt;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

/**
 * prompt版本详情信息
 * @author: chun
 * @date: 2025/8/27
 * @Description:
 * @version: V1.0
 */
@Schema(description = "prompt版本详情信息")
@Getter
@Setter
public class PromptConfigDetailVO {

    @Schema(description =  "唯一id")
    private Long id;

    @Schema(description =  "创建时间")
    private Date createTime;

    @Schema(description =  "场景唯一标识")
    private String promptUid;

    @Schema(description =  "prompt内容")
    private String promptContent;

    @Schema(description =  "prompt内容变量")
    private List<String> contentPlaceholders;

    @Schema(description =  "操作人")
    private String createUser;

    @Schema(description =  "状态1-生效，0失效")
    private int status;

    @Schema(description =  "版本")
    private int version;

    @Schema(description =  "说明")
    private String comment;

    @Schema(description =  "prompt生成框架")
    private PromptGenerateFrameworkEnum framework;

}
