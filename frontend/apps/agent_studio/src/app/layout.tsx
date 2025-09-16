import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/utils/tw';
import { AntdRegistry } from '@ant-design/nextjs-registry';
import GlobalStateLoader from './globalStateLoader';
import Nav from '@/components/nav';
import { Suspense } from 'react';
import { Skeleton } from 'antd';
import { FeedbackProvider } from '@/context/feedbackContext';

export const metadata: Metadata = {
  title: 'Agent Studio',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn('font-sans antialiased')}>
        <AntdRegistry>
          <FeedbackProvider>
            <Suspense fallback={<Skeleton />}>
              <GlobalStateLoader />
              <div className={cn('relative flex h-full w-full')}>
                <Nav />
                <div className={cn('flex-1 overflow-x-auto overflow-y-hidden')}>
                  <div className={cn('h-full min-w-[976px]')}>{children}</div>
                </div>
              </div>
            </Suspense>
          </FeedbackProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
