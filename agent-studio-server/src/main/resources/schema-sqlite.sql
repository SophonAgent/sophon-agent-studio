-- Initialize SQLite database schema
-- Create table for sophon agent model configuration

CREATE TABLE IF NOT EXISTS sophon_agent_model_config (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modify_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(128) NOT NULL DEFAULT '',
    description VARCHAR(512) NOT NULL DEFAULT '',
    model_url VARCHAR(1000) NOT NULL DEFAULT '',
    model_key VARCHAR(1000) NOT NULL DEFAULT '',
    model_name VARCHAR(1000) NOT NULL DEFAULT '',
    config TEXT,
    is_delete INTEGER NOT NULL DEFAULT 0,
    modify_user VARCHAR(128) DEFAULT NULL,
    create_user VARCHAR(128) DEFAULT NULL,
    modalities VARCHAR(1024) DEFAULT NULL,
    max_completion_token_limit INTEGER DEFAULT NULL,
    model_app_tag VARCHAR(256) DEFAULT '[]',
    default_params VARCHAR(512) DEFAULT '{}',
    support_stream INTEGER DEFAULT 1,
    support_system INTEGER DEFAULT 1,
    support_reasoning INTEGER DEFAULT 0,
    timeout_seconds INTEGER DEFAULT NULL
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_sophon_agent_model_config_name ON sophon_agent_model_config(name);
CREATE INDEX IF NOT EXISTS idx_sophon_agent_model_config_is_delete ON sophon_agent_model_config(is_delete);
CREATE INDEX IF NOT EXISTS idx_sophon_agent_model_config_create_time ON sophon_agent_model_config(create_time);

-- Create table for sophon mcp server
CREATE TABLE IF NOT EXISTS sophon_mcp_server (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL DEFAULT 'sse',
    qualified_name TEXT NOT NULL,
    display_name TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL DEFAULT '',
    endpoint_url TEXT,
    icon_url TEXT NOT NULL DEFAULT '',
    create_user TEXT NOT NULL DEFAULT '',
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modify_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    command TEXT NOT NULL DEFAULT '',
    implement_type TEXT NOT NULL DEFAULT 'INNER',
    status INTEGER DEFAULT 0,
    modify_user TEXT NOT NULL DEFAULT '',
    context_config TEXT NOT NULL DEFAULT ''
);

-- Create indexes for sophon_mcp_server
CREATE INDEX IF NOT EXISTS idx_sophon_mcp_server_qualified_name ON sophon_mcp_server(qualified_name);
CREATE INDEX IF NOT EXISTS idx_sophon_mcp_server_status ON sophon_mcp_server(status);
CREATE INDEX IF NOT EXISTS idx_sophon_mcp_server_create_time ON sophon_mcp_server(create_time);

-- Create table for sophon mcp server tool detail
CREATE TABLE IF NOT EXISTS sophon_mcp_server_tool_detail (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    qualified_name TEXT NOT NULL,
    display_name TEXT NOT NULL,
    server_qualified_name TEXT NOT NULL,
    description TEXT,
    input_schema TEXT,
    proxy_type TEXT NOT NULL DEFAULT '',
    request_method TEXT NOT NULL DEFAULT '',
    request_url TEXT NOT NULL DEFAULT '',
    request_headers TEXT,
    request_json TEXT,
    response_json TEXT,
    status INTEGER DEFAULT 0,
    create_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    modify_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    create_user TEXT NOT NULL DEFAULT '',
    modify_user TEXT NOT NULL DEFAULT ''
);

-- Create indexes for sophon_mcp_server_tool_detail
CREATE INDEX IF NOT EXISTS idx_sophon_mcp_server_tool_detail_qualified_name ON sophon_mcp_server_tool_detail(qualified_name);
CREATE INDEX IF NOT EXISTS idx_sophon_mcp_server_tool_detail_server_name ON sophon_mcp_server_tool_detail(server_qualified_name);
CREATE INDEX IF NOT EXISTS idx_sophon_mcp_server_tool_detail_status ON sophon_mcp_server_tool_detail(status);
CREATE INDEX IF NOT EXISTS idx_sophon_mcp_server_tool_detail_create_time ON sophon_mcp_server_tool_detail(create_time);