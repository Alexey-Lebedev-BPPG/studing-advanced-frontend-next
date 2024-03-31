import { rm } from 'fs/promises';
import { Plugin } from 'esbuild';

// плагин, чтоб удалять папку сборки перед каждой сборкой
export const CleanPlugin: Plugin = {
  name: 'CleanPlugin',
  setup(build) {
    build.onStart(async () => {
      try {
        // получаем путь до папки выхода
        const { outdir } = build.initialOptions;
        // удаляем папку (recursive удаляет все вложенные файлы)
        if (outdir) await rm(outdir, { recursive: true });
      } catch (error) {
        console.log('не удалось очистить папку', error);
      }
    });
  },
};
