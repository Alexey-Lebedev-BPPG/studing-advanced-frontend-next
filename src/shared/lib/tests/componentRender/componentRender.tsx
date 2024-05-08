import { ReducersMapObject } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { ReactNode, useEffect, useRef, useState } from 'react';
// import { I18nextProvider } from 'react-i18next';
// import { MemoryRouter } from 'react-router-dom';
import { StateSchema, StoreProvider } from '@/app-fsd/providers/StoreProvider';
// eslint-disable-next-line path-checher-ulbi-example/layer-imports
import { ThemeProvider } from '@/app-fsd/providers/ThemeProvider';
import { Theme } from '@/shared/const/theme';
// eslint-disable-next-line path-checher-ulbi-example/layer-imports
import '@/app-fsd/styles/index.css';

export interface IComponentRenderOptions {
  route?: string;
  initialState?: DeepPartial<StateSchema>;
  // добавляем этот пропс, чтоб при тестировании в компонентах, которые обернуты в DynamicModuleLoader, они могли иметь доступ к стейту
  asyncReducer?: DeepPartial<ReducersMapObject<StateSchema>>;
  theme?: Theme;
}

interface TestProviderProps {
  children: ReactNode;
  options?: IComponentRenderOptions;
}

type MessageType = typeof import('@/../messages/en/translation.json');

// выносим все обертки в одну, чтоб можно было также использовать в изолированных тестах в сайпресс
export function TestProvider(props: TestProviderProps) {
  const { children, options = {} } = props;
  const {
    route = '/',
    initialState,
    asyncReducer,
    theme = Theme.LIGHT,
  } = options;

  const lang = 'ru';
  const MessageRef = useRef<MessageType>();
  const [isLoaded, setIsLoaded] = useState(false);

  const getMessages = () =>
    Promise.all([import(`../../../../../messages/${lang}/translation.json`)]);
  useEffect(() => {
    // вызываем функцию подгрузки библиотек
    getMessages().then(([mes]) => {
      MessageRef.current = mes;
      setIsLoaded(true);
    });
  }, []);

  return (
    //  добавляем еще сторпровайдер для тестов
    <StoreProvider asyncReducers={asyncReducer} initialState={initialState}>
      <NextIntlClientProvider locale={lang} messages={MessageRef.current}>
        <ThemeProvider initialTheme={theme}>
          <div className={`app ${theme}`}>{children}</div>
        </ThemeProvider>
      </NextIntlClientProvider>
    </StoreProvider>
  );
}

// обертка для тестируемого компонента с добавлением конфигурации для роутов и i18n
export const componentRender = (
  component: ReactNode,
  options: IComponentRenderOptions = {},
) => render(<TestProvider options={options}>{component}</TestProvider>);
