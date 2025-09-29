import type { FC } from 'react';

import { Fragment, memo, useMemo } from 'react';
import { cn } from '@/utils/tw';
import { Checkbox, Collapse, Switch } from 'antd';
import useFunctionCallModel from '@/store/chat/functionCallModel';
import useMessageGroupModel from '@/store/chat/messageGroupModel';
import FunctionInput from './FunctionInput';
import AccentBorderHeader from '@/components/accentBorderHeader';
import { TriangleDownIcon, TriangleRightIcon } from '@radix-ui/react-icons';
import useFeedback from '@/context/feedbackContext';
import { useTranslation } from 'react-i18next';

interface FunctionPanelProps {
  msgGroupKey: string;
  isReadonly?: boolean;
  groupName?: string;
}

const FunctionPanel: FC<FunctionPanelProps> = ({ msgGroupKey, isReadonly, groupName }) => {
  const { t } = useTranslation();

  const { enableFunctionCallMap, __updateEnableFunctionCall } = useFunctionCallModel();
  const { isSyncMap, isCompareMode, syncAllMessageGroups } = useMessageGroupModel();

  const { modalApi } = useFeedback();

  const enableFunctionCall = useMemo(
    () => enableFunctionCallMap[msgGroupKey],
    [enableFunctionCallMap, msgGroupKey],
  );

  const genHeader = () => {
    return (
      <div className={cn('flex items-center justify-between text-foreground-primary')}>
        <AccentBorderHeader title="Functions" />
        <div className={cn('flex items-center gap-1')}>
          {isCompareMode && !isReadonly ? (
            <Checkbox
              style={{ fontSize: 13, fontWeight: 500, color: 'var(--text-primary)' }}
              checked={isSyncMap.function}
              onChange={e => {
                e.stopPropagation();
                const checked = e.target.checked;
                if (checked) {
                  modalApi.confirm({
                    title: t('MODAL_4', { groupName }),
                    centered: true,
                    onOk: () => syncAllMessageGroups(msgGroupKey, 'function', checked),
                  });
                } else {
                  syncAllMessageGroups(msgGroupKey, 'function', checked);
                }
              }}
              onClick={e => e.stopPropagation()}
            >
              {t('CHAT_5')}
            </Checkbox>
          ) : null}
          <Switch
            size="small"
            value={enableFunctionCall}
            onChange={(v, e) => {
              e.stopPropagation();
              __updateEnableFunctionCall({
                msgGroupKey,
                enableFunctionCall: v,
                isSync: isSyncMap.function,
              });
            }}
            disabled={isReadonly}
          />
          <span className={cn('ml-1 text-[13px] font-medium')}>Enable</span>
        </div>
      </div>
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
                <FunctionInput
                  className={cn('max-h-[208px]')}
                  msgGroupKey={msgGroupKey}
                  disabled={!enableFunctionCall || isReadonly}
                />
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
          <div className={cn('flex-1 overflow-hidden')}>
            <FunctionInput msgGroupKey={msgGroupKey} disabled={!enableFunctionCall || isReadonly} />
          </div>
        </div>
      )}
    </Fragment>
  );
};

export default memo(FunctionPanel);
