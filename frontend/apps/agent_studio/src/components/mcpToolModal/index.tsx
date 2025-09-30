import type { FC } from 'react';
import type { FunctionBase, FunctionDefinition } from '@/interface/functionCall';
import type { McpServerItem } from '@/interface/mcpServer';
import type { JSONSchema7 } from 'json-schema';

import { memo, useEffect, useMemo, useState } from 'react';
import Modal from '@/lib/modal';
import useMcpServer from '@/hooks/useMcpServer';
import { Button, Input, Skeleton } from 'antd';
import { cn } from '@/utils/tw';
import McpServerCard from './McpServerCard';
import DividingLine from '@/lib/dividingLine';
import useMcpTool from '@/hooks/useMcpTool';
import { getUuid } from '@/utils/uuid';
import { tranJsonToObject } from '@/utils/json';
import McpToolCard from './McpToolCard';
import useFeedback from '@/context/feedbackContext';
import { uniqBy } from 'lodash-es';
import { useTranslation } from 'react-i18next';
import { McpImplementType } from '@/interface/mcpServer';
import { NAV_PATH_MAP } from '@/constant/nav';
import { PlusIcon, ReloadIcon } from '@radix-ui/react-icons';

interface McpToolModalProps {
  initialValues?: FunctionDefinition[];
  onCancel: () => void;
  onOk: (values: FunctionDefinition[]) => void;
}

const McpToolModal: FC<McpToolModalProps> = ({ initialValues = [], onCancel, onOk }) => {
  const { t } = useTranslation();

  const { mcpServerList, isMcpServerListLoading, getMcpServerList } = useMcpServer();
  const { isMcpToolConfigListLoading, isMcpToolListLoading, getMcpToolConfigList, getMcpToolList } =
    useMcpTool();

  const { messageApi } = useFeedback();

  const [mcpServerKeyword, setMcpServerKeyword] = useState<string>();
  const [selectedMcpIds, setSelectedMcpIds] = useState<number[]>([]);
  const [mcpServerLoadingMap, setMcpServerLoadingMap] = useState<Record<number, boolean>>({});
  const [mcpServerAbortControllerMap, setMcpServerAbortControllerMap] = useState<
    Record<number, AbortController>
  >({});

  const [toolKeyword, setToolKeyword] = useState<string>();
  const [selectedTools, setSelectedTools] = useState<FunctionDefinition[]>([]);

  const filteredMcpServerList = useMemo(() => {
    if (!mcpServerKeyword) {
      return mcpServerList;
    }
    return mcpServerList.filter(item =>
      item.displayName?.toLowerCase()?.includes(mcpServerKeyword.toLowerCase()),
    );
  }, [mcpServerKeyword, mcpServerList]);

  const filteredSelectedTools = useMemo(() => {
    if (!toolKeyword) {
      return selectedTools;
    }
    return selectedTools.filter(item =>
      item.qualifiedName?.toLowerCase().includes(toolKeyword.toLowerCase()),
    );
  }, [toolKeyword, selectedTools]);

  useEffect(() => {
    getMcpServerList();
  }, []);

  useEffect(() => {
    if (initialValues.length) {
      setSelectedTools(initialValues);
      setSelectedMcpIds(
        initialValues.map(item => item.mcpServer?.id).filter(f => f !== undefined) as number[],
      );
    }
  }, [initialValues]);

  const handleCancel = () => {
    const abortControllers = Object.values(mcpServerAbortControllerMap);
    abortControllers.forEach(controller => controller.abort());
    onCancel();
  };

  const handleSubmit = () => {
    const isDuplicate = selectedTools.length !== uniqBy(selectedTools, 'qualifiedName').length;
    if (isDuplicate) {
      messageApi.error(t('MESSAGE_6'));
      return;
    }
    onOk(selectedTools);
  };

  const tranMcpTool = (
    tool: {
      qualifiedName?: string;
      description?: string;
      parameters: JSONSchema7;
      displayName?: string;
    },
    mcpServer: McpServerItem,
  ): FunctionDefinition => {
    const { qualifiedName = '', description, parameters, displayName } = tool;
    const mcpToolBase: FunctionBase = {
      description,
      parameters,
    };
    return {
      id: getUuid(),
      enabled: true,
      qualifiedName,
      description,
      parameters,
      displayName,
      functionType: 'mcp_tool',
      mcpServer,
      mcpToolBase,
    };
  };

  const onEnableMcpServer = async (checked: boolean, mcpServer: McpServerItem) => {
    if (isMcpToolConfigListLoading) return;

    const abortController = new AbortController();
    setMcpServerAbortControllerMap(prev => ({ ...prev, [mcpServer.id]: abortController }));
    setMcpServerLoadingMap(prev => ({ ...prev, [mcpServer.id]: true }));
    if (checked) {
      if (mcpServer.implementType === McpImplementType.PROXY) {
        const res = await getMcpToolConfigList(mcpServer.qualifiedName, { abortController });
        if (res.length) {
          setSelectedMcpIds(prev => [...prev, mcpServer.id]);
          setSelectedTools(prev => [
            ...prev,
            ...res.map(item =>
              tranMcpTool({ ...item, parameters: tranJsonToObject(item.inputSchema) }, mcpServer),
            ),
          ]);
        } else {
          if (!abortController.signal.aborted) {
            messageApi.warning(t('MESSAGE_7'));
          }
        }
      } else if (mcpServer.implementType === McpImplementType.EXTERNAL) {
        const res = await getMcpToolList(mcpServer.endpointUrl, { abortController });
        if (res.length) {
          setSelectedMcpIds(prev => [...prev, mcpServer.id]);
          setSelectedTools(prev => [
            ...prev,
            ...res.map(({ name, inputSchema, description }) =>
              tranMcpTool({ qualifiedName: name, parameters: inputSchema, description }, mcpServer),
            ),
          ]);
        } else {
          if (!abortController.signal.aborted) {
            messageApi.warning(t('MESSAGE_7'));
          }
        }
      }
    } else {
      setSelectedMcpIds(prev => prev.filter(i => i !== mcpServer.id));
      setSelectedTools(prev => prev.filter(i => i.mcpServer?.id !== mcpServer.id));
    }
    setMcpServerLoadingMap(prev => ({ ...prev, [mcpServer.id]: false }));
  };

  const onRemoveTool = (id: string) => {
    const newMcpTools = selectedTools.filter(t => t.id !== id);
    setSelectedTools(newMcpTools);
    setSelectedMcpIds(newMcpTools.map(m => m.mcpServer?.id).filter(f => f !== undefined) as number[]);
  };

  const footer = (
    <div className={cn('flex items-center justify-between')}>
      <Button
        type="link"
        icon={<PlusIcon />}
        onClick={() => {
          const url = `/paas#${NAV_PATH_MAP.MCP}?type=create`;
          window.open(url, '_blank');
        }}
      >
        {t('MCP_3')}
      </Button>
      <div className={cn('flex items-center justify-end gap-2')}>
        <Button onClick={handleCancel}>{t('BUTTON_19')}</Button>
        <Button
          type="primary"
          onClick={handleSubmit}
          disabled={isMcpToolConfigListLoading || isMcpToolListLoading}
        >
          {t('BUTTON_24')}
        </Button>
      </div>
    </div>
  );

  return (
    <Modal open title="MCP Tool" size="large" onCancel={handleCancel} footer={footer}>
      <Skeleton loading={isMcpServerListLoading} active style={{ height: 560 }}>
        <div className={cn('flex h-[560px] gap-2 text-foreground-primary')}>
          <div className={cn('flex h-full w-[290px] flex-col overflow-hidden')}>
            <div className={cn('flex items-center gap-2')}>
              <span className={cn('text-[14px] font-medium')}>MCP</span>
              <Input
                placeholder={t('PLACEHOLDER_8')}
                allowClear
                value={mcpServerKeyword}
                onChange={e => setMcpServerKeyword(e.target.value)}
                style={{ width: 200 }}
              />
              <Button type="link" icon={<ReloadIcon />} onClick={getMcpServerList} />
            </div>

            <div className={cn('mt-2 flex flex-1 flex-col gap-2 overflow-y-auto px-1')}>
              {filteredMcpServerList.map(item => {
                const checked = Boolean(item.id && selectedMcpIds.includes(item.id));
                return (
                  <McpServerCard
                    key={item.id}
                    mcpServer={item}
                    checked={checked}
                    onChange={onEnableMcpServer}
                    isLoading={mcpServerLoadingMap[item.id]}
                  />
                );
              })}
            </div>
          </div>

          <DividingLine layout="vertical" />

          <div className={cn('flex h-full flex-1 flex-col overflow-hidden')}>
            <div className={cn('flex items-center gap-2')}>
              <span className={cn('text-[14px] font-medium')}>Tools</span>
              <Input
                placeholder={t('PLACEHOLDER_9')}
                allowClear
                value={toolKeyword}
                onChange={e => setToolKeyword(e.target.value)}
                style={{ width: 200 }}
              />
            </div>

            <div className={cn('mt-2 flex flex-1 flex-col gap-2 overflow-y-auto px-1')}>
              <Skeleton loading={isMcpToolConfigListLoading || isMcpToolListLoading} active>
                {filteredSelectedTools.map(item => (
                  <McpToolCard key={item.id} tool={item} onRemove={onRemoveTool} />
                ))}
              </Skeleton>
            </div>
          </div>
        </div>
      </Skeleton>
    </Modal>
  );
};

export default memo(McpToolModal);
