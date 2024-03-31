// чтоб появился этот файл делаем pnpm init @eslint/config
module.exports = {
  env: { browser: true, es2021: true, jest: true, node: true },
  // расширяем стандартный плагин для реакта и подключаем модуль стандарта тайпскрипта и airbnb + автоматом добавился сторибук
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:i18next/recommended',
    'plugin:storybook/recommended',
    'plugin:import/warnings',
    'prettier',
    'plugin:typescript-sort-keys/recommended',
  ],
  globals: {
    __API__: true,
    __IS_DEV__: true,
    __IS_DEV_DEBUG__: true,
    __PROJECT__: true,
  },
  // отключаем проверку необработанных слов в тестовых файлах
  overrides: [
    {
      files: ['**/src/**/*.{test,stories}.{ts, tsx}'],
      rules: { 'i18next/no-literal-string': 'off' },
    },
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: { jsx: true },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'i18next',
    'prettier',
    // чтоб зависимости useEffect подсвечивались
    'react-hooks',
    // кастомный плагин для импортов
    'path-checher-ulbi-example',
    // неиспользуемые импорты
    'unused-imports',
    // например настроить импорты по алфавиту
    'import',
    'sort-keys-fix',
    'typescript-sort-keys',
    'sort-destructure-keys',
  ],
  rules: {
    '@typescript-eslint/no-restricted-imports': [
      'warn',
      {
        importNames: ['useSelector', 'useDispatch'],
        message:
          'Use typed hooks `useAppDispatch` and `useAppSelector` instead.',
        name: 'react-redux',
      },
    ],
    '@typescript-eslint/no-shadow': 'error',
    '@typescript-eslint/no-unused-vars': 'off',
    camelcase: ['warn', { properties: 'always' }],
    'comma-dangle': ['warn', 'only-multiline'],
    'consistent-return': 'off',
    curly: ['warn', 'multi'],
    // чтоб ругался на необработанные слова + отключаем плагин для атрибутов
    'i18next/no-literal-string': [
      'error',
      { ignoreAttribute: ['data-testid', 'to'], markupOnly: true },
    ],
    // отключаем, чтоб не ругался на необработанные слова
    // 'i18next/no-literal-string': 0,
    'import/extensions': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/no-unresolved': 'off',
    'import/order': [
      'warn',
      {
        alphabetize: { order: 'asc' },
        groups: [
          'builtin',
          'external',
          'index',
          'type',
          'sibling',
          'parent',
          'internal',
          'object',
        ],
        pathGroups: [{ group: 'internal', pattern: '@/**', position: 'after' }],
      },
    ],
    'import/prefer-default-export': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'no-console': 'off',
    'no-debugger': 'warn',
    'no-param-reassign': 'off',
    'no-plusplus': 'off',
    'no-restricted-imports': 'off',
    'no-shadow': 'off',
    'no-undef': 'off',
    'no-underscore-dangle': 'off',
    'no-unused-expressions': 'off',
    'no-unused-vars': 'off',
    'nonblock-statement-body-position': 'off',
    'object-curly-newline': 'off',
    'operator-linebreak': 'off',
    'path-checher-ulbi-example/layer-imports': [
      'warn',
      { alias: '@', ignoreImportPatterns: ['**/StoreProvider', '**/testing'] },
    ],
    'path-checher-ulbi-example/path-checker': ['warn', { alias: '@' }],
    'path-checher-ulbi-example/public-api-imports': [
      'warn',
      {
        alias: '@',
        testFilesPatterns: [
          '**/*.test.*',
          '**/*.stories.*',
          '**/StoreDecorator.tsx',
        ],
      },
    ],
    'prettier/prettier': [
      'error',
      { endOfLine: 'auto' },
      { usePrettierrc: true },
    ],
    quotes: [2, 'single', { avoidEscape: true }],
    radix: 'off',
    'react/function-component-definition': 'off',
    'react/jsx-child-element-spacing': 'off',
    'react/jsx-curly-brace-presence': 'off',
    'react/jsx-curly-newline': 'off',
    'react/jsx-filename-extension': [
      2,
      { extensions: ['.js', '.jsx', '.tsx', '.ts'] },
    ],
    'react/jsx-newline': [1, { allowMultilines: false, prevent: true }],
    'react/jsx-no-leaked-render': [
      1,
      { validStrategies: ['coerce', 'ternary'] },
    ],
    'react/jsx-no-literals': [
      1,
      { ignoreProps: true, noAttributeStrings: true, noStrings: false },
    ],
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-sort-props': [
      1,
      {
        callbacksLast: true,
        ignoreCase: true,
        multiline: 'last',
        noSortAlphabetically: true,
        reservedFirst: true,
        shorthandFirst: true,
        shorthandLast: true,
      },
    ],
    'react/no-array-index-key': 'off',
    'react/no-typos': 'warn',
    // позволяет создавать компоненты перед рендером родительского (где стейты)
    'react/no-unstable-nested-components': 'warn',
    'react/no-unused-prop-types': 'warn',
    'react/prop-types': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react-hooks/exhaustive-deps': 'warn',
    'react-hooks/rules-of-hooks': 'error',
    'sort-destructure-keys/sort-destructure-keys': [
      2,
      { caseSensitive: false },
    ],
    // сортировка ключей объекта по алфавиту.
    'sort-keys-fix/sort-keys-fix': [
      'warn',
      'asc',
      { caseSensitive: true, natural: true },
    ],
    'unused-imports/no-unused-imports': 'warn',
  },
};
