package com.sophon.agent.studio.dto.prompt;

import com.sophon.agent.studio.dto.common.PageInfoVO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

/**
 * @author wudunhua
 * @createDate 2023/8/21 20:13
 */
@Schema(description = "prompt历史批量")
@Getter
@Setter
public class PromptConfigHistoryListVO {

    @Schema(description="分页信息")
    PageInfoVO pageInfo;

    @Schema(description="prompt历史列表")
    List<PromptConfigHistoryVO> historyVOS;

    @Schema(description="分类")
    String classify;
}
