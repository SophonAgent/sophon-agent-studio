package com.sophon.agent.studio.controller;

import com.alibaba.fastjson.JSON;
import com.sophon.agent.studio.dto.*;
import com.sophon.agent.studio.service.ModelExecutionService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/v1")
@Tag(name = "模型执行", description = "OpenAI兼容的模型执行接口")
public class ModelExecutionController {
    private static final Logger LOGGER = LoggerFactory.getLogger(ModelExecutionController.class);
    @Autowired
    private ModelExecutionService modelExecutionService;

    @PostMapping(value = "/chat/completions", produces = MediaType.APPLICATION_JSON_VALUE)
    @Operation(summary = "创建聊天完成", description = "创建聊天完成，支持OpenAI兼容格式")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "成功",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ChatCompletionResponse.class))),
            @ApiResponse(responseCode = "400", description = "请求参数错误"),
            @ApiResponse(responseCode = "404", description = "模型配置不存在"),
            @ApiResponse(responseCode = "500", description = "服务器内部错误")
    })
    public Mono<ChatCompletionResponse> createChatCompletion(
            @Valid @RequestBody ChatCompletionRequest request) {
        LOGGER.info("流式日志开始,参数为:{}", JSON.toJSONString(request));
        return modelExecutionService.createChatCompletion(request);
    }

    @PostMapping(value = "/chat/completions", consumes = MediaType.APPLICATION_JSON_VALUE,produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    @Operation(summary = "创建流式聊天完成", description = "创建流式聊天完成，支持Server-Sent Events")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "成功",
                    content = @Content(mediaType = "text/event-stream",
                            schema = @Schema(implementation = ChatCompletionStreamResponse.class))),
            @ApiResponse(responseCode = "400", description = "请求参数错误"),
            @ApiResponse(responseCode = "404", description = "模型配置不存在"),
            @ApiResponse(responseCode = "500", description = "服务器内部错误")
    })
    public Flux<ChatCompletionStreamResponse> createChatCompletionStream(
            @Valid @RequestBody ChatCompletionRequest request) {
        if (!request.getStream()) {
            request.setStream(true);
        }
        LOGGER.info("流式日志开始,参数为:{}", JSON.toJSONString(request));
        return modelExecutionService.createChatCompletionStream(request);
    }

//    @PostMapping(value = "/chat/completions", params = "stream=true", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
//    @Operation(summary = "创建流式聊天完成（查询参数）", description = "通过查询参数指定流式响应")
//    @ApiResponses(value = {
//            @ApiResponse(responseCode = "200", description = "成功",
//                    content = @Content(mediaType = "text/event-stream",
//                            schema = @Schema(implementation = ChatCompletionStreamResponse.class))),
//            @ApiResponse(responseCode = "400", description = "请求参数错误"),
//            @ApiResponse(responseCode = "404", description = "模型配置不存在"),
//            @ApiResponse(responseCode = "500", description = "服务器内部错误")
//    })
//    public Flux<ChatCompletionStreamResponse> createChatCompletionStreamWithParam(
//            @Valid @RequestBody ChatCompletionRequest request) {
//        request.setStream(true);
//        LOGGER.info("创建流式开始,参数为:{}", JSON.toJSONString(request));
//        return modelExecutionService.createChatCompletionStream(request);
//    }
}