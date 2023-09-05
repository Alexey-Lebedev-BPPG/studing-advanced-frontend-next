import { withTests } from '@storybook/addon-jest';
import { Preview } from '@storybook/react';
// import initStoryshots from '@storybook/addon-storyshots';
import results from '../../reports/unit/.jest-test-results.json';
import { FeaturesFlagsDecorator } from '../../src/shared/config/storybook/FeaturesFlagsDecorator/FeaturesFlagsDecorator';
import { NewDesignDecorator } from '../../src/shared/config/storybook/NewDesignDecorator/NewDesignDecorator';
import { RouterDecorator } from '../../src/shared/config/storybook/RouterDecorator/RouterDecorator';
import { StyleDecorator } from '../../src/shared/config/storybook/StyleDecorator/StyleDecorator';
import { SuspenseDecorator } from '../../src/shared/config/storybook/SuspenseDecorator/SuspenseDecorator';
import { ThemeDecorator } from '../../src/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { TranslationDecorator } from '../../src/shared/config/storybook/TranslationDecorator/TranslationDecorator';
import { Theme } from '../../src/shared/const/theme';

const parameters: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
      sort: 'requiredFirst',
    },
    // добавляем, чтоб компоненты сторибука открывались на весь экран без паддингов
    layout: 'fullscreen',
    // сортировка по алфавиту
    options: {
      storySort: {
        locales: '',
        method: 'alphabetical',
        order: [],
      },
    },
    // отступы от краев
    paddings: {
      default: 'VeryLarge',
      values: [
        { name: 'VerySmall', value: '16px' },
        { name: 'Small', value: '32px' },
        { name: 'VeryMedium', value: '48px' },
        { name: 'Medium', value: '64px' },
        { name: 'Large', value: '80px' },
        { name: 'VeryLarge', value: '96px' },
      ],
    },
    // настройки аддона storybook-addon-themes под темы
    themes: {
      // указываем дефолтную тему
      // default: 'dark',
      // перечисляем все доступные темы (название, навешиваемый класс css, цвет рядом с названием в селекте выбора)
      list: [
        { class: Theme.LIGHT, color: '#ffffff', name: 'light' },
        { class: Theme.DARK, color: '#000000', name: 'dark' },
        { class: Theme.ORANGE, color: '#ffb005', name: 'orange' },
      ],
    },
  },
};
// здесь вызываются обертки для каждого сторибук компонента:
export const decorators = [
  withTests({ results }),
  // initStoryshots(),
  // добавляем декоратор для глобальных стилей
  StyleDecorator,
  // добавляем локально главную тему, а уже в стори компонентов будем использовать темную по необходимости
  ThemeDecorator(Theme.LIGHT),
  // добавляем общий декоратор для роутов
  RouterDecorator,
  // добавляем декоратор для переводов
  TranslationDecorator,
  // добавляем декоратор для обертывания саспенсом компонентов, которые вложены глубоко в дерево (в сторибуке возможен такой сценарий, когда компонент подгружается асинхронно(через lazy) и поэтому его необходимо обернуть в саспенс, чтоб дождаться загрузки)
  SuspenseDecorator,
  // декоратор, который добавляет поддержку фичи-флагов
  FeaturesFlagsDecorator({}),
  NewDesignDecorator,
];

export default parameters;
