import type { FC } from 'react';

import { memo } from 'react';
import { cn } from '@/utils/tw';
import { PlusIcon } from '@radix-ui/react-icons';
import { Button, Image, Upload } from 'antd';
import useFeedback from '@/context/feedbackContext';
import { fileToBase64 } from '@/utils/file';
import { useTranslation } from 'react-i18next';

interface IconUploadProps {
  value?: string;
  onChange?: (value?: string) => void;
}

const IconUpload: FC<IconUploadProps> = ({ value, onChange }) => {
  const { t } = useTranslation();

  const { messageApi } = useFeedback();

  const beforeUpload = (file: File) => {
    const fileSize = file.size / 1024;
    if (fileSize > 2048) {
      messageApi.error(t('MESSAGE_2'));
      return false;
    }
    return true;
  };

  const handleChange = async ({ file }: any) => {
    if (file.status === 'done') {
      const base64 = (await fileToBase64(file.originFileObj)) as string;
      onChange?.(base64);
    }
  };

  return (
    <Upload
      listType="picture-card"
      accept=".jpg, .jpeg, .png, .svg"
      showUploadList={false}
      beforeUpload={beforeUpload}
      onChange={handleChange}
    >
      {value ? (
        <Image src={value} alt="icon" preview={false} style={{ borderRadius: 8 }} />
      ) : (
        <Button
          type="text"
          icon={<PlusIcon className={cn('h-[24px] w-[24px]')} />}
          style={{ background: 'transparent' }}
        />
      )}
    </Upload>
  );
};

export default memo(IconUpload);

// usage:
/* <FormItem label="图标" name="iconUrl">
  <IconUpload />
</FormItem> */
