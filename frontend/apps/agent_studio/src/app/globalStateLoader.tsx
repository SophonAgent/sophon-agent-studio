'use client';

import { Fragment, useEffect, type FC } from 'react';

import useGlobalModel, { LOCAL_KEY_AGENT_STUDIO_USER_ID } from '@/store/globalModel';
import useConversationModel from '@/store/chat/conversationModel';
import { getTimestampUuid } from '@/utils/uuid';
import ConversationListModal from '@/components/conversationListModal';

const GlobalStateLoader: FC = () => {
  const { userId, showConversationListModal, __setUserId, __setShowConversationListModal } = useGlobalModel();
  const { getConversationList } = useConversationModel();

  // initial user id
  useEffect(() => {
    const storedId = localStorage.getItem(LOCAL_KEY_AGENT_STUDIO_USER_ID);
    const newId = storedId || getTimestampUuid();

    __setUserId(newId);
    if (!storedId) {
      localStorage.setItem(LOCAL_KEY_AGENT_STUDIO_USER_ID, newId);
    }
  }, []);

  useEffect(() => {
    if (!userId) return;

    getConversationList();
  }, [userId]);

  return (
    <Fragment>
      {showConversationListModal && (
        <ConversationListModal onCancel={() => __setShowConversationListModal(false)} />
      )}
    </Fragment>
  );
};

export default GlobalStateLoader;
