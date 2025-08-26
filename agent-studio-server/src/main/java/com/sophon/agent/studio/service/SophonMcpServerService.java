package com.sophon.agent.studio.service;

import com.sophon.agent.mapper.SophonMcpServerMapper;
import com.sophon.agent.mapper.SophonMcpServerToolDetailMapper;
import com.sophon.agent.model.SophonMcpServer;
import com.sophon.agent.model.SophonMcpServerExample;
import com.sophon.agent.studio.dto.McpServerCreateRequest;
import com.sophon.agent.studio.dto.McpServerResponse;
import com.sophon.agent.studio.dto.McpServerUpdateRequest;
import com.sophon.agent.studio.exception.BusinessException;
import com.sophon.agent.studio.exception.ResourceNotFoundException;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class SophonMcpServerService {
    @Autowired
    private SophonMcpServerMapper mcpServerMapper;
    @Autowired
    private SophonMcpServerToolDetailMapper toolDetailMapper;
    @Value("${server.base.host}")
    private String serverBaseHost;

    public List<McpServerResponse> getAllMcpServers() {
        SophonMcpServerExample example = new SophonMcpServerExample();
        example.createCriteria().andStatusNotEqualTo(-1);
        example.setOrderByClause("create_time DESC");
        
        return mcpServerMapper.selectByExample(example).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public McpServerResponse getMcpServerByIdWithConvert(Long id) {
        SophonMcpServer server = mcpServerMapper.selectByPrimaryKey(id);
        if (server == null || server.getStatus() == -1) {
            throw new ResourceNotFoundException("MCP服务器不存在: " + id);
        }
        return convertToResponse(server);
    }
    public SophonMcpServer getMcpServerById(Long id) {
        SophonMcpServer server = mcpServerMapper.selectByPrimaryKey(id);
        if (server == null || server.getStatus() == -1) {
            throw new ResourceNotFoundException("MCP服务器不存在: " + id);
        }
        return server;
    }

    public SophonMcpServer getMcpServerByQualifiedName(String qualifiedName) {
        SophonMcpServerExample example = new SophonMcpServerExample();
        example.createCriteria()
                .andQualifiedNameEqualTo(qualifiedName)
                .andStatusNotEqualTo(-1);
        
        List<SophonMcpServer> servers = mcpServerMapper.selectByExample(example);
        return servers.isEmpty() ? null : servers.get(0);
    }

    @Transactional
    public McpServerResponse createMcpServer(McpServerCreateRequest request) {
        // Validate unique qualified_name
        if (getMcpServerByQualifiedName(request.getQualifiedName()) != null) {
            throw new IllegalArgumentException("MCP服务器标识已存在: " + request.getQualifiedName());
        }

        SophonMcpServer server = new SophonMcpServer();
        BeanUtils.copyProperties(request, server);

        String randomQualifiedName = UUID.randomUUID().toString().replace("-", "").substring(0, 16);
        if("proxy".equalsIgnoreCase(request.getImplementType())) {
            String qualifiedName = request.getQualifiedName();
            //proxy场景自定义qualifiedName，需要检查是否存在
            if (StringUtils.isNotBlank(qualifiedName)) {
                SophonMcpServer mcpServer = getMcpServerByQualifiedName(qualifiedName);
                if (null!=mcpServer) {
                    throw new BusinessException("qualifiedName 为"+qualifiedName+"已存在，不允许重复");
                }
                randomQualifiedName = qualifiedName;
            }
            request.setEndpointUrl(serverBaseHost + "/" + randomQualifiedName + "/sse");
        }
        
        server.setCreateTime(new Date());
        server.setModifyTime(new Date());
        server.setStatus(0);
        
        mcpServerMapper.insertSelective(server);
        return convertToResponse(server);
    }

    @Transactional
    public McpServerResponse updateMcpServer( McpServerUpdateRequest updateRequest) {
        SophonMcpServer existing = getMcpServerById(updateRequest.getId());
        if(existing ==  null){
            throw new BusinessException("找不到对应的mcp server 配置");
        }

        SophonMcpServer server = new SophonMcpServer();
        server.setId(updateRequest.getId());
        if (updateRequest.getDisplayName() != null) {
            server.setDisplayName(updateRequest.getDisplayName());
        }
        if (updateRequest.getDescription() != null) {
            server.setDescription(updateRequest.getDescription());
        }
        if (updateRequest.getCategory() != null) {
            server.setCategory(updateRequest.getCategory());
        }
        if (updateRequest.getEndpointUrl() != null) {
            server.setEndpointUrl(updateRequest.getEndpointUrl());
        }
        if (updateRequest.getIconUrl() != null) {
            server.setIconUrl(updateRequest.getIconUrl());
        }
        if (updateRequest.getCommand() != null) {
            server.setCommand(updateRequest.getCommand());
        }
        if (updateRequest.getImplementType() != null) {
            server.setImplementType(updateRequest.getImplementType());
        }
        if (updateRequest.getContextConfig() != null) {
            server.setContextConfig(updateRequest.getContextConfig());
        }
        
        server.setModifyTime(new Date());
        server.setModifyUser(updateRequest.getModifyUser() != null ? updateRequest.getModifyUser() : "system");
        
        mcpServerMapper.updateByPrimaryKeySelective(server);
        return convertToResponse(getMcpServerById(updateRequest.getId()));
    }

    private McpServerResponse convertToResponse(SophonMcpServer server) {
        McpServerResponse response = new McpServerResponse();
        BeanUtils.copyProperties(server, response);
        return response;
    }

    @Transactional
    public boolean deleteMcpServer(Long id) {
        SophonMcpServer server = new SophonMcpServer();
        server.setId(id);
        server.setStatus(-1);
        server.setModifyTime(new Date());
        server.setModifyUser("system");
        
        int result = mcpServerMapper.updateByPrimaryKeySelective(server);
        return result > 0;
    }

    public List<McpServerResponse> searchMcpServers(String keyword, String category) {
        SophonMcpServerExample example = new SophonMcpServerExample();
        SophonMcpServerExample.Criteria criteria = example.createCriteria();
        criteria.andStatusNotEqualTo(-1);
        
        if (keyword != null && !keyword.trim().isEmpty()) {
            criteria.andDisplayNameLike("%" + keyword.trim() + "%");
        }
        
        if (category != null && !category.trim().isEmpty()) {
            criteria.andCategoryEqualTo(category.trim());
        }
        
        example.setOrderByClause("create_time DESC");
        
        return mcpServerMapper.selectByExample(example).stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }
}