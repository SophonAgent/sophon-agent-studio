package com.sophon.agent.studio.controller;

import com.sophon.agent.studio.dto.ModelConfigCreateRequest;
import com.sophon.agent.studio.dto.ModelConfigResponse;
import com.sophon.agent.studio.dto.ModelConfigUpdateRequest;
import com.sophon.agent.studio.dto.ResponseDTO;
import com.sophon.agent.studio.service.ModelConfigService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/model-configs")
@Tag(name = "模型配置管理", description = "模型配置的增删改查接口")
public class ModelConfigController {

    @Autowired
    private ModelConfigService modelConfigService;

    @GetMapping
    @Operation(summary = "获取所有模型配置", description = "获取所有未删除的模型配置列表")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "获取成功", 
                    content = @Content(mediaType = "application/json", 
                    schema = @Schema(implementation = ResponseDTO.class))),
        @ApiResponse(responseCode = "500", description = "服务器内部错误")
    })
    public ResponseDTO<List<ModelConfigResponse>> getAllModelConfigs() {
        List<ModelConfigResponse> configs = modelConfigService.getAllModelConfigs();
        return ResponseDTO.success("获取模型配置列表成功", configs);
    }

    @GetMapping("/{id}")
    @Operation(summary = "根据ID获取模型配置", description = "根据主键ID获取单个模型配置详细信息")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "获取成功"),
        @ApiResponse(responseCode = "404", description = "模型配置不存在"),
        @ApiResponse(responseCode = "500", description = "服务器内部错误")
    })
    public ResponseDTO<ModelConfigResponse> getModelConfigById(
            @Parameter(description = "模型配置ID", example = "1", required = true)
            @PathVariable Long id) {
        ModelConfigResponse config = modelConfigService.getModelConfigById(id);
        return ResponseDTO.success("获取模型配置成功", config);
    }

    @PostMapping("/createModelConfig")
    @Operation(summary = "创建模型配置", description = "创建新的模型配置")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "201", description = "创建成功"),
        @ApiResponse(responseCode = "400", description = "请求参数错误"),
        @ApiResponse(responseCode = "500", description = "服务器内部错误")
    })
    public ResponseDTO<ModelConfigResponse> createModelConfig(
            @Valid @RequestBody ModelConfigCreateRequest request) {
        ModelConfigResponse config = modelConfigService.createModelConfig(request);
        return ResponseDTO.success("创建模型配置成功", config);
    }

    @PostMapping("/updateModelConfig/{id}")
    @Operation(summary = "更新模型配置", description = "根据ID更新模型配置信息")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "更新成功"),
        @ApiResponse(responseCode = "400", description = "请求参数错误"),
        @ApiResponse(responseCode = "404", description = "模型配置不存在"),
        @ApiResponse(responseCode = "500", description = "服务器内部错误")
    })
    public ResponseDTO<ModelConfigResponse> updateModelConfig(
            @Parameter(description = "模型配置ID", example = "1", required = true)
            @PathVariable Long id,
            @Valid @RequestBody ModelConfigUpdateRequest request) {
        ModelConfigResponse config = modelConfigService.updateModelConfig(id, request);
        return ResponseDTO.success("更新模型配置成功", config);
    }

    @PostMapping("/deleteModelConfig/{id}")
    @Operation(summary = "删除模型配置", description = "根据ID软删除模型配置")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "删除成功"),
        @ApiResponse(responseCode = "404", description = "模型配置不存在"),
        @ApiResponse(responseCode = "500", description = "服务器内部错误")
    })
    public ResponseDTO<Boolean> deleteModelConfig(
            @Parameter(description = "模型配置ID", example = "1", required = true)
            @PathVariable Long id) {
        modelConfigService.deleteModelConfig(id);
        return ResponseDTO.success("删除模型配置成功", true);
    }
}