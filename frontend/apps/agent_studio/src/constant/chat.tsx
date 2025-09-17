import type { ChatDisplayConfig, ChatModelConfig, MessageGroup } from '@/interface/chat';
import type { ReactNode } from 'react';

import { cn } from '@/utils/tw';

export const INIT_DISPLAY_CONFIG: ChatDisplayConfig = {
  stream: true,
  markdown: true,
  multiTurn: true,
  autoRunMcpTool: true,
  multiToolOutput: false,
};

export const INIT_GROUPS: MessageGroup[] = [
  {
    msgGroupKey: 'basic',
    name: '对比1',
    displayConfig: INIT_DISPLAY_CONFIG,
  },
];

export const INIT_CHAT_MODEL_CONFIG: Partial<ChatModelConfig> = {
  frequency_penalty: 0,
  max_completion_tokens: 1024,
  presence_penalty: 0,
  seed: undefined,
  stop: undefined,
  temperature: 1,
  top_p: 1,
  tool_choice: undefined,
};

export const CHAT_MODEL_CONFIG_TOOLTIP_CONTENT: Record<string, ReactNode> = {
  frequency_penalty: `Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.`,
  max_completion_tokens: `An upper bound for the number of tokens that can be generated for a completion, including visible output tokens and reasoning tokens.`,
  presence_penalty: `Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.`,
  seed: `This feature is in Beta. If specified, our system will make a best effort to sample deterministically, such that repeated requests with the same seed and parameters should return the same result. Determinism is not guaranteed, and you should refer to the system_fingerprint response parameter to monitor changes in the backend.`,
  stop: `Up to 4 sequences where the API will stop generating further tokens. The returned text will not contain the stop sequence.`,
  temperature: `What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic. We generally recommend altering this or top_p but not both.`,
  top_p: `An alternative to sampling with temperature, called nucleus sampling, where the model considers the results of the tokens with top_p probability mass. So 0.1 means only the tokens comprising the top 10% probability mass are considered. We generally recommend altering this or temperature but not both.`,
  tool_choice: (
    <div className={cn('flex flex-col gap-4')}>
      <div>
        How the model should select which tool (or tools) to use when generating a response. See the tools
        parameter to see how to specify which tools the model can call.
      </div>
      <div>
        <p>Tool choice mode (string)</p>
        <p>Controls which (if any) tool is called by the model.</p>
        <p>- none means the model will not call any tool and instead generates a message.</p>
        <p>- auto means the model can pick between generating a message or calling one or more tools.</p>
        <p>- required means the model must call one or more tools.</p>
      </div>
      <div>
        <p>Function tool (object)</p>
        <p>Use this option to force the model to call a specific function.</p>
        <p>- name: The name of the function to call.</p>
        <p>- type: For function calling, the type is always function</p>
      </div>
    </div>
  ),
};
