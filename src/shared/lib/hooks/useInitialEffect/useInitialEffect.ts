import { useEffect } from 'react';

// хук предназначен для проверки переменной __PROJECT__ на значение сторибука или jest.
export const useInitialEffect = (callback: () => void) => {
  useEffect(() => {
    // if (
    //   process.env?.NEXT_PUBLIC_PROJECT !== 'storybook' &&
    //   process.env?.NEXT_PUBLIC_PROJECT !== 'jest'
    // )
    callback();
    // ввиду того, что хук должен отрабатывать только один раз, не передаем в массив зависимостей колбэк
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
