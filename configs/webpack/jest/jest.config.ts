// import fs from 'fs';
import path from 'path';

// const config = JSON.parse(fs.readFileSync(`${__dirname}/.swcrc`, 'utf-8'));
// import nextJest from 'next/jest.js';
// import type { Config } from 'jest';

// const createJestConfig = nextJest({
//   dir: '../../',
// });

// const config = (): Config => {
// eslint-disable-next-line import/no-anonymous-default-export
export default () => {
  const isDevDebug = process.env.DEBUG ? JSON.parse(process.env.DEBUG) : false;

  return {
    // удалять моки после тестов
    clearMocks: true,
    // игнорируемые папки для тестирования
    coveragePathIgnorePatterns: ['/node_modules/'],
    // чтоб объявлять глобальные переменные
    // coverageProvider: 'v8',
    globals: {
      __API__: 'https://test.com',
      __GOOGLE_ANALYTICS__: '',
      __IS_DEV__: true,
      __IS_DEV_DEBUG__: isDevDebug,
      __LOCATION_TOKEN__: '',
      __PROJECT__: 'jest',
    },
    // добавляем "src", чтоб заработали абсолютные пути
    moduleDirectories: ['node_modules', 'src'],
    // расширения файлов, в которых проводить тестирования
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
    // добавляем css, scss файлы для распознавания джестом
    moduleNameMapper: {
      // мок для всех импортов, в которых будет присутствовать svg
      '\\.(svg|jpg)': path.resolve(__dirname, 'jestEmptyComponent.tsx'),
      '\\.s?css$': 'identity-obj-proxy',
      // добавляем поддержку алиасов
      '^@/(.*)$': '<rootDir>/src/$1',
    },
    modulePathIgnorePatterns: ['node_modules', '../../../reports/unit'],
    // альтернативным вариантом, чтоб абсолютные пути заработали будет добавление такого свойства
    modulePaths: ['<rootDir>src'],
    // чтоб появлялся отчет о пройденных unit тестах на отдельной странице
    reporters: [
      'default',
      [
        'jest-html-reporters',
        {
          filename: 'report.html',
          inlineSource: true,
          openReport: isDevDebug,
          publicPath: '<rootDir>/reports/unit',
        },
      ],
    ],
    // т.к. файл конфигурации лежит не в корне, то нужно выйти в корень проекта
    rootDir: '../../../',
    // добавляем файл импорта @testing-library/jest-dom, предварительно создав для него файл импорта
    setupFilesAfterEnv: ['<rootDir>configs/webpack/jest/setupTests.ts'],
    snapshotResolver: '<rootDir>/configs/webpack/jest/snapshotResolve.ts',
    // тестовые переменные, которые используются при тестировании
    testEnvironment: 'jsdom',
    // регулярка для поиска файлов тестирования (rootDir заменяется на вышестоящий путь)
    testMatch: ['<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)'],
    // transform: { '^.+\\.(t|j)sx?$': ['@swc/jest', { ...config }] },
    transform: { '^.+\\.(t|j)sx?$': '@swc/jest' },
    // All imported modules in your tests should be mocked automatically
    // automock: false,

    // Stop running tests after `n` failures
    // bail: 0,

    // The directory where Jest should store its cached dependency information
    // cacheDirectory: "/tmp/jest_rs",

    // Automatically clear mock calls, instances and results before every test

    // Indicates whether the coverage information should be collected while executing the test
    // collectCoverage: false,

    // An array of glob patterns indicating a set of files for which coverage information should be collected
    // collectCoverageFrom: undefined,

    // The directory where Jest should output its coverage files
    // coverageDirectory: undefined,

    // An array of regexp pattern strings used to skip coverage collection

    // Indicates which provider should be used to instrument code for coverage
    // coverageProvider: "babel",

    // A list of reporter names that Jest uses when writing coverage reports
    // coverageReporters: [
    //   "json",
    //   "text",
    //   "lcov",
    //   "clover"
    // ],

    // An object that configures minimum threshold enforcement for coverage results
    // coverageThreshold: undefined,

    // A path to a custom dependency extractor
    // dependencyExtractor: undefined,

    // Make calling deprecated APIs throw helpful error messages
    // errorOnDeprecated: false,

    // Force coverage collection from ignored files using an array of glob patterns
    // forceCoverageMatch: [],

    // A path to a module which exports an async function that is triggered once before all test suites
    // globalSetup: undefined,

    // A path to a module which exports an async function that is triggered once after all test suites
    // globalTeardown: undefined,

    // The maximum amount of workers used to run your tests. Can be specified as % or a number. E.g. maxWorkers: 10% will use 10% of your CPU amount + 1 as the maximum worker number. maxWorkers: 2 will use a maximum of 2 workers.
    // maxWorkers: "50%",

    // An array of directory names to be searched recursively up from the requiring module's location

    // An array of file extensions your modules use

    // A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
    // moduleNameMapper: {},

    // An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
    // modulePathIgnorePatterns: [],

    // Activates notifications for test results
    // notify: false,

    // An enum that specifies notification mode. Requires { notify: true }
    // notifyMode: "failure-change",

    // A preset that is used as a base for Jest's configuration
    // preset: undefined,

    // Run tests from one or more projects
    // projects: undefined,

    // Use this configuration option to add custom reporters to Jest
    // reporters: undefined,

    // Automatically reset mock state before every test
    // resetMocks: false,

    // Reset the module registry before running each individual test
    // resetModules: false,

    // A path to a custom resolver
    // resolver: undefined,

    // Automatically restore mock state and implementation before every test
    // restoreMocks: false,

    // The root directory that Jest should scan for tests and modules within

    // A list of paths to directories that Jest should use to search for files in
    // roots: [
    //   "<rootDir>"
    // ],

    // Allows you to use a custom runner instead of Jest's default test runner
    // runner: "jest-runner",

    // The paths to modules that run some code to configure or set up the testing environment before each test
    // setupFiles: [],

    // A list of paths to modules that run some code to configure or set up the testing framework before each test
    // setupFilesAfterEnv: [],

    // The number of seconds after which a test is considered as slow and reported as such in the results.
    // slowTestThreshold: 5,

    // A list of paths to snapshot serializer modules Jest should use for snapshot testing
    // snapshotSerializers: [],

    // The test environment that will be used for testing

    // Options that will be passed to the testEnvironment
    // testEnvironmentOptions: {},

    // Adds a location field to test results
    // testLocationInResults: false,

    // The glob patterns Jest uses to detect test files

    // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
    // testPathIgnorePatterns: [
    //   "/node_modules/"
    // ],

    // The regexp pattern or array of patterns that Jest uses to detect test files
    // testRegex: [],

    // This option allows the use of a custom results processor
    // testResultsProcessor: undefined,

    // This option allows use of a custom test runner
    // testRunner: "jest-circus/runner",

    // This option sets the URL for the jsdom environment. It is reflected in properties such as location.href
    // testURL: "http://localhost",

    // Setting this value to "fake" allows the use of fake timers for functions such as "setTimeout"
    // timers: "real",

    // A map from regular expressions to paths to transformers
    // transform: undefined,

    // An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
    // transformIgnorePatterns: [
    //   "/node_modules/",
    //   "\\.pnp\\.[^\\/]+$"
    // ],

    // An array of regexp pattern strings that are matched against all modules before the module loader will automatically return a mock for them
    // unmockedModulePathPatterns: undefined,

    // Indicates whether each individual test should be reported during the run
    // verbose: undefined,

    // An array of regexp patterns that are matched against all source file paths before re-running tests in watch mode
    // watchPathIgnorePatterns: [],

    // Whether to use watchman for file crawling
    // watchman: true,
  };
};

// export default createJestConfig(config());
