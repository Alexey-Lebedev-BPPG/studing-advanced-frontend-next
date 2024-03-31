import { Configuration } from 'webpack';
import { buildBabelLoader } from './loaders/buildBabelLoader';
// import { buildTypesciptLoader } from "./loaders/buildTypesciptLoader";
import { buildCssLoaders } from './loaders/buildCssLoaders';
import { buildFileLoader } from './loaders/buildFileLoader';
import { buildMjsLoader } from './loaders/buildMjsLoader';
import { buildScssLoaders } from './loaders/buildScssLoaders';
import { buildSvgLoader } from './loaders/buildSvgLoader';
import { BuildOptions } from './types/config';

export const buildLoaders = (
  options: BuildOptions,
): Configuration['loader'][] => {
  // порядок лоадеров имеет значение, поэтому выносим в отдельные переменные

  // svg loader
  const svgLoader = buildSvgLoader();

  // loader для определенных форматов файлов (в данном случае .png, .jpeg, .gif. Сюда же можно подключать шрифты, просто
  // добавив их в регулярку)
  const fileLoader = buildFileLoader();

  // typescript loader (используем, если не настраиваем babel-loader, который сможет выполнять задачи ts-loadera)
  // const typescriptLoader = buildTypesciptLoader();

  // babelLoader для обычных файлов (.ts, .js)
  const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false });
  // babelLoader для файлов .tsx, .jsx
  const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true });

  const mjsLoader = buildMjsLoader();

  // css лоадер
  const cssLoaders = buildCssLoaders(options.isDev);

  // scss лоадер
  const scssLoaders = buildScssLoaders(options.isDev);

  return [
    svgLoader,
    fileLoader,
    codeBabelLoader,
    tsxCodeBabelLoader,
    mjsLoader,
    // если писать на нативном js (без typescript), то нужно установить @babel/preset-reactnpm run build вместо typescriptLoader
    // typescriptLoader,
    scssLoaders,
    cssLoaders,
  ];
};
