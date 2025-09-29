package com.sophon.agent.mapper;

import com.sophon.agent.model.SophonPlaygroundChatRecord;
import com.sophon.agent.model.SophonPlaygroundChatRecordExample;
import java.util.List;
import org.apache.ibatis.annotations.Param;

public interface SophonPlaygroundChatRecordMapper {
    long countByExample(SophonPlaygroundChatRecordExample example);

    int deleteByExample(SophonPlaygroundChatRecordExample example);

    int deleteByPrimaryKey(Long id);

    int insert(SophonPlaygroundChatRecord record);

    int insertSelective(SophonPlaygroundChatRecord record);

    List<SophonPlaygroundChatRecord> selectByExample(SophonPlaygroundChatRecordExample example);

    SophonPlaygroundChatRecord selectByPrimaryKey(Long id);

    int updateByExampleSelective(@Param("record") SophonPlaygroundChatRecord record, @Param("example") SophonPlaygroundChatRecordExample example);

    int updateByExample(@Param("record") SophonPlaygroundChatRecord record, @Param("example") SophonPlaygroundChatRecordExample example);

    int updateByPrimaryKeySelective(SophonPlaygroundChatRecord record);

    int updateByPrimaryKey(SophonPlaygroundChatRecord record);
}