'use client';

import { FC, useCallback, useLayoutEffect, useState } from 'react';
import { CountryForEnglishLang } from './model/const/countryForEnglishLang';
import { $api } from '@/shared/api/api';
import urls from '@/shared/const/urls';
import { useAppNavigation } from '@/shared/lib/hooks/useAppNavigation/useAppNavigation';
import { useAppPathname } from '@/shared/lib/router/navigation';
import { ILanguageProviderProps, NewLocation } from '@/shared/types/langTypes';
import { Loader } from '@/shared/ui/deprecated/Loader';

export const LanguageProvider: FC<ILanguageProviderProps> = props => {
  const { children, locale } = props;
  const pathname = useAppPathname();
  const { replace } = useAppNavigation();

  const [isFulfilled, setIsFulfilled] = useState(false);

  const getLocationRequest = useCallback(async () => {
    const locationToken = process.env.NEXT_PUBLIC_LOCATION_TOKEN;

    try {
      setIsFulfilled(true);
      const response = await $api.get<NewLocation>(
        urls.location(locationToken),
      );

      if (!response.data) throw new Error('error get location');

      const currentLang =
        response.data.country.iso_code in CountryForEnglishLang ? 'en' : 'ru';
      replace({ options: { locale: currentLang }, path: pathname });
      setIsFulfilled(false);
      localStorage.setItem('i18nextLng', currentLang);
    } catch (error) {
      setIsFulfilled(false);
      console.log('error', error);
      localStorage.setItem('i18nextLng', 'ru');
    }
  }, [pathname, replace]);

  useLayoutEffect(() => {
    const isLocal = process.env.NEXT_PUBLIC_APP_ENV === 'local';
    const acceptRequest = !isLocal && !localStorage.getItem('i18nextLng');

    acceptRequest && getLocationRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isFulfilled && !localStorage.getItem('i18nextLng')) return <Loader />;

  return children;
};
