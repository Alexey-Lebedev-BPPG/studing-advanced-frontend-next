export default {
  // "src/**/*.test.{js,jsx,ts,tsx}": "jest --config ./configs/jest/jest.config.ts",
  'src/**/*.{css,scss}': ['stylelint --fix', 'stylelint'],
  'src/**/*.{js,jsx,ts,tsx,json}': [
    'prettier --write',
    'eslint --fix',
    'eslint',
  ],
};
