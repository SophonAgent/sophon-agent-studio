package com.sophon.agent.studio.dto;

import com.sophon.agent.studio.dto.common.PageInfoVO;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.util.List;

@Schema(description = "会话列表")
@Data
public class ChatRecordListVO {

    @Schema(description = "分页信息")
    PageInfoVO pageInfo;
    @Schema(description = "对话简单详情数据")
    private List<ChatRecordSimpleVO> datas;

}
