import type { FC } from 'react';
import type { FunctionDefinition } from '@/interface/functionCall';

import { memo, useMemo, useState } from 'react';
import useFunctionCallModel from '@/store/chat/functionCallModel';
import { cn } from '@/utils/tw';
import { PlusIcon } from '@radix-ui/react-icons';
import { Button, Empty } from 'antd';
import FunctionCard from '@/components/functionCall/FunctionCard';
import useMessageGroupModel from '@/store/chat/messageGroupModel';
import FunctionModal from '@/components/functionCall/FunctionModal';
import DeleteIcon from '@/icons/deleteIcon';
import useFeedback from '@/context/feedbackContext';
import McpToolModal from '@/components/mcpToolModal';
import McpToolDiffModal from '@/components/mcpToolDiffModal';
import { useTranslation } from 'react-i18next';

interface FunctionInputProps {
  className?: string;
  msgGroupKey: string;
  disabled?: boolean;
}

const FunctionInput: FC<FunctionInputProps> = ({ className, msgGroupKey, disabled }) => {
  const { t } = useTranslation();

  const {
    functionCallMap,
    __addFunctionCallItem,
    __updateFunctionCallItem,
    __removeFunctionCallItem,
    __replaceFunctionCallList,
    __removeFunctionCallList,
  } = useFunctionCallModel();
  const { isSyncMap } = useMessageGroupModel();

  const { modalApi } = useFeedback();

  const [showCustomModal, setShowCustomModal] = useState<boolean>(false);
  const [showMcpToolModal, setShowMcpToolModal] = useState<boolean>(false);
  const [showFunctionDiffModal, setShowFunctionDiffModal] = useState<boolean>(false);
  const [selectedFunction, setSelectedFunction] = useState<FunctionDefinition>();

  const functionCallList = useMemo(() => functionCallMap[msgGroupKey] || [], [functionCallMap, msgGroupKey]);

  const onCloseCustomModal = () => {
    setSelectedFunction(undefined);
    setShowCustomModal(false);
  };

  const onCloseMcpToolModal = () => {
    setShowMcpToolModal(false);
  };

  const onCloseMcpToolDiffModal = () => {
    setSelectedFunction(undefined);
    setShowFunctionDiffModal(false);
  };

  const genFunctions = () => {
    if (!functionCallList.length) {
      return (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={<span className={cn('text-[13px]')}>{`No function defined.`}</span>}
        />
      );
    }
    return (
      <div className={cn('px-3 pb-2 pt-1')}>
        {functionCallList.map(item => (
          <FunctionCard
            key={item.id}
            isReadonly={disabled}
            functionDefinition={item}
            onEnabledChange={enabled =>
              __updateFunctionCallItem({
                msgGroupKey,
                functionCall: { ...item, enabled },
                isSync: isSyncMap.function,
              })
            }
            onOpen={() => {
              setSelectedFunction(item);
              setShowCustomModal(true);
            }}
            onDelete={id => __removeFunctionCallItem({ msgGroupKey, id, isSync: isSyncMap.function })}
            onDiff={() => {
              setSelectedFunction(item);
              setShowFunctionDiffModal(true);
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div
      className={cn(
        'flex h-full flex-col overflow-hidden rounded-lg border border-solid border-default text-[13px]',
        className,
      )}
    >
      <div className={cn('flex h-[28px] items-center justify-end gap-3 bg-background-tertiary px-3')}>
        <Button
          type="link"
          icon={<PlusIcon width={14} height={14} />}
          style={{ fontSize: 13, gap: 4, padding: 0 }}
          disabled={disabled}
          onClick={() => setShowMcpToolModal(true)}
        >
          MCP Tool
        </Button>
        <Button
          type="link"
          icon={<PlusIcon width={14} height={14} />}
          style={{ fontSize: 13, gap: 4, padding: 0 }}
          disabled={disabled}
          onClick={() => setShowCustomModal(true)}
        >
          Custom
        </Button>
        <Button
          type="link"
          icon={<DeleteIcon className={cn('h-[16px] w-[16px]')} />}
          danger
          disabled={disabled}
          style={{ padding: 0 }}
          onClick={e => {
            e.stopPropagation();
            modalApi.confirm({
              title: t('MODAL_3'),
              centered: true,
              content: t('MODAL_2'),
              okButtonProps: { danger: true },
              onOk: () => __removeFunctionCallList({ msgGroupKey, isSync: isSyncMap.function }),
            });
          }}
        />
      </div>

      <div className={cn('__hide-scrollbar flex-1 overflow-y-auto')}>{genFunctions()}</div>

      {showCustomModal && (
        <FunctionModal
          functionDefinition={selectedFunction}
          onCreate={functionDefinition => {
            __addFunctionCallItem({
              msgGroupKey,
              functionCall: functionDefinition,
              isSync: isSyncMap.function,
            });
            onCloseCustomModal();
          }}
          onUpdate={functionDefinition => {
            __updateFunctionCallItem({
              msgGroupKey,
              functionCall: functionDefinition,
              isSync: isSyncMap.function,
            });
            onCloseCustomModal();
          }}
          onDelete={id => {
            __removeFunctionCallItem({ msgGroupKey, id, isSync: isSyncMap.function });
            onCloseCustomModal();
          }}
          onCancel={onCloseCustomModal}
          isReadonly={disabled}
        />
      )}

      {showMcpToolModal && (
        <McpToolModal
          initialValues={functionCallList.filter(item => item.functionType === 'mcp_tool')}
          onCancel={onCloseMcpToolModal}
          onOk={vals => {
            const newFunctionDefinitionList = [
              ...functionCallList.filter(item => item.functionType === 'custom'),
              ...vals,
            ];
            __replaceFunctionCallList({
              msgGroupKey,
              functionCallList: newFunctionDefinitionList,
              isSync: isSyncMap.function,
            });
            onCloseMcpToolModal();
          }}
        />
      )}

      {showFunctionDiffModal && (
        <McpToolDiffModal
          functionDefinition={selectedFunction}
          onCancel={onCloseMcpToolDiffModal}
          onSuccess={functionDefinition => {
            __updateFunctionCallItem({
              msgGroupKey,
              functionCall: functionDefinition,
              isSync: isSyncMap.function,
            });
            onCloseMcpToolDiffModal();
          }}
        />
      )}
    </div>
  );
};

export default memo(FunctionInput);
