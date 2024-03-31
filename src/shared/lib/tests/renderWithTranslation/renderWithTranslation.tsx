import { render } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode } from 'react';
import getRequestConfig from '../../../configs/next-intl/i18n';

// обертка для тестируемого компонента с добавлением конфигурации для переводов
export const renderWithTranslation = async (component: ReactNode) => {
  // render(<I18nextProvider i18n={i18nForTests}>{component}</I18nextProvider>);
  const messages = getRequestConfig({ locale: 'ru' });

  // @ts-ignore
  // eslint-disable-next-line import/no-absolute-path
  const m = (await import('/messages/ru/translation.json')).default;

  render(
    <NextIntlClientProvider locale='ru' messages={m}>
      {component}
    </NextIntlClientProvider>,
  );
};
