package com.sophon.agent.studio.service;

import com.alibaba.fastjson.JSON;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.sophon.agent.model.SophonAgentModelConfig;
import com.sophon.agent.studio.dto.ChatCompletionRequest;
import com.sophon.agent.studio.dto.ChatCompletionResponse;
import com.sophon.agent.studio.exception.BusinessException;
import com.sophon.agent.studio.exception.ResourceNotFoundException;
import okhttp3.*;
import okio.BufferedSource;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

@Service
public class ModelExecutionService {

    private static final Logger LOGGER = LoggerFactory.getLogger(ModelExecutionService.class);
    
    @Autowired
    private ModelConfigService modelConfigService;
    
    @Autowired
    private ObjectMapper objectMapper;
    
    private final OkHttpClient httpClient;
    
    public ModelExecutionService() {
        this.httpClient = new OkHttpClient.Builder()
                .connectTimeout(30, TimeUnit.SECONDS)
                .readTimeout(30, TimeUnit.SECONDS)
                .writeTimeout(30, TimeUnit.SECONDS)
                .build();
    }
    
    /**
     * 创建聊天完成请求
     */
    public Mono<ChatCompletionResponse> createChatCompletion(ChatCompletionRequest request) {
        return getModelConfig(request)
                .flatMap(config -> {
                    try {
                        return executeChatCompletion(config, request);
                    } catch (Exception e) {
                        return Mono.error(new BusinessException("模型执行失败: " + e.getMessage()));
                    }
                });
    }
    
    /**
     * 创建流式聊天完成请求
     */
    public Flux<String> createChatCompletionStream(ChatCompletionRequest request) {
        return getModelConfig(request)
                .flatMapMany(config -> {
                    try {
                        return executeChatCompletionStream(config, request);
                    } catch (Exception e) {
                        return Flux.error(new BusinessException("模型执行失败: " + e.getMessage()));
                    }
                });
    }
    
    private Mono<SophonAgentModelConfig> getModelConfig(ChatCompletionRequest request) {
        if (request.getModelConfigId() == null) {
            return Mono.error(new BusinessException("model_config_id 不能为空"));
        }
        
        try {
            SophonAgentModelConfig config = modelConfigService.getModelConfigEntityById(request.getModelConfigId());
            return Mono.just(config);
        } catch (ResourceNotFoundException e) {
            return Mono.error(new BusinessException("模型配置不存在: " + request.getModelConfigId()));
        }
    }
    
    private Mono<ChatCompletionResponse> executeChatCompletion(SophonAgentModelConfig config, ChatCompletionRequest request) {
        return Mono.fromCallable(() -> {
            try {
                String apiUrl = config.getModelUrl()+ "/chat/completions";
                
                // 构建请求体
                Map<String, Object> requestBody = buildOpenAIRequest(config, request);
                LOGGER.info("请求url:{} 调用模型请求体:{}", apiUrl, JSON.toJSON(requestBody));
                String jsonBody = objectMapper.writeValueAsString(requestBody);
                
                Request httpRequest = new Request.Builder()
                        .url(apiUrl)
                        .addHeader("Authorization", "Bearer " + config.getModelKey())
                        .addHeader("api-key", config.getModelKey())
                        .addHeader("Content-Type", "application/json")
                        .post(RequestBody.create(jsonBody, MediaType.parse("application/json")))
                        .build();
                
                try (Response response = httpClient.newCall(httpRequest).execute()) {
                    if (!response.isSuccessful()) {
                        throw new BusinessException("模型调用失败: HTTP " + response.code());
                    }
                    
                    String responseBody = response.body().string();
                    ChatCompletionResponse completionResponse = objectMapper.readValue(responseBody, ChatCompletionResponse.class);
                    
                    // 设置实际使用的模型名称
                    completionResponse.setModel(config.getModelName());
                    
                    return completionResponse;
                }
            } catch (IOException e) {
                throw new BusinessException("模型调用失败: " + e.getMessage());
            }
        });
    }
    
    private Flux<String> executeChatCompletionStream(SophonAgentModelConfig config, ChatCompletionRequest request) {
        return Flux.create(sink -> {
            try {
                String apiUrl = config.getModelUrl() + "/chat/completions";
                
                // 构建请求体
                Map<String, Object> requestBody = buildOpenAIRequest(config, request);
                requestBody.put("stream", true);
                
                String jsonBody = objectMapper.writeValueAsString(requestBody);
                LOGGER.info("请求url:{} 调用模型请求体:{}", apiUrl, JSON.toJSON(requestBody));

                Request httpRequest = new Request.Builder()
                        .url(apiUrl)
                        .addHeader("Authorization", "Bearer " + config.getModelKey())
                        .addHeader("api-key", config.getModelKey())
                        .addHeader("Content-Type", "application/json")
                        .post(RequestBody.create(jsonBody, MediaType.parse("application/json")))
                        .build();
                
                httpClient.newCall(httpRequest).enqueue(new Callback() {
                    @Override
                    public void onFailure(Call call, IOException e) {
                        sink.error(new BusinessException("模型调用失败: " + e.getMessage()));
                    }
                    
                    @Override
                    public void onResponse(Call call, Response response) throws IOException {
                        if (!response.isSuccessful()) {
                            sink.error(new BusinessException("模型调用失败: HTTP " + response.code()));
                            return;
                        }
                        
                        try {
                            BufferedSource source = response.body().source();
                            try {
                                while (!source.exhausted()) {
                                    String data = source.readUtf8Line();
                                    if (data != null && data.startsWith("data: ")) {
//                                        String data = line.substring(6);
                                        

                                        LOGGER.info("获取流式返回,参数为:{}", data);
                                        sink.next(data);
                                        if (data.equals("data: [DONE]")) {
                                            sink.complete();
                                            return;
                                        }
                                    }
                                }
                                sink.complete();
                            } finally {
                                source.close();
                            }
                        } catch (Exception e) {
                            sink.error(e);
                        }
                    }
                });
                
            } catch (Exception e) {
                sink.error(new BusinessException("模型调用失败: " + e.getMessage()));
            }
        });
    }
    
    private Map<String, Object> buildOpenAIRequest(SophonAgentModelConfig config, ChatCompletionRequest request) {
        Map<String, Object> requestBody = new HashMap<>();
        
        // 设置模型名称
        requestBody.put("model", config.getModelName());
        
        // 设置消息
        requestBody.put("messages", request.getMessages());
        
        // 设置其他可选参数
        if (request.getTemperature() != null) {
            requestBody.put("temperature", request.getTemperature());
        }
        
        if (request.getTopP() != null) {
            requestBody.put("top_p", request.getTopP());
        }

        if (request.getTopK() != null) {
            requestBody.put("top_k", request.getTopK());
        }
        
        if (request.getMaxCompletionsTokens() != null) {
            requestBody.put("max_tokens", request.getMaxCompletionsTokens());
            requestBody.put("max_completions_tokens", request.getMaxCompletionsTokens());
        } else if (config.getMaxCompletionTokenLimit() != null) {
            requestBody.put("max_tokens", config.getMaxCompletionTokenLimit());
            requestBody.put("max_completions_tokens", config.getMaxCompletionTokenLimit());
        }
        
        if (request.getStop() != null && !request.getStop().isEmpty()) {
            requestBody.put("stop", request.getStop());
        }
        
        if (request.getPresencePenalty() != null) {
            requestBody.put("presence_penalty", request.getPresencePenalty());
        }
        
        if (request.getFrequencyPenalty() != null) {
            requestBody.put("frequency_penalty", request.getFrequencyPenalty());
        }
        
        if (request.getUser() != null) {
            requestBody.put("user", request.getUser());
        }
        
        if (request.getTools() != null && !request.getTools().isEmpty()) {
            requestBody.put("tools", request.getTools());
        }
        
        if (request.getToolChoice() != null) {
            requestBody.put("tool_choice", request.getToolChoice());
        }
        
        if (request.getResponseFormat() != null) {
            requestBody.put("response_format", request.getResponseFormat());
        }
        
        if (request.getSeed() != null) {
            requestBody.put("seed", request.getSeed());
        }
        
        return requestBody;
    }
}