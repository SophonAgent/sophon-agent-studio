import type { FC } from 'react';

import { App as AppWrapper } from 'antd';
import { cn } from '@/utils/tw';
import Nav from '@/components/nav';
import { FeedbackProvider } from '@/context/feedbackContext';
import GlobalStateLoader from '@/app/globalStateLoader';
import { Outlet } from 'react-router-dom';

const App: FC = () => {
  return (
    <AppWrapper className={cn('h-full')}>
      <div className={cn('h-full w-full font-sans antialiased')}>
        <FeedbackProvider>
          <GlobalStateLoader />
          <div className={cn('relative flex h-full w-full')}>
            <Nav />
            <div className={cn('flex-1 overflow-x-auto overflow-y-hidden')}>
              <div className={cn('h-full min-w-[976px]')}>
                <Outlet />
              </div>
            </div>
          </div>
        </FeedbackProvider>
      </div>
    </AppWrapper>
  );
};

export default App;
