package com.sophon.agent.studio.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class DefaultPageController {
    
    @GetMapping("/paas")
    public String redirectToIndex() {
        // 返回的字符串指示跳转到哪个页面
        return "forward:/paas/index.html";
    }
}