import type { FC } from 'react';

import { Fragment, memo, useEffect, useMemo, useState } from 'react';
import Table, { TableActionItem } from '@/lib/table';
import { PromptDetailItem, PromptHistoryItem } from '@/interface/prompt';
import usePromptManage from '@/hooks/usePromptManage';
import { PaginationProps } from 'antd';
import { dataColumns } from './constant';
import useQueryRouter from '@/utils/router';
import PromptDetailModal from './PromptDetailModal';
import PromptDiffModal from './PromptDiffModal';

interface HistoryVersionPanelProps {
  promptDetail?: PromptDetailItem;
  onRefresh: () => void;
}

const HistoryVersionPanel: FC<HistoryVersionPanelProps> = ({ promptDetail, onRefresh }) => {
  const queryRouter = useQueryRouter();

  const { promptHistoryList, isPromptHistoryLoading, getPromptHistoryList, rollbackPromptVersion } =
    usePromptManage();

  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: 10,
    total: 0,
    showSizeChanger: true,
  });
  const [showVersionModal, setShowVersionModal] = useState<'view' | 'diff'>();
  const [currentPromptDetail, setCurrentPromptDetail] = useState<PromptDetailItem>();

  const uid = useMemo(() => promptDetail?.promptUid, [promptDetail?.promptUid]);

  useEffect(() => {
    if (!uid) return;

    getHistoryList();
  }, [uid]);

  useEffect(() => {
    const ver = Number(queryRouter.get('ver'));
    if (!ver || !promptHistoryList.length) return;

    const history = promptHistoryList.find(item => item.version === ver);
    if (history) {
      setCurrentPromptDetail(history.promptDetails[0]);
      setShowVersionModal('view');
    } else {
      queryRouter.remove('ver');
    }
  }, [promptHistoryList]);

  const getHistoryList = async (pageNum?: number, pageSize?: number) => {
    const res = await getPromptHistoryList({ uid, pageNum, pageSize });
    setPagination(prev => ({
      ...prev,
      current: pageNum || 1,
      pageSize: pageSize || 10,
      total: res?.pageInfo?.total || 0,
    }));
  };

  const onCloseModal = () => {
    setShowVersionModal(undefined);
    setCurrentPromptDetail(undefined);
    queryRouter.remove('ver');
  };

  const actionList: TableActionItem[] = [
    {
      key: 'view',
      label: '查看',
      onClick: (record: PromptHistoryItem) => {
        setCurrentPromptDetail(record.promptDetails[0]);
        setShowVersionModal('view');
        queryRouter.set('ver', record.version);
      },
    },
    {
      key: 'rollback',
      label: '还原版本',
      onConfirm: async (record: PromptHistoryItem) => {
        await rollbackPromptVersion(uid, record.version);
        const { current, pageSize } = pagination;
        await getHistoryList(current, pageSize);
        onRefresh();
      },
      inMore: true,
      hidden: (item: PromptHistoryItem) => item.status === 1,
    },
    {
      key: 'diff',
      label: '对比当前版本',
      onClick: (record: PromptHistoryItem) => {
        setCurrentPromptDetail(record.promptDetails[0]);
        setShowVersionModal('diff');
      },
      inMore: true,
      hidden: (item: PromptHistoryItem) => item.status === 1,
    },
  ];

  const genModal = () => {
    if (!showVersionModal) return null;

    if (showVersionModal === 'view') {
      return <PromptDetailModal promptDetail={currentPromptDetail} onCancel={onCloseModal} />;
    } else if (showVersionModal === 'diff') {
      return (
        <PromptDiffModal
          originalPromptDetail={promptDetail}
          modifiedPromptDetail={currentPromptDetail}
          onCancel={onCloseModal}
        />
      );
    }
    return null;
  };

  return (
    <Fragment>
      <Table
        rowKey="version"
        tableLayout="fixed"
        dataSource={promptHistoryList}
        dataColumns={dataColumns}
        actionList={actionList}
        actionWidth={90}
        loading={isPromptHistoryLoading}
        scroll={{ x: dataColumns ? dataColumns.length * 180 : undefined }}
        pagination={pagination}
        onChange={({ current, pageSize }) => {
          getHistoryList(current, pageSize);
        }}
      />

      {genModal()}
    </Fragment>
  );
};

export default memo(HistoryVersionPanel);
