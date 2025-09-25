import type { FC } from 'react';

import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/utils/tw';
import { Button } from 'antd';
import PopoverModelButton from './PopoverModelButton';
import Tooltip from '@/lib/tooltip';
import MarkdownIcon from '@/icons/markdownIcon';
import MultiTurnIcon from '@/icons/multiTurnIcon';
import StreamIcon from '@/icons/streamIcon';
import BrushIcon from '@/icons/brushIcon';
import PlayIcon from '@/icons/playIcon';
import CenterRowsIcon from '@/icons/centerRowsIcon';
import useMessageGroupModel from '@/store/chat/messageGroupModel';
import useMessageModel from '@/store/chat/messageModel';
import { DotsHorizontalIcon, DownloadIcon, RadiobuttonIcon, UploadIcon } from '@radix-ui/react-icons';
import RequestModal from './RequestModal';
import useConversationModel from '@/store/chat/conversationModel';
import CompareIcon from '@/icons/compareIcon';
import CloseIcon from '@/icons/closeIcon';
import useModelConfigModel from '@/store/chat/modelConfigModel';
import useQueryRouter from '@/utils/router';
import { useTranslation } from 'react-i18next';
import { getSidFromHashUrl } from '@/utils/url';

interface ToolbarPros {
  msgGroupKey: string;
  isReadonly?: boolean;
  groupName?: string;
}

const Toolbar: FC<ToolbarPros> = ({ msgGroupKey, isReadonly, groupName }) => {
  const btnStyle = {
    border: 'none',
    boxShadow: 'none',
    color: 'var(--text-primary)',
    background: 'transparent',
    fontSize: 13,
    fontWeight: 500,
    padding: '0 8px',
  };

  const { t, i18n } = useTranslation();
  const queryRouter = useQueryRouter();

  const { currentConversation, getConversationList, stopRequestByKey, saveConversation } =
    useConversationModel();
  const {
    messageGroups,
    isCompareMode,
    is2Groups,
    is3Groups,
    __updateMessageGroupDisplayConfig,
    __removeMessageGroup,
    addCompareMessageGroup,
  } = useMessageGroupModel();
  const { isRunningMap, clearMessages } = useMessageModel();
  const { chatModelConfigMap } = useModelConfigModel();

  const boxRef = useRef<HTMLDivElement>(null);
  const [showRequestModal, setShowRequestModal] = useState<'import' | 'export'>();
  const [collapseBtns, setCollapseBtns] = useState<'switch' | 'all'>();

  const isEnglishLng = i18n.language === 'en';

  const isRunning = useMemo(() => isRunningMap[msgGroupKey], [isRunningMap, msgGroupKey]);

  const messageGroup = useMemo(
    () => messageGroups.find(i => i.msgGroupKey === msgGroupKey),
    [messageGroups, msgGroupKey],
  );

  const displayConfig = useMemo(() => messageGroup?.displayConfig, [messageGroups, msgGroupKey]);

  const isMultiToolOutput = useMemo(() => displayConfig?.multiToolOutput, [displayConfig]);
  const isAutoRunMcpTool = useMemo(() => displayConfig?.autoRunMcpTool, [displayConfig]);
  const isMarkdown = useMemo(() => displayConfig?.markdown, [displayConfig]);
  const isMultiTurn = useMemo(() => displayConfig?.multiTurn, [displayConfig]);
  const isStream = useMemo(() => displayConfig?.stream, [displayConfig]);

  const modelConfig = useMemo(() => chatModelConfigMap[msgGroupKey], [chatModelConfigMap, msgGroupKey]);

  const showEnterCompare = useMemo(() => Boolean(messageGroups.length < 3), [messageGroups]);
  const showExitCompare = useMemo(() => Boolean(isCompareMode), [isCompareMode]);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const width = entry.contentRect.width;
        if (isReadonly) {
          setCollapseBtns(undefined);
          return;
        }
        if (is2Groups) {
          if ((!isEnglishLng && width <= 258) || (isEnglishLng && width <= 308)) {
            setCollapseBtns('all');
          } else if ((!isEnglishLng && width <= 408) || (isEnglishLng && width <= 458)) {
            setCollapseBtns('switch');
          } else {
            setCollapseBtns(undefined);
          }
          return;
        }
        if (is3Groups) {
          if (width <= 170) {
            setCollapseBtns('all');
          } else if (width <= 317) {
            setCollapseBtns('switch');
          } else {
            setCollapseBtns(undefined);
          }
          return;
        }
        setCollapseBtns(undefined);
      }
    });
    resizeObserver.observe(box);
    return () => {
      resizeObserver.unobserve(box);
    };
  }, [is2Groups, is3Groups, isReadonly, isEnglishLng]);

  const onCloseRequestModal = () => {
    setShowRequestModal(undefined);
  };

  const genExtraActions = () => {
    return (
      <div className={cn('flex items-center')}>
        {/* 导入 request params */}
        {isReadonly ? null : (
          <Tooltip title={t('CHAT_12')}>
            <Button
              icon={<DownloadIcon className={cn('h-[16px] w-[16px]')} />}
              style={{ ...btnStyle, height: 28, width: 28 }}
              onClick={() => setShowRequestModal('import')}
              disabled={isRunning}
            />
          </Tooltip>
        )}

        {/* 导出 request params */}
        {isReadonly ? null : (
          <Tooltip title={t('CHAT_13')}>
            <Button
              icon={<UploadIcon className={cn('h-[16px] w-[16px]')} />}
              style={{ ...btnStyle, height: 28, width: 28 }}
              onClick={() => setShowRequestModal('export')}
              disabled={isRunning}
            />
          </Tooltip>
        )}
      </div>
    );
  };

  const genSwitchActions = () => {
    return (
      <div className={cn('flex items-center gap-1')}>
        {/* 完整展示 tool output */}
        <Tooltip title={isMultiToolOutput ? t('CHAT_14') : t('CHAT_15')}>
          <Button
            icon={<CenterRowsIcon className={cn('h-[16px] w-[16px]')} />}
            style={{ ...btnStyle, background: isMultiToolOutput ? 'var(--bg-tertiary)' : 'transparent' }}
            onClick={() =>
              __updateMessageGroupDisplayConfig(msgGroupKey, { multiToolOutput: !isMultiToolOutput })
            }
          />
        </Tooltip>

        {/* 自动执行 mcp */}
        {isReadonly ? null : (
          <Tooltip title={isAutoRunMcpTool ? t('CHAT_16') : t('CHAT_17')}>
            <Button
              icon={<PlayIcon className={cn('h-[16px] w-[16px]')} />}
              style={{ ...btnStyle, background: isAutoRunMcpTool ? 'var(--bg-tertiary)' : 'transparent' }}
              onClick={() =>
                __updateMessageGroupDisplayConfig(msgGroupKey, { autoRunMcpTool: !isAutoRunMcpTool })
              }
            />
          </Tooltip>
        )}

        {/* markdown 展示 */}
        <Tooltip title={isMarkdown ? t('CHAT_18') : t('CHAT_19')}>
          <Button
            icon={<MarkdownIcon className={cn('h-[16px] w-[16px]')} />}
            style={{ ...btnStyle, background: isMarkdown ? 'var(--bg-tertiary)' : 'transparent' }}
            onClick={() => __updateMessageGroupDisplayConfig(msgGroupKey, { markdown: !isMarkdown })}
          />
        </Tooltip>

        {/* 是否流式输出 */}
        {isReadonly ? null : (
          <Tooltip title={isStream ? t('CHAT_20') : t('CHAT_21')}>
            <Button
              icon={<StreamIcon className={cn('h-[16px] w-[16px]')} />}
              style={{ ...btnStyle, background: isStream ? 'var(--bg-tertiary)' : 'transparent' }}
              onClick={() => __updateMessageGroupDisplayConfig(msgGroupKey, { stream: !isStream })}
            />
          </Tooltip>
        )}

        {/* 单轮 多轮 */}
        {isReadonly ? null : (
          <Tooltip title={isMultiTurn ? t('CHAT_22') : t('CHAT_23')}>
            <Button
              icon={<MultiTurnIcon className={cn('h-[16px] w-[16px]')} />}
              style={{ ...btnStyle, background: isMultiTurn ? 'var(--bg-tertiary)' : 'transparent' }}
              onClick={() => __updateMessageGroupDisplayConfig(msgGroupKey, { multiTurn: !isMultiTurn })}
            />
          </Tooltip>
        )}
      </div>
    );
  };

  const renderOtherBtns = () => {
    if (collapseBtns === 'switch') {
      return (
        <div className={cn('flex items-center')}>
          {/* 额外操作 */}
          {genExtraActions()}

          {/* 开关按钮 */}
          <Tooltip title={genSwitchActions()} color="#fff">
            <Button
              icon={<DotsHorizontalIcon className={cn('h-[16px] w-[16px]')} />}
              style={{ ...btnStyle, height: 28, width: 28 }}
            />
          </Tooltip>
        </div>
      );
    } else if (collapseBtns === 'all') {
      return (
        <Tooltip
          title={
            <div className={cn('flex items-center')}>
              {/* 额外操作 */}
              {genExtraActions()}

              {/* 开关按钮 */}
              {genSwitchActions()}
            </div>
          }
          color="#fff"
        >
          <Button
            icon={<DotsHorizontalIcon className={cn('h-[16px] w-[16px]')} />}
            style={{ ...btnStyle, height: 28, width: 28 }}
          />
        </Tooltip>
      );
    }
    return (
      <div className={cn('flex items-center')}>
        {/* 额外操作 */}
        {genExtraActions()}

        {/* 开关按钮 */}
        {genSwitchActions()}
      </div>
    );
  };

  return (
    <div
      className={cn('mx-5 my-[10px] flex items-center gap-[6px]', isCompareMode ? 'h-[32px]' : 'h-[36px]')}
    >
      {isCompareMode ? <div className="flex-shrink-0 text-[14px] font-medium">{groupName}</div> : null}

      <PopoverModelButton msgGroupKey={msgGroupKey} isReadonly={isReadonly} />

      <div className={cn('flex flex-1 items-center justify-end')} ref={boxRef}>
        {/* 清除对话 */}
        {isReadonly ? null : (
          <Tooltip title={t('CHAT_24')}>
            <Button
              icon={<BrushIcon className={cn('h-[16px] w-[16px]')} />}
              style={{ ...btnStyle, height: 28, width: 28 }}
              onClick={() => clearMessages(msgGroupKey)}
              disabled={isRunning}
            />
          </Tooltip>
        )}

        {/* 停止对话 */}
        {isReadonly ? null : (
          <Tooltip title={t('CHAT_25')}>
            <Button
              icon={<RadiobuttonIcon className={cn('h-[16px] w-[16px]')} />}
              style={{ ...btnStyle, height: 28, width: 28, color: undefined }}
              danger
              onClick={async () => {
                stopRequestByKey(msgGroupKey);
                await saveConversation();
                // 更新 url sid
                const sid = getSidFromHashUrl();
                if (!sid) {
                  queryRouter.set('sid', currentConversation.sessionId);
                  await getConversationList();
                }
              }}
              disabled={!isRunning}
            />
          </Tooltip>
        )}

        {renderOtherBtns()}

        {/* 添加对比 */}
        {showEnterCompare && !isReadonly ? (
          <Button
            icon={<CompareIcon className={cn('h-[13px] w-[13px]')} />}
            style={{ ...btnStyle, marginTop: -3 }}
            onClick={() => addCompareMessageGroup(msgGroupKey)}
            disabled={isRunning || !modelConfig}
          >
            {t('CHAT_26')}
          </Button>
        ) : null}

        {/* 退出对比 */}
        {showExitCompare && !isReadonly ? (
          <Tooltip title={t('CHAT_27')}>
            <Button
              icon={<CloseIcon className={cn('h-[16px] w-[16px]')} />}
              style={{ ...btnStyle, height: 28, width: 28 }}
              onClick={() => __removeMessageGroup(msgGroupKey)}
              disabled={isRunning}
            />
          </Tooltip>
        ) : null}
      </div>

      {showRequestModal && (
        <RequestModal
          title={showRequestModal === 'import' ? 'Import Request' : 'Export Request'}
          msgGroupKey={msgGroupKey}
          showCurrentRequest={showRequestModal === 'export'}
          onCancel={onCloseRequestModal}
        />
      )}
    </div>
  );
};

export default memo(Toolbar);
