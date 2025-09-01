package com.sophon.agent.mapper;

import com.sophon.agent.model.SophonPromptConfig;
import com.sophon.agent.model.SophonPromptConfigExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface SophonPromptConfigMapper {
    long countByExample(SophonPromptConfigExample example);

    int deleteByExample(SophonPromptConfigExample example);

    int deleteByPrimaryKey(Long id);

    int insert(SophonPromptConfig record);

    int insertSelective(SophonPromptConfig record);

    List<SophonPromptConfig> selectByExample(SophonPromptConfigExample example);

    SophonPromptConfig selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") SophonPromptConfig record, @Param("example") SophonPromptConfigExample example);

    int updateByExample(@Param("record") SophonPromptConfig record, @Param("example") SophonPromptConfigExample example);

    int updateByPrimaryKeySelective(SophonPromptConfig record);

    int updateByPrimaryKey(SophonPromptConfig record);
}