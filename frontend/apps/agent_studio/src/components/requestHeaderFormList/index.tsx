import type { FC } from 'react';
import type { FormListProps } from 'antd/es/form';

import { Fragment, memo } from 'react';
import { Button, Form, Input } from 'antd';
import { MinusCircledIcon, PlusCircledIcon } from '@radix-ui/react-icons';
import { cn } from '@/utils/tw';
import { useTranslation } from 'react-i18next';

const { List: FormList, Item: FormItem } = Form;

interface RequestHeaderFormListProps {
  name: FormListProps['name'];
  initialValue?: FormListProps['initialValue'];
}

const RequestHeaderFormList: FC<RequestHeaderFormListProps> = ({ name, initialValue }) => {
  const { t } = useTranslation();

  return (
    <FormList name={name} initialValue={initialValue}>
      {(fields, { add, remove }) => (
        <Fragment>
          {fields.map(({ key, name }, index) => (
            <div key={key} className={cn('mb-3 flex items-center gap-2')}>
              <FormItem name={[name, 'key']} noStyle>
                <Input placeholder="Key" style={{ flex: '1 1 0%' }} />
              </FormItem>
              <FormItem name={[name, 'value']} noStyle>
                <Input placeholder="Value" style={{ flex: '1 1 0%' }} />
              </FormItem>
              <Button type="link" danger icon={<MinusCircledIcon />} onClick={() => remove(index)} />
            </div>
          ))}

          <Button
            type="link"
            size="small"
            icon={<PlusCircledIcon />}
            onClick={() => add({ key: '', value: '' })}
          >
            {t('BUTTON_23')} Header
          </Button>
        </Fragment>
      )}
    </FormList>
  );
};

export default memo(RequestHeaderFormList);
