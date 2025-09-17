import type { FC } from 'react';
import type { TableProps } from 'antd';

import { memo, useMemo } from 'react';
import Markdown from 'react-markdown';
import MathJax from 'react-mathjax';
import { cn } from '@/utils/tw';
import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import katex from 'katex';
import 'katex/dist/katex.min.css'; // `rehype-katex` does not import the CSS for you
import './index.css';
import { Button, Image, Table } from 'antd';
import { DownloadIcon } from '@radix-ui/react-icons';
import { exportToExcel } from '@/utils/downloadExcel';
import CodeBlock from '../codeBlock';
import { visit } from 'unist-util-visit';
import { CUSTOM_ATTRIBUTES, CUSTOM_TAG_NAMES } from '@/components/reactMarkdown/constant';

function link({ href, children }: any) {
  let c = children;
  if (Array.isArray(children)) {
    if (children?.findIndex((f: string) => f === '↩') > -1) {
      // 处理markdown中链接后面有个↩的情况
      c = children.filter((f: string) => f !== '↩');
    }
  } else if (typeof children === 'string') {
    c = children;
  }

  return (
    <a
      rel="noreferrer"
      onClick={() => window.open(href, '_blank')}
      className={cn('cursor-pointer text-[13px] text-[#1677ff]')}
    >
      {c}
    </a>
  );
}

function customMathPlugin() {
  return (tree: any) => {
    visit(tree, 'text', (node, index, parent) => {
      const text = node.value;
      const pattern = /(?:\\\(\s*([^)\n]+?)\s*\\\)|\\\[\s*([\s\S]+?)\s*\\\])/g;
      const newNodes: any = [];
      let lastPos = 0;
      let match;

      while ((match = pattern.exec(text)) !== null) {
        // 添加前面的普通文本
        if (match.index > lastPos) {
          newNodes.push({
            type: 'text',
            value: text.slice(lastPos, match.index),
          });
        }

        // 处理 LaTeX 公式
        const latexContent = match[1] || match[2]; // 行内公式或块级公式
        try {
          const html = katex.renderToString(latexContent, {
            throwOnError: false, // 避免抛出异常
            displayMode: !!match[2], // 如果是 \\[...\\]，则用 displayMode
          });
          newNodes.push({
            type: 'html',
            value: html,
          });
        } catch (e) {
          // 如果 KaTeX 渲染失败，保留原始文本
          newNodes.push({
            type: 'text',
            value: match[0],
          });
        }

        lastPos = match.index + match[0].length;
      }

      // 添加剩余文本
      if (lastPos < text.length) {
        newNodes.push({
          type: 'text',
          value: text.slice(lastPos),
        });
      }

      // 替换原节点
      if (newNodes.length > 0) {
        parent.children.splice(index, 1, ...newNodes);
      }
    });
  };
}

interface ReactMarkdownProps {
  content: string;
}

const ReactMarkdown: FC<ReactMarkdownProps> = ({ content }) => {
  const components = {
    em: ({ children }: any) => <b>{children}</b>,
    strong: ({ children }: any) => <b>{children}</b>,
    pre: ({ node, className, children, ...props }: any) => (
      <pre className={cn('m-0', className)} {...props}>
        {children}
      </pre>
    ),
    a: link,
    link,
    p: ({ node, ...props }: any) => (
      <div {...props} className={cn('whitespace-pre-line break-words text-[13px] leading-[22px]')} />
    ),
    math: (props: any) => <MathJax.Node formula={props.value} />,
    inlineMath: (props: any) => <MathJax.Node inline formula={props.value} />,
    code: ({ node, className, ...props }: any) => {
      const hasLang = /language-(\w+)/.exec(className || '');
      if (hasLang) {
        return <CodeBlock language={hasLang?.[1]} code={props.children} />;
      } else {
        return <code className={className} {...props} />;
      }
    },
    table: ({ node, ...props }: any) => {
      try {
        // thead
        const theadEleList = props?.children?.[0]?.props?.children?.props?.children || [];
        const columns: TableProps['columns'] = theadEleList?.map((item: any, index: number) => ({
          key: `col${index}`,
          dataIndex: `col${index}`,
          title: item?.props?.children,
        }));

        // tbody
        const tbodyEleList = props?.children?.[1]?.props?.children || [];
        const dataSource =
          tbodyEleList.map((item: any, index: number) => {
            return item.props?.children?.reduce(
              (acc: Record<string, any>, curr: any, idx: number) => {
                acc[`col${idx}`] = curr.props?.children;
                return acc;
              },
              { key: index + 1 },
            );
          }) || [];

        return (
          <div className={cn('relative mt-2')}>
            <Table
              bordered
              columns={columns}
              dataSource={dataSource}
              size="small"
              scroll={{ x: columns ? columns.length * 100 : undefined }}
            />
            <Button
              style={{ position: 'absolute', bottom: 12, left: 0 }}
              type="link"
              icon={<DownloadIcon />}
              onClick={() => exportToExcel(dataSource, columns, '表格数据')}
            />
          </div>
        );
      } catch (err) {
        return (
          <table
            className={cn('react-markdown-table')}
            {...props}
            style={{
              borderCollapse: 'collapse',
              margin: '8px 0',
              fontSize: 13,
              backgroundColor: 'white',
            }}
          />
        );
      }
    },
    img: ({ node, ...props }: any) => <Image height={200} width={200} alt={props.alt} src={props.src} />,
  };

  const text = useMemo(() => {
    if (typeof content !== 'string') return '';

    // 处理连续反斜杠的情况（如 \\% → \\%）
    let newText = content.replace(
      /(^|[^\\])(\\+)([\\`*_{}\[\]()#+\-.!|%])/g,
      (_, prefix, slashes, char) => prefix + slashes + (slashes.length % 2 ? `\\` : '') + char,
    );

    // 处理单换行符也可以渲染table（单换行符后面是|的情况）
    newText = newText.replace(/(?<!\||\n)\n(?=\|)/g, '\n\n');
    return newText;
  }, [content]);

  return (
    <div className={cn('react-markdown')}>
      <Markdown
        remarkPlugins={[[remarkMath, { singleTilde: false }], remarkGfm, customMathPlugin]}
        rehypePlugins={[
          rehypeRaw,
          [
            rehypeSanitize,
            {
              tagNames: [...(defaultSchema.tagNames as any), ...CUSTOM_TAG_NAMES],
              attributes: { ...defaultSchema.attributes, ...CUSTOM_ATTRIBUTES },
            },
          ],
          rehypeKatex,
        ]}
        components={components}
        skipHtml={true}
      >
        {text}
      </Markdown>
    </div>
  );
};

export default memo(ReactMarkdown);
