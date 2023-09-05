'use client';

import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import { LOCAL_STORAGE_THEME_KEY } from '@/shared/const/localStorage';
import { Theme } from '@/shared/const/theme';
import { ThemeContext } from '@/shared/lib/context/ThemeContext';
import { forLocalStorage } from '@/shared/lib/store';

interface ThemeProviderProps {
  children: ReactNode;
  // добавляем пропс, чтоб мы могли менять тему извне
  initialTheme?: Theme;
}

// переменная из локал стораджа, которая показывает последнюю выбранную тему пользователя.нужна для того, чтоб показывать скелетон в зависимости от темы, т.к. какая теа установлена у пользователя мы узнает, только когда подгрузим о нем данные
// const fallbackTheme = localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme;
let fallbackTheme = forLocalStorage({
  key: LOCAL_STORAGE_THEME_KEY,
  method: 'get',
}) as Theme;

// не используем memo в компонентах, где у нас есть children
// чтоб иметь глобальный доступ к темам в любых компонентах
const ThemeProvider: FC<ThemeProviderProps> = props => {
  const { children, initialTheme } = props;

  // для того, чтоб useEffect сработал только один раз, делаем флаг
  const [isThemeInited, setIsThemeInited] = useState(false);

  // инициализируем тему из локал стораджа в стейте
  const [theme, setTheme] = useState<Theme>(
    initialTheme || fallbackTheme || Theme.LIGHT,
  );
  // навешиваем стили темы на боди
  document.body.className = theme;

  // чтоб не инициировалась тема только дефолтная, нужно отслеживать ее изменение и поменять
  useEffect(() => {
    if (!isThemeInited && initialTheme) {
      setTheme(initialTheme);
      setIsThemeInited(true);
    }
  }, [initialTheme, isThemeInited]);

  useEffect(() => {
    // навешиваем класс темы на боди, т.к. у нас теперь общий скролл
    document.body.className = theme;
    // при изменении темы также меняем тему в локал сторадже
    forLocalStorage({
      key: LOCAL_STORAGE_THEME_KEY,
      method: 'set',
      value: theme,
    });
    // localStorage.setItem(LOCAL_STORAGE_THEME_KEY, theme);
    fallbackTheme = theme;
  }, [theme]);

  const defaultProps = useMemo(() => ({ setTheme, theme }), [theme]);

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  );
};

// не забываем обернуть все приложение провайдером в index.tsx, чтоб доступ был во всем приложении
export default ThemeProvider;
