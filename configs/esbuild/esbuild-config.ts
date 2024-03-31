// для сборки как у Ulbi
import path from 'path';
import { BuildOptions } from 'esbuild';
import { classModules } from 'esbuild-plugin-class-modules';
import svgr from 'esbuild-plugin-svgr';
import { CleanPlugin } from './plugins/CleanPlugin';
import { HTMLPlugin } from './plugins/HTMLPlugin';

// режим мода
const mode = process.env?.mode || 'development';
const isDev = mode === 'development';
const isProd = mode === 'production';

// функция, для добавления выхода на главную папку
const resolveRoot = (...segments: string[]) =>
  path.resolve(__dirname, '..', '..', ...segments);

export const config: BuildOptions = {
  alias: { '@': resolveRoot('src') },
  // собирает импорты/экспорты в один файл в нужном порядке
  bundle: true,
  // прокидываем глобальные переменные
  define: {
    __API__: JSON.stringify('http://localhost:8000'),
    __IS_DEV__: JSON.stringify(true),
    __IS_DEV_DEBUG__: JSON.stringify(false),
    __PROJECT__: JSON.stringify('frontend'),
  },
  // как будет называться файл сборки (вместо index.js)
  entryNames: '[ext]/[name]-[hash]',
  // entryNames: '[dir]/[name]-[hash]',
  // точка входа в приложение
  entryPoints: [resolveRoot('src', 'index.tsx')],
  // добавляем лоадеры для различных файлов
  loader: {
    '.eot': 'file',
    '.gif': 'file',
    '.ico': 'file',
    '.jpeg': 'file',
    '.jpg': 'file',
    '.otf': 'file',
    '.png': 'file',
    '.ttf': 'file',
    '.webp': 'file',
    '.woff2': 'file',
  },
  // включает генерацию файлов для сборки (js, css ...)
  metafile: true,
  // делаем минификацию только в режиме прода
  minify: isProd,
  // куда будет помещаться сборка
  outdir: resolveRoot('build-esbuild'),
  // добавляем плагины
  plugins: [
    CleanPlugin,
    HTMLPlugin({ title: 'Ulbi example' }),
    svgr(),
    // sassPlugin(),
    classModules(),
  ],
  // позволяет генерировать читабельные пути к файлам
  sourcemap: isDev,
  // указываем расположение файла tsconfig.json
  tsconfig: resolveRoot('tsconfig.json'),
};

// конфиг по другому варианту (работает плохо)
// import path from 'path';
// import { BuildOptions } from 'esbuild';
// import svgr from 'esbuild-plugin-svgr';
// import { postcssModules, sassPlugin } from 'esbuild-sass-plugin';
// import { CleanPlugin } from './plugins/CleanPlugin';

// // режим мода
// const mode = process.env?.mode || 'development';
// const isDev = mode === 'development';
// const isProd = mode === 'production';

// // функция, для добавления выхода на главную папку
// const resolveRoot = (...segments: string[]) =>
//   path.resolve(__dirname, '..', '..', ...segments);

// export const config: BuildOptions = {
//   alias: { '@': resolveRoot('src') },
//   // собирает импорты/экспорты в один файл в нужном порядке
//   bundle: true,
//   // прокидываем глобальные переменные
//   define: {
//     __API__: JSON.stringify('http://localhost:8000'),
//     __IS_DEV__: JSON.stringify(true),
//     __IS_DEV_DEBUG__: JSON.stringify(false),
//     __PROJECT__: JSON.stringify('frontend'),
//   },
//   // как будет называться файл сборки (вместо index.js)
//   entryNames: '[ext]/[name]-[hash]',
//   // entryNames: '[dir]/[name]-[hash]',
//   // точка входа в приложение
//   entryPoints: [resolveRoot('src', 'index.tsx')],
//   // добавляем лоадеры для различных файлов
//   loader: {
//     '.eot': 'file',
//     '.gif': 'file',
//     '.ico': 'file',
//     '.jpeg': 'file',
//     '.jpg': 'file',
//     '.otf': 'file',
//     '.png': 'file',
//     '.ttf': 'file',
//     '.webp': 'file',
//     '.woff2': 'file',
//   },
//   // включает генерацию файлов для сборки (js, css ...)
//   metafile: true,
//   // делаем минификацию только в режиме прода
//   minify: isProd,
//   // куда будет помещаться сборка
//   outdir: resolveRoot('build-esbuild'),
//   // добавляем плагины
//   plugins: [
//     CleanPlugin,
//     sassPlugin({
//       filter: /\.module\.scss$/,
//       transform: postcssModules({
//         generateScopedName: '[hash:base64:8]--[local]',
//         localsConvention: 'camelCaseOnly',
//       }),
//     }),
//     sassPlugin({
//       filter: /\.scss$/,
//       type: 'style',
//     }),
//     svgr(),
//   ],
//   // позволяет генерировать читабельные пути к файлам
//   sourcemap: isDev,
//   // указываем расположение файла tsconfig.json
//   tsconfig: resolveRoot('tsconfig.json'),
// };
