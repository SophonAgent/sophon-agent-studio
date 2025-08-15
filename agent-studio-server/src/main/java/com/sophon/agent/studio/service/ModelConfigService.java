package com.sophon.agent.studio.service;

import com.sophon.agent.studio.dto.ModelConfigCreateRequest;
import com.sophon.agent.studio.dto.ModelConfigResponse;
import com.sophon.agent.studio.dto.ModelConfigUpdateRequest;
import com.sophon.agent.studio.exception.BusinessException;
import com.sophon.agent.studio.exception.ResourceNotFoundException;
import com.sophon.agent.studio.mapper.SophonAgentModelConfigMapper;
import com.sophon.agent.studio.model.SophonAgentModelConfig;
import com.sophon.agent.studio.model.SophonAgentModelConfigExample;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ModelConfigService {

    @Autowired
    private SophonAgentModelConfigMapper modelConfigMapper;

    public List<ModelConfigResponse> getAllModelConfigs() {
        SophonAgentModelConfigExample example = new SophonAgentModelConfigExample();
        example.createCriteria().andIsDeleteEqualTo(0);
        
        return modelConfigMapper.selectByExample(example)
            .stream()
            .map(this::convertToResponse)
            .collect(Collectors.toList());
    }

    public ModelConfigResponse getModelConfigById(Long id) {
        SophonAgentModelConfig model = modelConfigMapper.selectByPrimaryKey(id);
        if (model == null || model.getIsDelete() == 1) {
            return null;
        }
        return convertToResponse(model);
    }

    @Transactional
    public ModelConfigResponse createModelConfig(ModelConfigCreateRequest request) {
        SophonAgentModelConfig model = new SophonAgentModelConfig();
        
        model.setName(request.getName());
        model.setDescription(request.getDescription());
        model.setModelUrl(request.getModelUrl());
        model.setModelKey(request.getModelKey());
        model.setModelName(request.getModelName());
        model.setConfig(request.getConfig());
        model.setModalities(request.getModalities());
        model.setMaxCompletionTokenLimit(request.getMaxCompletionTokenLimit());
        model.setModelAppTag(request.getModelAppTag());
        model.setDefaultParams(request.getDefaultParams());
        model.setSupportStream(request.getSupportStream());
        model.setSupportSystem(request.getSupportSystem());
        model.setSupportReasoning(request.getSupportReasoning());
        model.setTimeoutSeconds(request.getTimeoutSeconds());
        
        model.setIsDelete(0);
        model.setCreateTime(new Date());
        model.setModifyTime(new Date());
        model.setCreateUser("system");
        model.setModifyUser("system");
        
        modelConfigMapper.insertSelective(model);
        
        return convertToResponse(model);
    }

    @Transactional
    public ModelConfigResponse updateModelConfig(Long id, ModelConfigUpdateRequest request) {
        SophonAgentModelConfig existing = modelConfigMapper.selectByPrimaryKey(id);
        if (existing == null || existing.getIsDelete() == 1) {
            throw new ResourceNotFoundException("模型配置不存在: " + id);
        }
        
        SophonAgentModelConfig model = new SophonAgentModelConfig();
        model.setId(id);
        
        if (request.getName() != null){
            model.setName(request.getName());
        }
        if (request.getDescription() != null){
            model.setDescription(request.getDescription());
        }
        if (request.getModelUrl() != null) {
            model.setModelUrl(request.getModelUrl());
        }
        if (request.getModelKey() != null) {
            model.setModelKey(request.getModelKey());
        }
        if (request.getModelName() != null) {
            model.setModelName(request.getModelName());
        }
        if (request.getConfig() != null) {
            model.setConfig(request.getConfig());
        }
        if (request.getModalities() != null) {
            model.setModalities(request.getModalities());
        }
        if (request.getMaxCompletionTokenLimit() != null) {
            model.setMaxCompletionTokenLimit(request.getMaxCompletionTokenLimit());
        }
        if (request.getModelAppTag() != null) {
            model.setModelAppTag(request.getModelAppTag());
        }
        if (request.getDefaultParams() != null) {
            model.setDefaultParams(request.getDefaultParams());
        }
        if (request.getSupportStream() != null) {
            model.setSupportStream(request.getSupportStream());
        }
        if (request.getSupportSystem() != null) {
            model.setSupportSystem(request.getSupportSystem());
        }
        if (request.getSupportReasoning() != null) {
            model.setSupportReasoning(request.getSupportReasoning());
        }
        if (request.getTimeoutSeconds() != null) {
            model.setTimeoutSeconds(request.getTimeoutSeconds());
        }
        
        model.setModifyTime(new Date());
        model.setModifyUser("system");
        
        modelConfigMapper.updateByPrimaryKeySelective(model);
        
        return convertToResponse(modelConfigMapper.selectByPrimaryKey(id));
    }

    @Transactional
    public boolean deleteModelConfig(Long id) {
        SophonAgentModelConfig existing = modelConfigMapper.selectByPrimaryKey(id);
        if (existing == null || existing.getIsDelete() == 1) {
            throw new ResourceNotFoundException("模型配置不存在: " + id);
        }
        
        SophonAgentModelConfig model = new SophonAgentModelConfig();
        model.setId(id);
        model.setIsDelete(1);
        model.setModifyTime(new Date());
        model.setModifyUser("system");
        
        int result = modelConfigMapper.updateByPrimaryKeySelective(model);
        if (result <= 0) {
            throw new BusinessException("删除模型配置失败");
        }
        return true;
    }

    public List<ModelConfigResponse> searchModelConfigs(String keyword) {
        SophonAgentModelConfigExample example = new SophonAgentModelConfigExample();
        SophonAgentModelConfigExample.Criteria criteria = example.createCriteria();
        criteria.andIsDeleteEqualTo(0);
        
        if (keyword != null && !keyword.trim().isEmpty()) {
            criteria.andNameLike("%" + keyword.trim() + "%");
        }
        
        example.setOrderByClause("create_time DESC");
        
        return modelConfigMapper.selectByExample(example)
            .stream()
            .map(this::convertToResponse)
            .collect(Collectors.toList());
    }

    private ModelConfigResponse convertToResponse(SophonAgentModelConfig model) {
        ModelConfigResponse response = new ModelConfigResponse();
        BeanUtils.copyProperties(model, response);
        
        // Hide sensitive information
//        if (response.getModelKey() != null) {
//            response.setModelKey("***");
//        }
//
        return response;
    }
}