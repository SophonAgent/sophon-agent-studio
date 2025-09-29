package com.sophon.agent.registry.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.TypeReference;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

public class OkHttpClientUtil {
    private static final Logger LOGGER = LoggerFactory.getLogger(OkHttpClientUtil.class);
    private static OkHttpClient instance = null;


    static {
        instance = new OkHttpClient.Builder()
                .connectTimeout(3, TimeUnit.SECONDS)
                .readTimeout(600, TimeUnit.SECONDS)
                .build();
    }

    public static String call(Request request){
        Long startTime = System.currentTimeMillis();
        OkHttpClient client = instance;

        try {
            Response response = client.newCall(request).execute();
            if (response.code() != 200) {
                LOGGER.error("call api failed, url={}, response code={}, body={} costtime:{}", request.url(), response.code(), response.body().string(), System.currentTimeMillis() - startTime);
                throw new IOException();
            }
            return response.body().string();
        } catch (IOException e) {
            LOGGER.error(String.format("call api failed, url= %s", request.url()), e);
            return null;
        }
    }

    public static <T> T call(Request request, TypeReference<T> type) {
        Long startTime = System.currentTimeMillis();
        OkHttpClient client = instance;

        try {
            Response response = client.newCall(request).execute();
            if (response.code() != 200) {
                LOGGER.error("call api failed, url={}, response code={}, body={} costtime:{}", request.url(), response.code(), response.body().string(), System.currentTimeMillis() - startTime);
                throw new IOException();
            }
            String responseData = getResponseData(response, request);
            return JSON.parseObject(responseData, type);
        } catch (IOException e) {
            LOGGER.error(String.format("call api failed, url= %s", request.url()), e);
            return null;
        }
    }

    private static String getResponseData(Response response, Request request) throws IOException {
        String url = request.url().toString();
        if (response.body() == null) {
            LOGGER.error(String.format("call api failed, url=%s, http status code=%d", url, response.code()));
            throw new IOException();
        }

        String responseBody = response.body().string();
        JSONObject jsonObject = JSON.parseObject(responseBody);
        String code = jsonObject.getString("code");
        if (StringUtils.isNotBlank(code) && !"0".equals(code)) {
            LOGGER.error(String.format("call api failed, url: %s, response body is: %s", url, responseBody));
            throw new IOException();
        }

        return jsonObject.getString("data");
    }
}