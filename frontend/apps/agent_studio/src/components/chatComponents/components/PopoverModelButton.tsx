import type { FC } from 'react';
import type { ModelConfigItem } from '@/interface/modelConfig';

import { Fragment, memo, useEffect, useMemo, useState } from 'react';
import useModelConfigModel from '@/store/chat/modelConfigModel';
import { cn } from '@/utils/tw';
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
  TriangleDownIcon,
  TriangleRightIcon,
} from '@radix-ui/react-icons';
import { Button, Checkbox, Collapse, Input, Popover } from 'antd';
import Paragraph3Line from '@/components/paragraph3Line';
import { cloneDeep } from 'lodash-es';
import { tranJsonToObject } from '@/utils/json';
import useMessageGroupModel from '@/store/chat/messageGroupModel';
import useSystemPromptModel from '@/store/chat/systemPromptModel';
import ChatModelConfigForm from './ChatModelConfigForm';
import { INIT_CHAT_MODEL_CONFIG } from '@/constant/chat';

type ModelGroupConfig = {
  group: string;
  models: ModelConfigItem[];
};

interface ModelOptionItemProps {
  checked: boolean;
  model: Partial<ModelConfigItem>;
  onModelChange?: () => void;
  isReadonly?: boolean;
}

const ModelOptionItem: FC<ModelOptionItemProps> = ({ checked, model, onModelChange, isReadonly }) => {
  return (
    <div
      className={cn(
        'rounded-lg border border-solid p-2',
        checked ? 'border-select bg-[--interactive-bg-accent-muted-press]' : 'border-default',
        isReadonly ? '' : 'cursor-pointer',
      )}
      onClick={onModelChange}
    >
      <Paragraph3Line value={model.name} style={{ color: 'var(--text-primary)' }} />
      <Paragraph3Line
        value={model.description || '暂无说明'}
        style={{ fontSize: 12, color: 'var(--text-tertiary)' }}
      />
    </div>
  );
};

interface PopoverModelButtonProps {
  msgGroupKey: string;
  isReadonly?: boolean;
}

const PopoverModelButton: FC<PopoverModelButtonProps> = ({ msgGroupKey, isReadonly }) => {
  const styles: any = {
    header: {
      fontSize: 13,
      color: 'var(--text-primary)',
      fontWeight: 500,
      alignItems: 'center',
      padding: 0,
    },
    body: {
      padding: '8px 0',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
    },
  };

  const { chatModelConfigMap, modelList, __updateChatModelConfig } = useModelConfigModel();
  const { isCompareMode, is2Groups, is3Groups, __updateMessageGroupDisplayConfig } = useMessageGroupModel();
  const { __setSelectedPromptMapByKey, __setShowVariableMapByKey } = useSystemPromptModel();

  const [activeKey, setActiveKey] = useState<string[]>([]);
  const [filterRecord, setFilterRecord] = useState<{ name?: string; isSupportImg?: boolean }>({});

  const modelConfig = useMemo(() => chatModelConfigMap[msgGroupKey], [chatModelConfigMap, msgGroupKey]);
  const model = useMemo(
    () => modelList.find(item => item.modelName === modelConfig?.model),
    [modelList, modelConfig?.model],
  );

  const tranModelListToGroupList = (list: ModelConfigItem[]): ModelGroupConfig[] => {
    return list.reduce((acc: ModelGroupConfig[], curr) => {
      const { config } = curr;
      const { provider = '自定义' } = tranJsonToObject(config);
      const existingGroup = acc.find(group => group.group === provider);
      if (existingGroup) {
        existingGroup.models.push(curr);
      } else {
        acc.push({ group: provider, models: [curr] });
      }
      return acc;
    }, []);
  };

  const filteredModelGroupList = useMemo(() => {
    // 筛选
    const { name, isSupportImg } = filterRecord;
    let list = cloneDeep(modelList);
    if (name) {
      list = list.filter(item => item.name?.toLowerCase()?.includes(name.toLowerCase()));
    }
    if (isSupportImg) {
      list = list.filter(item => item.modalities?.includes('image'));
    }

    // 分组
    const groupList = tranModelListToGroupList(list);

    // 折叠
    if (!name && !isSupportImg) {
      const group = groupList.find(item =>
        item.models.find(model => model.modelName === modelConfig?.model),
      )?.group;
      setActiveKey(group ? [group] : []);
    } else {
      setActiveKey(groupList.map(item => item.group));
    }

    return groupList;
  }, [modelConfig?.model, modelList, JSON.stringify(filterRecord)]);

  useEffect(() => {
    if (!modelConfig?.model || !modelList.length) return;

    const group = tranModelListToGroupList(modelList).find(item =>
      item.models.find(model => model.modelName === modelConfig.model),
    )?.group;
    setActiveKey(group ? [group] : []);
  }, [modelConfig?.model, modelList]);

  const onModelChange = (config: ModelConfigItem) => {
    const { id, modelName, defaultParams = '{}', modalities, supportStream, supportSystem } = config;
    // 变更模型配置
    __updateChatModelConfig(msgGroupKey, {
      model: modelName,
      model_config_id: id,
      modalities,
      ...tranJsonToObject(defaultParams),
    });
    // 变更是否支持流式
    __updateMessageGroupDisplayConfig(msgGroupKey, { stream: Boolean(supportStream) });
    // 变更是否支持 system prompt
    if (supportSystem === 0) {
      __setSelectedPromptMapByKey({ [msgGroupKey]: undefined });
      __setShowVariableMapByKey({ [msgGroupKey]: false });
    }
  };

  const onResetModelConfig = () => {
    const config = modelList.find(item => item.modelName === modelConfig?.model);
    const { defaultParams = '{}' } = config || {};
    __updateChatModelConfig(msgGroupKey, {
      ...INIT_CHAT_MODEL_CONFIG,
      ...tranJsonToObject(defaultParams),
    });
  };

  const genPopoverContent = () => {
    return (
      <div className={cn('grid h-[576px] w-[576px] grid-cols-2 overflow-hidden')}>
        <div
          className={cn(
            'flex h-full flex-col gap-2 overflow-hidden border-r border-solid border-default pr-3',
          )}
        >
          <div className={cn('h-6 font-medium text-foreground-primary')}>
            {isReadonly ? '模型' : '模型选择'}
          </div>
          {isReadonly ? null : (
            <div className={cn('flex items-center gap-2')}>
              <Input
                placeholder="输入模型名称筛选"
                value={filterRecord.name}
                suffix={<MagnifyingGlassIcon />}
                onChange={e => setFilterRecord(prev => ({ ...prev, name: e.target.value }))}
              />
              <Checkbox
                checked={filterRecord.isSupportImg}
                onChange={e => setFilterRecord(prev => ({ ...prev, isSupportImg: e.target.checked }))}
                style={{ fontSize: 13, flexShrink: 0 }}
              >
                支持图片
              </Checkbox>
            </div>
          )}
          {isReadonly ? (
            <ModelOptionItem checked model={{ name: modelConfig?.model }} />
          ) : (
            <div className={cn('__hide-scrollbar flex-1 overflow-auto')}>
              <Collapse
                activeKey={activeKey}
                onChange={setActiveKey}
                expandIcon={({ isActive }) =>
                  isActive ? (
                    <TriangleDownIcon width={16} height={16} />
                  ) : (
                    <TriangleRightIcon width={16} height={16} />
                  )
                }
                size="small"
                ghost
                items={filteredModelGroupList.map(group => ({
                  key: group.group,
                  label: group.group,
                  children: group.models.map(item => (
                    <ModelOptionItem
                      key={item.modelName}
                      checked={modelConfig?.model === item.modelName}
                      model={item}
                      onModelChange={() => onModelChange(item)}
                    />
                  )),
                  styles,
                }))}
              />
            </div>
          )}
        </div>

        <div className={cn('flex h-full flex-col gap-2 overflow-hidden pl-3')}>
          <div className={cn('flex h-6 items-center justify-between')}>
            <div className={cn('font-medium text-foreground-primary')}>参数配置</div>
            {isReadonly ? null : (
              <Button type="link" size="small" style={{ fontSize: 13 }} onClick={onResetModelConfig}>
                恢复默认
              </Button>
            )}
          </div>
          <div className={cn('__hide-scrollbar flex-1 overflow-auto')}>
            <ChatModelConfigForm msgGroupKey={msgGroupKey} isReadonly={isReadonly} />
          </div>
        </div>
      </div>
    );
  };

  if (!modelConfig) {
    return <div />;
  }
  return (
    <Fragment>
      <Popover
        arrow={false}
        placement="bottomLeft"
        trigger={['click']}
        destroyOnHidden={false}
        content={genPopoverContent()}
      >
        <Button
          color="default"
          variant="filled"
          style={{ height: isCompareMode ? 32 : 36, padding: '0 10px' }}
        >
          <div
            className={cn('flex items-center gap-1 text-[13px] font-medium text-foreground-primary', {
              'max-w-[140px]': is2Groups,
              'max-w-[100px]': is3Groups,
            })}
          >
            <Paragraph3Line value={model?.name || modelConfig?.model} rows={1} />
            <ChevronDownIcon className={cn('h-4 w-4 flex-shrink-0 text-foreground-tertiary')} />
          </div>
        </Button>
      </Popover>
    </Fragment>
  );
};

export default memo(PopoverModelButton);
