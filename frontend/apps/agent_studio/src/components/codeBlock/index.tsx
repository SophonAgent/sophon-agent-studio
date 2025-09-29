import type { FC } from 'react';

import { memo, useMemo, useState } from 'react';
import CopyButton from '../copyButton';
import { cn } from '@/utils/tw';
import { isHtml as _isHtml } from '@/utils/html';
import Tooltip from '@/lib/tooltip';
import { Button } from 'antd';
import { EyeOpenIcon } from '@radix-ui/react-icons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import Modal from '@/lib/modal';
import { useTranslation } from 'react-i18next';

interface CodeBlockProps {
  language?: string;
  code?: string;
}

const CodeBlock: FC<CodeBlockProps> = ({ language, code = '' }) => {
  const { t } = useTranslation();

  const [showHtml, setShowHtml] = useState<boolean>(false);

  const title = useMemo(() => language?.toUpperCase() || '', [language]);

  const isError = useMemo(() => language === 'error', [language]);
  const isMarkdown = useMemo(() => language === 'markdown', [language]);
  const isHtml = useMemo(() => language === 'html' && _isHtml(code), [language, code]);

  return (
    <div
      className={cn('my-2 flex flex-col overflow-hidden', { '[&_*]:!text-foreground-status-error': isError })}
    >
      <div
        className={cn(
          'flex h-[32px] items-center justify-between rounded-t-lg bg-[rgb(95,102,114)] px-3 text-white',
        )}
      >
        <div className={cn('text-[14px] font-semibold')}>{title}</div>

        <div className={cn('flex items-center gap-1')}>
          {isHtml ? (
            <Tooltip title={t('CHAT_31')}>
              <Button
                type="link"
                icon={<EyeOpenIcon />}
                onClick={() => setShowHtml(true)}
                style={{ color: 'white' }}
              />
            </Tooltip>
          ) : null}
          <CopyButton value={code} type="link" style={{ color: 'white' }} />
        </div>
      </div>

      <div className={cn('relative flex flex-1 overflow-auto rounded-b-lg bg-[rgb(33,37,44)]')}>
        <code className={cn('overflow-auto')}>
          <SyntaxHighlighter
            language={isMarkdown ? 'txt' : language}
            style={vscDarkPlus}
            customStyle={{ background: 'transparent', margin: 0, padding: '14px', overflow: 'initial' }}
          >
            {code}
          </SyntaxHighlighter>
        </code>
      </div>

      {showHtml ? (
        <Modal title="HTML" open width="80vw" footer={null} onCancel={() => setShowHtml(false)}>
          <iframe srcDoc={code} style={{ width: '100%', height: '80vh', border: 'none' }} />
        </Modal>
      ) : null}
    </div>
  );
};

export default memo(CodeBlock);
