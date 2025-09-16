export function getPromptContentPlaceholders(str?: string): string[] {
  // 大括号内不为空，且只能包含字母,中文,数字，下划线
  const matches = str?.match(/\{[\w\u4e00-\u9fa5]+\}/g) || [];
  // 参数中不需要{},去重
  let realTexts = matches?.filter(i => !!i)?.map(i => i.replace(/^\{(.*)\}$/, '$1')) || [];
  realTexts = Array.from(new Set(realTexts));
  return realTexts;
}
