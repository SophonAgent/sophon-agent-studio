import type { FC } from 'react';
import type { editor } from 'monaco-editor';

import { memo, useEffect, useRef, useState } from 'react';
import MonacoEditor from '@/lib/monacoEditor';
import { cn } from '@/utils/tw';
import useEnhancePrompt from '@/hooks/useEnhancePrompt';
import { PromptFrameworkEnum } from '@/interface/prompt';
import Tooltip from '@/lib/tooltip';
import { Button, Input, Switch } from 'antd';
import { MagicWandIcon } from '@radix-ui/react-icons';
import CopyButton from '@/components/copyButton';
import MonacoDiffEditor from '@/lib/monacoDiffEditor';
import './index.css';

const { TextArea } = Input;

interface PromptEditorProps {
  className?: string;
  value?: string;
  onChange?: (value?: string) => void;
  promptFramework?: PromptFrameworkEnum;
  initOptimize?: boolean;
  isReadonly?: boolean;
}

const PromptEditor: FC<PromptEditorProps> = ({
  className,
  value,
  onChange,
  promptFramework,
  initOptimize,
  isReadonly,
}) => {
  const { onEnhance, enhancedPrompt, setEnhancedPrompt, isRunning, onStopRequest } = useEnhancePrompt();

  const editorRef = useRef<editor.IStandaloneCodeEditor>(null);
  const editorDiffRef = useRef<editor.IStandaloneDiffEditor>(null);

  const [showEnhancedPrompt, setShowEnhancedPrompt] = useState<boolean>(false);
  const [isDiff, setIsDiff] = useState<boolean>(false);
  const [isInitOptimize, setIsInitOptimize] = useState<boolean>(Boolean(initOptimize)); // 是否一进来就要优化prompt

  // 样式
  const updateDecorations = () => {
    const model = editorRef.current?.getModel();
    if (!model || !value) return [];

    // 高亮 {}
    const matchedVariables = Array.from(value.matchAll(/\{[\w\u4e00-\u9fa5]+\}/g));
    const variableDecorations = matchedVariables.map(match => {
      const startPos = model.getPositionAt(match.index || 0);
      const endPos = model.getPositionAt((match.index || 0) + (match[0]?.length || 0));
      return {
        range: {
          startLineNumber: startPos?.lineNumber || 0,
          startColumn: startPos?.column || 0,
          endLineNumber: endPos?.lineNumber || 0,
          endColumn: endPos?.column || 0,
        },
        options: {
          isWholeLine: false,
          inlineClassName: 'variable',
        },
      };
    });

    // 高亮 ## 开头的行
    const lines = value.split('\n');
    const h2Decorations = lines.reduce((acc: any[], line, index) => {
      if (line?.startsWith('##') && line?.[2] !== '#') {
        acc.push({
          range: {
            startLineNumber: index + 1,
            startColumn: 1,
            endLineNumber: index + 1,
            endColumn: line.length + 1,
          },
          options: {
            isWholeLine: true,
            inlineClassName: 'h2',
          },
        });
      }
      return acc;
    }, []);

    return [...variableDecorations, ...h2Decorations];
  };

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor || !value) return;

    const decorationsCollection = editor.createDecorationsCollection(updateDecorations());
    return () => {
      decorationsCollection.clear();
    };
  }, [value]);

  // 一进来就优化prompt
  useEffect(() => {
    if (isInitOptimize && value) {
      setIsInitOptimize(false);
      setShowEnhancedPrompt(true);
      onEnhancePrompt();
    }
  }, [isInitOptimize, value]);

  const onEnhancePrompt = () => {
    onEnhance({ userPrompt: value, framework: promptFramework });
  };

  const genDiffEditor = () => {
    if (isDiff) {
      return (
        <MonacoDiffEditor
          language="plaintext"
          original={value}
          modified={enhancedPrompt}
          onMount={editor => (editorDiffRef.current = editor)}
        />
      );
    } else {
      return (
        <div className={cn('flex h-full flex-col')}>
          <div className={cn('flex justify-between px-3 pb-2 font-medium italic text-foreground-tertiary')}>
            <span>初始 prompt</span>
            <span>优化后的 prompt</span>
          </div>
          <div className={cn('grid flex-1 grid-cols-2 gap-2 px-2')}>
            <TextArea
              style={{ resize: 'none', fontSize: 12 }}
              value={value}
              onChange={e => onChange?.(e.target.value)}
            />
            <TextArea
              style={{ resize: 'none', fontSize: 12 }}
              value={enhancedPrompt}
              onChange={e => setEnhancedPrompt(e.target.value)}
            />
          </div>
        </div>
      );
    }
  };

  const genBtns = () => {
    if (isRunning) {
      return (
        <Button type="primary" danger onClick={onStopRequest} size="small">
          停止响应
        </Button>
      );
    }
    return (
      <div className={cn('flex items-center gap-2')}>
        <Button
          type="primary"
          onClick={() => {
            setShowEnhancedPrompt(false);
            setIsDiff(false);
            onChange?.(isDiff ? editorDiffRef.current?.getModifiedEditor().getValue() || '' : enhancedPrompt);
          }}
          size="small"
        >
          替换
        </Button>
        <Button onClick={onEnhancePrompt} size="small">
          重试
        </Button>
        <Button
          onClick={() => {
            setShowEnhancedPrompt(false);
            setIsDiff(false);
          }}
          size="small"
        >
          取消
        </Button>
      </div>
    );
  };

  return (
    <div className={cn('rounded-md border border-solid border-default text-[13px]', className)}>
      {/* header */}
      <div
        className={cn(
          'flex items-start justify-between gap-8 overflow-hidden rounded-t-md bg-background-tertiary px-3 py-1 text-foreground-primary',
        )}
      >
        <div className={cn('leading-6 text-foreground-secondary')}>
          {isReadonly
            ? null
            : '在编辑器中输入中括号{}，{}内的文字将会被识别成变量占位符（占位符只能包含字母，中文，数字，下划线）'}
        </div>
        <div className={cn('flex flex-shrink-0 items-center gap-3')}>
          {isReadonly ? null : (
            <Tooltip title="自动优化 prompt">
              <Button
                size="small"
                icon={<MagicWandIcon color="#2c57e7" className={cn('h-3 w-3')} />}
                style={{ fontSize: 12, borderRadius: 8, fontWeight: 500 }}
                onClick={() => {
                  setShowEnhancedPrompt(true);
                  onEnhancePrompt();
                }}
                disabled={isRunning}
              >
                优化
              </Button>
            </Tooltip>
          )}
          {showEnhancedPrompt ? (
            <div className={cn('flex flex-shrink-0 items-center gap-2')}>
              <Switch size="small" checked={isDiff} onChange={setIsDiff} />
              Diff
            </div>
          ) : (
            <CopyButton value={value} size="small" />
          )}
        </div>
      </div>

      {/* editor */}
      <div className={cn('h-[400px] overflow-hidden py-[8px]')}>
        {showEnhancedPrompt ? (
          genDiffEditor()
        ) : (
          <MonacoEditor
            className={cn('prompt-monaco-editor')}
            language="plaintext"
            value={value}
            onChange={onChange}
            options={{ unicodeHighlight: { ambiguousCharacters: false } }}
            onMount={editor => {
              editorRef.current = editor;
              editor.createDecorationsCollection(updateDecorations());
            }}
            isReadonly={isReadonly}
          />
        )}
      </div>

      {/* footer */}
      {showEnhancedPrompt ? (
        <div className={cn('flex items-end justify-end gap-3 px-2 pb-2')}>
          <div className={cn('text-[12px] text-foreground-tertiary')}>优化内容仅供参考，不代表平台立场</div>
          {genBtns()}
        </div>
      ) : null}
    </div>
  );
};

export default memo(PromptEditor);
