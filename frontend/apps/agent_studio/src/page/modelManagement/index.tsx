import type { FC } from 'react';
import type { PageHeaderFilterItem } from '@/components/pageHeader';
import type { TableActionItem } from '@/lib/table';
import type { ModelConfigItem } from '@/interface/modelConfig';

import { memo, useEffect, useMemo, useState } from 'react';
import PageHeader from '@/components/pageHeader';
import { cn } from '@/utils/tw';
import useModelManagement from '@/hooks/useModelManage';
import Table from '@/lib/table';
import { dataColumns } from './constant';
import { cloneDeep } from 'lodash-es';
import ModelEditDrawer from './ModelEditDrawer';
import { tranJsonToObject } from '@/utils/json';
import { useTranslation } from 'react-i18next';

const ModelManagement: FC = () => {
  const { t } = useTranslation();

  const { modelList, isModelListLoading, getModelList, deleteModel } = useModelManagement();

  const [filterRecord, setFilterRecord] = useState<{
    name?: string;
    modelName?: string;
    provider?: string;
  }>({});
  const [showModelEditDrawer, setShowModelEditDrawer] = useState<boolean>(false);
  const [currentModelConfig, setCurrentModelConfig] = useState<ModelConfigItem>();

  const filteredModelList = useMemo(() => {
    const { name, modelName, provider } = filterRecord;
    let list = cloneDeep(modelList);
    if (name) {
      list = list.filter(item => item.name?.toLowerCase()?.includes(name.toLowerCase()));
    }
    if (modelName) {
      list = list.filter(item => item.modelName?.toLowerCase()?.includes(modelName.toLowerCase()));
    }
    if (provider) {
      list = list.filter(item => {
        const config = tranJsonToObject(item.config);
        return config.provider?.toLowerCase()?.includes(provider.toLowerCase());
      });
    }
    return list;
  }, [modelList, JSON.stringify(filterRecord)]);

  useEffect(() => {
    getModelList();
  }, []);

  const onCloseDrawer = () => {
    setCurrentModelConfig(undefined);
    setShowModelEditDrawer(false);
  };

  const headerFilterList: PageHeaderFilterItem[] = [
    {
      key: 'name',
      type: 'input',
      placeholder: t('TAG_18'),
      value: filterRecord.name,
      onChange: e => setFilterRecord(prev => ({ ...prev, name: e.target.value })),
    },
    {
      key: 'modelName',
      type: 'input',
      placeholder: t('TAG_19'),
      value: filterRecord.modelName,
      onChange: e => setFilterRecord(prev => ({ ...prev, modelName: e.target.value })),
    },
    {
      key: 'provider',
      type: 'input',
      placeholder: t('TAG_20'),
      value: filterRecord.provider,
      onChange: e => setFilterRecord(prev => ({ ...prev, provider: e.target.value })),
    },
  ];

  const actionList: TableActionItem[] = [
    {
      key: 'edit',
      label: t('BUTTON_5'),
      onClick: (record: ModelConfigItem) => {
        setCurrentModelConfig(record);
        setShowModelEditDrawer(true);
      },
    },
    {
      key: 'delete',
      label: t('BUTTON_3'),
      danger: true,
      onConfirm: async (record: ModelConfigItem) => {
        await deleteModel(record.id);
        await getModelList();
      },
    },
  ];

  return (
    <div className={cn('flex h-full flex-col pb-4')}>
      <PageHeader
        className={cn('mb-4')}
        title={[{ label: t('MODEL_6') }]}
        filterList={headerFilterList}
        actionLabel={t('MODEL_7')}
        onActionClick={() => setShowModelEditDrawer(true)}
      />

      <div className={cn('flex-1 overflow-auto px-5')}>
        <Table
          rowKey="id"
          tableLayout="fixed"
          dataSource={filteredModelList}
          dataColumns={dataColumns(t)}
          actionList={actionList}
          actionWidth={110}
          loading={isModelListLoading}
          scroll={{ x: (dataColumns(t) as any[]).length * 180 }}
          pagination={{ hideOnSinglePage: true, showSizeChanger: true }}
        />
      </div>

      {showModelEditDrawer && (
        <ModelEditDrawer
          initialValues={currentModelConfig}
          onCancel={onCloseDrawer}
          onSuccess={async () => {
            onCloseDrawer();
            await getModelList();
          }}
        />
      )}
    </div>
  );
};

export default memo(ModelManagement);
