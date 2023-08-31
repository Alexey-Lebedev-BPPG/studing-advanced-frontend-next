import { ComponentType } from 'react';
import ThemeProvider from '../ui/ThemeProvider';
import { useJsonSettings } from '@/entities/User';

// HOK, чтоб решить проблему со сторибуком (когда ругается на то, что у нас нет провайдера для редакса)
export const withTheme =
  (Component: ComponentType) =>
  // получаем тему из редакса
  () => {
    const { theme: defaultTheme } = useJsonSettings();

    return (
      <ThemeProvider initialTheme={defaultTheme}>
        <Component />
      </ThemeProvider>
    );
  };
