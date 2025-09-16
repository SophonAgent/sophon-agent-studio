import { useState } from 'react';
import { PromptFrameworkEnum } from '@/interface/prompt';
import prompt from '@/services/prompt';
import useFeedback from '@/context/feedbackContext';
import { MessageItem, RoleEnum } from '@/interface/chat';
import { createChatCompletion } from '@/services/chat';

function useEnhancePrompt() {
  const { messageApi } = useFeedback();

  const [enhancedPrompt, setEnhancedPrompt] = useState<string>();
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [abortController, setAbortController] = useState<AbortController>();

  const onEnhance = async (p: { userPrompt?: string; framework?: PromptFrameworkEnum }) => {
    const { userPrompt, framework = PromptFrameworkEnum.COMMON } = p;
    setEnhancedPrompt(undefined);

    if (!userPrompt) {
      messageApi.error('请输入原始Prompt!');
      return;
    }

    setIsRunning(true);
    const controller = new AbortController();
    setAbortController(controller);

    try {
      const res = await prompt.generatePromptTemplate({ userPrompt, framework }, controller);
      const { finalPrompt = '', modelConfigId } = res?.data || {};
      if (!modelConfigId) {
        return;
      }

      const messages: MessageItem[] = [
        { role: RoleEnum.SYSTEM, content: finalPrompt },
        { role: RoleEnum.USER, content: userPrompt },
      ];
      const modelConfig = { model_config_id: modelConfigId };

      for await (const value of createChatCompletion({ messages, modelConfig, stream: true }, controller)) {
        setEnhancedPrompt(value?.content);
      }
    } catch (err) {
      messageApi.error(`Prompt优化失败: ${err}`);
    } finally {
      setIsRunning(false);
    }
  };

  const onStopRequest = () => {
    abortController?.abort();
    setAbortController(undefined);
  };

  return { onEnhance, enhancedPrompt, setEnhancedPrompt, isRunning, onStopRequest };
}

export default useEnhancePrompt;
