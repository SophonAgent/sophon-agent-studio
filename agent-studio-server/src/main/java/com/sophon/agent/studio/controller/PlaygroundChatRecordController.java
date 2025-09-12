package com.sophon.agent.studio.controller;

import com.sophon.agent.studio.dto.*;
import com.sophon.agent.studio.service.PlaygroundChatRecordService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@RequestMapping("/api/v1/playground-chat-records")
@Tag(name = "Playground对话记录管理", description = "Playground对话记录的增删改查接口")
@Validated
public class PlaygroundChatRecordController {

    @Autowired
    private PlaygroundChatRecordService playgroundChatRecordService;

    @PostMapping("/saveChatRecord")
    @Operation(summary = "添加或更新对话记录", description = "添加新的对话记录或更新已存在的对话记录")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "操作成功",
                    content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = ResponseDTO.class))),
        @ApiResponse(responseCode = "400", description = "请求参数错误"),
        @ApiResponse(responseCode = "500", description = "服务器内部错误")
    })
    public ResponseDTO<Long> saveChatRecord(@RequestBody ChatRecordVO chatRecordVO) {
        try {
            Long id = playgroundChatRecordService.saveChatRecord(chatRecordVO);
            return ResponseDTO.success("添加或更新对话记录成功", id);
        } catch (Exception e) {
            return ResponseDTO.error("添加或更新对话记录失败: " + e.getMessage());
        }
    }

    @PostMapping("/updateSimpleInfo")
    @Operation(summary = "更新对话记录", description = "更新对话记录")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "操作成功",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResponseDTO.class))),
            @ApiResponse(responseCode = "400", description = "请求参数错误"),
            @ApiResponse(responseCode = "500", description = "服务器内部错误")
    })
    public ResponseDTO<Boolean> updateSimpleInfo(@RequestBody ChatRecordSimpleVO chatRecordVO) {
        try {
            playgroundChatRecordService.updateSimpleInfo(chatRecordVO);
            return ResponseDTO.success("更新对话记录成功", true);
        } catch (Exception e) {
            return ResponseDTO.error("更新对话记录成功: " + e.getMessage());
        }
    }

    @GetMapping("/listChatRecords")
    @Operation(summary = "获取对话记录列表", description = "根据用户ID和查询条件获取对话记录分页列表")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "获取成功",
                    content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = ResponseDTO.class))),
        @ApiResponse(responseCode = "400", description = "请求参数错误"),
        @ApiResponse(responseCode = "500", description = "服务器内部错误")
    })
    public ResponseDTO<ChatRecordListVO> listChatRecords(@ModelAttribute ChatRecordListQueryDTO queryDTO) {
        try {
            ChatRecordListVO result = playgroundChatRecordService.listChatRecords(queryDTO);
            return ResponseDTO.success("获取对话记录列表成功", result);
        } catch (Exception e) {
            return ResponseDTO.error("获取对话记录列表失败: " + e.getMessage());
        }
    }

    @GetMapping("/queryChatRecordBySessionId")
    @Operation(summary = "根据会话ID获取对话记录详情", description = "根据会话ID获取对话记录的详细信息")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "获取成功",
                    content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = ResponseDTO.class))),
        @ApiResponse(responseCode = "404", description = "对话记录不存在"),
        @ApiResponse(responseCode = "403", description = "该对话记录未被分享"),
        @ApiResponse(responseCode = "500", description = "服务器内部错误")
    })
    public ResponseDTO<ChatRecordVO> getChatRecordBySessionId(
            @Parameter(description = "会话ID", required = true)
            @RequestParam @NonNull String sessionId,
            @Parameter(description = "用户ID", required = true)
            @RequestParam @NonNull String userId) {
        try {
            ChatRecordVO result = playgroundChatRecordService.getChatRecordBySessionIdAndUserId(sessionId, userId);
            return ResponseDTO.success("获取对话记录详情成功", result);
        } catch (Exception e) {
            return ResponseDTO.error("获取对话记录详情失败: " + e.getMessage());
        }
    }

    @PostMapping("/removeChatRecord")
    @Operation(summary = "删除单个对话记录", description = "根据会话ID和用户ID删除指定的对话记录")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "删除成功",
                    content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = ResponseDTO.class))),
        @ApiResponse(responseCode = "400", description = "请求参数错误"),
        @ApiResponse(responseCode = "500", description = "服务器内部错误")
    })
    public ResponseDTO<Boolean> removeChatRecord(
            @Parameter(description = "会话ID", required = true)
            @RequestParam String sessionId,
            @Parameter(description = "用户ID", required = true)
            @RequestParam @NonNull String userId) {
        try {
            Boolean result = playgroundChatRecordService.removeChatRecord(userId, sessionId);
            return ResponseDTO.success("删除对话记录成功", result);
        } catch (Exception e) {
            return ResponseDTO.error("删除对话记录失败: " + e.getMessage());
        }
    }

    @PostMapping("/clearChatRecords")
    @Operation(summary = "批量删除对话记录", description = "根据用户ID和日期删除指定日期之前的所有对话记录")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "删除成功",
                    content = @Content(mediaType = "application/json",
                    schema = @Schema(implementation = ResponseDTO.class))),
        @ApiResponse(responseCode = "400", description = "请求参数错误"),
        @ApiResponse(responseCode = "500", description = "服务器内部错误")
    })
    public ResponseDTO<Void> clearChatRecords(
            @Parameter(description = "用户ID", required = true)
            @RequestParam @NonNull String userId,
            @Parameter(description = "删除截止日期", required = true)
            @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss") @RequestParam @NonNull Date date) {
        try {
            playgroundChatRecordService.clearChatRecords(userId, date);
            return ResponseDTO.success("批量删除对话记录成功", null);
        } catch (Exception e) {
            return ResponseDTO.error("批量删除对话记录失败: " + e.getMessage());
        }
    }
}