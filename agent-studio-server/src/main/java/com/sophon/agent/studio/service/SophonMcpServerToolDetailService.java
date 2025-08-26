package com.sophon.agent.studio.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.TypeReference;
import com.sophon.agent.mapper.SophonMcpServerMapper;
import com.sophon.agent.mapper.SophonMcpServerToolDetailMapper;
import com.sophon.agent.model.SophonMcpServer;
import com.sophon.agent.model.SophonMcpServerExample;
import com.sophon.agent.model.SophonMcpServerToolDetail;
import com.sophon.agent.model.SophonMcpServerToolDetailExample;
import com.sophon.agent.studio.dto.McpToolCreateRequest;
import com.sophon.agent.studio.dto.McpToolResponse;
import com.sophon.agent.studio.dto.McpToolUpdateRequest;
import com.sophon.agent.studio.exception.ResourceNotFoundException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class SophonMcpServerToolDetailService {

    @Autowired
    private SophonMcpServerToolDetailMapper toolDetailMapper;

    @Autowired
    private SophonMcpServerMapper mcpServerMapper;

    public List<McpToolResponse> getAllToolDetails() {
        SophonMcpServerToolDetailExample example = new SophonMcpServerToolDetailExample();
        example.createCriteria().andStatusNotEqualTo(-1);
        example.setOrderByClause("create_time DESC");
        
        return toolDetailMapper.selectByExample(example).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public SophonMcpServerToolDetail getToolDetailById(Long id) {
        SophonMcpServerToolDetail tool = toolDetailMapper.selectByPrimaryKey(id);
        if (tool == null || tool.getStatus() == -1) {
            throw new ResourceNotFoundException("MCP工具不存在: " + id);
        }
        return tool;
    }
    public McpToolResponse getToolDetailByIdWithConvert(Long id) {
        SophonMcpServerToolDetail tool = getToolDetailById(id);
        return convertToResponse(tool);
    }

    public McpToolResponse getToolDetailByQualifiedName(String qualifiedName, String mcpServerQualifiedName) {
        SophonMcpServerToolDetailExample example = new SophonMcpServerToolDetailExample();
        example.createCriteria()
                .andQualifiedNameEqualTo(qualifiedName)
                .andServerQualifiedNameEqualTo(mcpServerQualifiedName)
                .andStatusNotEqualTo(-1);
        
        List<SophonMcpServerToolDetail> tools = toolDetailMapper.selectByExample(example);
        return tools.isEmpty() ? null : convertToResponse(tools.get(0));
    }

    public List<McpToolResponse> getToolDetailsByServerQualifiedName(String serverQualifiedName) {
        SophonMcpServerToolDetailExample example = new SophonMcpServerToolDetailExample();
        example.createCriteria()
                .andServerQualifiedNameEqualTo(serverQualifiedName)
                .andStatusNotEqualTo(-1);
        example.setOrderByClause("display_name ASC");
        
        return toolDetailMapper.selectByExample(example).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public McpToolResponse createToolDetail(McpToolCreateRequest request) {
        // Validate server exists
        SophonMcpServerExample serverExample = new SophonMcpServerExample();
        serverExample.createCriteria()
                .andQualifiedNameEqualTo(request.getServerQualifiedName())
                .andStatusNotEqualTo(-1);
        
        List<SophonMcpServer> servers = mcpServerMapper.selectByExample(serverExample);
        if (servers.isEmpty()) {
            throw new ResourceNotFoundException("MCP服务器不存在: " + request.getServerQualifiedName());
        }
        
        // Check unique qualified name
        if (getToolDetailByQualifiedName(request.getQualifiedName(), request.getServerQualifiedName()) != null) {
            throw new IllegalArgumentException("MCP工具标识已存在: " + request.getQualifiedName());
        }
        
        SophonMcpServerToolDetail toolDetail = new SophonMcpServerToolDetail();
        BeanUtils.copyProperties(request, toolDetail);
        
        toolDetail.setCreateTime(new Date());
        toolDetail.setModifyTime(new Date());
        toolDetail.setStatus(0);
        if(request.getRequestHeaders() != null){
            toolDetail.setRequestHeaders(JSON.toJSONString(request.getRequestHeaders()));
        }else{
            toolDetail.setRequestHeaders("{}");
        }

        toolDetailMapper.insertSelective(toolDetail);
        return convertToResponse(toolDetail);
    }

    @Transactional
    public void updateToolDetail(Long id, McpToolUpdateRequest updateRequest) {
        SophonMcpServerToolDetail existing = getToolDetailById(id);

        // Check if qualified_name is being changed and if it's unique
        if (updateRequest.getQualifiedName() != null 
                && !updateRequest.getQualifiedName().equals(existing.getQualifiedName())) {
            if (getToolDetailByQualifiedName(updateRequest.getQualifiedName(), updateRequest.getServerQualifiedName()) != null) {
                throw new IllegalArgumentException("MCP工具标识已存在: " + updateRequest.getQualifiedName());
            }
        }
        
        SophonMcpServerToolDetail toolDetail = new SophonMcpServerToolDetail();
        toolDetail.setId(id);
        
        if (updateRequest.getQualifiedName() != null) {
            toolDetail.setQualifiedName(updateRequest.getQualifiedName());
        }
        if (updateRequest.getDisplayName() != null) {
            toolDetail.setDisplayName(updateRequest.getDisplayName());
        }
        if (updateRequest.getDescription() != null) {
            toolDetail.setDescription(updateRequest.getDescription());
        }
        if (updateRequest.getInputSchema() != null) {
            toolDetail.setInputSchema(updateRequest.getInputSchema());
        }
        if (updateRequest.getProxyType() != null) {
            toolDetail.setProxyType(updateRequest.getProxyType());
        }
        if (updateRequest.getRequestMethod() != null) {
            toolDetail.setRequestMethod(updateRequest.getRequestMethod());
        }
        if (updateRequest.getRequestUrl() != null) {
            toolDetail.setRequestUrl(updateRequest.getRequestUrl());
        }
        if (updateRequest.getRequestHeaders() != null) {
            toolDetail.setRequestHeaders(JSON.toJSONString(updateRequest.getRequestHeaders()));

        }
        if (updateRequest.getRequestJson() != null) {
            toolDetail.setRequestJson(updateRequest.getRequestJson());
        }
        if (updateRequest.getResponseJson() != null) {
            toolDetail.setResponseJson(updateRequest.getResponseJson());
        }
        
        toolDetail.setModifyTime(new Date());
        toolDetail.setModifyUser(updateRequest.getModifyUser() != null ? updateRequest.getModifyUser() : "system");
        
        toolDetailMapper.updateByPrimaryKeySelective(toolDetail);
    }

    private McpToolResponse convertToResponse(SophonMcpServerToolDetail toolDetail) {
        McpToolResponse response = new McpToolResponse();
        BeanUtils.copyProperties(toolDetail, response);
        response.setRequestHeaders(JSON.parseObject(toolDetail.getRequestHeaders(), new TypeReference<Map<String, String>>() {}));
        return response;
    }

    @Transactional
    public boolean deleteToolDetail(Long id) {
        getToolDetailById(id); // Validate exists
        
        SophonMcpServerToolDetail tool = new SophonMcpServerToolDetail();
        tool.setId(id);
        tool.setStatus(-1);
        tool.setModifyTime(new Date());
        tool.setModifyUser("system");
        
        int result = toolDetailMapper.updateByPrimaryKeySelective(tool);
        return result > 0;
    }

    public List<McpToolResponse> searchToolDetails(String keyword, String serverQualifiedName) {
        SophonMcpServerToolDetailExample example = new SophonMcpServerToolDetailExample();
        SophonMcpServerToolDetailExample.Criteria criteria = example.createCriteria();
        criteria.andStatusNotEqualTo(-1);
        
        if (serverQualifiedName != null && !serverQualifiedName.trim().isEmpty()) {
            criteria.andServerQualifiedNameEqualTo(serverQualifiedName.trim());
        }
        
        if (keyword != null && !keyword.trim().isEmpty()) {
            criteria.andDisplayNameLike("%" + keyword.trim() + "%");
        }
        
        example.setOrderByClause("create_time DESC");
        
        return toolDetailMapper.selectByExample(example).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Transactional
    public boolean deleteToolDetailsByServerQualifiedName(String serverQualifiedName) {
        SophonMcpServerToolDetailExample example = new SophonMcpServerToolDetailExample();
        example.createCriteria()
                .andServerQualifiedNameEqualTo(serverQualifiedName)
                .andStatusNotEqualTo(-1);
        
        List<SophonMcpServerToolDetail> tools = toolDetailMapper.selectByExample(example);
        
        for (SophonMcpServerToolDetail tool : tools) {
            deleteToolDetail(tool.getId());
        }
        
        return true;
    }
}