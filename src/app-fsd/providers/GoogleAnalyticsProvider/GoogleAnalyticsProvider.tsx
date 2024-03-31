'use client';

import { useSearchParams } from 'next/navigation';
import { FC, ReactNode, useEffect } from 'react';
import ReactGA from 'react-ga4';
import { useAppPathname } from '@/shared/lib/router/navigation';

interface IGoogleAnalyticsProviderProps {
  children: ReactNode;
}

export const GoogleAnalyticsProvider: FC<
  IGoogleAnalyticsProviderProps
> = props => {
  const { children } = props;
  const pathname = useAppPathname();
  const search = useSearchParams();

  // const isProd = process.env.APP_ENV === 'prod';
  const isProd =
    process.env.NEXT_PUBLIC_APP_ENV === 'prod' ||
    process.env.NEXT_PUBLIC_APP_ENV === 'dev';
  const gaId = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

  isProd && ReactGA.initialize(gaId || '');

  useEffect(() => {
    isProd && ReactGA.send({ hitType: 'pageview', page: pathname + search });
  }, [isProd, pathname, search]);

  return children;
};
