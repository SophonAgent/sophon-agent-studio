package com.sophon.agent.studio.mapper;

import com.sophon.agent.studio.model.SophonMcpServer;
import com.sophon.agent.studio.model.SophonMcpServerExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface SophonMcpServerMapper {
    long countByExample(SophonMcpServerExample example);

    int deleteByExample(SophonMcpServerExample example);

    int deleteByPrimaryKey(Long id);

    int insert(SophonMcpServer record);

    int insertSelective(SophonMcpServer record);

    List<SophonMcpServer> selectByExample(SophonMcpServerExample example);

    SophonMcpServer selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") SophonMcpServer record, @Param("example") SophonMcpServerExample example);

    int updateByExample(@Param("record") SophonMcpServer record, @Param("example") SophonMcpServerExample example);

    int updateByPrimaryKeySelective(SophonMcpServer record);

    int updateByPrimaryKey(SophonMcpServer record);
}