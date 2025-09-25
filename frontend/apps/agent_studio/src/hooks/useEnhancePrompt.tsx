import type { MessageItem } from '@/interface/chat';

import { useState } from 'react';
import { PromptFrameworkEnum } from '@/interface/prompt';
import prompt from '@/services/prompt';
import useFeedback from '@/context/feedbackContext';
import { RoleEnum } from '@/interface/chat';
import { createChatCompletion } from '@/services/chat';
import { useTranslation } from 'react-i18next';

function useEnhancePrompt() {
  const { t } = useTranslation();

  const { messageApi } = useFeedback();

  const [enhancedPrompt, setEnhancedPrompt] = useState<string>();
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [abortController, setAbortController] = useState<AbortController>();

  const onEnhance = async (p: { userPrompt?: string; framework?: PromptFrameworkEnum }) => {
    const { userPrompt, framework = PromptFrameworkEnum.COMMON } = p;
    setEnhancedPrompt(undefined);

    if (!userPrompt) {
      messageApi.error(t('PROMPT_14'));
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
      messageApi.error(t('MESSAGE_ERROR_6'));
      console.error(t('MESSAGE_ERROR_6'), ': ', err);
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
