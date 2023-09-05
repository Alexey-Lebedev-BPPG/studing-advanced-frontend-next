import { useContext } from 'react';
// import { LOCAL_STORAGE_THEME_KEY } from '../../../const/localStorage';
import { Theme } from '../../../const/theme';
import { ThemeContext } from '../../context/ThemeContext';
// import { forLocalStorage } from '../../store';

interface UseThemeResult {
  theme: Theme;
  // сюда передаем какую-то функцию, которая уже будет сохранять тему в то место, которое нужно (локал сторадж, БД и т.п.)
  toggleTheme: (saveFunction: (theme: Theme) => void) => void;
}

export const useTheme = (): UseThemeResult => {
  // достаем переменную темы и функцию ее изменения
  const { setTheme, theme } = useContext(ThemeContext);

  const toggleTheme = (saveFunction: (theme: Theme) => void) => {
    let newTheme: Theme = Theme.LIGHT;

    if (theme === Theme.DARK) newTheme = Theme.LIGHT;
    if (theme === Theme.LIGHT) newTheme = Theme.ORANGE;
    if (theme === Theme.ORANGE) newTheme = Theme.DARK;

    // делаем такой вызов, что указать, что функция существует
    setTheme?.(newTheme);
    // сохраняем данные темы ()
    // localStorage.setItem(LOCAL_STORAGE_THEME_KEY, newTheme);
    // forLocalStorage({
    //   key: LOCAL_STORAGE_THEME_KEY,
    //   method: 'set',
    //   value: newTheme,
    // });
    // или более универсально
    saveFunction(newTheme);
  };

  return { theme: theme || Theme.LIGHT, toggleTheme };
};
