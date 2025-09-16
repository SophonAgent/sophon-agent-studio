import { MsgGroupKeyType, SystemPrompt } from '@/interface/chat';
import { PromptItem } from '@/interface/prompt';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { set as _set, get as _get, isEmpty } from 'lodash-es';
import prompt from '@/services/prompt';
import { messageGroupModel } from './messageGroupModel';
import useFeedback from '@/context/feedbackContext';

interface SystemPromptModelState {
  /** state */
  promptList: PromptItem[];
  isPromptListLoading: boolean;
  selectedPromptMap: Record<MsgGroupKeyType, SystemPrompt | undefined>;
  showVariableMap: Record<MsgGroupKeyType, boolean>;

  /** actions */
  __setPromptList: (promptList: PromptItem[]) => void;
  __setIsPromptListLoading: (isPromptListLoading: boolean) => void;
  __setSelectedPromptMap: (selectedPromptMap: Record<MsgGroupKeyType, SystemPrompt | undefined>) => void;
  __setSelectedPromptMapByKey: (selectedPromptMap: Record<MsgGroupKeyType, SystemPrompt | undefined>) => void;
  __updateSystemPrompt: (p: { msgGroupKey: string; path: string; value: any; isSync?: boolean }) => void;
  __setShowVariableMap: (showVariableMap: Record<MsgGroupKeyType, boolean>) => void;
  __setShowVariableMapByKey: (showVariableMap: Record<MsgGroupKeyType, boolean>) => void;
  __updateShowVariable: (p: { msgGroupKey: string; showVariable: boolean; isSync?: boolean }) => void;
}

export const systemPromptModel = create<SystemPromptModelState>()(
  immer((set, get) => ({
    promptList: [],
    isPromptListLoading: false,
    selectedPromptMap: {},
    showVariableMap: {},

    __setPromptList: (promptList: PromptItem[]) => {
      set(state => {
        state.promptList = promptList;
      });
    },

    __setIsPromptListLoading: (isPromptListLoading: boolean) => {
      set(state => {
        state.isPromptListLoading = isPromptListLoading;
      });
    },

    __setSelectedPromptMap: (selectedPromptMap: Record<MsgGroupKeyType, SystemPrompt | undefined>) => {
      set(state => {
        state.selectedPromptMap = selectedPromptMap;
      });
    },
    __setSelectedPromptMapByKey: (selectedPromptMap: Record<MsgGroupKeyType, SystemPrompt | undefined>) => {
      set(state => {
        Object.assign(state.selectedPromptMap, selectedPromptMap);
      });
    },
    __updateSystemPrompt: (p: { msgGroupKey: string; path: string; value: any; isSync?: boolean }) => {
      const { msgGroupKey, path, value, isSync } = p;
      if (isSync) {
        set(state => {
          Object.keys(state.selectedPromptMap).forEach(key => {
            _set(state.selectedPromptMap, `${key}.${path}`, value);
          });
        });
      } else {
        set(state => {
          _set(state.selectedPromptMap, `${msgGroupKey}.${path}`, value);
        });
      }
    },

    __setShowVariableMap: (showVariableMap: Record<MsgGroupKeyType, boolean>) => {
      set(state => {
        state.showVariableMap = showVariableMap;
      });
    },
    __setShowVariableMapByKey: (showVariableMap: Record<MsgGroupKeyType, boolean>) => {
      set(state => {
        Object.assign(state.showVariableMap, showVariableMap);
      });
    },
    __updateShowVariable: (p: { msgGroupKey: string; showVariable: boolean; isSync?: boolean }) => {
      const { msgGroupKey, showVariable, isSync } = p;
      if (isSync) {
        set(state => {
          Object.keys(state.showVariableMap).forEach(key => {
            _set(state.showVariableMap, key, showVariable);
          });
        });
      } else {
        set(state => {
          _set(state.showVariableMap, msgGroupKey, showVariable);
        });
      }
    },
  })),
);

function useSystemPromptModel() {
  const {
    promptList,
    isPromptListLoading,
    selectedPromptMap,
    showVariableMap,
    __setPromptList,
    __setIsPromptListLoading,
    __setSelectedPromptMap,
    __setSelectedPromptMapByKey,
    __updateSystemPrompt,
    __setShowVariableMap,
    __setShowVariableMapByKey,
    __updateShowVariable,
  } = systemPromptModel();
  const { messageGroups } = messageGroupModel();

  const { messageApi } = useFeedback();

  const getPromptList = async (): Promise<PromptItem[]> => {
    __setIsPromptListLoading(true);
    try {
      const { data = [] } = await prompt.getPromptList();
      __setPromptList(data);
      return data;
    } catch (err) {
      messageApi.error(`获取prompt列表失败：${err}`);
      return [];
    } finally {
      __setIsPromptListLoading(false);
    }
  };

  const setSelectedPrompt = async (
    msgGroupKey: string,
    p: Partial<SystemPrompt>,
    isSync?: boolean,
    isInit?: boolean,
  ) => {
    const selectedPrompt = selectedPromptMap[msgGroupKey];
    const allMessageGroupKeys = messageGroups.map(i => i.msgGroupKey);
    let systemPrompt: SystemPrompt | undefined;

    if (isInit) {
      if (p.uid) {
        try {
          const { data = [] } = await prompt.getPromptDetail(p.uid);
          if (data[0]) {
            const { promptUid, contentPlaceholders = [], promptContent, version } = data[0];
            systemPrompt = {
              uid: promptUid,
              name: p.name,
              version,
              variables: Object.fromEntries(contentPlaceholders?.map(i => [i, ''])),
              promptContent,
            };
          }
        } catch (err) {
          messageApi.error(`获取prompt详情失败：${err}`);
        }
      }
    } else {
      systemPrompt = {
        uid: p.uid || selectedPrompt?.uid,
        name: p.name || selectedPrompt?.name,
        version: p.version || selectedPrompt?.version,
        variables: p.variables || selectedPrompt?.variables,
        promptContent: p.promptContent || selectedPrompt?.promptContent,
      };
    }

    if (isSync) {
      const newSelectedPromptMap = Object.fromEntries(allMessageGroupKeys.map(i => [i, systemPrompt]));
      __setSelectedPromptMapByKey(newSelectedPromptMap);
    } else {
      __setSelectedPromptMapByKey({ [msgGroupKey]: systemPrompt });
    }
  };

  /* 获取变量替换后的content */
  const getPromptByVariableReplace = (promptContent = '', variables?: Record<string, string | undefined>) => {
    if (!variables || isEmpty(variables)) {
      return promptContent;
    }
    let text = promptContent;
    Object.entries(variables).map(([k, v]) => {
      if (v !== undefined) {
        text = text.replaceAll(`{${k}}`, v);
      }
    });
    return text;
  };

  /* 更改输入文本中的变量 */
  const updatePromptVariable = (msgGroupKey: string, promptContent?: string, isSync?: boolean) => {
    // 大括号内不为空，且只能包含字母,中文,数字，下划线 会被识别为变量
    const matches = promptContent?.match(/\{[\w\u4e00-\u9fa5]+\}/g);
    // 参数中不需要{},去重
    let vars = matches?.filter(i => !!i)?.map(i => i?.replace(/^\{(.*)\}$/, '$1'));
    vars = Array.from(new Set(vars));

    const obj: Record<string, string | undefined> = {};
    if (vars?.length) {
      vars.map(v => {
        obj[v] = _get(selectedPromptMap[msgGroupKey], `variables.${v}`);
      });
    }
    __updateSystemPrompt({ msgGroupKey, path: 'variables', value: obj, isSync });
  };

  return {
    /** state */
    promptList,
    isPromptListLoading,
    selectedPromptMap,
    showVariableMap,

    /** actions */
    __setPromptList,
    __setIsPromptListLoading,
    __setSelectedPromptMap,
    __setSelectedPromptMapByKey,
    __updateSystemPrompt,
    __setShowVariableMap,
    __setShowVariableMapByKey,
    __updateShowVariable,

    getPromptList,
    setSelectedPrompt,
    getPromptByVariableReplace,
    updatePromptVariable,
  };
}

export default useSystemPromptModel;
