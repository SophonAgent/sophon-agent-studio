package com.sophon.agent.studio.controller;

import com.sophon.agent.studio.dto.McpToolCallRequest;
import com.sophon.agent.studio.dto.ResponseDTO;
import com.sophon.agent.studio.service.mcp.McpClientWrapper;
import io.modelcontextprotocol.spec.McpSchema;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/mcp/wrapper")
@Tag(name = "MCP工具管理", description = "MCP工具列表查询和调用接口")
@Validated
public class McpToolController {

    @Autowired
    private McpClientWrapper mcpClientWrapper;

    @PostMapping("/toolList")
    @Operation(summary = "获取MCP工具列表", description = "根据MCP服务器端点URL获取所有可用工具列表")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "获取成功",
                    content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = ResponseDTO.class))),
        @ApiResponse(responseCode = "400", description = "请求参数错误"),
        @ApiResponse(responseCode = "500", description = "服务器内部错误")
    })
    public ResponseDTO<List<McpSchema.Tool>> getToolList(@RequestParam("endpointUrl") String endpointUrl) {
        return ResponseDTO.success(mcpClientWrapper.toolList(endpointUrl));
    }

    @PostMapping("/toolCall")
    @Operation(summary = "调用MCP工具", description = "调用指定的MCP工具并返回执行结果")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "调用成功",
                    content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = ResponseDTO.class))),
        @ApiResponse(responseCode = "400", description = "请求参数错误"),
        @ApiResponse(responseCode = "500", description = "服务器内部错误")
    })
    public ResponseDTO<McpSchema.CallToolResult> callTool( @RequestBody McpToolCallRequest request) {
        return ResponseDTO.success(mcpClientWrapper.toolCall(request.getEndpointUrl(), request.getToolName(), request.getArgs()));
    }
}