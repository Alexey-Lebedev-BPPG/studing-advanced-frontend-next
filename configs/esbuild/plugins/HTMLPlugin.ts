import { rm, writeFile } from 'fs/promises';
import path from 'path';
import { Plugin } from 'esbuild';

interface HTMLPluginProps {
  // путь до css файлов
  cssPath?: string[];
  // путь до js файлов
  jsPath?: string[];
  // сам html файл
  template?: string;
  // title html файла
  title?: string;
}

// функция генерации html файла
const renderHtml = (props: HTMLPluginProps) => {
  const { cssPath, jsPath, template, title } = props;

  return (
    template ||
    `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;700&family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
        ${cssPath
          ?.map(pathCss => `<link href="${pathCss}" rel="stylesheet">`)
          .join(' ')}
        <title>${title}</title>
      </head>
      <body>
        <div id="root"></div>
        ${jsPath?.map(pathJs => `<script src="${pathJs}"></script>`).join(' ')}
      </body>
    </html>
    `
  );
};

// функция, которая достает пути до js и css файлов
const preparePaths = (outputsLocal: string[]) =>
  outputsLocal.reduce<Array<string[]>>(
    (acc, pathOutputs) => {
      const [js, css] = acc;
      // доставем название самого файла
      const splitterFileName = pathOutputs.split('/').slice(-2).join('/');

      if (splitterFileName?.endsWith('.js')) js.push(splitterFileName);
      if (splitterFileName?.endsWith('.css')) css.push(splitterFileName);

      return acc;
    },
    [[], []],
  );

// плагин, чтоб генерировать html файл входа
export const HTMLPlugin = (props: HTMLPluginProps): Plugin => ({
  name: 'HTMLPlugin',
  setup(build) {
    // получаем путь до папки выхода
    const { outdir } = build.initialOptions;
    build.onStart(async () => {
      try {
        // удаляем папку (recursive удаляет все вложенные файлы)
        if (outdir) await rm(outdir, { recursive: true });
      } catch (error) {
        console.log('не удалось очистить папку', error);
      }
    });
    // onEnd принимает result - это результат сборки
    build.onEnd(async result => {
      // достаем из метафайлов все выходные пути
      const outputs = result.metafile?.outputs;
      // получаем два массива выходных путей файлов из функции, в которую пробрасываем ключи из метафайлов
      const [jsPathLocal, cssPathLocal] = preparePaths(
        Object.keys(outputs || {}),
      );
      // записываем файл
      if (outdir)
        await writeFile(
          // первый аргумент функции - путь, куда будем записывать файл,
          path.resolve(outdir, 'index.html'),
          // второй аргумент - что будем вставлять
          renderHtml({ cssPath: cssPathLocal, jsPath: jsPathLocal, ...props }),
        );
    });
  },
});
