import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export const LOCAL_KEY_AGENT_STUDIO_USER_ID = 'AGENT_STUDIO_USER_ID';

interface GlobalModelState {
  /** state */
  userId: string;
  showConversationListModal: boolean;

  /** actions */
  __setUserId: (userId: string) => void;
  __setShowConversationListModal: (showConversationListModal: boolean) => void;
}

export const globalModel = create<GlobalModelState>()(
  immer((set, get) => ({
    userId: '',
    showConversationListModal: false,

    __setUserId: (userId: string) => {
      set(state => {
        state.userId = userId;
      });
    },

    __setShowConversationListModal: (showConversationListModal: boolean) => {
      set(state => {
        state.showConversationListModal = showConversationListModal;
      });
    },
  })),
);

function useGlobalModel() {
  const { userId, showConversationListModal, __setUserId, __setShowConversationListModal } = globalModel();

  return {
    /** state */
    userId,
    showConversationListModal,

    /** actions */
    __setUserId,
    __setShowConversationListModal,
  };
}

export default useGlobalModel;
