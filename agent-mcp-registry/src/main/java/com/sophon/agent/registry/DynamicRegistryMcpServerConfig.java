package com.sophon.agent.registry;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.sophon.agent.mapper.SophonMcpServerMapper;
import com.sophon.agent.mapper.SophonMcpServerToolDetailMapper;
import com.sophon.agent.model.SophonMcpServer;
import com.sophon.agent.model.SophonMcpServerExample;
import com.sophon.agent.model.SophonMcpServerToolDetail;
import com.sophon.agent.model.SophonMcpServerToolDetailExample;
import com.sophon.agent.registry.constant.McpImplementTypeEnum;
import com.sophon.agent.registry.constant.McpToolProxyTypeEnum;
import com.sophon.agent.registry.dto.McpToolConfigDetailDTO;
import com.sophon.agent.registry.proxy.ProxyMcpToolExecuteFactory;
import io.modelcontextprotocol.server.McpServer;
import io.modelcontextprotocol.server.McpServerFeatures;
import io.modelcontextprotocol.server.McpSyncServer;
import io.modelcontextprotocol.server.transport.WebMvcSseServerTransportProvider;
import io.modelcontextprotocol.spec.McpSchema;
import jakarta.annotation.Resource;
import org.apache.commons.collections.CollectionUtils;
import org.everit.json.schema.loader.SchemaLoader;
import org.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.beans.factory.config.ConfigurableListableBeanFactory;
import org.springframework.beans.factory.support.DefaultListableBeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.function.support.RouterFunctionMapping;

import java.lang.reflect.Method;
import java.util.*;


@Component
public class DynamicRegistryMcpServerConfig implements InitializingBean, ApplicationContextAware {
    private static final Logger LOGGER = LoggerFactory.getLogger(DynamicRegistryMcpServerConfig.class);

    private static ApplicationContext applicationContext;

    @Resource
    private SophonMcpServerMapper sophonMcpServerMapper;

    @Resource
    private SophonMcpServerToolDetailMapper sophonMcpServerToolDetailMapper;
    @Resource
    private ProxyMcpToolExecuteFactory proxyMcpToolExecuteFactory;

//    @Resource
//    private OptLogService optLogService;


    @Override
    public void setApplicationContext(ApplicationContext applicationContext) {
        this.applicationContext = applicationContext;
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        registerHttpOpenApiServers();
    }

    public void registerHttpOpenApiServers() {
        SophonMcpServerExample serverExample = new SophonMcpServerExample();
        serverExample.createCriteria().andStatusEqualTo(0).andImplementTypeEqualTo(McpImplementTypeEnum.PROXY.name());
        List<SophonMcpServer> sophonMcpServers = sophonMcpServerMapper.selectByExample(serverExample);
        if(CollectionUtils.isEmpty(sophonMcpServers)) {
            return;
        }

        SophonMcpServerToolDetailExample toolsRegisterExample = new SophonMcpServerToolDetailExample();
        toolsRegisterExample.createCriteria().andStatusEqualTo(0).andProxyTypeIn(Arrays.asList(McpToolProxyTypeEnum.HTTP.name()));
        List<SophonMcpServerToolDetail> toolsRegisters = sophonMcpServerToolDetailMapper.selectByExample(toolsRegisterExample);
        Map<String, List<SophonMcpServerToolDetail>> toolsRegisterMap = new HashMap<>();
        if(CollectionUtils.isNotEmpty(toolsRegisters)) {
            for(SophonMcpServerToolDetail toolsRegister: toolsRegisters) {
                if(!toolsRegisterMap.containsKey(toolsRegister.getServerQualifiedName())) {
                    toolsRegisterMap.put(toolsRegister.getServerQualifiedName(), new ArrayList<>());
                }
                toolsRegisterMap.get(toolsRegister.getServerQualifiedName()).add(toolsRegister);
            }
        }

        for(SophonMcpServer sophonMcpServer: sophonMcpServers) {
            List<SophonMcpServerToolDetail> serverToolsRegisters = toolsRegisterMap.get(sophonMcpServer.getQualifiedName());
            registerOneServer(sophonMcpServer, serverToolsRegisters, true);
        }
    }

    /**
     * 根据serverQualifiedName重新注册bean
     * @param serverQualifiedName
     */
    public void registerOneServer(String serverQualifiedName) {
        SophonMcpServerExample serverExample = new SophonMcpServerExample();
        serverExample.createCriteria().andStatusEqualTo(0)
                .andImplementTypeEqualTo(McpImplementTypeEnum.PROXY.name())
                .andQualifiedNameEqualTo(serverQualifiedName);
        List<SophonMcpServer> sophonMcpServers = sophonMcpServerMapper.selectByExample(serverExample);
        if(CollectionUtils.isEmpty(sophonMcpServers)) {
            LOGGER.warn("server name {}, server不存在", serverQualifiedName);
            return;
        }

        SophonMcpServer sophonMcpServer = sophonMcpServers.get(0);
        SophonMcpServerToolDetailExample toolsRegisterExample = new SophonMcpServerToolDetailExample();
        toolsRegisterExample.createCriteria().andStatusEqualTo(0)
                .andProxyTypeIn(Arrays.asList(McpToolProxyTypeEnum.HTTP.name()))
                .andServerQualifiedNameEqualTo(serverQualifiedName);
        List<SophonMcpServerToolDetail> toolsRegisters = sophonMcpServerToolDetailMapper.selectByExample(toolsRegisterExample);

        registerOneServer(sophonMcpServer, toolsRegisters, false);
    }

    /**
     * 注册一个mcp服务
     * @param sophonMcpServer
     * @param toolsRegisters
     * @para appInitStage 是否应用启动阶段
     */
    public void registerOneServer(SophonMcpServer sophonMcpServer, List<SophonMcpServerToolDetail> toolsRegisters, boolean appInitStage) {
        List<McpServerFeatures.SyncToolSpecification> syncToolSpecifications = new ArrayList<>();

        if(CollectionUtils.isNotEmpty(toolsRegisters)) {
            for(SophonMcpServerToolDetail toolsRegister: toolsRegisters) {
                if(!isJsonSchemaValid(toolsRegister.getInputSchema())) {
                    LOGGER.warn("toolName:{} toolQualifiedName:{} inputSchema不合法，跳过", toolsRegister.getDisplayName(), toolsRegister.getQualifiedName());
                    continue;
                }

                // 注册一个tool
                var syncToolSpecification = new McpServerFeatures.SyncToolSpecification(
                        new McpSchema.Tool(toolsRegister.getQualifiedName(), toolsRegister.getDescription(), toolsRegister.getInputSchema()),
                        proxyMcpToolExecuteFactory.createProxyMcpToolExecute(new McpToolConfigDetailDTO(toolsRegister))
                );
                syncToolSpecifications.add(syncToolSpecification);
            }
        }


        ObjectMapper objectMapper = applicationContext.getBean(ObjectMapper.class);
        WebMvcSseServerTransportProvider webMvcSseServerTransportProvider = new WebMvcSseServerTransportProvider(objectMapper, String.format("/mcp/%s/message", sophonMcpServer.getQualifiedName()), String.format("/mcp/%s/sse", sophonMcpServer.getQualifiedName()));

        String routerBeanName = "mcpRouter_" + sophonMcpServer.getQualifiedName();
        String serverBeanName = "mcpServer_" + sophonMcpServer.getQualifiedName();
        McpSyncServer mcpServer = McpServer.sync(webMvcSseServerTransportProvider)
                .serverInfo(serverBeanName, "1.0.0")
                .tools(syncToolSpecifications)
                .rootsChangeHandlers(List.of((exchange, roots) -> LOGGER.info("Roots changed: " + roots)))
                .build();

        if (applicationContext instanceof ConfigurableApplicationContext) {
            ConfigurableApplicationContext configurableContext = (ConfigurableApplicationContext) applicationContext;
            ConfigurableListableBeanFactory beanFactory = configurableContext.getBeanFactory();
            if (beanFactory.containsSingleton(routerBeanName) && beanFactory instanceof DefaultListableBeanFactory) {
                ((DefaultListableBeanFactory) beanFactory).destroySingleton(routerBeanName);
            }
            beanFactory.registerSingleton(routerBeanName, webMvcSseServerTransportProvider.getRouterFunction());
            if (beanFactory.containsSingleton(serverBeanName) && beanFactory instanceof DefaultListableBeanFactory) {
                ((DefaultListableBeanFactory) beanFactory).destroySingleton(serverBeanName);
            }
            beanFactory.registerSingleton(serverBeanName, mcpServer);

            // 如果不是框架启动阶段，重新初始化 RouterFunctionMapping
            if(!appInitStage) {
                RouterFunctionMapping routerFunctionMapping = applicationContext.getBean(RouterFunctionMapping.class);
                try {
                    // 使用反射调用 RouterFunctionMapping 的初始化方法
                    Method initMethod = RouterFunctionMapping.class.getDeclaredMethod("initRouterFunctions");
                    initMethod.setAccessible(true);
                    initMethod.invoke(routerFunctionMapping);

                    System.out.println("Router functions have been updated successfully");
                } catch (Exception e) {
                    LOGGER.warn("更新router失败");
                }
            }
            LOGGER.info("Mcp服务注册成功，server_name{}, displayName: {}， endpointUrl: {}", serverBeanName, sophonMcpServer.getDisplayName(), sophonMcpServer.getEndpointUrl());
        }
    }

    public static boolean isJsonSchemaValid(String jsonSchemaString) {
        try {
            JSONObject rawSchema = new JSONObject(jsonSchemaString);
            SchemaLoader.load(rawSchema);
            return true;
        } catch (Exception e) {
            LOGGER.error("Invalid JSON Schema: {}", jsonSchemaString);
            return false;
        }
    }

}
