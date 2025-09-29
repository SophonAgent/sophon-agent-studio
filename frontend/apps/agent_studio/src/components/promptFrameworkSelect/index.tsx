import type { FC } from 'react';
import type { DropdownMenuItem } from '../actionDropdown';

import { memo } from 'react';
import { Button } from 'antd';
import { cn } from '@/utils/tw';
import { DashboardIcon, InfoCircledIcon } from '@radix-ui/react-icons';
import { PromptFrameworkEnum } from '@/interface/prompt';
import { PROMPT_FRAMEWORK_LIST, PROMPT_FRAMEWORK_MAP } from '@/constant/prompt';
import ActionDropdown from '../actionDropdown';
import Tooltip from '@/lib/tooltip';
import { useTranslation } from 'react-i18next';

interface PromptFrameworkSelectProps {
  onChange: (framework: PromptFrameworkEnum, template?: string) => void;
  className?: string;
}

const PromptFrameworkSelect: FC<PromptFrameworkSelectProps> = ({ onChange, className }) => {
  const { t } = useTranslation();

  const actionList: DropdownMenuItem[] = PROMPT_FRAMEWORK_LIST(t)
    .filter(f => f.value !== PromptFrameworkEnum.COMMON)
    .map(item => ({
      key: item.value,
      label: (
        <div className={cn('flex items-center gap-1 text-[13px]')}>
          {item.label}
          <Tooltip title={PROMPT_FRAMEWORK_MAP(t)?.[item.value]?.description}>
            <InfoCircledIcon width={14} height={14} />
          </Tooltip>
        </div>
      ),
      onClick: () => onChange(item.value, PROMPT_FRAMEWORK_MAP(t)?.[item.value]?.template),
    }));

  return (
    <div className={cn('flex items-center text-[13px]', className)}>
      <span className={cn('opacity-[25%]')}>{t('BUTTON_21')}</span>
      <ActionDropdown placement="bottomLeft" trigger={['click']} actionList={actionList}>
        <Button
          type="link"
          icon={<DashboardIcon height={13} width={13} />}
          style={{ fontSize: 13, padding: '0 5px', gap: 4 }}
        >
          {t('BUTTON_22')}
        </Button>
      </ActionDropdown>
      <span className={cn('opacity-[25%]')}>{t('PLACEHOLDER_10')}</span>
    </div>
  );
};

export default memo(PromptFrameworkSelect);
