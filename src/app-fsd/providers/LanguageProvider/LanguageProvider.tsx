'use client';

import { FC, useCallback, useLayoutEffect } from 'react';
import { CountryForEnglishLang } from './model/const/countryForEnglishLang';
import { getGeolocation } from '@/entities/User';
import { useAppDispatch } from '@/shared/lib/hooks/redux';
import { useAppNavigation } from '@/shared/lib/hooks/useAppNavigation/useAppNavigation';
import { useAppPathname } from '@/shared/lib/router/navigation';
import { ILanguageProviderProps, NewLocation } from '@/shared/types/langTypes';
import { Loader } from '@/shared/ui/deprecated/Loader';

export const LanguageProvider: FC<ILanguageProviderProps> = props => {
  const { children, locale } = props;
  const pathname = useAppPathname();
  const { replace } = useAppNavigation();
  const dispatch = useAppDispatch();

  // const isLoading = useAppSelector(getUserIsLoading);
  const isLoading = false;

  const getLocationRequest = useCallback(async () => {
    const locationToken = process.env.NEXT_PUBLIC_LOCATION_TOKEN;
    const isLocal = process.env.NEXT_PUBLIC_APP_ENV === 'local';
    const acceptRequest = !isLocal && !localStorage.getItem('i18nextLng');

    if (locationToken) {
      const response = await dispatch(getGeolocation(locationToken));

      if (response.meta.requestStatus === 'fulfilled') {
        const data = response.payload as NewLocation;
        const currentLang =
          data.country.iso_code in CountryForEnglishLang ? 'en' : 'ru';
        acceptRequest &&
          replace({ options: { locale: currentLang }, path: pathname });
        acceptRequest && localStorage.setItem('i18nextLng', currentLang);
      } else {
        console.log('error language provider', response);
        acceptRequest && localStorage.setItem('i18nextLng', 'ru');
      }
    }
  }, [dispatch, pathname, replace]);

  useLayoutEffect(() => {
    getLocationRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading && !localStorage.getItem('i18nextLng')) return <Loader />;

  return children;
};
