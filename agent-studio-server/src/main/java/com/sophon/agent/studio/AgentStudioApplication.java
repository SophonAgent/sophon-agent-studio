package com.sophon.agent.studio;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * agent studio 服务starter
 * @author: chun
 * @date: 2025/8/15
 * @Description:
 * @version: V1.0
 */
@SpringBootApplication
@MapperScan("com.sophon.agent.mapper")
public class AgentStudioApplication {

    public static void main(String[] args) {
        System.setProperty("spring.devtools.restart.enabled", "false");
        SpringApplication.run(AgentStudioApplication.class, args);
    }
}
