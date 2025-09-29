package com.sophon.agent.studio.controller;

import com.sophon.agent.studio.dto.ResponseDTO;
import com.sophon.agent.studio.dto.prompt.*;
import com.sophon.agent.studio.service.prompt.PromptConfigService;
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
@RequestMapping("/api/v1/prompt-configs")
@Tag(name = "Prompt配置管理", description = "Prompt配置和版本管理接口")
@Validated
public class PromptConfigController {

    @Autowired
    private PromptConfigService promptConfigService;

    @GetMapping
    @Operation(summary = "获取所有Prompt配置列表", description = "获取所有生效的Prompt配置列表")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "获取成功",
                    content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = ResponseDTO.class))),
        @ApiResponse(responseCode = "500", description = "服务器内部错误")
    })
    public ResponseDTO<List<PromptConfigVO>> getAllPromptConfigs() {
        try {
            List<PromptConfigVO> configs = promptConfigService.queryPromptConfigList(0L);
            return ResponseDTO.success("获取Prompt配置列表成功", configs);
        } catch (Exception e) {
            return ResponseDTO.error("获取Prompt配置列表失败: " + e.getMessage());
        }
    }

    @GetMapping("/{uid}")
    @Operation(summary = "根据UID获取Prompt配置详情", description = "根据场景唯一标识获取Prompt配置详情")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "获取成功"),
        @ApiResponse(responseCode = "404", description = "配置不存在"),
        @ApiResponse(responseCode = "500", description = "服务器内部错误")
    })
    public ResponseDTO<List<PromptConfigDetailVO>> getPromptConfigDetails(
            @Parameter(description = "场景唯一标识", example = "weather-assistant", required = true)
            @PathVariable String uid) {
        try {
            List<PromptConfigDetailVO> details = promptConfigService.queryPromptConfigDetails(uid);
            return ResponseDTO.success("获取Prompt配置详情成功", details);
        } catch (Exception e) {
            return ResponseDTO.error("获取Prompt配置详情失败: " + e.getMessage());
        }
    }

    @PostMapping("/createPromptConfig")
    @Operation(summary = "创建Prompt配置", description = "创建新的Prompt配置")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "创建成功"),
        @ApiResponse(responseCode = "400", description = "请求参数错误"),
        @ApiResponse(responseCode = "409", description = "场景标识已存在"),
        @ApiResponse(responseCode = "500", description = "服务器内部错误")
    })
    public ResponseDTO<Boolean> createPromptConfig(
            @RequestBody PromptConfigRequestDTO request) {
        try {
            promptConfigService.addPromptConfig(request);
            return ResponseDTO.success("创建Prompt配置成功", true);
        } catch (Exception e) {
            return ResponseDTO.error("创建Prompt配置失败: " + e.getMessage());
        }
    }

    @PutMapping("/updatePromptConfig")
    @Operation(summary = "更新Prompt配置", description = "根据UID更新Prompt配置")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "更新成功"),
        @ApiResponse(responseCode = "400", description = "请求参数错误"),
        @ApiResponse(responseCode = "404", description = "配置不存在"),
        @ApiResponse(responseCode = "500", description = "服务器内部错误")
    })
    public ResponseDTO<Boolean> updatePromptConfig(@RequestBody PromptConfigRequestDTO request) {
        try {
            promptConfigService.updatePromptConfig(request);
            return ResponseDTO.success("更新Prompt配置成功", true);
        } catch (Exception e) {
            return ResponseDTO.error("更新Prompt配置失败: " + e.getMessage());
        }
    }

    @DeleteMapping("/deletePromptConfig/{uid}")
    @Operation(summary = "删除Prompt配置", description = "根据UID删除Prompt配置")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "删除成功"),
        @ApiResponse(responseCode = "404", description = "配置不存在"),
        @ApiResponse(responseCode = "500", description = "服务器内部错误")
    })
    public ResponseDTO<Boolean> deletePromptConfig(
            @Parameter(description = "场景唯一标识", example = "weather-assistant", required = true)
            @PathVariable String uid) {
        try {
            boolean deleted = promptConfigService.delPromptConfig(uid);
            return ResponseDTO.success("删除Prompt配置成功", deleted);
        } catch (Exception e) {
            return ResponseDTO.error("删除Prompt配置失败: " + e.getMessage());
        }
    }

    @GetMapping("/history/{uid}")
    @Operation(summary = "获取Prompt配置历史版本", description = "根据UID获取Prompt配置的历史版本列表")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "获取成功"),
        @ApiResponse(responseCode = "400", description = "请求参数错误"),
        @ApiResponse(responseCode = "404", description = "配置不存在"),
        @ApiResponse(responseCode = "500", description = "服务器内部错误")
    })
    public ResponseDTO<PromptConfigHistoryListVO> getPromptConfigHistory(
            @Parameter(description = "场景唯一标识", example = "weather-assistant", required = true)
            @PathVariable String uid,
            @Parameter(description = "页码", example = "1", required = true)
            @RequestParam Integer pageNum,
            @Parameter(description = "每页大小", example = "10", required = true)
            @RequestParam Integer pageSize) {
        try {
            PromptHistoryQueryResquest request = new PromptHistoryQueryResquest();
            request.setUid(uid);
            request.setPageNum(pageNum);
            request.setPageSize(pageSize);
            
            PromptConfigHistoryListVO history = promptConfigService.queryPromptModelHistorys(request);
            return ResponseDTO.success("获取历史版本成功", history);
        } catch (Exception e) {
            return ResponseDTO.error("获取历史版本失败: " + e.getMessage());
        }
    }

    @PostMapping("/rollback/{uid}")
    @Operation(summary = "回滚到历史版本", description = "将Prompt配置回滚到指定的历史版本")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "回滚成功"),
        @ApiResponse(responseCode = "400", description = "请求参数错误"),
        @ApiResponse(responseCode = "404", description = "版本不存在"),
        @ApiResponse(responseCode = "500", description = "服务器内部错误")
    })
    public ResponseDTO<Boolean> rollbackToVersion(
            @Parameter(description = "场景唯一标识", example = "weather-assistant", required = true)
            @PathVariable String uid,
            @Parameter(description = "目标版本号", example = "2", required = true)
            @RequestParam Integer version) {
        try {
            BackHistoryPromptResquest request = new BackHistoryPromptResquest();
            request.setUid(uid);
            request.setVersion(version);
            promptConfigService.backHistoryPromptModel(request);
            return ResponseDTO.success("回滚到历史版本成功", true);
        } catch (Exception e) {
            return ResponseDTO.error("回滚到历史版本失败: " + e.getMessage());
        }
    }

    @PostMapping("/generatePromptTemplate")
    @Operation(summary = "生成Prompt模板", description = "根据用户输入生成Prompt模板")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "生成成功"),
        @ApiResponse(responseCode = "400", description = "请求参数错误"),
        @ApiResponse(responseCode = "500", description = "服务器内部错误")
    })
    public ResponseDTO<PromptGenerateVO> generatePromptTemplate(@RequestBody PromptGenerateRequest request) {
        try {
            PromptGenerateVO promptGenerate = promptConfigService.generatePromptTemplate(request);
            return ResponseDTO.success("生成Prompt模板成功", promptGenerate);
        } catch (Exception e) {
            return ResponseDTO.error("生成Prompt模板失败: " + e.getMessage());
        }
    }
}