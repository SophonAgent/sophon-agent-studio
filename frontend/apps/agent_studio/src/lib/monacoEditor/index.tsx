import type { FC } from 'react';
import type { editor } from 'monaco-editor';

import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { Editor, EditorProps, Monaco, loader } from '@monaco-editor/react';
import { EDITOR_OPTIONS } from './constant';
import Spin from '@/lib/spin';
import { cn } from '@/utils/tw';
import './index.css';

interface MonacoEditorProps extends EditorProps {
  className?: string;
  isReadonly?: boolean;
  language: string;
}

const MonacoEditor: FC<MonacoEditorProps> = ({ className, isReadonly = false, language, ...props }) => {
  const editorRef = useRef<editor.IStandaloneCodeEditor>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const options = useMemo(() => {
    return {
      ...EDITOR_OPTIONS,
      ...(props?.options || {}),
      readOnly: isReadonly,
    };
  }, [props?.options, isReadonly]);

  useEffect(() => {
    loader.init().then(() => setIsLoading(false));
  }, []);

  const handleEditorDidMount = (editor: editor.IStandaloneCodeEditor, monaco: Monaco) => {
    editorRef.current = editor;
    props?.onMount?.(editor, monaco);
  };

  return (
    <Editor
      className={cn(isReadonly ? 'monaco-editor-readonly' : '', className)}
      loading={<Spin spinning={isLoading} />}
      {...props}
      language={language}
      options={options}
      onMount={handleEditorDidMount}
    />
  );
};

export default memo(MonacoEditor);
