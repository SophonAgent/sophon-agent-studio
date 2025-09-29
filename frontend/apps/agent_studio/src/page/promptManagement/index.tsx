import type { FC } from 'react';
import type { PageHeaderFilterItem } from '@/components/pageHeader';
import type { TableActionItem, TableProps } from '@/lib/table';
import type { PromptConfigItem, PromptItem } from '@/interface/prompt';

import { memo, useEffect, useMemo, useState } from 'react';
import PageHeader from '@/components/pageHeader';
import usePromptManage from '@/hooks/usePromptManage';
import { cn } from '@/utils/tw';
import { cloneDeep } from 'lodash-es';
import Table from '@/lib/table';
import Paragraph3Line from '@/components/paragraph3Line';
import PromptEditDrawer from './PromptEditDrawer';
import PromptDetailDrawer from './promptDetailDrawer';
import useQueryRouter from '@/utils/router';
import { useTranslation } from 'react-i18next';

const PromptManagement: FC = () => {
  const { t } = useTranslation();
  const queryRouter = useQueryRouter();

  const {
    promptList,
    isPromptListLoading,
    isPromptDetailLoading,
    getPromptList,
    getPromptDetail,
    deletePromptConfig,
    openChatDebug,
  } = usePromptManage();

  const [filterRecord, setFilterRecord] = useState<{
    name?: string;
    uid?: string;
  }>({});
  const [showPromptDrawer, setShowPromptDrawer] = useState<'edit' | 'current' | 'history'>();
  const [currentPromptConfig, setCurrentPromptConfig] = useState<PromptConfigItem>();
  const [initOptimize, setInitOptimize] = useState<boolean>(false);

  const filteredPromptList = useMemo(() => {
    const { name, uid } = filterRecord;
    let list = cloneDeep(promptList);
    if (name) {
      list = list.filter(item => item.name?.toLowerCase()?.includes(name.toLowerCase()));
    }
    if (uid) {
      list = list.filter(item => item.uid?.toLowerCase()?.includes(uid.toLowerCase()));
    }
    return list;
  }, [promptList, JSON.stringify(filterRecord)]);

  useEffect(() => {
    getPromptList();
  }, []);

  useEffect(() => {
    const uid = queryRouter.get('uid');
    if (!uid || !promptList.length) return;

    const prompt = promptList.find(item => item.uid === uid);
    if (prompt) {
      getPromptDetail(uid).then(detail => {
        if (detail) {
          setCurrentPromptConfig({ baseConfig: prompt, detail });
          const ver = queryRouter.get('ver');
          ver ? setShowPromptDrawer('history') : setShowPromptDrawer('current');
        }
      });
    } else {
      onCloseDrawer();
    }
  }, [promptList]);

  const onCloseDrawer = () => {
    setShowPromptDrawer(undefined);
    setCurrentPromptConfig(undefined);
    queryRouter.remove('uid');
  };

  const headerFilterList: PageHeaderFilterItem[] = [
    {
      key: 'name',
      type: 'input',
      placeholder: t('TAG_25'),
      value: filterRecord.name,
      onChange: e => setFilterRecord(prev => ({ ...prev, name: e.target.value })),
    },
    {
      key: 'uid',
      type: 'input',
      placeholder: 'Prompt ID',
      value: filterRecord.uid,
      onChange: e => setFilterRecord(prev => ({ ...prev, uid: e.target.value })),
    },
  ];

  const dataColumns: TableProps['dataColumns'] = [
    {
      title: t('TAG_25'),
      dataIndex: 'name',
      key: 'name',
      width: 180,
      fixed: 'left',
      render: (value, record: PromptItem) => (
        <Paragraph3Line
          value={value}
          rows={1}
          onClick={async () => {
            const detail = await getPromptDetail(record.uid);
            if (detail) {
              setCurrentPromptConfig({ baseConfig: record, detail });
              setShowPromptDrawer('current');
              queryRouter.set('uid', record.uid);
            }
          }}
        />
      ),
    },
    {
      title: 'Prompt ID',
      dataIndex: 'uid',
      key: 'uid',
      width: 180,
      render: value => <Paragraph3Line value={value} rows={1} copyable />,
    },
    {
      title: t('TAG_6'),
      dataIndex: 'description',
      key: 'description',
      width: 180,
      render: value => <Paragraph3Line value={value} rows={1} />,
    },
    {
      title: t('TAG_7'),
      dataIndex: 'createTime',
      key: 'createTime',
      width: 180,
    },
  ];

  const actionList: TableActionItem[] = [
    {
      key: 'edit',
      label: t('BUTTON_5'),
      onClick: async (record: PromptItem) => {
        const detail = await getPromptDetail(record.uid);
        if (detail) {
          setCurrentPromptConfig({ baseConfig: record, detail });
          setShowPromptDrawer('edit');
        }
      },
    },
    {
      key: 'debug',
      label: t('BUTTON_29'),
      onClick: (record: PromptItem) => openChatDebug(record.uid),
    },
    {
      key: 'copy',
      label: t('BUTTON_13'),
      onClick: async (record: PromptItem) => {
        const detail = await getPromptDetail(record.uid);
        if (detail) {
          const baseConfig = { ...record, uid: undefined, name: `${record.name}_copy` };
          setCurrentPromptConfig({ baseConfig, detail });
          setShowPromptDrawer('edit');
        }
      },
      inMore: true,
    },
    {
      key: 'history',
      label: t('BUTTON_30'),
      onClick: async (record: PromptItem) => {
        const detail = await getPromptDetail(record.uid);
        if (detail) {
          setCurrentPromptConfig({ baseConfig: record, detail });
          setShowPromptDrawer('history');
          queryRouter.set('uid', record.uid);
        }
      },
      inMore: true,
    },
    {
      key: 'delete',
      label: t('BUTTON_3'),
      danger: true,
      onConfirm: async (record: PromptItem) => {
        await deletePromptConfig(record.uid);
        await getPromptList();
      },
      inMore: true,
    },
  ];

  const genDrawer = () => {
    if (!showPromptDrawer) return null;

    if (showPromptDrawer === 'edit') {
      return (
        <PromptEditDrawer
          initialValues={currentPromptConfig}
          isLoading={isPromptDetailLoading}
          onCancel={onCloseDrawer}
          onSuccess={async () => {
            onCloseDrawer();
            await getPromptList();
          }}
          initOptimize={initOptimize}
        />
      );
    } else if (['current', 'history'].includes(showPromptDrawer)) {
      return (
        <PromptDetailDrawer
          promptConfig={currentPromptConfig}
          tab={showPromptDrawer}
          onCancel={onCloseDrawer}
          onDelete={async () => {
            await deletePromptConfig(currentPromptConfig?.baseConfig?.uid);
            onCloseDrawer();
            await getPromptList();
          }}
          onDebug={() => openChatDebug(currentPromptConfig?.baseConfig?.uid)}
          onEdit={v => {
            setInitOptimize(v);
            setShowPromptDrawer('edit');
          }}
          onRefresh={async () => {
            const detail = await getPromptDetail(currentPromptConfig?.baseConfig?.uid);
            if (detail && currentPromptConfig) {
              setCurrentPromptConfig({ ...currentPromptConfig, detail });
            }
          }}
        />
      );
    }
    return null;
  };

  return (
    <div className={cn('flex h-full flex-col pb-4')}>
      <PageHeader
        className={cn('mb-4')}
        title={[{ label: t('PROMPT_31') }]}
        filterList={headerFilterList}
        actionLabel={t('PROMPT_32')}
        onActionClick={() => setShowPromptDrawer('edit')}
      />

      <div className={cn('flex-1 overflow-auto px-5')}>
        <Table
          rowKey="uid"
          tableLayout="fixed"
          dataSource={filteredPromptList}
          dataColumns={dataColumns}
          actionList={actionList}
          actionWidth={120}
          loading={isPromptListLoading}
          scroll={{ x: dataColumns.length * 180 }}
          pagination={{ hideOnSinglePage: true, showSizeChanger: true }}
        />
      </div>

      {genDrawer()}
    </div>
  );
};

export default memo(PromptManagement);
