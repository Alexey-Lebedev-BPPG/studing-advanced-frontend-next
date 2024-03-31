import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import ImageMinimizerPlugin from 'image-minimizer-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';
import webpack from 'webpack';
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { BuildOptions } from './types/config';

export const buildWebpackConfig = (
  options: BuildOptions,
): webpack.Configuration => {
  const { isDev, isDevDebug, mode, paths } = options;

  return {
    // чтоб при старте приложения запускать localhost(используем только в дев сборке)
    devServer: isDev ? buildDevServer(options) : undefined,
    // чтоб видеть в каком именно файле произошла ошибка(используем только в дев сборке)
    devtool: isDev ? 'eval-cheap-module-source-map' : 'source-map',
    // откуда начать сборку
    entry: paths.entry,
    // experiments: { topLevelAwait: true },
    // ignoreWarnings: [/Failed to parse source map/],
    mode,
    module: {
      // вызываем функцию со списком лоудеров (обработка файлов, выходящих за рамки JS)
      rules: buildLoaders(options),
    },
    // различные оптимизационные моменты
    optimization: {
      mergeDuplicateChunks: true,
      minimize: !isDev,
      minimizer: [
        // для удаления комментов из сборки
        new TerserPlugin({
          extractComments: false,
          terserOptions: { format: { comments: false } },
        }),
        new CssMinimizerPlugin(),
        // доп изучить https://webpack.js.org/plugins/image-minimizer-webpack-plugin/
        new ImageMinimizerPlugin({
          minimizer: {
            implementation: ImageMinimizerPlugin.imageminMinify,
            options: {
              plugins: [
                ['gifsicle', { interlaced: true }],
                ['jpegtran', { progressive: true }],
                ['optipng', { optimizationLevel: 5 }],
              ],
            },
          },
        }),
      ],
      removeAvailableModules: true,
      sideEffects: true,
    },
    // куда помещаем сборку и чистим лишнее
    output: {
      // указываем, куда помещаем сторонние файлы и как будут называться (https://webpack.js.org/configuration/output/#template-strings)
      assetModuleFilename: 'assets/[name].[hash][ext]',
      // очищаем папку билда перед каждым билдом
      clean: true,
      // указываем contenthash, чтоб хеш генерировался на основе заполнения файлов
      filename: 'js/[name].[contenthash].js',
      // globalObject: 'this',
      // library: 'engine',
      // libraryTarget: 'umd',
      path: paths.build,
      // добавляем для получения чанков из билда
      publicPath: '/',
      // umdNamedDefine: true,
    },
    // вызываем функцию со списком плагинов
    plugins: buildPlugins(options),
    // вызываем функцию со списком resolves
    resolve: buildResolvers(options),
    stats: {
      // показ в консоли загрузку assets
      assets: isDevDebug,
      // показ в консоли загрузку модулей
      entrypoints: isDevDebug,
      // показ в консоли ентрипоинтов
      modules: isDevDebug,
    },
  };
};
