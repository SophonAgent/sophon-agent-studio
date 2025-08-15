package com.sophon.agent.studio.mapper;

import com.sophon.agent.studio.model.SophonAgentModelConfig;
import com.sophon.agent.studio.model.SophonAgentModelConfigExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface SophonAgentModelConfigMapper {
    long countByExample(SophonAgentModelConfigExample example);

    int deleteByExample(SophonAgentModelConfigExample example);

    int deleteByPrimaryKey(Long id);

    int insert(SophonAgentModelConfig record);

    int insertSelective(SophonAgentModelConfig record);

    List<SophonAgentModelConfig> selectByExample(SophonAgentModelConfigExample example);

    SophonAgentModelConfig selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") SophonAgentModelConfig record, @Param("example") SophonAgentModelConfigExample example);

    int updateByExample(@Param("record") SophonAgentModelConfig record, @Param("example") SophonAgentModelConfigExample example);

    int updateByPrimaryKeySelective(SophonAgentModelConfig record);

    int updateByPrimaryKey(SophonAgentModelConfig record);
}