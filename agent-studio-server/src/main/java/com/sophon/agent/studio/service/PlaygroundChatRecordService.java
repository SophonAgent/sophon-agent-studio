package com.sophon.agent.studio.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import com.github.pagehelper.PageInfo;
import com.github.pagehelper.page.PageMethod;
import com.sophon.agent.mapper.SophonPlaygroundChatRecordMapper;
import com.sophon.agent.model.SophonPlaygroundChatRecord;
import com.sophon.agent.model.SophonPlaygroundChatRecordExample;
import com.sophon.agent.studio.dto.ChatRecordListQueryDTO;
import com.sophon.agent.studio.dto.ChatRecordListVO;
import com.sophon.agent.studio.dto.ChatRecordSimpleVO;
import com.sophon.agent.studio.dto.ChatRecordVO;
import com.sophon.agent.studio.dto.common.PageInfoVO;
import com.sophon.agent.studio.exception.BusinessException;
import lombok.NonNull;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;



/**
 * playground会话管理服务
 * @author: chun
 * @date: 2025/09/10
 * @Description:
 * @version: V1.0
 */
@Service
@Slf4j
public class PlaygroundChatRecordService {

    @Autowired
    private SophonPlaygroundChatRecordMapper playgroundChatRecordMapper;


    private final static String UPDATE_EVAL_RESULT_PREFIX = "UPDATE_RECORD_";

    @Transactional(rollbackFor = Exception.class)
    public Long saveChatRecord(@NonNull ChatRecordVO chatRecordVO) {
        // 校验参数
        if(StringUtils.isBlank(chatRecordVO.getUserId())) {
            throw new BusinessException("对话记录中用户id非法");
        }
        if(StringUtils.isBlank(chatRecordVO.getSessionId())) {
            throw new BusinessException("对话记录中会话id非法");
        }

        SophonPlaygroundChatRecord playgroundChatRecord = convert(chatRecordVO);

        // 更新对话记录
        SophonPlaygroundChatRecord record = getChatRecordBySessionId(chatRecordVO.getSessionId());

        // 更新对话记录
        if(record != null) {
            playgroundChatRecord.setId(record.getId());
            playgroundChatRecordMapper.updateByPrimaryKeySelective(playgroundChatRecord);
            // 添加对话记录
        } else {
            playgroundChatRecord.setId(null);
            playgroundChatRecordMapper.insertSelective(playgroundChatRecord);
            if(playgroundChatRecord.getId() == null) {
                throw new BusinessException("添加对话记录失败");
            }
        }
        return playgroundChatRecord.getId();
    }

    public boolean updateSimpleInfo(ChatRecordSimpleVO chatRecordSimpleVO){
        SophonPlaygroundChatRecord sophonPlaygroundChatRecord = getChatRecordBySessionId(chatRecordSimpleVO.getSessionId());
        if(StringUtils.isBlank(chatRecordSimpleVO.getUserId())) {
            throw new BusinessException("userId非法");
        }

        if(sophonPlaygroundChatRecord == null){
            throw new BusinessException("不存在的对话记录");
        }

        if(!Objects.equals(sophonPlaygroundChatRecord.getUserId(), chatRecordSimpleVO.getUserId())){
            throw new BusinessException("无权限修改该对话记录");
        }
        SophonPlaygroundChatRecord updateRecord = new SophonPlaygroundChatRecord();
        updateRecord.setId(sophonPlaygroundChatRecord.getId());
        if(StringUtils.isBlank(chatRecordSimpleVO.getName())){
            updateRecord.setName(chatRecordSimpleVO.getName());
        }
        updateRecord.setIsShared(chatRecordSimpleVO.getIsShared());
        playgroundChatRecordMapper.updateByPrimaryKeySelective(updateRecord);
        return true;
    }

    public ChatRecordListVO listChatRecords( ChatRecordListQueryDTO chatRecordListQueryDTO) {
        if(StringUtils.isBlank(chatRecordListQueryDTO.getUserId())) {
            throw new BusinessException("userId非法");
        }
        if(Objects.isNull(chatRecordListQueryDTO.getPageNum()) || Objects.isNull(chatRecordListQueryDTO.getPageSize())) {
            throw new BusinessException("查询对话记录列表分页参数非法");
        }

        SophonPlaygroundChatRecordExample example = new SophonPlaygroundChatRecordExample();
        SophonPlaygroundChatRecordExample.Criteria criteria = example.createCriteria();
        criteria.andUserIdEqualTo(chatRecordListQueryDTO.getUserId());
        example.setOrderByClause("modify_time desc");
        // 设置查询关键字
        if(!StringUtils.isEmpty(chatRecordListQueryDTO.getKeywords())) {
            criteria.andNameLike("%" + chatRecordListQueryDTO.getKeywords() + "%");
        }

        if (StringUtils.isNotBlank(chatRecordListQueryDTO.getSessionId())) {
            criteria.andSessionIdEqualTo(chatRecordListQueryDTO.getSessionId());
        }

        PageInfo<SophonPlaygroundChatRecord> pageInfo = PageMethod.startPage(chatRecordListQueryDTO.getPageNum(), chatRecordListQueryDTO.getPageSize())
                .doSelectPageInfo(() -> playgroundChatRecordMapper.selectByExample(example));

        PageInfoVO pageInfoVO = new PageInfoVO();
        BeanUtils.copyProperties(pageInfo, pageInfoVO);

        List<ChatRecordSimpleVO> chatRecordVOList = pageInfo.getList().stream()
                .map(this::covert2SimpleVO)
                .collect(Collectors.toList());

        ChatRecordListVO chatRecordListVO = new ChatRecordListVO();
        chatRecordListVO.setDatas(chatRecordVOList);
        chatRecordListVO.setPageInfo(pageInfoVO);
        return chatRecordListVO;
    }

    public ChatRecordVO getChatRecordBySessionIdAndUserId(@NonNull String sessionId,String userId) {
        SophonPlaygroundChatRecord record = getChatRecordBySessionId(sessionId);
        if(record == null) {
            throw new BusinessException("对话记录不存在");
        }

        // 非记录作者查看未分享的记录，则抛出异常
        if(!Objects.equals(record.getUserId(), userId) && (record.getIsShared() == null || record.getIsShared() == 0)) {
            throw new BusinessException("该对话记录未被分享");
        }

        return covert2VO(record);
    }

    public SophonPlaygroundChatRecord getChatRecordBySessionId(@NonNull String sessionId) {
        SophonPlaygroundChatRecordExample example = new SophonPlaygroundChatRecordExample();
        example.setOrderByClause("modify_time desc");
        example.createCriteria().andSessionIdEqualTo(sessionId);

        List<SophonPlaygroundChatRecord> playgroundChatRecords = playgroundChatRecordMapper.selectByExample(example);

        if(playgroundChatRecords.isEmpty()) {
            return null;
        }

        return playgroundChatRecords.get(0);
    }

    public Boolean removeChatRecord(@NonNull String userId, @NonNull String sessionId) {
        SophonPlaygroundChatRecordExample example = new SophonPlaygroundChatRecordExample();
        SophonPlaygroundChatRecordExample.Criteria criteria = example.createCriteria();
        criteria.andSessionIdEqualTo(sessionId).andUserIdEqualTo(userId);
        return playgroundChatRecordMapper.deleteByExample(example) > 0;
    }

    public void clearChatRecords(@NonNull String userId, @NonNull Date date) {
        SophonPlaygroundChatRecordExample example = new SophonPlaygroundChatRecordExample();
        SophonPlaygroundChatRecordExample.Criteria criteria = example.createCriteria();
        criteria.andUserIdEqualTo(userId).andCreateTimeLessThan(date);
        playgroundChatRecordMapper.deleteByExample(example);
    }

    private SophonPlaygroundChatRecord convert(ChatRecordVO chatRecordVO) {
        SophonPlaygroundChatRecord playgroundChatRecord = new SophonPlaygroundChatRecord();
        playgroundChatRecord.setUserId(chatRecordVO.getUserId());
        playgroundChatRecord.setId(chatRecordVO.getId());
        playgroundChatRecord.setCompleteContent(JSON.toJSONString(chatRecordVO.getCompleteContent()));
        playgroundChatRecord.setModelArgs(JSON.toJSONString(chatRecordVO.getModelArgs()));
        playgroundChatRecord.setPromptContent(chatRecordVO.getPromptContent());
        playgroundChatRecord.setPromptDynamicValues(JSON.toJSONString(chatRecordVO.getPromptDynamicValues()));
        playgroundChatRecord.setPromptUid(chatRecordVO.getPromptUid());
        playgroundChatRecord.setPromptVersion(chatRecordVO.getPromptVersion());
        playgroundChatRecord.setSessionId(chatRecordVO.getSessionId());
        playgroundChatRecord.setName(chatRecordVO.getName());
        playgroundChatRecord.setExtra(chatRecordVO.getExtra());
        playgroundChatRecord.setIsShared(chatRecordVO.getIsShared());
        playgroundChatRecord.setChatId(chatRecordVO.getChatId());
        if(Objects.isNull(chatRecordVO.getId())) {
            playgroundChatRecord.setCreateTime(Optional.ofNullable(chatRecordVO.getCreateTime()).orElse(new Date()));
            playgroundChatRecord.setModifyTime(playgroundChatRecord.getCreateTime());
        } else {
            playgroundChatRecord.setModifyTime(new Date());
        }
        return playgroundChatRecord;
    }

    private ChatRecordVO covert2VO(SophonPlaygroundChatRecord playgroundChatRecord) {
        ChatRecordVO chatRecordVO = new ChatRecordVO();
        chatRecordVO.setId(playgroundChatRecord.getId());
        chatRecordVO.setCompleteContent(JSON.parseArray(playgroundChatRecord.getCompleteContent(), Object.class));
        chatRecordVO.setModelArgs(JSON.parseObject(playgroundChatRecord.getModelArgs(), new TypeReference<Map<String, Object>>(){}));
        chatRecordVO.setPromptContent(playgroundChatRecord.getPromptContent());
        chatRecordVO.setModifyTime(playgroundChatRecord.getModifyTime());
        chatRecordVO.setCreateTime(playgroundChatRecord.getCreateTime());
        chatRecordVO.setUserId(playgroundChatRecord.getUserId());
        chatRecordVO.setSessionId(playgroundChatRecord.getSessionId());
        chatRecordVO.setPromptUid(playgroundChatRecord.getPromptUid());
        chatRecordVO.setPromptVersion(playgroundChatRecord.getPromptVersion());
        chatRecordVO.setName(playgroundChatRecord.getName());
        chatRecordVO.setExtra(playgroundChatRecord.getExtra());
        chatRecordVO.setPromptDynamicValues(JSON.parseObject(playgroundChatRecord.getPromptDynamicValues(), new TypeReference<Map<String, Object>>(){}));
        chatRecordVO.setIsShared(playgroundChatRecord.getIsShared());
        chatRecordVO.setChatId(playgroundChatRecord.getChatId());

        return chatRecordVO;
    }

    private ChatRecordSimpleVO covert2SimpleVO(SophonPlaygroundChatRecord playgroundChatRecord) {
        ChatRecordSimpleVO chatRecordVO = new ChatRecordSimpleVO();
        chatRecordVO.setId(playgroundChatRecord.getId());
        chatRecordVO.setModifyTime(playgroundChatRecord.getModifyTime());
        chatRecordVO.setCreateTime(playgroundChatRecord.getCreateTime());
        chatRecordVO.setUserId(playgroundChatRecord.getUserId());
        chatRecordVO.setSessionId(playgroundChatRecord.getSessionId());
        chatRecordVO.setName(playgroundChatRecord.getName());
        chatRecordVO.setExtra(playgroundChatRecord.getExtra());
        chatRecordVO.setIsShared(playgroundChatRecord.getIsShared());
        chatRecordVO.setChatId(playgroundChatRecord.getChatId());

        return chatRecordVO;
    }
}


