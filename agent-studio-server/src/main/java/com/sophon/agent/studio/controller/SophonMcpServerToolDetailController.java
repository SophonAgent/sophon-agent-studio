package com.sophon.agent.studio.controller;

import com.sophon.agent.studio.dto.McpToolCreateRequest;
import com.sophon.agent.studio.dto.McpToolResponse;
import com.sophon.agent.studio.dto.McpToolUpdateRequest;
import com.sophon.agent.studio.dto.ResponseDTO;
import com.sophon.agent.studio.service.SophonMcpServerToolDetailService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/mcp-tools")
@Tag(name = "MCP工具管理", description = "MCP工具详情的增删改查接口")
public class SophonMcpServerToolDetailController {

    @Autowired
    private SophonMcpServerToolDetailService toolDetailService;

    @GetMapping("/{id}")
    @Operation(summary = "根据ID获取MCP工具", description = "根据主键ID获取单个MCP工具详细信息")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "获取成功"),
        @ApiResponse(responseCode = "404", description = "MCP工具不存在"),
        @ApiResponse(responseCode = "500", description = "服务器内部错误")
    })
    public ResponseDTO<McpToolResponse> getToolDetailById(
            @Parameter(description = "MCP工具ID", example = "1", required = true)
            @PathVariable Long id) {
        McpToolResponse tool = toolDetailService.getToolDetailByIdWithConvert(id);
        return ResponseDTO.success("获取MCP工具成功", tool);
    }
    @GetMapping("/getMcpServerToolDetail/{serverQualifiedName}")
    @Operation(summary = "根据服务器标识获取工具", description = "获取指定MCP服务器下的所有工具")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "获取成功"),
        @ApiResponse(responseCode = "404", description = "MCP服务器不存在"),
        @ApiResponse(responseCode = "500", description = "服务器内部错误")
    })
    public ResponseDTO<List<McpToolResponse>> getToolDetailsByServerQualifiedName(
            @Parameter(description = "MCP服务器标识名", example = "brave-search", required = true)
            @PathVariable String serverQualifiedName) {
        List<McpToolResponse> tools = toolDetailService.getToolDetailsByServerQualifiedName(serverQualifiedName);
        return ResponseDTO.success("获取服务器工具成功", tools);
    }

    @PostMapping("/createToolDetail")
    @Operation(summary = "创建MCP工具", description = "创建新的MCP工具详情")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "创建成功"),
        @ApiResponse(responseCode = "400", description = "请求参数错误"),
        @ApiResponse(responseCode = "404", description = "关联的MCP服务器不存在"),
        @ApiResponse(responseCode = "409", description = "MCP工具标识已存在"),
        @ApiResponse(responseCode = "500", description = "服务器内部错误")
    })
    public ResponseDTO<McpToolResponse> createToolDetail(
            @RequestBody McpToolCreateRequest request) {
        McpToolResponse createdTool = toolDetailService.createToolDetail(request);
        return ResponseDTO.success("创建MCP工具成功", createdTool);
    }

    @PutMapping("/updateToolDetail/{id}")
    @Operation(summary = "更新MCP工具", description = "根据ID更新MCP工具信息")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "更新成功"),
        @ApiResponse(responseCode = "400", description = "请求参数错误"),
        @ApiResponse(responseCode = "404", description = "MCP工具或关联服务器不存在"),
        @ApiResponse(responseCode = "409", description = "MCP工具标识已存在"),
        @ApiResponse(responseCode = "500", description = "服务器内部错误")
    })
    public ResponseDTO<Boolean> updateToolDetail(
            @Parameter(description = "MCP工具ID", example = "1", required = true)
            @PathVariable Long id,
            @RequestBody McpToolUpdateRequest updateRequest) {
        toolDetailService.updateToolDetail(id, updateRequest);
        return ResponseDTO.success("更新MCP工具成功", true);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "删除MCP工具", description = "根据ID软删除MCP工具")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "删除成功"),
        @ApiResponse(responseCode = "404", description = "MCP工具不存在"),
        @ApiResponse(responseCode = "500", description = "服务器内部错误")
    })
    public ResponseDTO<Boolean> deleteToolDetail(
            @Parameter(description = "MCP工具ID", example = "1", required = true)
            @PathVariable Long id) {
        boolean deleted = toolDetailService.deleteToolDetail(id);
        return ResponseDTO.success("删除MCP工具成功", deleted);
    }
}