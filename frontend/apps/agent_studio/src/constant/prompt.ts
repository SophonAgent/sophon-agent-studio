import { PromptFrameworkEnum } from '@/interface/prompt';

export const PROMPT_FRAMEWORK_LIST: { label: string; value: PromptFrameworkEnum }[] = [
  {
    label: '无框架',
    value: PromptFrameworkEnum.COMMON,
  },
  { label: PromptFrameworkEnum.ICIO, value: PromptFrameworkEnum.ICIO },
  { label: PromptFrameworkEnum.CRISPE, value: PromptFrameworkEnum.CRISPE },
  { label: PromptFrameworkEnum.RASCEF, value: PromptFrameworkEnum.RASCEF },
];

export const PROMPT_FRAMEWORK_MAP: Record<
  PromptFrameworkEnum,
  { label: string; description: string; template: string }
> = {
  [PromptFrameworkEnum.COMMON]: {
    label: '无框架',
    description: '',
    template: '',
  },
  [PromptFrameworkEnum.ICIO]: {
    label: PromptFrameworkEnum.ICIO,
    description:
      '该框架主要包含四个部分：是⼀个简洁清晰的Prompt框架，包含介绍（Intruction）、背景（Context）、输入数据（Input Data）和输出格式（Output Indicator），在通⽤场景下推理表现较好。',
    template: `##Intruction（指令）：
告诉它需要完成什么任务。例如：你的任务是扮演一名数据分析师，进行数据分析和解释。

##Context（背景）：
提供任务的背景信息，帮助AI理解任务的上下文和环境。例如：数据分析师是负责收集、处理和分析大量数据的专家，通过使用统计工具和软件，如Excel、Python、R等，来帮助企业或组织做出更明智的决策。

##Input Data（输入数据）：
指明AI在执行任务时需要考虑的数据或信息。例如：用户的输入是具体的数据集和他们希望解决的问题或目标。

##Output Indicator（输出格式）：
定义期望的输出结果，包括格式、内容和质量标准。例如：你的输出应该是一份详细的数据分析报告。`,
  },
  [PromptFrameworkEnum.CRISPE]: {
    label: PromptFrameworkEnum.CRISPE,
    description:
      '是⼀个完备的Prompt框架，包含Capacity and Role（角色）、Insight（背景）、Statement （任务）、Personality （输出风格）和Experiment （输出范围），在特定推理场景下表现更稳定。',
    template: `##Capacity and Role（角色）：
明确AI在交互中应扮演的角色。 例如：你是一名数据分析师，在处理和解释各种类型的数据集方面具有专业能力，并能使用先进的分析工具和技术来揭示数据背后的趋势和模式。

##Insight（背景）：
提供角色扮演的背景信息，帮助AI理解其在特定情境下的作用。例如：用户可能需要对特定的数据集进行分析，对数据分析的具体需求可能包括预测分析、分类问题解决或数据可视化。

##Statement（任务）：
直接说明AI需要执行的任务，确保其理解并执行用户的请求。 例如：作为一名数据分析师，你的任务是详细分析提供的数据集，并解释其背后的统计意义和潜在趋势。你需要使用适当的统计测试和数据可视化技术来支持你的分析。

##Personality（输出风格）：
设定AI回复的风格和格式，使其更符合用户的期望和场景需求。例如：你的回答应该是详细的、专业的，并在可能的情况下使用图表和图像来增强理解。

##Experiment（输出范围）：
如果需要，可以要求AI提供多个示例，以供用户选择最佳回复。例如：返回一个详细的分析报告，包括数据摘要、主要发现、图表和对结果的解释。确保报告既满足技术深度又具备良好的可读性。`,
  },
  [PromptFrameworkEnum.RASCEF]: {
    label: PromptFrameworkEnum.RASCEF,
    description:
      '是一个系统化的prompt框架，包含Role（角色）、Action（行动）、Script（步骤）、Content（上下文）、Example（示例）和Format（格式），在大多数场景下表现出色。',
    template: `##Role（角色）：
定义AI在交互中所扮演的角色，如数据分析师、客服机器人等。

##Action（行动）：
明确AI需要执行的具体行动，如编写项目计划或回答客户咨询。

##Script（步骤）：
提供AI完成任务时应遵循的步骤，确保任务的有序进行

##Content（上下文）：
提供背景信息或情境，帮助AI理解任务的背景和环境。

##Example（示例）：
通过具体实例展示期望的语气和风格，帮助A更好地模仿和理解。

##Format（格式）：
设定AI输出的格式，如段落、列表或对话，以适应不同的沟通需求。`,
  },
};
