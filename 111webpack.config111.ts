// import path from 'path';
// import dotenv from 'dotenv';
// import webpack from 'webpack';
// // import clear from 'clear';
// import { buildWebpackConfig } from './configs/webpack/build/buildWebpackConfig';
// import {
//   BuildEnv,
//   BuildMode,
//   BuildPaths,
// } from './configs/webpack/build/types/config';

// // функция на получение дефолтного апи адреса
// const getApiUrl = (mode: BuildMode, apiUrl?: string) => {
//   if (apiUrl) return apiUrl;
//   if (mode === 'production') return '/api';
//   return 'http://localhost:3000';
// };

// // заводим такую функцию, а не просто возвращаем конфиг, чтоб можно было прокидывать сюда переменные окружения
// // eslint-disable-next-line import/no-anonymous-default-export
// export default (env: BuildEnv) => {
//   const paths: BuildPaths = {
//     // куда помещаем готовую сборку
//     build: path.resolve(__dirname, 'build'),
//     // указываем путь до папки, куда помещаем готовые файлы переводов
//     buildLocales: path.resolve(__dirname, 'build', 'locales'),
//     // откуда стартует приложение
//     // если хотим указать динамически name для файлов, то исп. так
//     // entry:{
//     //   // указываем название файла (RANDOM) и, если у нас стоит filename: "[name].js",
//     //   // то будет файл с названием RANDOM
//     //   RANDOM: path.resolve(__dirname, "src", "index.tsx")
//     // }
//     entry: path.resolve(__dirname, 'src', 'index.tsx'),
//     // сообщаем где главный файл html лежит и куда будем встраивать скрипты
//     html: path.resolve(__dirname, 'public', 'index.html'),
//     // указываем путь до папки, откуда берем готовые файлы переводов
//     locales: path.resolve(__dirname, 'public', 'locales'),
//     // указываем путь до папки src, чтоб использовать его в buildResolves
//     src: path.resolve(__dirname, 'src'),
//     // если нужно указать путь к иконкам в паблике
//     // icon: path.resolve(__dirname, 'public', 'logo.svg'),
//   };

//   // initialization config for dotenv
//   dotenv.config().parsed || {};

//   // берем env из параметра функции или из dotenv
//   const mode = env?.mode || process.env?.mode || 'development';
//   const PORT = Number(env?.port) || Number(process.env?.PORT) || 3000;
//   const apiURL = getApiUrl(mode, env?.apiURL || process.env?.API_URL);

//   const isDev = mode === 'development';
//   const isDevDebug =
//     JSON.parse(env?.modeDebug || 'false') ||
//     JSON.parse(process.env?.DEBUG || 'false') ||
//     false;

//   // генерируем общий конфиг webpack
//   const config: webpack.Configuration = buildWebpackConfig({
//     apiURL,
//     isDev,
//     isDevDebug,
//     mode,
//     paths,
//     port: PORT,
//     project: 'frontend',
//   });

//   // для очистки консоли после изменения файлов
//   if (process.env.NODE_ENV !== 'production') {
//     // альтернативный вариант без установки библы clear, однако криво очищает консоль
//     const clearConsole = () => {
//       process.stdout.write(
//         process.platform === 'win32'
//           ? '\x1B[2J\x1B[0f'
//           : '\x1B[2J\x1B[3J\x1B[H',
//       );
//     };

//     webpack(config).watch({}, (err, stats) => {
//       if (!err && stats && !stats.hasErrors() && !stats.hasWarnings())
//         clearConsole();
//       // с помощью библы clear
//       // if (!err && stats && !stats.hasErrors() && !stats.hasWarnings()) clear();
//     });
//   }

//   return config;
// };
export {};
