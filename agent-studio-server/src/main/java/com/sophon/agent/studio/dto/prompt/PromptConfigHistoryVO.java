package com.sophon.agent.studio.dto.prompt;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

/**
 * @author wudunhua
 * @createDate 2023/8/21 20:08
 */
@Schema(description = "prompt历史")
@Getter
@Setter
public class PromptConfigHistoryVO {
    @Schema(description =  "创建时间")
    private Date createTime;
    
    @Schema(description = "场景唯一标识")
    private String promptUid;

    @Schema(description =  "版本")
    private int version;

    @Schema(description =  "操作人")
    private String createUser;

    @Schema(description =  "状态1-生效，0失效")
    private int status;

    @Schema(description =  "prompt内容列表")
    private List<PromptConfigDetailVO> promptDetails;
}
