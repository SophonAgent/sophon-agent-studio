import type { FC } from 'react';

import { Fragment, memo, useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/utils/tw';
import { Button, Checkbox, Collapse, Input, Select, Switch } from 'antd';
import useSystemPromptModel from '@/store/chat/systemPromptModel';
import useMessageGroupModel from '@/store/chat/messageGroupModel';
import { PromptFrameworkEnum } from '@/interface/prompt';
import Paragraph3Line from '@/components/paragraph3Line';
import CopyButton from '@/components/copyButton';
import PromptEnhanceButton from '@/components/promptEnhanceButton';
import PromptFrameworkSelect from '@/components/promptFrameworkSelect';
import { DotsHorizontalIcon, DownloadIcon, TriangleDownIcon, TriangleRightIcon } from '@radix-ui/react-icons';
import VariableInput from './VariableInput';
import Tooltip from '@/lib/tooltip';
import AccentBorderHeader from '@/components/accentBorderHeader';
import usePromptManage from '@/hooks/usePromptManage';
import PromptEditModal from './PromptEditModal';
import useFeedback from '@/context/feedbackContext';
import { useTranslation } from 'react-i18next';

const { TextArea } = Input;

interface SystemPromptPanelProps {
  msgGroupKey: string;
  isReadonly?: boolean;
  groupName?: string;
}

const SystemPromptPanel: FC<SystemPromptPanelProps> = ({ msgGroupKey, isReadonly, groupName }) => {
  const { t } = useTranslation();

  const {
    isPromptListLoading,
    promptList,
    selectedPromptMap,
    showVariableMap,
    __updateSystemPrompt,
    __updateShowVariable,
    getPromptList,
    setSelectedPrompt,
    getPromptByVariableReplace,
    updatePromptVariable,
  } = useSystemPromptModel();
  const { isSyncMap, isCompareMode, syncAllMessageGroups } = useMessageGroupModel();

  const { modalApi } = useFeedback();
  const { getPromptHistoryList, promptHistoryList, isPromptHistoryLoading } = usePromptManage();

  const boxRef = useRef<HTMLDivElement>(null);
  const [collapseBtns, setCollapseBtns] = useState<boolean>(false);
  const [isPromptInputComposing, setIsPromptInputComposing] = useState<boolean>(false);
  const [showPromptByVariableReplace, setShowPromptByVariableReplace] = useState<boolean>(false);
  const [promptFramework, setPromptFramework] = useState<PromptFrameworkEnum>();
  const [showPromptEditModal, setShowPromptEditModal] = useState<boolean>(false);

  const selectedPrompt = useMemo(() => selectedPromptMap[msgGroupKey], [selectedPromptMap, msgGroupKey]);
  const showVariable = useMemo(() => showVariableMap[msgGroupKey], [showVariableMap, msgGroupKey]);

  const currentPromptContent = useMemo(() => {
    let val = selectedPrompt?.promptContent;
    if (showPromptByVariableReplace) {
      val = getPromptByVariableReplace(val, selectedPrompt?.variables);
    }
    return val;
  }, [selectedPrompt, showPromptByVariableReplace]);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        if (isCompareMode && !isReadonly && width <= 231) {
          setCollapseBtns(true);
        } else {
          setCollapseBtns(false);
        }
      }
    });
    resizeObserver.observe(box);
    return () => {
      resizeObserver.unobserve(box);
    };
  }, [isCompareMode, isReadonly]);

  useEffect(() => {
    getPromptHistoryList({ uid: selectedPrompt?.uid });
  }, [selectedPrompt?.uid]);

  const onPromptInputChange = (v?: string) => {
    __updateSystemPrompt({ msgGroupKey, path: 'promptContent', value: v, isSync: isSyncMap.system });
    updatePromptVariable(msgGroupKey, v, isSyncMap.system);
  };

  const onCloseModal = () => {
    setShowPromptEditModal(false);
  };

  const genBtns = () => {
    return (
      <div className={cn('flex items-center gap-1')}>
        {isCompareMode && !isReadonly ? (
          <Checkbox
            style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}
            checked={isSyncMap.system}
            onChange={e => {
              e.stopPropagation();
              const checked = e.target.checked;
              if (checked) {
                modalApi.confirm({
                  title: t('MODAL_5', { groupName }),
                  centered: true,
                  onOk: () => syncAllMessageGroups(msgGroupKey, 'system', checked),
                });
              } else {
                syncAllMessageGroups(msgGroupKey, 'system', checked);
              }
            }}
            onClick={e => e.stopPropagation()}
          >
            {t('CHAT_5')}
          </Checkbox>
        ) : null}
        <Switch
          size="small"
          value={showVariable}
          onChange={(v, e) => {
            e.stopPropagation();
            __updateShowVariable({ msgGroupKey, showVariable: v, isSync: isSyncMap.system });
            if (!v) {
              setShowPromptByVariableReplace(false);
            }
          }}
        />
        <span className={cn('ml-1 text-[13px] font-medium')}>Variables</span>
      </div>
    );
  };

  const genHeader = () => {
    return (
      <div className={cn('flex items-center justify-between text-foreground-primary')}>
        <AccentBorderHeader className={cn('flex-shrink-0')} title="System Prompt" />
        <div className={cn('flex flex-1 items-center justify-end gap-3')} ref={boxRef}>
          {collapseBtns ? (
            <Tooltip title={genBtns()} color="#fff">
              <Button
                icon={<DotsHorizontalIcon className={cn('h-[16px] w-[16px]')} />}
                size="small"
                style={{
                  border: 'none',
                  boxShadow: 'none',
                  color: 'var(--text-primary)',
                  background: 'transparent',
                }}
              />
            </Tooltip>
          ) : (
            genBtns()
          )}
          {isReadonly ? null : (
            <Tooltip title={t('PROMPT_1')}>
              <Button
                type="primary"
                size="small"
                style={{ gap: 4 }}
                icon={<DownloadIcon />}
                disabled={!currentPromptContent}
                onClick={e => {
                  e.stopPropagation();
                  setShowPromptEditModal(true);
                }}
              >
                Add
              </Button>
            </Tooltip>
          )}
        </div>
      </div>
    );
  };

  const genPromptSelect = () => {
    return (
      <div className={cn('flex items-center gap-[5px]')}>
        <Select
          options={promptList.map(i => ({
            label: <Paragraph3Line value={i.name} rows={1} isReadonly={isReadonly} />,
            value: i.uid,
          }))}
          value={selectedPrompt?.uid}
          onChange={(v, option: any) => {
            const name = option?.label?.props?.value || '';
            setSelectedPrompt(msgGroupKey, { uid: v, name }, isSyncMap.system, true);
            setShowPromptByVariableReplace(false);
          }}
          loading={isPromptListLoading}
          placeholder="Select a system prompt"
          showSearch
          allowClear
          style={{ flex: '1 1 0%', overflow: 'hidden' }}
          filterOption={(inputValue, option) => {
            return option?.label?.props?.value?.toLowerCase()?.includes(inputValue.toLowerCase());
          }}
          disabled={isReadonly}
        />
        <Select
          options={promptHistoryList.map(i => {
            const comment = i.promptDetails?.[0]?.comment;
            return {
              label: (
                <Tooltip title={comment ? <div>t('PROMPT_6): {comment}</div> : ''}>
                  <div style={{ fontSize: 13 }}>V{i.version}</div>
                </Tooltip>
              ),
              value: i.version,
            };
          })}
          value={selectedPrompt?.version}
          onChange={v => {
            const promptContent = promptHistoryList.find(i => i.version === v)?.promptDetails?.[0]
              ?.promptContent;
            setSelectedPrompt(msgGroupKey, { version: v, promptContent }, isSyncMap.system);
          }}
          placeholder="Version"
          style={{ width: 80 }}
          loading={isPromptHistoryLoading}
          disabled={isReadonly}
        />
        <div>
          {showPromptByVariableReplace || isReadonly ? null : (
            <PromptEnhanceButton
              userPrompt={currentPromptContent}
              framework={promptFramework}
              onChange={onPromptInputChange}
            />
          )}
          <CopyButton value={currentPromptContent} />
        </div>
      </div>
    );
  };

  const genPromptInput = () => {
    return (
      <div className={cn('relative h-full')}>
        <TextArea
          value={currentPromptContent}
          onChange={e => {
            const v = e.target.value;
            onPromptInputChange(v);
            if (!v) {
              setPromptFramework(undefined);
            }
          }}
          style={{ resize: 'none', minHeight: 200, height: '100%', fontSize: 13 }}
          disabled={showPromptByVariableReplace || isReadonly}
          onCompositionStart={() => setIsPromptInputComposing(true)}
          onCompositionEnd={() => setIsPromptInputComposing(false)}
        />
        {isPromptInputComposing ||
        showPromptByVariableReplace ||
        currentPromptContent ||
        isReadonly ? null : (
          <PromptFrameworkSelect
            className={cn('absolute left-3 top-0')}
            onChange={(framework, template) => {
              setPromptFramework(framework);
              onPromptInputChange(template);
            }}
          />
        )}
      </div>
    );
  };

  const genVariableInput = () => {
    if (!showVariable) return null;
    return (
      <VariableInput
        variables={selectedPrompt?.variables}
        replace={showPromptByVariableReplace}
        onReplaceChange={setShowPromptByVariableReplace}
        onVariableChange={(k, v) =>
          __updateSystemPrompt({ msgGroupKey, path: `variables.${k}`, value: v, isSync: isSyncMap.system })
        }
        isReadonly={isReadonly}
      />
    );
  };

  return (
    <Fragment>
      {isCompareMode ? (
        <Collapse
          size="small"
          ghost
          expandIcon={({ isActive }) =>
            isActive ? (
              <TriangleDownIcon width={16} height={16} />
            ) : (
              <TriangleRightIcon width={16} height={16} />
            )
          }
          items={[
            {
              key: 'system prompt',
              label: genHeader(),
              children: (
                <div className={cn('flex h-full flex-col gap-2')}>
                  {genPromptSelect()}
                  <div className={cn('flex-1')}>{genPromptInput()}</div>
                  {genVariableInput()}
                </div>
              ),
              styles: {
                header: { padding: '8px 20px 8px 14px' },
                body: { padding: '8px 20px 16px' },
              },
            },
          ]}
        />
      ) : (
        <div className={cn('flex h-full flex-col gap-2')}>
          {genHeader()}
          {genPromptSelect()}
          <div className={cn('flex-1')}>{genPromptInput()}</div>
          {genVariableInput()}
        </div>
      )}

      {showPromptEditModal && (
        <PromptEditModal
          initialValues={selectedPrompt}
          promptHistoryList={promptHistoryList}
          onCancel={onCloseModal}
          onSuccess={async isInit => {
            onCloseModal();
            const list = await getPromptList();
            const { uid } = (isInit ? list[0] : selectedPrompt) || {};
            if (uid) {
              await getPromptHistoryList({ uid });
              const name = list.find(f => f.uid === uid)?.name;
              setSelectedPrompt(msgGroupKey, { uid, name }, isSyncMap.system, true);
            }
          }}
        />
      )}
    </Fragment>
  );
};

export default memo(SystemPromptPanel);
