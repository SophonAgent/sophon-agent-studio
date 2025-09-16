'use client';

import { cn } from '@/utils/tw';
import { redirect } from 'next/navigation';
import { Suspense, useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    redirect('/chat');
  }, []);

  return (
    <Suspense>
      <div className={cn('flex h-full w-full items-center justify-center')}>
        <h1
          className={cn(
            'mr-5 inline-block border-r border-solid border-foreground-primary pr-6 text-[24px] font-medium leading-[45px]',
          )}
        >
          404
        </h1>
        <h2 className={cn('inline-block text-[14px]')}>This page could not be found.</h2>
      </div>
    </Suspense>
  );
}
