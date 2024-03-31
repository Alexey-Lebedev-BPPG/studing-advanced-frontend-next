export const buildFileLoader = () => ({
  // исключаем node_modules
  exclude: /node_modules/,
  loader: 'file-loader',
  options: {
    name: 'name=[name].[ext]',
    outputPath: 'assets/images',
  },
  test: /\.(png|jpe?g|gif|webp|ico|pdf|avif|webp|mp4)$/i,
});
