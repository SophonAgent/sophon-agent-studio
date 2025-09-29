import type { ReactNode } from 'react';
import type { MessageInstance } from 'antd/es/message/interface';
import type { HookAPI } from 'antd/es/modal/useModal';
import type { NotificationInstance } from 'antd/es/notification/interface';

import { createContext, useContext } from 'react';
import { message, Modal, notification } from 'antd';

const FeedbackContext = createContext<{
  messageApi: MessageInstance;
  modalApi: HookAPI;
  notificationApi: NotificationInstance;
}>(null!);

export function FeedbackProvider({ children }: { children: ReactNode }) {
  const [messageApi, messageContextHolder] = message.useMessage();
  const [modalApi, modalContextHolder] = Modal.useModal();
  const [notificationApi, notificationContextHolder] = notification.useNotification();

  return (
    <FeedbackContext.Provider value={{ messageApi, modalApi, notificationApi }}>
      {messageContextHolder}
      {modalContextHolder}
      {notificationContextHolder}
      {children}
    </FeedbackContext.Provider>
  );
}

function useFeedback() {
  return useContext(FeedbackContext);
}

export default useFeedback;
