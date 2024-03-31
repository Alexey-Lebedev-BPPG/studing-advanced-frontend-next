// для сборки как у Ulbi
// файл для дев сервера
// import ESBuild from 'esbuild';
// import { config } from './esbuild-config';

// // чтоб не ругалось на то, что await используется только в async функциях, оборачиваем все в самовызывающуюся асинхронную функцию
// (async () => {
//   const PORT = Number(process.env?.port) || 5000;

//   const server = await ESBuild.context(config);

//   await server.watch();

//   await server
//     .rebuild()
//     .then(() => console.log('build...'))
//     .catch(err => console.log('', err));

//   await server
//     .serve({ port: PORT, servedir: config.outdir })
//     .then(() => console.log(`server started on http://localhost:${PORT}`))
//     .catch(err => console.log('error esbuild dev server', err));
// })();

import path from 'path';
import ESBuild from 'esbuild';
import { config } from './esbuild-config';

(async () => {
  const PORT = Number(process.env.NEXT_PUBLIC_) || 3000;
  let server;

  try {
    server = await ESBuild.context(config);

    await server.watch();

    console.log('Watching client...');

    const { host, port } = await server.serve({
      fallback: path.resolve(__dirname, '..', '..', 'public', 'index.html'),
      port: PORT,
      servedir: config.outdir,
    });

    console.log(`Hot refresh at http://${host}:${port}`);
  } catch (error) {
    console.error('Ann error occurred:', error);
    // останавливаем процесс
    process.exit(1);
  }
})();
