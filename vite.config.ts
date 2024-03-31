import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';

// обязательное условие - вынести index.html в корень проекта (поэтому мы просто скопируем этот файл в корень)
export default defineConfig({
  // добавляем, чтоб при сборке в файле index.html в путь скрипта добавился мой репозиторий
  // base: 'studing-advanced-frontend',
  // прокидываем глобальные переменные
  define: {
    __API__: JSON.stringify('http://localhost:8000'),
    __IS_DEV__: JSON.stringify(true),
    __IS_DEV_DEBUG__: JSON.stringify(false),
    __PROJECT__: JSON.stringify('frontend'),
  },
  plugins: [
    // позволяет работать с svg (указываем exportAsDefault, т.к. все svg мы импортили по дефолту)
    svgr(),
    // react - сразу позволяет работать с реактом и тайпскриптом
    react(),
    checker({
      eslint: {
        // for example, lint .ts and .tsx
        lintCommand: 'eslint "src/**/*.{js,jsx,ts,tsx}"',
      },
      typescript: true,
      // stylelint: {
      //   lintCommand: 'stylelint "src/**/*.{scss}"',
      // },
    }),
  ],
  // указываем алиасы для путей
  resolve: { alias: [{ find: '@', replacement: '/src' }] },
});
