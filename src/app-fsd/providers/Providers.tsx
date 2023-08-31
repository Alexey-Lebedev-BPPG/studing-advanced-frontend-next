'use client';

import { SessionProvider } from 'next-auth/react';
import { ReactNode } from 'react';
import { StoreProvider } from './StoreProvider';
import { ThemeProvider } from './ThemeProvider';
import { ForceUpdateProvider } from '@/shared/lib/render/forceUpdate';

// создаем глобальный провайдер, который подключаем в главный лайаут
export const Providers = (props: { children: ReactNode }) => {
  const { children } = props;

  /* добавляем провайдер сессии */
  return (
    <StoreProvider>
      <SessionProvider>
        <ForceUpdateProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </ForceUpdateProvider>
      </SessionProvider>
    </StoreProvider>
  );
};
