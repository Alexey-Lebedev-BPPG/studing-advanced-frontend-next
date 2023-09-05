export const buildSvgLoader = () => ({
  // исключаем node_modules
  exclude: /node_modules/,
  test: /\.svg$/,
  use: [
    {
      loader: '@svgr/webpack',
      options: {
        // добавляем, чтоб заменять размеры иконок (по ум. 1em)
        icon: true,
        // добавляем плагин, чтоб автоматически заменять все цвета svg на currentColor
        svgoConfig: {
          plugins: [{ name: 'convertColors', params: { currentColor: true } }],
        },
      },
    },
  ],
});
