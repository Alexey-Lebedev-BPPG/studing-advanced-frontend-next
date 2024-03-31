import ReactRefreshTypescript from 'react-refresh-typescript';

export const buildTypesciptLoader = () => ({
  // исключаем node_modules
  exclude: /node_modules/,
  // ловим файлы с .ts, .tsx
  test: /\.tsx?$/,
  // для них используем ts-loader
  use: [
    {
      loader: 'ts-loader',
      // чтоб не проверял типы при сборке
      options: {
        getCustomTransformers: () => ({
          before: [ReactRefreshTypescript()].filter(Boolean),
        }),
        transpileOnly: true,
      },
    },
  ],
});
