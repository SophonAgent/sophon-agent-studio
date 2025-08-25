package com.sophon.agent.studio.mapper;

import com.sophon.agent.studio.model.SophonMcpServerToolDetail;
import com.sophon.agent.studio.model.SophonMcpServerToolDetailExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface SophonMcpServerToolDetailMapper {
    long countByExample(SophonMcpServerToolDetailExample example);

    int deleteByExample(SophonMcpServerToolDetailExample example);

    int deleteByPrimaryKey(Long id);

    int insert(SophonMcpServerToolDetail record);

    int insertSelective(SophonMcpServerToolDetail record);

    List<SophonMcpServerToolDetail> selectByExample(SophonMcpServerToolDetailExample example);

    SophonMcpServerToolDetail selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") SophonMcpServerToolDetail record, @Param("example") SophonMcpServerToolDetailExample example);

    int updateByExample(@Param("record") SophonMcpServerToolDetail record, @Param("example") SophonMcpServerToolDetailExample example);

    int updateByPrimaryKeySelective(SophonMcpServerToolDetail record);

    int updateByPrimaryKey(SophonMcpServerToolDetail record);
}