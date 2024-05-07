'use client';

import {
  AbstractIntlMessages,
  NextIntlClientProvider,
  useLocale,
} from 'next-intl';
import { FC, ReactNode } from 'react';
// для google tag manager
import { AppSessionProvider } from './AppSessionProvider/AppSessionProvider';
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
import { useAppPathname } from '@/shared/lib/router/navigation';

interface IRootProvidersProps {
  children?: ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
}

export const RootProviders: FC<IRootProvidersProps> = props => {
  const { children, locale, messages } = props;

  const { theme } = useTheme();
  const pathname = useAppPathname();
  const lang = useLocale();

  const isLocal = process.env.NEXT_PUBLIC_APP_ENV === 'local';
  const widgetKey = process.env.NEXT_PUBLIC_WIDGET_KEY;

  const appStyle = { justifyContent: 'center' };

  return (
    <body className={classNames('', {}, [theme])} style={appStyle}>
      <StoreProvider>
        <ThemeProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <ForceUpdateProvider>
              <LanguageProvider locale={locale}>
                <GoogleAnalyticsProvider>
                  <GTMProviderProvider>
                    <HotjarProvider>
                      <AppSessionProvider>
                        <App>{children}</App>
                      </AppSessionProvider>
                    </HotjarProvider>
                  </GTMProviderProvider>
                </GoogleAnalyticsProvider>
              </LanguageProvider>
            </ForceUpdateProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
      </StoreProvider>
      {!isLocal && (
        <script
          async
          id='ze-snippet'
          src={`https://static.zdassets.com/ekr/snippet.js?key=${widgetKey}`}
          crossOrigin='anonymous'
        />
      )}
    </body>
  );
};
