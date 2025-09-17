import type { RouteObject } from 'react-router-dom';

import { createHashRouter, redirect } from 'react-router-dom';
import App from '@/app';
import { NAV_PATH_MAP } from '@/constant/nav';
import Chat from '@/page/chat';
import ShareChat from '@/page/shareChat';
import ModelManagement from '@/page/modelManagement';
import McpServer from '@/page/mcpServer';
import McpTool from '@/page/mcpTool';
import PromptManagement from '@/page/promptManagement';

export const routeList: RouteObject[] = [
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        loader: () => redirect(NAV_PATH_MAP.CHAT),
      },
      {
        path: NAV_PATH_MAP.CHAT,
        element: <Chat />,
      },
      {
        path: NAV_PATH_MAP.CHAT_SHARE,
        element: <ShareChat />,
      },
      {
        path: NAV_PATH_MAP.MODEL,
        element: <ModelManagement />,
      },
      {
        path: NAV_PATH_MAP.MCP,
        element: <McpServer />,
      },
      {
        path: NAV_PATH_MAP.MCP_TOOL,
        element: <McpTool />,
      },
      {
        path: NAV_PATH_MAP.PROMPT,
        element: <PromptManagement />,
      },
    ],
  },
  {
    path: '*',
    loader: () => redirect(NAV_PATH_MAP.CHAT),
  },
];

const router = createHashRouter(routeList);

export default router;
