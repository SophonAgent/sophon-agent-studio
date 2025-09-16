import type { FC } from 'react';

import { memo, useEffect, useMemo, useState } from 'react';
import PageHeader, { PageHeaderFilterItem } from '@/components/pageHeader';
import { cn } from '@/utils/tw';
import useModelManagement from '@/hooks/useModelManage';
import Table, { TableActionItem } from '@/lib/table';
import { dataColumns } from './constant';
import { cloneDeep } from 'lodash-es';
import ModelEditDrawer from './ModelEditDrawer';
import { tranJsonToObject } from '@/utils/json';
import { ModelConfigItem } from '@/interface/modelConfig';

const ModelManagement: FC = () => {
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
      placeholder: '模型展示名',
      value: filterRecord.name,
      onChange: e => setFilterRecord(prev => ({ ...prev, name: e.target.value })),
    },
    {
      key: 'modelName',
      type: 'input',
      placeholder: '模型名称',
      value: filterRecord.modelName,
      onChange: e => setFilterRecord(prev => ({ ...prev, modelName: e.target.value })),
    },
    {
      key: 'provider',
      type: 'input',
      placeholder: '模型家族',
      value: filterRecord.provider,
      onChange: e => setFilterRecord(prev => ({ ...prev, provider: e.target.value })),
    },
  ];

  const actionList: TableActionItem[] = [
    {
      key: 'edit',
      label: '编辑',
      onClick: (record: ModelConfigItem) => {
        setCurrentModelConfig(record);
        setShowModelEditDrawer(true);
      },
    },
    {
      key: 'delete',
      label: '删除',
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
        title={[{ label: '模型管理' }]}
        filterList={headerFilterList}
        actionLabel="接入模型"
        onActionClick={() => setShowModelEditDrawer(true)}
      />

      <div className={cn('flex-1 overflow-auto px-5')}>
        <Table
          rowKey="id"
          tableLayout="fixed"
          dataSource={filteredModelList}
          dataColumns={dataColumns}
          actionList={actionList}
          actionWidth={100}
          loading={isModelListLoading}
          scroll={{ x: dataColumns ? dataColumns.length * 180 : undefined }}
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
