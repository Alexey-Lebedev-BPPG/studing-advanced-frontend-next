export const buildFontLoader = () => ({
  // исключаем node_modules
  exclude: /node_modules/,
  test: /\.(woff2?|eot|ttf|otf)$/i,
  // use: ['file-loader?name=[name].[ext]'],
  type: 'asset',
});
