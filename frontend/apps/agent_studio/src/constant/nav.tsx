import type { ReactNode } from 'react';

import CodeIcon from '@/icons/codeIcon';
import McpIcon from '@/icons/mcpIcon';
import ModelIcon from '@/icons/modelIcon';
import { cn } from '@/utils/tw';

export const NAV_PATH_MAP = {
  CHAT: '/chat',
  CHAT_SHARE: '/chat/share',
  MODEL: '/model',
  MCP: '/mcp',
  MCP_TOOL: '/mcp/tool',
  PROMPT: '/prompt',
};

interface NavItem {
  label: string;
  icon: ReactNode;
  path: string;
}

export const NAV_LIST: NavItem[] = [
  {
    label: '模型',
    icon: <ModelIcon className={cn('h-[18px] w-[18px]')} />,
    path: NAV_PATH_MAP.MODEL,
  },
  {
    label: 'MCP',
    icon: <McpIcon className={cn('h-[18px] w-[18px]')} />,
    path: NAV_PATH_MAP.MCP,
  },
  {
    label: 'Prompt',
    icon: <CodeIcon className={cn('h-[18px] w-[18px]')} />,
    path: NAV_PATH_MAP.PROMPT,
  },
];
