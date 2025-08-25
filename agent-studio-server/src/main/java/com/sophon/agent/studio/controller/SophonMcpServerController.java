package com.sophon.agent.studio.controller;

import com.sophon.agent.studio.dto.McpServerCreateRequest;
import com.sophon.agent.studio.dto.McpServerResponse;
import com.sophon.agent.studio.dto.McpServerUpdateRequest;
import com.sophon.agent.studio.dto.ResponseDTO;
import com.sophon.agent.studio.service.SophonMcpServerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/mcp-servers")
@Tag(name = "MCP服务器管理", description = "MCP服务器的增删改查接口")
public class SophonMcpServerController {

    @Autowired
    private SophonMcpServerService mcpServerService;

    @GetMapping
    @Operation(summary = "获取所有MCP服务器", description = "获取所有未删除的MCP服务器列表")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "获取成功", 
                    content = @Content(mediaType = "application/json", 
                    schema = @Schema(implementation = ResponseDTO.class))),
        @ApiResponse(responseCode = "500", description = "服务器内部错误")
    })
    public ResponseDTO<List<McpServerResponse>> getAllMcpServers() {
        List<McpServerResponse> servers = mcpServerService.getAllMcpServers();
        return ResponseDTO.success("获取MCP服务器列表成功", servers);
    }

    @GetMapping("/{id}")
    @Operation(summary = "根据ID获取MCP服务器", description = "根据主键ID获取单个MCP服务器详细信息")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "获取成功"),
        @ApiResponse(responseCode = "404", description = "MCP服务器不存在"),
        @ApiResponse(responseCode = "500", description = "服务器内部错误")
    })
    public ResponseDTO<McpServerResponse> getMcpServerById(
            @Parameter(description = "MCP服务器ID", example = "1", required = true)
            @PathVariable Long id) {
        McpServerResponse server = mcpServerService.getMcpServerByIdWithConvert(id);
        return ResponseDTO.success("获取MCP服务器成功", server);
    }

    @PostMapping("/createMcpServer")
    @Operation(summary = "创建MCP服务器", description = "创建新的MCP服务器配置")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "创建成功"),
        @ApiResponse(responseCode = "400", description = "请求参数错误"),
        @ApiResponse(responseCode = "409", description = "MCP服务器标识已存在"),
        @ApiResponse(responseCode = "500", description = "服务器内部错误")
    })
    public ResponseDTO<McpServerResponse> createMcpServer(
            @RequestBody McpServerCreateRequest request) {
        McpServerResponse createdServer = mcpServerService.createMcpServer(request);
        return ResponseDTO.success("创建MCP服务器成功", createdServer);
    }

    @PutMapping("/updateMcpServer/{id}")
    @Operation(summary = "更新MCP服务器", description = "根据ID更新MCP服务器信息")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "更新成功"),
        @ApiResponse(responseCode = "400", description = "请求参数错误"),
        @ApiResponse(responseCode = "404", description = "MCP服务器不存在"),
        @ApiResponse(responseCode = "409", description = "MCP服务器标识已存在"),
        @ApiResponse(responseCode = "500", description = "服务器内部错误")
    })
    public ResponseDTO<McpServerResponse> updateMcpServer(
            @Parameter(description = "MCP服务器ID", example = "1", required = true)
            @RequestBody McpServerUpdateRequest updateRequest) {
        McpServerResponse updatedServer = mcpServerService.updateMcpServer( updateRequest);
        return ResponseDTO.success("更新MCP服务器成功", updatedServer);
    }

    @DeleteMapping("/deleteMcpServer/{id}")
    @Operation(summary = "删除MCP服务器", description = "根据ID软删除MCP服务器，如果服务器下有工具则不允许删除")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "删除成功"),
        @ApiResponse(responseCode = "404", description = "MCP服务器不存在"),
        @ApiResponse(responseCode = "409", description = "服务器下有工具，无法删除"),
        @ApiResponse(responseCode = "500", description = "服务器内部错误")
    })
    public ResponseDTO<Boolean> deleteMcpServer(
            @Parameter(description = "MCP服务器ID", example = "1", required = true)
            @PathVariable Long id) {
        boolean deleted = mcpServerService.deleteMcpServer(id);
        return ResponseDTO.success("删除MCP服务器成功", deleted);
    }

    @GetMapping("/search")
    @Operation(summary = "搜索MCP服务器", description = "根据关键词和分类搜索MCP服务器")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "搜索成功"),
        @ApiResponse(responseCode = "500", description = "服务器内部错误")
    })
    public ResponseDTO<List<McpServerResponse>> searchMcpServers(
            @Parameter(description = "搜索关键词", example = "搜索")
            @RequestParam(required = false) String keyword,
            @Parameter(description = "分类名称", example = "search")
            @RequestParam(required = false) String category) {
        List<McpServerResponse> servers = mcpServerService.searchMcpServers(keyword, category);
        return ResponseDTO.success("搜索MCP服务器成功", servers);
    }
}