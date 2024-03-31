export const buildMjsLoader = () => ({
  include: /node_modules/,
  test: /\.mjs$/,
  type: 'javascript/auto',
});
