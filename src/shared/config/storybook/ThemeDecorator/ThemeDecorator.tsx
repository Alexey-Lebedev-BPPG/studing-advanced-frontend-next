import { StoryFn } from '@storybook/react';
import { ThemeProvider } from '@/app-fsd/providers/ThemeProvider';
import { Theme } from '@/shared/const/theme';

// декоратор, который подключает темы. Используем замыкание, чтоб обернуть наш декоратор темой, которую выбрал пользователь
export const ThemeDecorator = (theme: Theme) => (StoryComponent: StoryFn) => (
  <ThemeProvider initialTheme={theme}>
    <div className={`app ${theme}`}>
      <StoryComponent />
    </div>
  </ThemeProvider>
);
