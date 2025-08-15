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