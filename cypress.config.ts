import { defineConfig } from 'cypress';

export default defineConfig({
  component: { devServer: { bundler: 'webpack', framework: 'react' } },
  e2e: {
    // позволяет задать базовый урл, чтоб уже в самих тестах делать относительные пути
    baseUrl: 'http://localhost:3000/',
    setupNodeEvents(on, config) {},
  },
});
