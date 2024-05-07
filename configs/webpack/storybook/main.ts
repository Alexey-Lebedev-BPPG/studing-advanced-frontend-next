import path from 'path';
import { Configuration, DefinePlugin, RuleSetRule } from 'webpack';
// import { buildFileLoader } from '../build/loaders/buildFileLoader';
// import { buildFontLoader } from '../build/loaders/buildFontLoader';
// import { buildMjsLoader } from '../build/loaders/buildMjsLoader';
// import { buildScssLoaders } from '../build/loaders/buildScssLoaders';
import { buildSvgLoader } from '../build/loaders/buildSvgLoader';
import { BuildPaths } from '../build/types/config';

const config = {
  addons: [
    // для переходов по страницам сторибука
    '@storybook/addon-links',
    // этот аддон добавляет сразу несколько аддонов, можно какие-то внутренние отключать
    {
      name: '@storybook/addon-essentials',
      options: {
        // отключаем дефолтный бэкграунд для тем
        backgrounds: false,
      },
    },
    // для взаимодействия с пропсами
    '@storybook/addon-interactions',
    // аддон, чтоб мокать запросы в сторибуке
    'storybook-addon-mock',
    // чтоб не заморачиваться с созданием разных кнопок для разных тем, можно поставить аддон: https://storybook.js.org/addons/@dhruvkb/storybook-addon-themes
    'storybook-addon-themes',
    // для тестов
    '@storybook/addon-jest',
    // для отступов в историях
    'storybook-addon-paddings',
    // чтоб видеть код истории
    '@storybook/addon-storysource',
    // чтоб видеть консоль разработчика
    '@storybook/addon-actions',
    // для псевдоэлементов
    'storybook-addon-pseudo-states',
    // встроить макеты из фигмы (пример в src/widgets/ArticleAdditionalInfo/ui/ArticleAdditionalInfo.stories.tsx)
    '@storybook/addon-designs',
    // '@storybook/addon-mdx-gfm',
    // '@storybook/addon-storyshots',
    // '@storybook/addon-storyshots-puppeteer',
    'storybook-react-intl',
  ],
  core: { disableTelemetry: true },
  docs: { autodocs: true },
  framework: {
    name: '@storybook/nextjs',
    options: {
      builder: { lazyCompilation: true, useSWC: true },
      fastRefresh: true,
    },
  },
  // чтоб переводы работали корректно
  staticDirs: ['../../../.next'],
  stories: [
    {
      directory: '../../../src',
      files: '**/*.stories.@(js|jsx|ts|tsx|mdx)',
    },
  ],
  // создаем конфиг для сторибука. Это будет функция, которая будет принимать конфиг вебпака и возвращать его видоизмененным
  webpackFinal: async (configWebpack: Configuration) => {
    // создаем объект с характеристиками пути к главному файлу
    const paths: BuildPaths = {
      build: '',
      buildLocales: '',
      entry: '',
      html: '',
      locales: '',
      // добавляем путь (выходим на 2 уровня вверх и берем src)
      src: path.resolve(__dirname, '..', '..', '..', 'src'),
    };
    // добавляем путь в конфиг
    configWebpack!.resolve!.modules!.push(paths.src);
    // добавляем расширения для TS в конфиг
    configWebpack!.resolve!.extensions!.push('.ts', '.tsx');
    // добавляем алиасы, для поддержки абсолютных путей
    configWebpack!.resolve!.alias = {
      ...configWebpack!.resolve!.alias,
      '@': paths.src,
    };

    // пройдем по каждому лоадеру и находим правило, которое обрабатывает svg
    configWebpack!.module!.rules = configWebpack!.module!.rules!.map(
      (rule: undefined | null | false | '' | 0 | RuleSetRule | '...') => {
        if (
          rule !== '...' &&
          rule &&
          rule?.test instanceof RegExp &&
          rule?.test.toString().includes('svg')
          //   &&
          //   /svg/.test(rule.test as unknown as string)
        )
          // берем все свойства правила и добавляем правило для исключения обработки свг (по дефолту в сторибуковской сборке стоит другой лоадер для SVG, мы используем svgr, поэтому необходимо его подменить)
          return {
            ...rule,
            exclude: /\.svg$/i,
          };
        return rule;
      },
    );

    // и добавляем svg лоадер в rules
    configWebpack.module?.rules?.push(buildSvgLoader());

    // добавляем css лоадер для сторибука со значением isDev как true, т.к. сторибук будет использоваться только в дев-разработке
    // configWebpack!.module!.rules.push(buildScssLoaders(true));
    // inputConfig.module?.rules?.push(buildFontLoader());
    // inputConfig.module?.rules?.push(buildFileLoader());
    // inputConfig.module?.rules?.push(buildMjsLoader());

    // добавляем глобальную переменную
    configWebpack!.plugins!.push(
      new DefinePlugin({
        __API__: JSON.stringify('https://testapi.ru'),
        __GOOGLE_ANALYTICS__: '',
        __IS_DEV__: JSON.stringify(true),
        __IS_DEV_DEBUG__: JSON.stringify(true),
        __LOCATION_TOKEN__: JSON.stringify(''),
        __PROJECT__: JSON.stringify('storybook'),
      }),
    );
    return configWebpack;
  },
};
export default config;
