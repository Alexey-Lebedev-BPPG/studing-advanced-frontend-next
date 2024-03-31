export const buildFontLoader = () => ({
  // исключаем node_modules
  exclude: /node_modules/,
  test: /\.(woff|woff2|eot|ttf|otf)$/i,
  type: 'asset/resource',
});
