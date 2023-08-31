export const buildFileLoader = () => ({
  // исключаем node_modules
  exclude: /node_modules/,
  test: /\.(png|jpe?g|gif|webp|ico)$/i,
  // use: ['file-loader?name=[name].[ext]'],
  type: 'asset',
});
