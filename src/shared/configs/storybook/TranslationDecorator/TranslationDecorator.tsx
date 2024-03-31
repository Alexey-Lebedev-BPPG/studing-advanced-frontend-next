import { StoryFn } from '@storybook/react';
import { NextIntlClientProvider } from 'next-intl';
import { Suspense } from 'react';

export const TranslationDecorator = (StoryComponent: StoryFn) => {
  const locales = ['ru', 'en'];

  const messages = locales.reduce(
    (acc, lang) => ({
      ...acc,
      // eslint-disable-next-line import/no-dynamic-require, global-require
      [lang]: require(`/messages/${lang}/translation.json`),
    }),
    {},
  );

  return (
    <NextIntlClientProvider locale='en' messages={messages}>
      <Suspense fallback=''>
        <StoryComponent />
      </Suspense>
    </NextIntlClientProvider>
  );
};
