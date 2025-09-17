import type { MsgGroupKeyType, ToolCallItem } from '@/interface/chat';
import type { FunctionDefinition } from '@/interface/functionCall';
import type { McpToolCallParams } from '@/interface/mcpTool';

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { set as _set, get as _get } from 'lodash-es';
import useFeedback from '@/context/feedbackContext';
import { isJSON, tranJsonToObject } from '@/utils/json';
import mcpTool from '@/services/mcpTool';
import { conversationModel } from '@/store/chat/conversationModel';

interface FunctionCallModelState {
  /** state */
  functionCallMap: Record<MsgGroupKeyType, FunctionDefinition[]>;
  enableFunctionCallMap: Record<MsgGroupKeyType, boolean>;

  /** action */
  __setFunctionCallMap: (functionCallMap: Record<MsgGroupKeyType, FunctionDefinition[]>) => void;
  __setFunctionCallMapByKey: (functionCallMap: Record<MsgGroupKeyType, FunctionDefinition[]>) => void;
  __addFunctionCallItem: (p: {
    msgGroupKey: string;
    functionCall: FunctionDefinition;
    isSync?: boolean;
  }) => void;
  __updateFunctionCallItem: (p: {
    msgGroupKey: string;
    functionCall: FunctionDefinition;
    isSync?: boolean;
  }) => void;
  __removeFunctionCallItem: (p: {
    msgGroupKey: string;
    id: FunctionDefinition['id'];
    isSync?: boolean;
  }) => void;
  __replaceFunctionCallList: (p: {
    msgGroupKey: string;
    functionCallList: FunctionDefinition[];
    isSync?: boolean;
  }) => void;
  __removeFunctionCallList: (p: { msgGroupKey: string; isSync?: boolean }) => void;
  __setEnableFunctionCallMap: (enableFunctionCallMap: Record<MsgGroupKeyType, boolean>) => void;
  __setEnableFunctionCallMapByKey: (enableFunctionCallMap: Record<MsgGroupKeyType, boolean>) => void;
  __updateEnableFunctionCall: (p: {
    msgGroupKey: string;
    enableFunctionCall: boolean;
    isSync?: boolean;
  }) => void;
}

export const functionCallModel = create<FunctionCallModelState>()(
  immer((set, get) => ({
    functionCallMap: {},
    enableFunctionCallMap: {},

    __setFunctionCallMap: (functionCallMap: Record<MsgGroupKeyType, FunctionDefinition[]>) => {
      set(state => {
        state.functionCallMap = functionCallMap;
      });
    },
    __setFunctionCallMapByKey: (functionCallMap: Record<MsgGroupKeyType, FunctionDefinition[]>) => {
      set(state => {
        Object.assign(state.functionCallMap, functionCallMap);
      });
    },
    __addFunctionCallItem: (p: {
      msgGroupKey: string;
      functionCall: FunctionDefinition;
      isSync?: boolean;
    }) => {
      const { msgGroupKey, functionCall, isSync } = p;
      if (isSync) {
        set(state => {
          Object.keys(state.functionCallMap).forEach(key => {
            state.functionCallMap[key].push(functionCall);
          });
        });
      } else {
        set(state => {
          state.functionCallMap[msgGroupKey].push(functionCall);
        });
      }
    },
    __updateFunctionCallItem: (p: {
      msgGroupKey: string;
      functionCall: FunctionDefinition;
      isSync?: boolean;
    }) => {
      const { msgGroupKey, functionCall, isSync } = p;
      if (isSync) {
        set(state => {
          Object.keys(state.functionCallMap).forEach(key => {
            const index = state.functionCallMap[key].findIndex(item => item.id === functionCall.id);
            if (index !== -1) {
              state.functionCallMap[key][index] = functionCall;
            }
          });
        });
      } else {
        set(state => {
          const index = state.functionCallMap[msgGroupKey].findIndex(item => item.id === functionCall.id);
          if (index !== -1) {
            state.functionCallMap[msgGroupKey][index] = functionCall;
          }
        });
      }
    },
    __removeFunctionCallItem: (p: {
      msgGroupKey: string;
      id: FunctionDefinition['id'];
      isSync?: boolean;
    }) => {
      const { msgGroupKey, id, isSync } = p;
      if (isSync) {
        set(state => {
          Object.keys(state.functionCallMap).forEach(key => {
            const functionCalls = state.functionCallMap[key].filter(item => item.id !== id);
            _set(state.functionCallMap, key, functionCalls);
          });
        });
      } else {
        set(state => {
          const functionCalls = state.functionCallMap[msgGroupKey].filter(item => item.id !== id);
          _set(state.functionCallMap, msgGroupKey, functionCalls);
        });
      }
    },
    __replaceFunctionCallList: (p: {
      msgGroupKey: string;
      functionCallList: FunctionDefinition[];
      isSync?: boolean;
    }) => {
      const { msgGroupKey, functionCallList, isSync } = p;
      if (isSync) {
        set(state => {
          Object.keys(state.functionCallMap).forEach(key => {
            _set(state.functionCallMap, key, functionCallList);
          });
        });
      } else {
        set(state => {
          _set(state.functionCallMap, msgGroupKey, functionCallList);
        });
      }
    },
    __removeFunctionCallList: (p: { msgGroupKey: string; isSync?: boolean }) => {
      const { msgGroupKey, isSync } = p;
      if (isSync) {
        set(state => {
          Object.keys(state.functionCallMap).forEach(key => {
            _set(state.functionCallMap, key, []);
          });
        });
      } else {
        set(state => {
          _set(state.functionCallMap, msgGroupKey, []);
        });
      }
    },

    __setEnableFunctionCallMap: (enableFunctionCallMap: Record<MsgGroupKeyType, boolean>) => {
      set(state => {
        state.enableFunctionCallMap = enableFunctionCallMap;
      });
    },
    __setEnableFunctionCallMapByKey: (enableFunctionCallMap: Record<MsgGroupKeyType, boolean>) => {
      set(state => {
        Object.assign(state.enableFunctionCallMap, enableFunctionCallMap);
      });
    },
    __updateEnableFunctionCall: (p: {
      msgGroupKey: string;
      enableFunctionCall: boolean;
      isSync?: boolean;
    }) => {
      const { msgGroupKey, enableFunctionCall, isSync } = p;
      if (isSync) {
        set(state => {
          Object.keys(state.enableFunctionCallMap).forEach(key => {
            _set(state.enableFunctionCallMap, key, enableFunctionCall);
          });
        });
      } else {
        set(state => {
          _set(state.enableFunctionCallMap, msgGroupKey, enableFunctionCall);
        });
      }
    },
  })),
);

function useFunctionCallModel() {
  const {
    functionCallMap,
    enableFunctionCallMap,
    __setFunctionCallMap,
    __setFunctionCallMapByKey,
    __addFunctionCallItem,
    __updateFunctionCallItem,
    __removeFunctionCallItem,
    __replaceFunctionCallList,
    __removeFunctionCallList,
    __setEnableFunctionCallMap,
    __setEnableFunctionCallMapByKey,
    __updateEnableFunctionCall,
  } = functionCallModel();

  const { messageApi } = useFeedback();

  const callMcpTool = async (p: {
    msgGroupKey: string;
    toolCall: ToolCallItem;
  }): Promise<{ result: string; success: boolean }> => {
    const { msgGroupKey, toolCall } = p;
    const functionCallList = functionCallMap[msgGroupKey] || [];
    const functionCall = functionCallList.find(item => item.qualifiedName === toolCall.function.name);
    const enableFunctionCall = enableFunctionCallMap[msgGroupKey];
    const abortController = conversationModel.getState().abortControllerMap[msgGroupKey];

    if (!enableFunctionCall || !functionCall?.enabled) {
      messageApi.error('未启用 Function Call');
      return { result: '', success: true };
    }

    if (!functionCall?.mcpServer?.endpointUrl) {
      console.error('缺失 endpointUrl');
      return { result: '', success: true };
    }

    if (!isJSON(toolCall.function.arguments)) {
      messageApi.error('大模型参数格式不合法');
      return { result: '执行参数格式错误，请重新生成参数', success: true };
    }

    const params: McpToolCallParams = {
      endpointUrl: functionCall.mcpServer.endpointUrl,
      toolName: toolCall.function.name,
      args: tranJsonToObject(toolCall.function.arguments),
    };
    try {
      const res = await mcpTool.callMcpTool(params, abortController);
      if (res?.data) {
        const { content } = res.data;
        if (content) {
          return { result: content?.map(i => i?.text)?.join('\n') || '', success: true };
        } else {
          return { result: JSON.stringify(res.data), success: true };
        }
      }
      return { result: '', success: true };
    } catch (err) {
      messageApi.error(`调用 MCP 工具失败：${err}`);
      return { result: '', success: false };
    }
  };

  return {
    /** state */
    functionCallMap,
    enableFunctionCallMap,

    /** action */
    __setFunctionCallMap,
    __setFunctionCallMapByKey,
    __addFunctionCallItem,
    __updateFunctionCallItem,
    __removeFunctionCallItem,
    __replaceFunctionCallList,
    __removeFunctionCallList,
    __setEnableFunctionCallMap,
    __setEnableFunctionCallMapByKey,
    __updateEnableFunctionCall,

    callMcpTool,
  };
}

export default useFunctionCallModel;
