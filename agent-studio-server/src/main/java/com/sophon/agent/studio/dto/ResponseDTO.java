package com.sophon.agent.studio.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
@Schema(description = "通用API响应")
public class ResponseDTO<T> {
    
    @Schema(description = "响应码", example = "200")
    private int code;
    
    @Schema(description = "响应消息", example = "操作成功")
    private String message;
    
    @Schema(description = "响应数据")
    private T data;

    public ResponseDTO() {}

    public ResponseDTO(int code, String message, T data) {
        this.code = code;
        this.message = message;
        this.data = data;
    }

    public static <T> ResponseDTO<T> success(T data) {
        return new ResponseDTO<>(200, "操作成功", data);
    }

    public static <T> ResponseDTO<T> success(String message, T data) {
        return new ResponseDTO<>(200, message, data);
    }

    public static <T> ResponseDTO<T> error(String message) {
        return new ResponseDTO<>(500, message, null);
    }

    public static <T> ResponseDTO<T> error(int code, String message) {
        return new ResponseDTO<>(code, message, null);
    }

}