import { PromptFrameworkEnum } from '@/interface/prompt';

export const PROMPT_FRAMEWORK_LIST = (t: any): { label: string; value: PromptFrameworkEnum }[] => [
  {
    label: t('PROMPT_15'),
    value: PromptFrameworkEnum.COMMON,
  },
  { label: PromptFrameworkEnum.ICIO, value: PromptFrameworkEnum.ICIO },
  { label: PromptFrameworkEnum.CRISPE, value: PromptFrameworkEnum.CRISPE },
  { label: PromptFrameworkEnum.RASCEF, value: PromptFrameworkEnum.RASCEF },
];

export const PROMPT_FRAMEWORK_MAP = (
  t: any,
): Record<PromptFrameworkEnum, { label: string; description: string; template: string }> => ({
  [PromptFrameworkEnum.COMMON]: {
    label: t('PROMPT_15'),
    description: '',
    template: '',
  },
  [PromptFrameworkEnum.ICIO]: {
    label: PromptFrameworkEnum.ICIO,
    description: t('PROMPT_16'),
    template: t('PROMPT_17'),
  },
  [PromptFrameworkEnum.CRISPE]: {
    label: PromptFrameworkEnum.CRISPE,
    description: t('PROMPT_18'),
    template: t('PROMPT_19'),
  },
  [PromptFrameworkEnum.RASCEF]: {
    label: PromptFrameworkEnum.RASCEF,
    description: t('PROMPT_20'),
    template: t('PROMPT_21'),
  },
});
