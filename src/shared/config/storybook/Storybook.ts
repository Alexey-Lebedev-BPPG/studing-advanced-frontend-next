// Storybook.test.ts
// import path from 'path';
// import initStoryshots from '@storybook/addon-storyshots';
// import 'intersection-observer';
// import { imageSnapshot } from '@storybook/addon-storyshots-puppeteer';

// // Function to customize the snapshot location
// const getMatchOptions = ({ context: { fileName } }: any) => {
//   // Generates a custom path based on the file name and the custom directory.
//   const snapshotPath = path.join(
//     path.dirname(fileName),
//     path.join(
//       // берем путь к файлу, удаляем все до src и добавляем необходимый путь
//       __dirname.slice(0, __dirname.indexOf('/src')),
//       'configs',
//       'storybook',
//     ),
//   );
//   return { customSnapshotsDir: snapshotPath };
// };
// initStoryshots({
//   configPath: path.join(
//     // берем путь к файлу, удаляем все до src и добавляем необходимый путь
//     __dirname.slice(0, __dirname.indexOf('/src')),
//     'configs',
//     'storybook',
//   ),
//   test: imageSnapshot({
//     // invoke the function above here
//     getMatchOptions,
//   }),
// });
export {};
