package com.sophon.agent.studio.service.prompt;


import com.alibaba.fastjson.JSON;
import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.sophon.agent.mapper.SophonPromptConfigDetailMapper;
import com.sophon.agent.mapper.SophonPromptConfigMapper;
import com.sophon.agent.model.SophonPromptConfig;
import com.sophon.agent.model.SophonPromptConfigDetail;
import com.sophon.agent.model.SophonPromptConfigDetailExample;
import com.sophon.agent.model.SophonPromptConfigExample;
import com.sophon.agent.studio.dto.common.PageInfoVO;
import com.sophon.agent.studio.dto.prompt.*;
import com.sophon.agent.studio.enums.StatusEnum;
import com.sophon.agent.studio.exception.BusinessException;
import com.sophon.agent.studio.service.ModelExecutionService;
import com.sophon.agent.studio.util.UuidUtil;
import jakarta.annotation.Resource;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
 * prompt配置管理service
 * @author: chun
 * @date: 2025/8/27
 * @Description:
 * @version: V1.0
 */
@Service
@Slf4j
public class PromptConfigService {
    @Resource
    private SophonPromptConfigMapper promptConfigMapper;

    @Resource
    private SophonPromptConfigDetailMapper promptConfigDetailMapper;

    @Resource
    private ModelExecutionService modelExecutionService;

    @Resource
    private PromptGenerateService promptGenerateService;
    @Value("${prompt.generate.modeId}")
    private long modelConfigId;

    public List<PromptConfigVO> queryPromptConfigList(long tenantId) {
        List<SophonPromptConfig> promptConfigs = getPromptConfigList(tenantId);

        if (null == promptConfigs || promptConfigs.size()==0) {
            return new ArrayList<>();
        }

        List<PromptConfigVO> promptConfigVOS = new ArrayList<>(promptConfigs.size());

        for (SophonPromptConfig promptConfig : promptConfigs) {
            promptConfigVOS.add(convertPromptConfigVO(promptConfig));
        }

        return promptConfigVOS;
    }

    public List<PromptConfigDetailVO> queryPromptConfigDetails(String uid) {
        return queryPromptConfigDetails( uid, StatusEnum.ENABLE.getStatus(), null);
    }

    @Transactional(rollbackFor = Exception.class)
    public void addPromptConfig(PromptConfigRequestDTO request) {
        add(request, request.getBaseConfig().getUid());
    }

    @Transactional(rollbackFor = Exception.class)
    public void updatePromptConfig(PromptConfigRequestDTO request) {

        PromptConfigVO promptConfigVO = request.getBaseConfig();

        String uid = promptConfigVO.getUid();
        if (StringUtils.isBlank(uid)) {
            throw new BusinessException("基础信息的uid不能为空");
        }
        update(request, uid);
    }

    public boolean delPromptConfig(String uid) {
        SophonPromptConfigExample example = new SophonPromptConfigExample();
        SophonPromptConfigExample.Criteria criteria = example.createCriteria();
        criteria.andUidEqualTo(uid);
        int cnt = promptConfigMapper.deleteByExample(example);

        if (cnt<=0) {
            throw new BusinessException("不存在需要删除的prompt");
        }

        SophonPromptConfigDetailExample detailExample = new SophonPromptConfigDetailExample();
        SophonPromptConfigDetailExample.Criteria detailExampleCriteria = detailExample.createCriteria();
        detailExampleCriteria.andPromptUidEqualTo(uid);
        int cnt1 = promptConfigDetailMapper.deleteByExample(detailExample);
        return cnt > 0 && cnt1 > 0;
    }

    public PromptConfigHistoryListVO queryPromptModelHistorys(PromptHistoryQueryResquest request) {
        if (StringUtils.isBlank(request.getUid())) {
            throw new BusinessException("uid不能为空");
        }
        if (request.getPageNum() == null || request.getPageSize() == null) {
            throw new BusinessException("当前页面和页面大小不能为空");
        }
        SophonPromptConfigDetailExample example = new SophonPromptConfigDetailExample();
        example.createCriteria().andPromptUidEqualTo(request.getUid());
        example.setOrderByClause(" id desc");

        PageInfo<SophonPromptConfigDetail> infos = PageHelper.startPage(request.getPageNum(), request.getPageSize()).
                doSelectPageInfo(()-> promptConfigDetailMapper.selectByExample(example));

        List<SophonPromptConfigDetail> promptModels = infos.getList();

        PromptConfigHistoryListVO promptModelHistoryListVO = new PromptConfigHistoryListVO();
        PageInfoVO pageInfo = new PageInfoVO();
        BeanUtils.copyProperties(infos, pageInfo);
        promptModelHistoryListVO.setPageInfo(pageInfo);

        List<PromptConfigHistoryVO> historyVOS = new ArrayList<>();
        promptModelHistoryListVO.setHistoryVOS(historyVOS);

        for (SophonPromptConfigDetail promptConfigDetail: promptModels) {
            PromptConfigHistoryVO promptModelHistoryVO = new PromptConfigHistoryVO();
            promptModelHistoryVO.setVersion(promptConfigDetail.getVersion());
            promptModelHistoryVO.setPromptUid(request.getUid());
            promptModelHistoryVO.setStatus(promptConfigDetail.getStatus());
            promptModelHistoryVO.setCreateTime(promptConfigDetail.getCreateTime());
            promptModelHistoryVO.setCreateUser(promptConfigDetail.getCreateUser());

            List<PromptConfigDetailVO> promptModelVOS = new ArrayList<>();
            promptModelVOS.add(convertPromptModelVO(promptConfigDetail));

            promptModelHistoryVO.setPromptDetails(promptModelVOS);
            historyVOS.add(promptModelHistoryVO);
        }
        //设置prompt的classify
        SophonPromptConfigExample promptConfigExample = new SophonPromptConfigExample();
        promptConfigExample.createCriteria()
                .andUidEqualTo(request.getUid())
                .andStatusEqualTo(1);
        List<SophonPromptConfig> promptConfigList = promptConfigMapper.selectByExample(promptConfigExample);
        if(CollectionUtils.isEmpty(promptConfigList)){
            throw new BusinessException("找不到对应的prompt场景");
        }
        SophonPromptConfig promptConfig = promptConfigList.get(0);
        promptModelHistoryListVO.setClassify(promptConfig.getClassify());

        return promptModelHistoryListVO;
    }

    @Transactional(rollbackFor = Exception.class)
    public void backHistoryPromptModel(BackHistoryPromptResquest request) {
        if (StringUtils.isBlank(request.getUid())) {
            throw new BusinessException("uid不能为空");
        }

        if (request.getVersion()<1) {
            throw new BusinessException("version不能小于1");
        }
        SophonPromptConfig promptConfig = queryPromptConfigByUid(request.getUid());
        if (null==promptConfig) {
            throw new BusinessException("不存在该配置");
        }
        PromptConfigRequestDTO promptConfigRequestDTO = new PromptConfigRequestDTO();
        promptConfigRequestDTO.setBaseConfig(convertPromptConfigVO(promptConfig));

        List<PromptConfigDetailVO> promptModelVOS = queryPromptConfigDetails(request.getUid(),null, request.getVersion());

        if (CollectionUtils.isEmpty(promptModelVOS)) {
            throw new BusinessException("不存在该版本："+request.getVersion());
        }
        promptConfigRequestDTO.setDetail(promptModelVOS.get(0));

        String comment = String.format("回退至%s版本", request.getVersion());
        promptConfigRequestDTO.getDetail().setComment(comment);
        updatePromptConfig(promptConfigRequestDTO);
    }

    public PromptGenerateVO generatePromptTemplate(PromptGenerateRequest request) {

        if (StringUtils.isBlank(request.getUserPrompt())) {
            throw new BusinessException("输入内容不允许为空");
        }

        PromptGenerateVO promptGenerateVO = promptGenerateService.getGenerateTemplate(request.getFramework());

        promptGenerateVO.setModelConfigId(modelConfigId);
        return promptGenerateVO;
    }

    private void add(PromptConfigRequestDTO request, String uid){
        String userId = "system";

        PromptConfigVO promptConfigVO = request.getBaseConfig();

        PromptConfigDetailVO detail = request.getDetail();

        if (StringUtils.isBlank(uid)) {
            uid = UuidUtil.getUuid();
        }
        checkUid(uid);
        SophonPromptConfig promptConfig = convertAddPromptConfig(promptConfigVO, userId, uid);
        promptConfigMapper.insertSelective(promptConfig);

        SophonPromptConfigDetail promptConfigDetail = convertAddPromptModel(detail, userId, uid, 1);
        promptConfigDetailMapper.insertSelective(promptConfigDetail);
    }


    private void checkUid(String uid){
        SophonPromptConfigExample example = new SophonPromptConfigExample();
        SophonPromptConfigExample.Criteria criteria = example.createCriteria();
        criteria.andStatusEqualTo(StatusEnum.ENABLE.getStatus())
                .andUidEqualTo(uid);

        if (promptConfigMapper.countByExample(example)>0) {
            throw new BusinessException("已存在相同场景标识【"+uid+"】配置，请检查");
        }
    }


    private void update(PromptConfigRequestDTO request, String uid) {
        String userId = "system";

        PromptConfigVO promptConfigVO = request.getBaseConfig();

        if (StringUtils.isBlank(uid)) {
            uid = promptConfigVO.getUid();
        }

        SophonPromptConfig promptConfig = queryPromptConfigByUid(promptConfigVO.getUid());
        if (null == promptConfig) {
            throw new BusinessException("数据非法");
        }

        PromptConfigDetailVO promptConfigDetailVO = request.getDetail();

        SophonPromptConfig newPromptConfig = convertUpdatePromptConfig(promptConfigVO, promptConfig.getId());
        promptConfigMapper.updateByPrimaryKeySelective(newPromptConfig);


        PromptConfigDetailVO detailVO = request.getDetail();

        SophonPromptConfigDetailExample example = new SophonPromptConfigDetailExample();
        SophonPromptConfigDetailExample.Criteria criteria = example.createCriteria();
        criteria.andPromptUidEqualTo(uid)
                .andStatusEqualTo(StatusEnum.ENABLE.getStatus());
        example.setOrderByClause("id desc");

        List<SophonPromptConfigDetail> oldPromptConfigDetails = promptConfigDetailMapper.selectByExample(example);
        SophonPromptConfigDetail oldPrompt = oldPromptConfigDetails.get(0);

        if (isChangeVersion(detailVO, oldPrompt)) {
            //更新老的为失效
            SophonPromptConfigDetail old = new SophonPromptConfigDetail();
            old.setId(oldPrompt.getId());
            old.setStatus(StatusEnum.DISABLE.getStatus());
            promptConfigDetailMapper.updateByPrimaryKeySelective(old);

            Integer newVersion = oldPrompt.getVersion()+1;

            //插入新的记录，版本+1
            SophonPromptConfigDetail promptModel = convertAddPromptModel(detailVO, userId, uid, newVersion);
            promptConfigDetailMapper.insertSelective(promptModel);
        }
    }

    /**
     * 判断是否需要更新
     * @param promptModelVO
     * @param oldPrompt
     * @return
     */
    private boolean isChangeVersion(PromptConfigDetailVO promptModelVO, SophonPromptConfigDetail oldPrompt ){
        if (!Objects.equals(promptModelVO.getPromptContent() ,oldPrompt.getPromptContent())) {
            return true;
        }
        return false;
    }

    private List<PromptConfigDetailVO> queryPromptConfigDetails(String uid, Integer status, Integer version) {
        SophonPromptConfigDetailExample example = new SophonPromptConfigDetailExample();
        SophonPromptConfigDetailExample.Criteria criteria = example.createCriteria();
        //不带上租户id，否则查不到系统的prompt
        criteria.andPromptUidEqualTo(uid);

        if (null!=status) {
            criteria.andStatusEqualTo(status);
        }

        if (null!=version) {
            criteria.andVersionEqualTo(version);
        }

        List<SophonPromptConfigDetail> promptConfigDetails = promptConfigDetailMapper.selectByExample(example);

        List<PromptConfigDetailVO> promptModelVOS = new ArrayList<>(promptConfigDetails.size());

        for (SophonPromptConfigDetail promptModel : promptConfigDetails) {
            promptModelVOS.add(convertPromptModelVO(promptModel));
        }

        return promptModelVOS;
    }


    private List<SophonPromptConfig> getPromptConfigList(long tenantId){
        SophonPromptConfigExample example = new SophonPromptConfigExample();
        example.setOrderByClause("create_time desc");
        SophonPromptConfigExample.Criteria criteria = example.createCriteria();
        criteria.andStatusEqualTo(StatusEnum.ENABLE.getStatus());

        List<SophonPromptConfig> promptConfigs = promptConfigMapper.selectByExample(example);
        if (CollectionUtils.isEmpty(promptConfigs)) {
            return null;
        }
        return promptConfigs;
    }

    /**
     *
     * @param uid
     * @return
     */
    private SophonPromptConfig queryPromptConfigByUid(String uid){
        if (StringUtils.isBlank(uid)) {
            throw new BusinessException("uid不能为空");
        }
        SophonPromptConfigExample example = new SophonPromptConfigExample();
        SophonPromptConfigExample.Criteria criteria = example.createCriteria();
        criteria.andStatusIn(Arrays.asList(StatusEnum.ENABLE.getStatus()))
                .andUidEqualTo(uid);

        List<SophonPromptConfig> promptConfigs = promptConfigMapper.selectByExample(example);
        if (CollectionUtils.isEmpty(promptConfigs)) {
            return null;
        }
        return promptConfigs.get(0);
    }

    private SophonPromptConfig convertAddPromptConfig(PromptConfigVO promptConfigVO, String userId, String uid){
        SophonPromptConfig promptConfig = new SophonPromptConfig();
        promptConfig.setCreateTime(new Date());
        promptConfig.setModifyTime(new Date());
        promptConfig.setCreateUser(userId);
        promptConfig.setUid(uid);
        promptConfig.setName(promptConfigVO.getName());
        promptConfig.setDescription(promptConfigVO.getDescription());
        promptConfig.setStatus(StatusEnum.ENABLE.getStatus());
        promptConfig.setClassify(promptConfigVO.getClassify());
        return promptConfig;
    }

    private SophonPromptConfig convertUpdatePromptConfig(PromptConfigVO promptConfigVO, long id){
        SophonPromptConfig promptConfig = new SophonPromptConfig();
        promptConfig.setModifyTime(new Date());
        promptConfig.setId(id);
        promptConfig.setName(promptConfigVO.getName());
        promptConfig.setDescription(promptConfigVO.getDescription());
        promptConfig.setClassify(promptConfigVO.getClassify());
        return promptConfig;
    }

    private SophonPromptConfigDetail convertAddPromptModel(PromptConfigDetailVO promptConfigDetailVO,String userId, String uid, Integer version){
        SophonPromptConfigDetail promptConfigDetail = new SophonPromptConfigDetail();
        promptConfigDetail.setCreateTime(new Date());
        promptConfigDetail.setModifyTime(new Date());
        promptConfigDetail.setPromptUid(uid);
        promptConfigDetail.setPromptContent(promptConfigDetailVO.getPromptContent());
        if (null!=promptConfigDetailVO.getContentPlaceholders()) {
            promptConfigDetail.setContentPlaceholder(JSON.toJSONString(promptConfigDetailVO.getContentPlaceholders()));
        }
        promptConfigDetail.setStatus(StatusEnum.ENABLE.getStatus());
        promptConfigDetail.setCreateUser(userId);
        promptConfigDetail.setVersion(version);
        promptConfigDetail.setComment(promptConfigDetailVO.getComment());
        promptConfigDetail.setFramework(null!=promptConfigDetailVO.getFramework()?promptConfigDetailVO.getFramework().name():null);
        return promptConfigDetail;
    }


    /**
     * prompt数据表对象转VO
     * @param promptConfig
     * @return
     */
    private PromptConfigVO convertPromptConfigVO(SophonPromptConfig promptConfig) {
        PromptConfigVO promptConfigVO = new PromptConfigVO();
        promptConfigVO.setUid(promptConfig.getUid());
        promptConfigVO.setName(promptConfig.getName());
        promptConfigVO.setDescription(promptConfig.getDescription());
        promptConfigVO.setCreateUser(promptConfig.getCreateUser());
        promptConfigVO.setCreateTime(promptConfig.getCreateTime());
        promptConfigVO.setClassify(promptConfig.getClassify());
        return promptConfigVO;
    }

    private PromptConfigDetailVO convertPromptModelVO(SophonPromptConfigDetail promptConfigDetail) {
        PromptConfigDetailVO promptConfigDetailVO = new PromptConfigDetailVO();
        promptConfigDetailVO.setId(promptConfigDetail.getId());
        promptConfigDetailVO.setCreateTime(promptConfigDetail.getCreateTime());
        promptConfigDetailVO.setPromptUid(promptConfigDetail.getPromptUid());
        promptConfigDetailVO.setPromptContent(promptConfigDetail.getPromptContent());

        String placeholder = promptConfigDetail.getContentPlaceholder();
        if (StringUtils.isNotBlank(placeholder)) {
            promptConfigDetailVO.setContentPlaceholders(JSON.parseArray(placeholder,String.class));
        }
        promptConfigDetailVO.setStatus(promptConfigDetail.getStatus());
        promptConfigDetailVO.setCreateUser(promptConfigDetail.getCreateUser());
        promptConfigDetailVO.setVersion(promptConfigDetail.getVersion());
        promptConfigDetailVO.setComment(promptConfigDetail.getComment());

        if (StringUtils.isNotBlank(promptConfigDetail.getFramework())) {
            promptConfigDetailVO.setFramework(PromptGenerateFrameworkEnum.valueOf(promptConfigDetail.getFramework()));
        }

        return promptConfigDetailVO;
    }

}