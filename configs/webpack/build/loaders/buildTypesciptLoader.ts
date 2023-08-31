export const buildTypesciptLoader = () => ({
  // исключаем node_modules
  exclude: /node_modules/,
  // ловим файлы с .ts, .tsx
  test: /\.tsx?$/,
  // для них используем ts-loader
  use: 'ts-loader',
});
