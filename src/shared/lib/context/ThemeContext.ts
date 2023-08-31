import { createContext } from 'react';
import { Theme } from '../../const/theme';

export interface ThemeContextProps {
  setTheme?: (theme: Theme) => void;
  theme?: Theme;
}

// делаем доступность темы по всему приложению
export const ThemeContext = createContext<ThemeContextProps>({});
