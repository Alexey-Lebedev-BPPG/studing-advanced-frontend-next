import { ResolveOptions } from 'webpack';
import { BuildOptions } from './types/config';

export const buildResolvers = (options: BuildOptions): ResolveOptions => ({
  // если оставляем пустым, то ничего добавляться к путям не будет.если указать например "@",
  // то к путям она будет добавляться (например, если указать "@": paths.src, то вместо src/test будет указываться
  // @/src/test). Лучше использовать, чтоб не было возможных конфликтов с библиотеками. Если здесь указываем, что также добавляем в tsconfig.json в поле paths
  alias: { '@': options.paths.src },
  // для кого не указываем расширения файлов в конце названия
  extensions: ['.tsx', '.ts', '.js'],
  // для каждого модуля файл index.ts(index.tsx) будет главным
  mainFiles: ['index'],
  // убираем сурс мапы для определенных библиотек (связано с криптой)
  // fallback: {
  //   crypto: false,
  //   'crypto-browserify': require.resolve('crypto-browserify'),
  //   fs: false,
  //   http: false,
  //   https: false,
  //   net: false,
  //   path: false,
  //   stream: false,
  //   tls: false,
  //   zlib: false,
  // },
  // указываем путь для папки src и node_modules
  modules: [options.paths.src, 'node_modules'],
  // делает абсолютные пути приоритетными
  preferAbsolute: true,
});
