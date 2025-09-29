import type { FC } from 'react';
import type { editor } from 'monaco-editor';
import type { DiffEditorProps, Monaco } from '@monaco-editor/react';

import { memo, useEffect, useMemo, useRef, useState } from 'react';
import * as monaco from 'monaco-editor';
import { DiffEditor, loader } from '@monaco-editor/react';
import { DIFF_EDITOR_OPTIONS } from './constant';
import Spin from '@/lib/spin';
import './index.css';
import { cn } from '@/utils/tw';

loader.config({ monaco });

interface MonacoDiffEditorProps extends DiffEditorProps {
  className?: string;
  isReadonly?: boolean;
  language: string;
  original?: string; // 原始代码
  modified?: string; // 修改后的代码
  bordered?: boolean;
}

const MonacoDiffEditor: FC<MonacoDiffEditorProps> = ({
  className,
  isReadonly = false,
  language,
  original = '',
  modified = '',
  bordered = false,
  ...props
}) => {
  const diffEditorRef = useRef<editor.IStandaloneDiffEditor>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const options = useMemo(
    () => ({
      ...DIFF_EDITOR_OPTIONS,
      ...(props?.options || {}),
      readOnly: isReadonly,
    }),
    [props?.options, isReadonly],
  );

  useEffect(() => {
    loader.init().then(() => setIsLoading(false));
  }, []);

  // 当 original/modified 变化时更新内容
  useEffect(() => {
    if (diffEditorRef.current) {
      const model = diffEditorRef.current.getModel();
      if (model) {
        model.original.setValue(original);
        model.modified.setValue(modified);
      }
    }
  }, [original, modified]);

  const handleEditorDidMount = (editor: editor.IStandaloneDiffEditor, monaco: Monaco) => {
    diffEditorRef.current = editor;
    props?.onMount?.(editor, monaco);
  };

  return (
    <DiffEditor
      className={cn(
        isReadonly ? 'monaco-diff-editor-readonly' : '',
        bordered ? 'overflow-hidden rounded-md border border-solid border-default' : '',
        className,
      )}
      loading={<Spin spinning={isLoading} />}
      {...props}
      language={language}
      original={original}
      modified={modified}
      options={options}
      onMount={handleEditorDidMount}
    />
  );
};

export default memo(MonacoDiffEditor);
