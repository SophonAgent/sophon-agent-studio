package com.sophon.agent.mapper;

import com.sophon.agent.model.SophonPromptConfigDetail;
import com.sophon.agent.model.SophonPromptConfigDetailExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface SophonPromptConfigDetailMapper {
    long countByExample(SophonPromptConfigDetailExample example);

    int deleteByExample(SophonPromptConfigDetailExample example);

    int deleteByPrimaryKey(Long id);

    int insert(SophonPromptConfigDetail record);

    int insertSelective(SophonPromptConfigDetail record);

    List<SophonPromptConfigDetail> selectByExample(SophonPromptConfigDetailExample example);

    SophonPromptConfigDetail selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") SophonPromptConfigDetail record, @Param("example") SophonPromptConfigDetailExample example);

    int updateByExample(@Param("record") SophonPromptConfigDetail record, @Param("example") SophonPromptConfigDetailExample example);

    int updateByPrimaryKeySelective(SophonPromptConfigDetail record);

    int updateByPrimaryKey(SophonPromptConfigDetail record);
}