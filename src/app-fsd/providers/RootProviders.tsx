'use client';

import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { FC, ReactNode } from 'react';
// для google tag manager
import { GTMProviderProvider } from './GTMProvider/GTMProvider';
// для GA
import { GoogleAnalyticsProvider } from './GoogleAnalyticsProvider/GoogleAnalyticsProvider';
// для hotjar
import { HotjarProvider } from './HotjarProvider/HotjarProvider';
// для выбора языка по геолокации
import { LanguageProvider } from './LanguageProvider/LanguageProvider';
// для редакса
import { StoreProvider } from './StoreProvider';
// для темы
import { ThemeProvider } from './ThemeProvider';
import { App } from '../App';
import { classNames } from '@/shared/lib/classNames/classNames';
import { useTheme } from '@/shared/lib/hooks/useTheme/useTheme';
import { ForceUpdateProvider } from '@/shared/lib/render/forceUpdate';

interface IRootProvidersProps {
  children?: ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
}

export const RootProviders: FC<IRootProvidersProps> = props => {
  const { children, locale, messages } = props;

  const { theme } = useTheme();

  return (
    <body className={classNames('', {}, [theme])}>
      <StoreProvider>
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ForceUpdateProvider>
              <LanguageProvider locale={locale}>
                <GoogleAnalyticsProvider>
                  <GTMProviderProvider>
                    <HotjarProvider>
                      <App>{children}</App>
                    </HotjarProvider>
                  </GTMProviderProvider>
                </GoogleAnalyticsProvider>
              </LanguageProvider>
            </ForceUpdateProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </StoreProvider>
      {/* {!isLocal && (
      <script
        async
        id='ze-snippet'
        src={`https://static.zdassets.com/ekr/snippet.js?key=${widgetKey}`}
        crossOrigin='anonymous'
      />
    )} */}
    </body>
  );
};
