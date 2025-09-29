export const MODEL_FAMILY_MAP: Record<string, string> = {
  other: 'Other',
  baichuan: 'Baichuan',
  claude: 'Claude',
  deepseek: 'DeepSeek',
  doubao: 'Doubao',
  gpt: 'GPT',
  gemini: 'Gemini',
  glm: 'GLM',
  kimi: 'Kimi',
  qwen: 'Qwen',
};

export const MODEL_FAMILY_LIST = Object.keys(MODEL_FAMILY_MAP).map(key => ({
  label: MODEL_FAMILY_MAP[key],
  value: key,
}));
